"use server";

import { BUSINESS } from "@/lib/business";
import {
  isNewsletterConfigured,
  subscribeToNewsletter,
} from "@/lib/newsletter";

export type NewsletterState = {
  status:
    | "idle"
    | "success"
    | "error"
    | "unconfigured"
    | "no-consent"
    | "already";
  message?: string;
};

const EMAIL = BUSINESS.email;

/** Same honest window as the contact form: casual abuse, not a security wall. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

export async function subscribeNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const honeypot = String(formData.get("company_website") ?? "").trim();

  if (honeypot) {
    return { status: "success", message: "You're on the list - roughly once a month." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please add a valid email address." };
  }

  // Marketing email needs its own opt-in. Enforced server-side; the checkbox
  // is only the visible half of the control.
  const consent =
    formData.get("consent") === "on" ||
    formData.get("consent") === "true" ||
    formData.get("consent") === "1";
  if (!consent) {
    return {
      status: "no-consent",
      message: "Please confirm you'd like the newsletter before subscribing.",
    };
  }

  if (rateLimited(email)) {
    return {
      status: "error",
      message: "You've tried this a few times in the last minute. Try again shortly.",
    };
  }

  if (!isNewsletterConfigured()) {
    return {
      status: "unconfigured",
      message: `The newsletter isn't connected to a provider yet - email ${EMAIL} and we'll add you.`,
    };
  }

  const result = await subscribeToNewsletter({
    email,
    consentCapturedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    // Never leak a provider status code or message to the visitor.
    console.error(`[newsletter] subscribe failed for ${email}: ${result.reason}`);
    return {
      status: "error",
      message: `Couldn't subscribe right now - try ${EMAIL} instead.`,
    };
  }

  if (result.alreadySubscribed) {
    return {
      status: "already",
      message: "You're already on the list - nothing more to do.",
    };
  }

  // Deliberately no unsubscribe URL here: that endpoint carries the Resend API
  // key as a query parameter, so rendering it in the UI would leak the key to
  // anyone who subscribes. Resend appends the hosted unsubscribe link to every
  // campaign automatically, which is where the visitor meets it.
  return {
    status: "success",
    message: "You're on the list - roughly once a month, no spam.",
  };
}
