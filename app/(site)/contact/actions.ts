"use server";

import { BUSINESS } from "@/lib/business";
import {
  sendContactConfirmation,
  sendContactEnquiry,
  isEmailConfigured,
} from "@/lib/email";

export type ContactState = {
  status:
    | "idle"
    | "success"
    | "error"
    | "fallback"
    | "ratelimited";
  /** Which input a rejection belongs to, so the client can focus it. */
  field?: "name" | "email" | "problem" | "consent" | "form";
  message?: string;
  mailto?: string;
};

const EMAIL = BUSINESS.email;

/**
 * Length caps. The form's `maxLength` gives instant feedback in the browser;
 * these repeat the limits server-side, because client validation is a
 * convenience rather than a control.
 */
const LIMITS = { name: 120, email: 254, problem: 5000 } as const;

const TIMELINE_VALUES = new Set([
  "",
  "As soon as possible",
  "This quarter",
  "Next 3-6 months",
  "Just exploring",
]);

/**
 * Fixed-window rate limit, in memory.
 *
 * Honest about its limits: this resets on deploy and is per-instance, so it
 * stops casual form spam and nothing more. Real enforcement needs the platform
 * or the provider's own rate limits - do not treat this as a security control.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

/**
 * Honeypot. A real person never fills a field they cannot see, so anything in
 * it is a bot. Named plausibly and hidden from everyone else - bots parse the
 * DOM, not the CSS.
 */
const HONEYPOT_FIELD = "company_website";

function buildMailto(input: {
  name: string;
  email: string;
  problem: string;
  timeline: string;
}) {
  const subject = `Project enquiry from ${input.name}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Timeline: ${input.timeline || "Flexible"}`,
    "",
    input.problem,
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const honeypot = String(formData.get(HONEYPOT_FIELD) ?? "").trim();

  // Bot submission: pretend it worked rather than telling the bot it was caught.
  if (honeypot) {
    return {
      status: "success",
      message:
        "Got it - we reply with a one-pager within 48 hours. No deck, no follow-ups.",
    };
  }

  if (name.length < 2) {
    return { status: "error", field: "name", message: "Please add your name." };
  }
  if (name.length > LIMITS.name) {
    return {
      status: "error",
      field: "name",
      message: `Please keep your name under ${LIMITS.name} characters.`,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: "error",
      field: "email",
      message: "Please add a valid email address.",
    };
  }
  if (email.length > LIMITS.email) {
    return {
      status: "error",
      field: "email",
      message: `Please keep your email under ${LIMITS.email} characters.`,
    };
  }
  if (problem.length < 10) {
    return {
      status: "error",
      field: "problem",
      message:
        "Tell us a little more about where you're stuck - at least 10 characters.",
    };
  }
  if (problem.length > LIMITS.problem) {
    return {
      status: "error",
      field: "problem",
      message: `That description is over ${LIMITS.problem} characters. Shorten it, or email us the detail directly.`,
    };
  }
  if (!TIMELINE_VALUES.has(timeline)) {
    return {
      status: "error",
      field: "form",
      message: "Please pick a timeline from the list.",
    };
  }

  // Consent is checked here, not only in the form. `required` on a checkbox is
  // a browser hint; the only enforcement that counts is on the server, because
  // a POST can be crafted with the field omitted entirely. This is the lawful
  // basis recorded in the privacy policy.
  const consent =
    formData.get("consent") === "on" ||
    formData.get("consent") === "true" ||
    formData.get("consent") === "1";
  if (!consent) {
    return {
      status: "error",
      field: "consent",
      message: "Please tick the box so we can store your enquiry and reply.",
    };
  }

  const consentCapturedAt = new Date().toISOString();

  // Not delivery-bound by IP: shared office NATs and carrier CGNAT would lock
  // out legitimate enquiries. The honeypot plus provider limits do the work.
  if (rateLimited(email)) {
    return {
      status: "ratelimited",
      field: "form",
      message: `You've sent a few of these in the last minute. If it didn't arrive, email ${EMAIL} directly.`,
    };
  }

  if (!isEmailConfigured()) {
    // No provider configured: degrade to a prefilled draft so the enquiry still
    // reaches the inbox instead of vanishing. Says so plainly rather than
    // claiming a send that did not happen.
    return {
      status: "fallback",
      message:
        "Your email draft is open - hit send and it lands at the lab.",
      mailto: buildMailto({ name, email, timeline, problem }),
    };
  }

  const enquiry = { name, email, timeline, problem, consentCapturedAt };
  const delivered = await sendContactEnquiry(enquiry);

  if (!delivered.ok) {
    // The enquiry was NOT delivered. Offer the draft as a guaranteed path
    // rather than reporting a success that did not happen.
    return {
      status: "fallback",
      message: `We couldn't send that automatically. Your email draft is open instead - hit send and it lands at the lab.`,
      mailto: buildMailto({ name, email, timeline, problem }),
    };
  }

  // Confirmation is best-effort. A failure here must not turn a delivered
  // enquiry into an error the visitor thinks lost.
  const confirmation = await sendContactConfirmation({ to: email, name });
  if (!confirmation.ok) {
    console.error(
      `[contact] enquiry delivered (${delivered.id}) but confirmation failed: ${confirmation.reason}`,
    );
  }

  return {
    status: "success",
    message:
      "Got it - we reply with a one-pager within 48 hours. No deck, no follow-ups.",
  };
}
