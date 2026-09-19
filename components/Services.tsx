import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { BlocksIcon } from "@/components/ui/blocks";
import { GitBranchIcon } from "@/components/ui/git-branch";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { PaletteIcon } from "@/components/ui/palette";
import { RocketIcon } from "@/components/ui/rocket";

const services = [
  {
    icon: PaletteIcon,
    title: "Brand & Identity",
    body: "Logo systems, type, voice and the visual instincts that travel across every surface your product lives on.",
    meta: "6 weeks · 2 sprints",
    accent: "codent-tile-accent-pink",
    glowFrom: "#f7b2fb",
    glowTo: "#c084fc",
  },
  {
    icon: BlocksIcon,
    title: "Product Design",
    body: "From a fuzzy idea to a working interface — research, wireframes and hi-fi prototypes you can actually ship.",
    meta: "8–12 weeks",
    accent: "codent-tile-accent-purple",
    glowFrom: "#786ef1",
    glowTo: "#a78bfa",
  },
  {
    icon: GitBranchIcon,
    title: "Engineering",
    body: "Fast, friendly front-ends and back-ends. We hand off code your team will be glad to inherit on Monday.",
    meta: "Continuous",
    accent: "codent-tile-accent-blue",
    glowFrom: "#5588fb",
    glowTo: "#60a5fa",
  },
  {
    icon: RocketIcon,
    title: "Growth & Launch",
    body: "Strategy, positioning and the first 90 days — we help you find the audience that needs what you built.",
    meta: "4–6 weeks",
    accent: "codent-tile-accent-green",
    glowFrom: "#34d399",
    glowTo: "#6ee7b7",
  },
];

export default function Services() {
  return (
    <section className="codent-section overflow-hidden" id="solutions">
      {/* Header */}
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">solutions</span>
            <h2 className="mt-[18px]">
              The bits we{" "}
              <em className="italic font-light">obsess</em>{" "}
              over,
              <br />
              so you don&apos;t have to.
            </h2>
          </div>
          <p className="codent-section-lede">
            Four practices, one lab — pick the ones that fit.
          </p>
        </div>
      </div>

      {/* Marquee of practice cards */}
      <div className="codent-wrap">
        <Marquee
          pauseOnHover
          repeat={2}
          className="[--gap:16px] [--duration:45s] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-label="Services"
        >
          {services.map((s, i) => (
            <MagicCard
              key={s.title}
              mode="gradient"
              className={`w-[320px] min-h-[380px] flex flex-col rounded-[22px] p-7`}
              gradientFrom={s.glowFrom}
              gradientTo={s.glowTo}
              gradientSize={260}
            >
              <div className="flex flex-1 flex-col">
                {/* Top accent area */}
                <div className="codent-tile-top">
                  <s.icon size={38} className="text-main" />
                  <span className="text-[12px] font-semibold text-[var(--text-secondary)] tabular-nums">
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="codent-tile-body">
                  <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-main">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6] mt-2">
                    {s.body}
                  </p>
                </div>

                {/* Footer */}
                <div className="codent-tile-footer">
                  <span className="text-[12.5px] text-[var(--text-secondary)] font-medium">
                    {s.meta}
                  </span>
                  <span className="w-[30px] h-[30px] rounded-full bg-foreground text-background inline-flex items-center justify-center">
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </MagicCard>
          ))}
        </Marquee>
      </div>
    </section>
  );
}