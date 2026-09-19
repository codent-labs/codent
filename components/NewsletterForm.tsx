"use client";

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

  return (
    <form action={formAction} className="w-full">
      <div className="flex gap-2 flex-wrap">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className="flex-1 min-w-[180px] rounded-[40px] border border-border bg-card px-4 py-2.5 text-[13.5px] text-main placeholder:text-[var(--text-secondary)] outline-none focus:border-[#786ef1] focus:ring-2 focus:ring-[#786ef1]/20"
        />
        <button
          type="submit"
          disabled={pending}
          className="codent-pill-dark"
        >
          {pending ? "Adding…" : "Subscribe"}
        </button>
      </div>

      {state.status === "success" && (
        <p
          role="status"
          className="mt-2 text-[12.5px] text-[#0b7536] bg-[#dff5e6] px-3 py-2 rounded-[8px]"
        >
          {state.message}
        </p>
      )}
      {state.status === "unconfigured" && (
        <p
          role="status"
          className="mt-2 text-[12.5px] text-main bg-[#f0ebff] dark:bg-[#241e3d] px-3 py-2 rounded-[8px]"
        >
          {state.message}
        </p>
      )}
      {state.status === "error" && (
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