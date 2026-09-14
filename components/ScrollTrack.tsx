"use client";

import { useRef, useState } from "react";
import { ChevronRight, Palette, Blocks, Code2, Rocket } from "lucide-react";

const services = [
  {
    icon: Palette,
    iconClass: "text-[#786ef1]",
    title: "Brand & Identity",
    body: "Logo systems, type, voice and the visual instincts that travel across every surface your product lives on.",
    meta: "6 weeks · 2 sprints",
    accent: "codent-tile-accent-pink",
  },
  {
    icon: Blocks,
    iconClass: "text-[#786ef1]",
    title: "Product Design",
    body: "From a fuzzy idea to a working interface — research, wireframes and hi-fi prototypes you can actually ship.",
    meta: "8–12 weeks",
    accent: "codent-tile-accent-purple",
  },
  {
    icon: Code2,
    iconClass: "text-[#5588fb]",
    title: "Engineering",
    body: "Fast, friendly front-ends and back-ends. We hand off code your team will be glad to inherit on Monday.",
    meta: "Continuous",
    accent: "codent-tile-accent-blue",
  },
  {
    icon: Rocket,
    iconClass: "text-[#34d399]",
    title: "Growth & Launch",
    body: "Strategy, positioning and the first 90 days — we help you find the audience that needs what you built.",
    meta: "4–6 weeks",
    accent: "codent-tile-accent-green",
  },
];

export default function ScrollTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [grabbing, setGrabbing] = useState(false);
  // Drag-to-scroll state (mouse): where the pointer went down and what the
  // scroll position was at that moment. Null when not dragging.
  const drag = useRef<{ pointerX: number; scrollLeft: number; moved: boolean } | null>(
    null,
  );

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    // Only the primary button; don't hijack middle-click autoscroll etc.
    if (e.button !== 0) return;
    drag.current = { pointerX: e.clientX, scrollLeft: el.scrollLeft, moved: false };
    setGrabbing(true);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const state = drag.current;
    if (!el || !state) return;
    const dx = e.clientX - state.pointerX;
    if (!state.moved && Math.abs(dx) < 5) return; // dead zone so clicks still work
    state.moved = true;
    el.scrollLeft = state.scrollLeft - dx;
  };

  const endDrag = () => {
    drag.current = null;
    setGrabbing(false);
  };

  return (
    <>
      {/* Scroll track — bleeds past codent-wrap padding */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        className={`codent-scroll-track ${grabbing ? "codent-scroll-grabbing" : ""}`}
      >
        {/* Left pad to align with content */}
        <div className="codent-scroll-pad" aria-hidden />

        {services.map((s, i) => (
          <div key={i} className={`codent-scroll-tile codent-card`}>
            {/* Top accent area */}
            <div className="codent-tile-top">
              <s.icon className={`size-[38px]`} strokeWidth={1.75} />
              <span className="codent-tile-num text-[12px] font-semibold text-[#aaa] tabular-nums">
                0{i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="codent-tile-body">
              <h3 className="text-[20px] font-semibold tracking-[-0.4px] text-[#0f0f0f]">
                {s.title}
              </h3>
              <p className="text-[14px] text-[#666] leading-[1.6] mt-2">{s.body}</p>
            </div>

            {/* Footer */}
            <div className="codent-tile-footer">
              <span className="text-[12.5px] text-[#555] font-medium">{s.meta}</span>
              <span className="w-[30px] h-[30px] rounded-full bg-[#111] text-white inline-flex items-center justify-center">
                <ChevronRight className="size-3" />
              </span>
            </div>
          </div>
        ))}

        {/* Right pad */}
        <div className="codent-scroll-pad" aria-hidden />
      </div>

      {/* Progress bar */}
      <div className="codent-wrap mt-6">
        <div className="codent-scroll-progress-track">
          <div
            className="codent-scroll-progress-bar"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="text-[11.5px] text-[#757575] mt-2 select-none">
          Scroll to explore →
        </p>
      </div>
    </>
  );
}