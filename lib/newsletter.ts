/**
 * Newsletter subscriptions backed by a Resend Audience.
 *
 * Resend stores the list, handles unsubscribe, and enforces the consent record
 * we attach per contact. We keep no subscriber list of our own, which means the
 * privacy policy's claim that we store nothing locally stays true.
 *
 * Unsubscribe uses Resend's hosted one-click endpoint rather than a page we
 * would have to build and keep correct - it is already the compliant path, and
 * it works in clients that strip images.
 */

import { BUSINESS } from "@/lib/business";

/**
 * Base URL. Overridable so the subscribe path can be exercised against a local
 * stub without a real account; in normal use it is unset and this is Resend.
 */
const API = process.env.RESEND_API_BASE_URL ?? "https://api.resend.com";

export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; reason: string; alreadySubscribed?: boolean };

export function isNewsletterConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
}

function audienceId(): string | null {
  return process.env.RESEND_AUDIENCE_ID ?? null;
}

/** Hosted unsubscribe link for one contact, if a list is configured. */
export function unsubscribeUrl(email: string): string | null {
  const apiKey = process.env.RESEND_API_KEY;
  const id = audienceId();
  if (!apiKey || !id) return null;
  return `${API}/audiences/${id}/contacts/${encodeURIComponent(email)}/unsubscribe?api_key=${encodeURIComponent(apiKey)}`;
}

export async function subscribeToNewsletter(input: {
  email: string;
  consentCapturedAt: string;
}): Promise<SubscribeResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const id = audienceId();

  if (!apiKey || !id) {
    return {
      ok: false,
      reason: "Newsletter is not configured (RESEND_AUDIENCE_ID is not set).",
    };
  }

  try {
    const res = await fetch(`${API}/audiences/${id}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        unsubscribed: false,
        // Mirrors the fields in the privacy policy so the record is auditable.
        first_name: "",
        // Provenance, not decoration: proves which form and when.
        metadata: {
          source: "codentlabs.com footer",
          consent_captured_at: input.consentCapturedAt,
          privacy_notice: `${BUSINESS.siteUrl}/privacy`,
        },
      }),
    });

    if (res.ok) return { ok: true, alreadySubscribed: false };

    // 409/422 on create means the contact is already on the list. That is a
    // success from the visitor's point of view - treat it as one, and do not
    // tell them they made a mistake.
    if (res.status === 409 || res.status === 422) {
      const detail = await res.text().catch(() => "");
      if (/already|exists|duplicate/i.test(detail)) {
        return { ok: true, alreadySubscribed: true };
      }
      return {
        ok: false,
        reason: "The newsletter provider rejected that address.",
        alreadySubscribed: true,
      };
    }

    return {
      ok: false,
      reason: `Resend responded ${res.status}.`,
    };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "Could not reach the newsletter provider.",
    };
  }
}
