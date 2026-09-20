import type { Metadata } from "next";
import Link from "next/link";
import { social } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "A deliberately small studio for curious teams. Brand, product and engineering under one roof since 2019 — 86+ projects, 100% of clients return.",
  alternates: { canonical: "/about" },
  ...social({
    title: "About — Codent Labs",
    description:
      "A deliberately small studio for curious teams. Brand, product and engineering under one roof since 2019 — 86+ projects, 100% of clients return.",
    path: "/about",
  }),
};

const beliefs = [
  {
    title: "Small is the point",
    body: "The two people who design and build your project are the two people on your account. No account managers, no juniors, no phone-tree. It's why clients call us the two smartest people on their team.",
  },
  {
    title: "Fixed scope, fixed price",
    body: "We quote fixed engagements, not hourly meters. The estimate is the estimate — the 48-hour one-pager sets expectations before a rupee moves.",
  },
  {
    title: "Stats need denominators",
    body: "86 projects since 2019, 4.9/5 across those projects, 100% return within a year. Small numbers, verified by the clients whose logos you'll see on the homepage.",
  },
  {
    title: "Hand-offs are trust",
    body: "We ship code your team can inherit, docs your devs won't cry over, and brand systems you can run after we leave. If a second project starts from trust, we did our job.",
  },
];

export default function AboutPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">about</span>
            <h1 className="mt-[18px]">
              A lab, not{" "}
              <em className="italic font-light">a factory.</em>
            </h1>
          </div>
          <p className="codent-section-lede">
            Two people who&apos;ve shipped 86+ projects since 2019 — brand, product
            and engineering under one roof.
          </p>
        </div>

        <div className="bg-card rounded-[24px] border border-border shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-[30px]">
          <p className="text-[clamp(17px,1.8vw,22px)] text-main leading-[1.6] font-medium tracking-[-0.4px] max-w-[760px]">
            Codent Labs started in 2019 as a bet that a two-person studio could
            out-ship agencies ten times its size — by staying small, quoting
            fixed scope, and shipping work that earns a second project instead
            of a contract renewal.
          </p>
          <p className="text-[15px] text-[var(--text-secondary)] leading-[1.75] mt-[18px] max-w-[760px]">
            We&apos;ve since shipped 86+ projects across 14 industries — fintech,
            DTC, SaaS, healthcare and more — for teams like Halcyon, Sundae
            and Folio. 100% of our clients return within a year, and we&apos;d
            rather quote for the next project than upsell the current one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mt-[14px]">
          {beliefs.map((b) => (
            <div key={b.title} className="codent-card p-[26px]">
              <h3 className="text-[18px] font-semibold tracking-[-0.3px] text-main">
                {b.title}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.65] mt-2">
                {b.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[14px] bg-card rounded-[24px] border border-border shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-[30px] grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-main">
              What clients say
            </h3>
            <blockquote className="mt-[14px] text-[clamp(16px,1.7vw,21px)] text-main leading-[1.45] font-medium tracking-[-0.3px]">
              They&apos;re less an agency and more the two smartest people on
              the team — who happen to also design the whole thing.
            </blockquote>
            <div className="mt-4 text-[13px] text-[var(--text-secondary)]">
              Rosa Madrigal · Head of Product, Halcyon
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            {[
              { v: "86+", l: "projects shipped" },
              { v: "14", l: "industries served" },
              { v: "4.9/5", l: "avg across 86 projects" },
              { v: "100%", l: "return within a year" },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-page rounded-[16px] p-[18px] text-center"
              >
                <div className="text-[24px] font-semibold tracking-[-1px] text-main">
                  {s.v}
                </div>
                <div className="text-[11.5px] text-[var(--text-secondary)] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[54px] bg-[#0f0f0f] dark:bg-card text-white rounded-[24px] p-[30px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-[18px] font-semibold tracking-[-0.3px]">
              Careers? We&apos;re always half-light on senior people.
            </h3>
            <p className="text-[13.5px] text-white/70 mt-1 leading-[1.6] max-w-[480px]">
              We don&apos;t run a careers page, but we do occasionally add a
              third smart person. Tell us you exist.
            </p>
          </div>
          <a
            href="mailto:hello@codentlabs.com?subject=Joining%20the%20lab"
            className="codent-pill-dark lg !bg-card !text-main dark:!bg-white dark:!text-[#111] shrink-0"
          >
            hello@codentlabs.com
          </a>
        </div>

        <div className="mt-10">
          <Link href="/work" className="codent-pill-light">
            See the work → 
          </Link>
        </div>
      </div>
    </section>
  );
}