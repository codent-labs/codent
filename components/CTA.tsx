import Link from "next/link";

import { Meteors } from "@/components/ui/meteors";
import { SparklesText } from "@/components/ui/sparkles-text";

function ChevronArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CTA() {
  return (
    <section className="codent-section" id="contact">
      <div className="codent-wrap">
        <div
          className="relative bg-[#0f0f0f] dark:bg-card text-white rounded-[28px] p-[64px_56px] overflow-hidden isolate"
        >
          <div className="codent-glow-purple absolute rounded-full -z-10" />
          <div className="codent-glow-pink absolute rounded-full -z-10" />
          <Meteors number={14} className="[--angle:200deg]" />

          <div
            className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-end"
          >
            <div>
              <SparklesText
                as="span"
                className="codent-eyebrow bg-white/[0.12] text-white"
                sparklesCount={6}
              >
                let&apos;s build
              </SparklesText>
              <h2 className="mt-[18px] text-[clamp(34px,4vw,54px)] font-medium tracking-[-1.6px] leading-[1.05]">
                Got an idea
                <br />
                that won&apos;t{" "}
                <em className="italic font-light codent-gradient-text">
                  sit still?
                </em>
              </h2>
              <p className="text-[15px] leading-[1.6] mt-[18px] max-w-[380px] text-white/70">
                Tell us where you&apos;re stuck. We&apos;ll send back a
                one-pager within 48 hours — what we&apos;d do, how long, and
                what it&apos;d cost. No deck, no follow-ups.
              </p>
            </div>

            <div className="flex flex-col gap-[14px] items-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-[12px] bg-white text-main dark:bg-white dark:text-[#111] text-[15px] font-medium rounded-[40px] py-[7px] pe-[22px] ps-[7px] transition-all hover:bg-accent"
              >
                <span
                  className="w-8 h-8 rounded-full bg-[#111] text-white inline-flex items-center justify-center"
                >
                  <ChevronArrow />
                </span>
                Tell us where you&apos;re stuck
              </Link>
              <a
                href="mailto:hello@codentlabs.com"
                className="inline-flex items-center gap-2 text-[13.5px] opacity-70 hover:opacity-100 transition-opacity text-white py-[3px]"
              >
                or write to hello@codentlabs.com
                <ChevronArrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
