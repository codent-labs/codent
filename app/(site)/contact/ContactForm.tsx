"use client";

import { useEffect, useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const inputClasses =
  "w-full rounded-[12px] bg-card border border-border px-4 py-3 text-[14px] text-main placeholder:text-[var(--text-secondary)] outline-none focus:border-[#786ef1] focus:ring-2 focus:ring-[#786ef1]/20 transition";
const labelClasses =
  "block text-[12.5px] font-semibold text-main mb-[7px]";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  useEffect(() => {
    if (state.status === "fallback" && state.mailto) {
      window.location.href = state.mailto;
    }
  }, [state]);

  return (
    <form
      action={formAction}
      noValidate
      className="bg-card rounded-[22px] border border-border shadow-[0_2px_14px_rgba(0,0,0,0.05)] p-[30px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            placeholder="Jane Founder"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
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
          id="timeline"
          name="timeline"
          className={`${inputClasses} appearance-none`}
          defaultValue=""
        >
          <option value="" disabled>
            Pick a rough timeline
          </option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="This quarter">This quarter</option>
          <option value="Next 3–6 months">Next 3–6 months</option>
          <option value="Just exploring">Just exploring</option>
        </select>
      </div>

      <div className="mt-[18px]">
        <label htmlFor="problem" className={labelClasses}>
          Where are you stuck?
        </label>
        <textarea
          id="problem"
          name="problem"
          rows={5}
          required
          minLength={10}
          placeholder="What are you building, what's not working, and what would 'done' look like?"
          className={`${inputClasses} resize-y`}
        />
      </div>

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
      {state.status === "error" && (
        <p role="alert" className="mt-[16px] text-[13.5px] text-[#a11] bg-[#fdecec] rounded-[10px] px-4 py-3">
          {state.message}
        </p>
      )}
    </form>
  );
}