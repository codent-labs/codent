"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useConsent } from "@/hooks/use-consent";

/**
 * Cookie consent banner.
 *
 * Visibility is *derived* from the stored consent record rather than mirrored
 * into component state, so there is no render-then-update flicker and no setState
 * inside an effect. Until a choice is stored the panel shows; recording a choice
 * makes it disappear as a consequence, not as a side effect.
 *
 * The re-open control lives outside the conditional so the choice stays
 * reversible, which most consent regimes require and all of them expect to be
 * available from every page.
 *
 * `aria-modal` is deliberately not set: the page behind stays reachable, which
 * is how consent managers behave and avoids trapping a screen-reader user on a
 * notice that is not blocking anything.
 *
 * It does not take focus on first paint. A non-blocking notice that appears on
 * load should not pull a keyboard user out of whatever they had reached; the
 * panel is last in the DOM, so Tab reaches it naturally. Focus moves into the
 * panel only when the visitor reopens it from the "Cookie choices" control,
 * which is a deliberate act.
 */
export function CookieConsent() {
  const { decided, grant, denyAll } = useConsent();
  // Set by the re-open control's click handler, never by an effect: once a
  // choice is stored the panel is hidden, and this is what lets a visitor
  // reopen it to change their answer.
  const [reopened, setReopened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const visible = !decided || reopened;

  const dismiss = (withAnalytics: boolean) => {
    if (withAnalytics) grant(["analytics"]);
    else denyAll();
    setReopened(false);
    // Send focus to the re-open control instead of dropping it on <body>.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    // Only take focus when the visitor asked for this panel. Auto-focusing on
    // first paint would yank a keyboard user away from whatever they had
    // reached - the banner is non-blocking, so it should wait its turn.
    if (reopened) panelRef.current?.focus();
  }, [reopened]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      // Escape must mean "no optional cookies", never "close and assume yes".
      if (event.key === "Escape") dismiss(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      {visible && (
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          tabIndex={-1}
          className="fixed z-[90] inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-6 focus:outline-none"
        >
          <div className="codent-wrap">
            <div className="mx-auto max-w-[720px] rounded-[16px] border border-border bg-card p-[22px] shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h2
                    id="cookie-consent-title"
                    className="text-[15px] font-semibold text-main tracking-[-0.3px]"
                  >
                    Cookies, briefly
                  </h2>
                  <p
                    id="cookie-consent-desc"
                    className="mt-2 text-[13px] leading-[1.6] text-[var(--text-secondary)]"
                  >
                    We use strictly necessary cookies to run this site - that
                    includes remembering your theme and this choice. Analytics
                    cookies are off until you say yes.{" "}
                    <Link
                      href="/cookies"
                      className="underline underline-offset-2 hover:text-main transition-colors"
                    >
                      Read the cookie policy
                    </Link>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(false)}
                  aria-label="Close cookie notice and decline optional cookies"
                  className="flex size-7 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-main hover:bg-accent transition-colors"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-[10px]">
                <button
                  type="button"
                  onClick={() => dismiss(true)}
                  className="codent-pill-dark lg"
                >
                  <span className="codent-arrow-circ lg" aria-hidden>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  Accept analytics
                </button>
                <button
                  type="button"
                  onClick={() => dismiss(false)}
                  className="codent-pill-light"
                >
                  Necessary only
                </button>
                <Link
                  href="/cookies"
                  className="text-[13px] text-[var(--text-secondary)] underline underline-offset-2 hover:text-main transition-colors py-[4px]"
                >
                  Manage preferences
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setReopened(true)}
        hidden={visible}
        className="fixed bottom-4 left-4 z-[80] rounded-full border border-border bg-card px-4 py-2 text-[12.5px] font-medium text-main shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-px"
      >
        Cookie choices
      </button>
    </>
  );
}

export default CookieConsent;
