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
  },
  {
    icon: BlocksIcon,
    title: "Product Design",
    body: "From a fuzzy idea to a working interface - research, wireframes and hi-fi prototypes you can actually ship.",
    meta: "8-12 weeks",
  },
  {
    icon: GitBranchIcon,
    title: "Engineering",
    body: "Fast, friendly front-ends and back-ends. We hand off code your team will be glad to inherit on Monday.",
    meta: "Continuous",
  },
  {
    icon: RocketIcon,
    title: "Growth & Launch",
    body: "Strategy, positioning and the first 90 days - we help you find the audience that needs what you built.",
    meta: "4-6 weeks",
  },
];

export default function Services() {
  return (
    <section className="codent-section overflow-hidden" id="solutions">
      {/* Header */}
      <div className="codent-wrap">
        <div className="codent-section-head">
          <h2>
            The bits we <em className="italic">obsess</em> over,
            <br />
            so you don&apos;t have to.
          </h2>
          <p className="codent-section-lede">
            Four practices, one lab - pick the ones that fit.
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
          {services.map((s) => (
            <MagicCard
              key={s.title}
              mode="gradient"
              className="w-[320px] min-h-[380px] flex flex-col rounded-[16px] p-7"
              gradientFrom="#786ef1"
              gradientTo="#a5a0f7"
              gradientSize={260}
            >
              <div className="flex flex-1 flex-col">
                {/* Top accent area */}
                <div className="codent-tile-top">
                  <s.icon size={38} className="text-main" />
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