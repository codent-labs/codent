import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { BlocksIcon } from "@/components/ui/blocks";
import { GitBranchIcon } from "@/components/ui/git-branch";
import { MagicCard } from "@/components/ui/magic-card";
import { PaletteIcon } from "@/components/ui/palette";
import { RocketIcon } from "@/components/ui/rocket";
import { social } from "@/lib/seo";
import { SITE } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four practices, one lab: brand & identity, product design, engineering, and growth & launch — with fixed timelines and fixed-price engagements.",
  alternates: { canonical: "/services" },
  ...social({
    title: "Services — Codent Labs",
    description:
      "Four practices, one lab: brand & identity, product design, engineering, and growth & launch — with fixed timelines and fixed-price engagements.",
    path: "/services",
  }),
};

const practices = [
  {
    icon: PaletteIcon,
    title: "Brand & Identity",
    body: "Logo systems, type, voice and the visual instincts that travel across every surface your product lives on.",
    meta: "6 weeks · 2 sprints",
    accent: "codent-tile-accent-pink",
    glowFrom: "#f7b2fb",
    glowTo: "#c084fc",
    includes: [
      "Voice & positioning territory",
      "Logo system + mark variations",
      "Type, color and motion system",
      "Application on your real surfaces",
      "A brand kit your team can run with",
    ],
  },
  {
    icon: BlocksIcon,
    title: "Product Design",
    body: "From a fuzzy idea to a working interface — research, wireframes and hi-fi prototypes you can actually ship.",
    meta: "8–12 weeks",
    accent: "codent-tile-accent-purple",
    glowFrom: "#786ef1",
    glowTo: "#a78bfa",
    includes: [
      "User interviews and audit week",
      "Flows and wireframes",
      "Clickable prototype in ~23 days (median)",
      "Hi-fi UI ready for engineering",
      "Hand-off doc with decision log",
    ],
  },
  {
    icon: GitBranchIcon,
    title: "Engineering",
    body: "Fast, friendly front-ends and back-ends. We hand off code your team will be glad to inherit on Monday.",
    meta: "Continuous",
    accent: "codent-tile-accent-blue",
    glowFrom: "#5588fb",
    glowTo: "#60a5fa",
    includes: [
      "React, Next.js and TypeScript",
      "Node + Postgres services",
      "Deployment and runbook",
      "Test coverage that means it",
      "Refactorable, boring, documented code",
    ],
  },
  {
    icon: RocketIcon,
    title: "Growth & Launch",
    body: "Strategy, positioning and the first 90 days — we help you find the audience that needs what you built.",
    meta: "4–6 weeks",
    accent: "codent-tile-accent-green",
    // glowFrom: "#34d399",
    // glowTo: "#6ee7b7",
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "Codent Labs services",
          url: `${SITE.url}/services`,
          itemListElement: practices.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: p.title,
              description: p.body,
            },
          })),
        }}
      />
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">services</span>
            <h1 className="mt-[18px]">
              Four practices,{" "}
              <em className="italic font-light">one lab.</em>
            </h1>
          </div>
          <p className="codent-section-lede">
            Fixed scope, fixed price, fixed timelines. Pick the practices that
            fit — or take a couple bundled.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {practices.map((p) => (
            <MagicCard
              key={p.title}
              mode="gradient"
              className={`rounded-[22px] p-[26px]`}
              gradientFrom={p.glowFrom}
              gradientTo={p.glowTo}
              gradientSize={300}
            >
              <div className="flex items-start justify-between">
                <p.icon size={34} className="text-main" />
                <span className="text-[12px] font-semibold text-[var(--text-secondary)] tabular-nums uppercase tracking-[0.05em]">
                  {p.meta}
                </span>
              </div>

              <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-main mt-5">
                {p.title}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6] mt-2">
                {p.body}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13.5px] text-main leading-[1.5]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#786ef1] inline-block mt-[6px] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </MagicCard>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/contact" className="codent-pill-dark lg">
            <span className="codent-arrow-circ lg">
              <ArrowUpRight className="size-[13px]" />
            </span>
            Which one fits?
          </Link>
          <span className="text-[13px] text-[var(--text-secondary)]">
            The 48-hour one-pager will tell you — no commitment.
          </span>
        </div>
      </div>
    </section>
  );
}