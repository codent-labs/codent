import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { CompassIcon } from "@/components/ui/compass";
import { MagicCard } from "@/components/ui/magic-card";
import { MessageCircleIcon } from "@/components/ui/message-circle";
import { PenToolIcon } from "@/components/ui/pen-tool";
import { RocketIcon } from "@/components/ui/rocket";
import { social } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Four steps, no mystery: say hi, discover, design, ship. The same playbook every engagement, refined over six years and roughly two hundred coffees.",
  alternates: { canonical: "/process" },
  ...social({
    title: "Process — Codent Labs",
    description:
      "Four steps, no mystery: say hi, discover, design, ship. The same playbook every engagement, refined over six years and roughly two hundred coffees.",
    path: "/process",
  }),
};

const steps = [
  {
    icon: MessageCircleIcon,
    number: "01",
    title: "Say hi",
    meta: "30 min",
    body: "A 30-minute chat. No deck, no jargon — just figuring out if we're a fit.",
    detail:
      "You get the 48-hour one-pager before this call. By the time we talk we already know the shape of what you need — the call is for the things a form can't capture: who's accountable, why now, and what 'done' actually means to the person paying for it.",
  },
  {
    icon: CompassIcon,
    number: "02",
    title: "Discover",
    meta: "1 week",
    body: "We pair with your team for a week of interviews, audits and rough sketches.",
    detail:
      "The most important week of the engagement. We interview the people your product already talks to, audit what exists, and kill ideas on paper so they never ride along into build. The output is a short scope you can actually argue with.",
  },
  {
    icon: PenToolIcon,
    number: "03",
    title: "Design",
    meta: "2–3 weeks",
    body: "Two cycles of design, each ending in a working prototype you can click through.",
    detail:
      "Two cycles, two clickable prototypes — the median is 23 days brief to first click. Each cycle ends with a real decision: ship this, kill that, or change the plan. Prototypes exist to force decisions, not to be beautiful PDFs.",
  },
  {
    icon: RocketIcon,
    number: "04",
    title: "Ship",
    meta: "Ongoing",
    body: "Engineering, QA, and a hand-off doc that won't make your devs cry.",
    detail:
      "Engineering and QA under supervision all the way, then the hand-off: intent map, decision log, known-shortcuts list, and a runbook. Your team inherits tools and reasons — not mysteries.",
  },
];

export default function ProcessPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">process</span>
            <h1 className="mt-[18px]">
              Four steps.{" "}
              <em className="italic font-light">No mystery.</em>
            </h1>
          </div>
          <p className="codent-section-lede">
            Same playbook, every engagement — refined over six years and
            roughly two hundred coffees.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          {steps.map((s) => (
            <MagicCard
              key={s.title}
              mode="gradient"
              className="rounded-[22px] p-[26px]"
              gradientFrom="#737373"
              gradientTo="#d4d4d4"
              gradientSize={280}
            >
              <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                  <span className="text-[13px] font-semibold text-[var(--text-secondary)] tabular-nums order-1 md:order-none">
                    {s.number}
                  </span>
                  <s.icon size={30} className="text-main" />
                  <span className="codent-process-meta !pt-0 order-2 md:order-none">
                    {s.meta}
                  </span>
                </div>

                <div>
                  <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-main">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6] mt-1">
                    {s.body}
                  </p>
                  <p className="text-[14.5px] text-main leading-[1.75] mt-3">
                    {s.detail}
                  </p>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/contact" className="codent-pill-dark lg">
            <span className="codent-arrow-circ lg">
              <Icon name="north_east" className="text-[13px]" />
            </span>
            Step one: say hi
          </Link>
        </div>
      </div>
    </section>
  );
}