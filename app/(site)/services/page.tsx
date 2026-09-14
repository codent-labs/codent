import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Blocks, Code2, Palette, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four practices, one lab: brand & identity, product design, engineering, and growth & launch — with fixed timelines and fixed-price engagements.",
  alternates: { canonical: "/services" },
};

const practices = [
  {
    icon: Palette,
    title: "Brand & Identity",
    body: "Logo systems, type, voice and the visual instincts that travel across every surface your product lives on.",
    meta: "6 weeks · 2 sprints",
    accent: "codent-tile-accent-pink",
    includes: [
      "Voice & positioning territory",
      "Logo system + mark variations",
      "Type, color and motion system",
      "Application on your real surfaces",
      "A brand kit your team can run with",
    ],
  },
  {
    icon: Blocks,
    title: "Product Design",
    body: "From a fuzzy idea to a working interface — research, wireframes and hi-fi prototypes you can actually ship.",
    meta: "8–12 weeks",
    accent: "codent-tile-accent-purple",
    includes: [
      "User interviews and audit week",
      "Flows and wireframes",
      "Clickable prototype in ~23 days (median)",
      "Hi-fi UI ready for engineering",
      "Hand-off doc with decision log",
    ],
  },
  {
    icon: Code2,
    title: "Engineering",
    body: "Fast, friendly front-ends and back-ends. We hand off code your team will be glad to inherit on Monday.",
    meta: "Continuous",
    accent: "codent-tile-accent-blue",
    includes: [
      "React, Next.js and TypeScript",
      "Node + Postgres services",
      "Deployment and runbook",
      "Test coverage that means it",
      "Refactorable, boring, documented code",
    ],
  },
  {
    icon: Rocket,
    title: "Growth & Launch",
    body: "Strategy, positioning and the first 90 days — we help you find the audience that needs what you built.",
    meta: "4–6 weeks",
    accent: "codent-tile-accent-green",
    includes: [
      "Positioning and messaging",
      "Launch plan for the first 90 days",
      "Landing page that converts",
      "Funnel review with fixes",
      "Retention loop design",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">services</span>
            <h2 className="mt-[18px]">
              Four practices,{" "}
              <em className="italic font-light">one lab.</em>
            </h2>
          </div>
          <p className="codent-section-lede">
            Fixed scope, fixed price, fixed timelines. Pick the practices that
            fit — or take a couple bundled.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {practices.map((p) => (
            <div key={p.title} className={`codent-card p-[26px] relative overflow-hidden`}>
              <div className="flex items-start justify-between">
                <p.icon className={`size-[34px]`} strokeWidth={1.75} />
                <span className="text-[12px] font-semibold text-[#aaa] tabular-nums uppercase tracking-[0.05em]">
                  {p.meta}
                </span>
              </div>

              <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-[#0f0f0f] mt-5">
                {p.title}
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.6] mt-2">
                {p.body}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px] text-[#333] leading-[1.5]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#786ef1] inline-block mt-[6px] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="codent-pill-dark lg">
            <span className="codent-arrow-circ lg">
              <ArrowUpRight className="size-[13px]" />
            </span>
            Which one fits?
          </Link>
          <span className="text-[13px] text-[#757575]">
            The 48-hour one-pager will tell you — no commitment.
          </span>
        </div>
      </div>
    </section>
  );
}