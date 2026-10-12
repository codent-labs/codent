"use client";

import { useRouter } from "next/navigation";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Initials only - the site publishes no team photos, and inventing or implying
// real people's likenesses would be worse than an abstract marker.
const avatars = [
  { initial: "CL", background: "#786ef1" },
  { initial: "VJ", background: "#5b52d6" },
  { initial: "ML", background: "#8f88f5" },
];

/** How many further people the count bubble stands for. */
const MORE_PEOPLE = 24;

export default function Hero() {
  const router = useRouter();

  return (
    <>
      <section className="codent-hero flex flex-col items-center justify-center text-center relative px-5 pt-10 pb-[40px]">
        <div className="max-w-[700px] w-full flex flex-col items-center">
          <div className="group mb-[18px] rounded-full border border-border bg-muted px-4 py-1.5 transition-colors hover:bg-accent">
            <AnimatedShinyText shimmerWidth={120}>
              A lab for curious teams · est. 2019
            </AnimatedShinyText>
          </div>

          <h1 className="text-[clamp(34px,5vw,52px)] font-medium tracking-[-1.5px] leading-[1.08] text-main mb-[18px]">
            <DiaTextReveal
              text="Big ideas, made small enough to ship."
              textColor="var(--text-main)"
              duration={1.6}
            />
          </h1>

          <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-[470px] mx-auto mb-8">
            We partner with founders and product teams on{" "}
            <span className="inline-flex items-center bg-muted text-[12.5px] font-semibold px-3 py-[2px] rounded-[8px] text-main">
              brand
            </span>
            , product and engineering - turning fuzzy bets into shipped work that earns its keep, in{" "}
            <span className="inline-flex items-center bg-muted text-[12.5px] font-semibold px-3 py-[2px] rounded-[8px] text-main">
              weeks
            </span>
            , not quarters.
          </p>

          <div className="flex items-center gap-[18px] flex-wrap justify-center">
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
        </div>

      {/* Social proof sits below the hero, not inside it. */}
      <div className="flex justify-center px-5 pt-15 pb-[60px]">
        <div className="inline-flex items-center gap-[14px] rounded-[40px] px-[18px] py-[6px] ps-[6px] bg-card/55 border border-border backdrop-blur-[8px]">
          <AvatarGroup className="-space-x-2">
            {avatars.map((a) => (
              <Avatar
                key={a.background}
                size="lg"
                className="border-2 border-background"
              >
                <AvatarFallback
                  className="font-bold text-white"
                  style={{ background: a.background }}
                >
                  {a.initial}
                </AvatarFallback>
              </Avatar>
            ))}
            {/*
              The count is decorative here: the adjacent text already states the
              total, so it is hidden from assistive tech rather than announced
              twice. Remove aria-hidden if the pill text ever stops naming it.
            */}
            <AvatarGroupCount
              aria-hidden="true"
              className="font-medium bg-foreground text-background"
            >
              +{MORE_PEOPLE}
            </AvatarGroupCount>
          </AvatarGroup>
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
    </>
  );
}
