"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/app/(site)/newsletter/actions";

const initialState: NewsletterState = { status: "idle" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialState,
  );

  const failed =
    state.status === "error" || state.status === "no-consent";
  // A subscription that is already in place is a fine outcome, not a problem,
  // so it gets the positive styling rather than looking like an error.
  const done =
    state.status === "success" ||
    state.status === "already" ||
    state.status === "unconfigured";

  return (
    // noValidate: the browser's native bubbles are unstyled, not announced
    // reliably, and would stop the server action from running - which is where
    // consent is actually enforced.
    <form action={formAction} noValidate className="w-full">
      <div className="flex gap-2 flex-wrap">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@company.com"
          className="flex-1 min-w-[180px] rounded-[40px] border border-[var(--input-border)] bg-card px-4 py-2.5 text-[13.5px] text-main placeholder:text-[var(--text-secondary)] outline-none focus:border-[#786ef1] focus:ring-2 focus:ring-[#786ef1]/20"
        />
        <button type="submit" disabled={pending} className="codent-pill-dark">
          {pending ? "Adding…" : "Subscribe"}
        </button>
      </div>

      {/* Honeypot, matching the contact form. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-company-website">Company website</label>
        <input
          id="newsletter-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="mt-3 flex gap-2.5">
        <input
          id="newsletter-consent"
          name="consent"
          type="checkbox"
          required
          aria-describedby="newsletter-consent-text"
          className="mt-[2px] size-3.5 flex-shrink-0 rounded-[3px] accent-[#786ef1] cursor-pointer"
        />
        <label
          id="newsletter-consent-text"
          htmlFor="newsletter-consent"
          className="text-[12px] text-[var(--text-secondary)] leading-[1.55]"
        >
          Email me the newsletter, roughly monthly. Unsubscribe any time - see
          the <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
        </label>
      </div>

      {done && (
        <p
          role="status"
          className="mt-2 text-[12.5px] text-[#0b7536] bg-[#dff5e6] px-3 py-2 rounded-[8px]"
        >
          {state.message}
        </p>
      )}
      {failed && (
        <p
          role="alert"
          className="mt-2 text-[12.5px] text-[#a11] bg-[#fdecec] px-3 py-2 rounded-[8px]"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
