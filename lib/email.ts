/**
 * Outbound email via the Resend HTTP API.
 *
 * Uses fetch against the REST API rather than the `resend` SDK: the endpoint is
 * one POST, the SDK would add a dependency for no behavioural gain, and a
 * direct call keeps the failure modes visible.
 *
 * Every function returns a discriminated result instead of throwing. The
 * caller decides what a failure means for the visitor - a contact form that
 * swallowed a 502 would look identical to a delivered message, and that is the
 * worst possible outcome for someone who thinks they emailed us.
 */

import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from "@/lib/business";

/**
 * Base URL. Overridable so the delivery path can be exercised against a local
 * stub without a real account; in normal use it is unset and this is Resend.
 */
const API = process.env.RESEND_API_BASE_URL ?? "https://api.resend.com";
const RESEND_ENDPOINT = `${API}/emails`;

export type EmailResult =
  | { ok: true; id: string }
  | { ok: false; reason: string; status?: number; detail?: string };

/** True when a key is present, so the UI can say something honest. */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function fromAddress(): string {
  // RESEND_FROM_EMAIL must be on a domain verified in Resend. `onboarding@resend.dev`
  // works for a first send without DNS, but only to the account owner's inbox.
  return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

export async function sendEmail(input: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      reason:
        "Email delivery is not configured (RESEND_API_KEY is not set).",
    };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_NAME
          ? `${process.env.RESEND_FROM_NAME} <${fromAddress()}>`
          : fromAddress(),
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        // Replies to an enquiry must reach the prospect, not our mailbox.
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        reason: `Resend responded ${res.status}.`,
        status: res.status,
        detail,
      };
    }

    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id ?? "" };
  } catch (err) {
    return {
      ok: false,
      reason: "Could not reach the email provider.",
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

/** Escape untrusted text before it goes anywhere near HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Deliver a contact enquiry to the studio inbox. */
export async function sendContactEnquiry(enquiry: {
  name: string;
  email: string;
  timeline: string;
  problem: string;
  consentCapturedAt: string;
}): Promise<EmailResult> {
  const { name, email, timeline, problem } = enquiry;
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    timeline: escapeHtml(timeline || "Not specified"),
    problem: escapeHtml(problem),
  };

  const subject = `Project enquiry from ${name}`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:28px;">
    <h1 style="margin:0 0 20px;font-size:17px;color:#1a1a1a;">New project enquiry</h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#333;">
      <tr><td style="padding:8px 0;color:#666;width:90px;vertical-align:top;">Name</td><td style="padding:8px 0;">${safe.name}</td></tr>
      <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe.email}" style="color:#5b52d6;">${safe.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Timeline</td><td style="padding:8px 0;">${safe.timeline}</td></tr>
    </table>
    <hr style="border:0;border-top:1px solid rgba(0,0,0,0.08);margin:18px 0;" />
    <p style="margin:0 0 8px;font-size:12px;color:#666;">Where they're stuck</p>
    <div style="margin:0;font-size:14px;line-height:1.7;color:#1a1a1a;white-space:pre-wrap;">${safe.problem}</div>
    <hr style="border:0;border-top:1px solid rgba(0,0,0,0.08);margin:20px 0;" />
    <p style="margin:0;font-size:12px;color:#666;">
      Consent to process this enquiry was captured at ${escapeHtml(enquiry.consentCapturedAt)} via the
      privacy notice at ${escapeHtml(BUSINESS.siteUrl)}/privacy.
    </p>
  </div>
</body></html>`;

  const text = [
    `New project enquiry`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Timeline: ${timeline || "Not specified"}`,
    ``,
    problem,
    ``,
    `---`,
    `Consent captured at ${enquiry.consentCapturedAt}`,
    `Privacy notice: ${BUSINESS.siteUrl}/privacy`,
  ].join("\n");

  return sendEmail({
    to: BUSINESS.email,
    subject,
    html,
    text,
    replyTo: email,
  });
}

/** Confirmation to the person who submitted the form. */
export async function sendContactConfirmation(input: {
  to: string;
  name: string;
}): Promise<EmailResult> {
  const safeName = escapeHtml(input.name);
  return sendEmail({
    to: input.to,
    subject: "We got your enquiry - reply within 48 hours",
    html: `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:28px;">
    <h1 style="margin:0 0 16px;font-size:17px;color:#1a1a1a;">Got it, ${safeName}.</h1>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#333;">
      Your enquiry landed. We read every one and reply within 48 hours with a
      one-pager: what we'd do, roughly how long, and what it would cost.
    </p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#333;">
      No deck, no follow-up sequence. If it turns out we're not the right fit,
      we'll say so and point you somewhere better.
    </p>
    <p style="margin:0;font-size:13px;color:#666;">
      ${escapeHtml(BUSINESS.tradingName)} · ${escapeHtml(BUSINESS_ADDRESS_ONE_LINE)}
    </p>
    <p style="margin:16px 0 0;font-size:12px;color:#888;">
      You're receiving this because you sent us an enquiry.
      <a href="${escapeHtml(BUSINESS.siteUrl)}/privacy" style="color:#5b52d6;">Privacy policy</a>
    </p>
  </div>
</body></html>`,
    text: [
      `Got it, ${input.name}.`,
      ``,
      `Your enquiry landed. We read every one and reply within 48 hours with a`,
      `one-pager: what we'd do, roughly how long, and what it would cost.`,
      ``,
      `No deck, no follow-up sequence. If it turns out we're not the right fit,`,
      `we'll say so and point you somewhere better.`,
      ``,
      `${BUSINESS.tradingName} · ${BUSINESS_ADDRESS_ONE_LINE}`,
      ``,
      `Privacy policy: ${BUSINESS.siteUrl}/privacy`,
    ].join("\n"),
    replyTo: BUSINESS.email,
  });
}
