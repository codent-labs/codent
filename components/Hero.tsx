"use client";

import { useRouter } from "next/navigation";

import { Icon } from "./icon";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const avatars = [
  { initial: "RM", initialsStyle: { background: "linear-gradient(135deg,#F7B2FB,#786EF1)" } },
  { initial: "JK", initialsStyle: { background: "linear-gradient(135deg,#FFE9D6,#FF9A5E)" } },
  { initial: "AT", initialsStyle: { background: "linear-gradient(135deg,#DDF3FF,#5588FB)" } },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="codent-hero flex flex-col items-center justify-center text-center relative px-5 pt-10 pb-[60px]">
      <div className="max-w-[700px] w-full flex flex-col items-center">
        <div className="group mb-[18px] rounded-full border border-border bg-muted px-4 py-1.5 transition-colors hover:bg-accent">
          <AnimatedShinyText shimmerWidth={120}>
            A lab for curious teams · est. 2019
          </AnimatedShinyText>
        </div>

        <div className="relative inline-block mb-[18px]">
          <Icon
            name="cloud"
            className="codent-gradient-text codent-float-cloud absolute"
          />
          <Icon
            name="favorite"
            className="codent-gradient-text codent-float-star absolute"
          />
          <h1 className="text-[clamp(34px,5vw,52px)] font-medium tracking-[-1.5px] leading-[1.08] text-main">
            <DiaTextReveal
              text="Big ideas, made small enough to ship."
              textColor="var(--text-main)"
              duration={1.6}
            />
          </h1>
        </div>

        <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-[470px] mx-auto mb-7">
          We partner with founders and product teams on{" "}
          <span className="inline-flex items-center bg-muted text-[12.5px] font-semibold px-3 py-[2px] rounded-[6px] text-main">
            brand
          </span>
          , product and engineering - turning fuzzy bets into shipped work that earns its keep, in{" "}
          <span className="inline-flex items-center bg-muted text-[12.5px] font-semibold px-3 py-[2px] rounded-[6px] text-main">
            weeks
          </span>
          , not quarters.
        </p>

        <div className="flex items-center gap-[18px] flex-wrap justify-center mb-8">
          <ShimmerButton
            onClick={() => router.push("/contact")}
            className="text-[14px] font-medium px-7 py-3"
          >
            Start a project
          </ShimmerButton>
          <InteractiveHoverButton
            onClick={() => router.push("/work")}
            className="text-[14px] font-medium border-border"
          >
            See our work
          </InteractiveHoverButton>
        </div>

        <div className="mt-8 inline-flex items-center gap-[14px] rounded-[40px] px-[18px] py-[6px] ps-[6px] bg-card/55 border border-border backdrop-blur-[8px]">
          <AvatarCircles avatarUrls={avatars} numPeople={24} />
          <div className="flex flex-col leading-[1.3]">
            <strong className="text-[12.5px] font-semibold text-main">
              86 projects shipped
            </strong>
            <span className="text-[11.5px] text-[var(--text-secondary)]">
              for teams like Halcyon, Sundae &amp; Folio.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}