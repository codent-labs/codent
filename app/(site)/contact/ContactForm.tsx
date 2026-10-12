"use client";

import Link from "next/link";
import { useEffect, useActionState, useState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const inputClasses =
  "w-full rounded-[12px] bg-card border border-[var(--input-border)] px-4 py-3 text-[14px] text-main placeholder:text-[var(--text-secondary)] outline-none focus:border-[#786ef1] focus:ring-2 focus:ring-[#786ef1]/20 transition";
const labelClasses =
  "block text-[12.5px] font-semibold text-main mb-[7px]";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const [consentChecked, setConsentChecked] = useState(false);

  useEffect(() => {
    if (state.status === "fallback" && state.mailto) {
      window.location.href = state.mailto;
    }
  }, [state]);

  // Derived during render rather than copied into state from an effect. The
  // message disappears as soon as the box is ticked, with no extra render pass.
  const consentError =
    state.status === "error" &&
    state.field === "consent" &&
    !consentChecked &&
    state.message
      ? state.message
      : null;

  return (
    <form
      action={formAction}
      noValidate
      className="bg-card rounded-[16px] border border-border shadow-[0_2px_14px_rgba(0,0,0,0.05)] p-[30px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name
          </label>
          <input
            id={"name"}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Jane Founder"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Work email
          </label>
          <input
            id={"email"}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="jane@startup.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-[18px]">
        <label htmlFor="timeline" className={labelClasses}>
          When do you need it?
        </label>
        <select
          id={"timeline"}
          name="timeline"
          className={`${inputClasses} appearance-none`}
          defaultValue=""
        >
          <option value="" disabled>
            Pick a rough timeline
          </option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="This quarter">This quarter</option>
          <option value="Next 3-6 months">Next 3-6 months</option>
          <option value="Just exploring">Just exploring</option>
        </select>
      </div>

      <div className="mt-[18px]">
        <label htmlFor="problem" className={labelClasses}>
          Where are you stuck?
        </label>
        <textarea
          id={"problem"}
          name="problem"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="What are you building, what's not working, and what would 'done' look like?"
          className={`${inputClasses} resize-y`}
        />
      </div>

      {/*
        Honeypot. `sr-only` hides it from people while leaving it in the DOM,
        which is where bots look. `aria-hidden` keeps it out of the
        accessibility tree, `tabIndex={-1}` keeps it off the keyboard, and
        `autoComplete="off"` keeps password managers out of it.
      */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Consent is opt-in and unchecked by default: an unticked box is the
          only version of this that is genuinely consent. The server re-checks
          it, so a crafted POST cannot skip it. */}
      <div className="mt-[20px] flex gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          checked={consentChecked}
          onChange={(event) => setConsentChecked(event.target.checked)}
          aria-invalid={consentError ? true : undefined}
          aria-describedby={
            consentError
              ? "contact-consent-error"
              : "contact-consent-help"
          }
          className="mt-[3px] size-4 flex-shrink-0 rounded-[4px] accent-[#786ef1] cursor-pointer"
        />
        <div className="min-w-0">
          <label
            htmlFor="consent"
            className="text-[13px] text-main leading-[1.6]"
          >
            I agree that Codent Labs may store and use what I type here to reply
            to this enquiry, as described in the{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy policy
            </Link>
            . No marketing, no spam, and we delete it if this does not become a
            project.
          </label>
          <p
            id={"contact-consent-help"}
            className="mt-1 text-[12px] text-[var(--text-secondary)] leading-[1.55]"
          >
            Required. This is the only permission we ask for on this form.
          </p>
        </div>
      </div>
      {consentError && (
        <p
          id={"contact-consent-error"}
          role="alert"
          className="mt-2 text-[13px] text-[#a11] bg-[#fdecec] rounded-[10px] px-4 py-3"
        >
          {consentError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="codent-pill-dark lg mt-[22px] w-full justify-center"
      >
        {pending ? "Sending…" : "Send the one-pager request"}
      </button>

      {state.status === "success" && (
        <p role="status" className="mt-[16px] text-[13.5px] text-[#0b7536] bg-[#dff5e6] rounded-[10px] px-4 py-3">
          {state.message}
        </p>
      )}
      {state.status === "fallback" && (
        <p role="status" className="mt-[16px] text-[13.5px] text-main bg-[#f0ebff] dark:bg-[#241e3d] rounded-[10px] px-4 py-3">
          {state.message}
        </p>
      )}
      {state.status === "ratelimited" && (
        <p role="alert" className="mt-[16px] text-[13.5px] text-main bg-[#fdf3d8] dark:bg-[#2e2410] rounded-[10px] px-4 py-3">
          {state.message}
        </p>
      )}
      {/*
        Consent failures render above, next to the box they refer to, so they
        are excluded here - otherwise the same sentence appears twice.
      */}
      {state.status === "error" && state.field !== "consent" && (
        <p role="alert" className="mt-[16px] text-[13.5px] text-[#a11] bg-[#fdecec] rounded-[10px] px-4 py-3">
          {state.message}
        </p>
      )}
    </form>
  );
}