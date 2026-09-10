import { Icon } from "./icon";

const works = [
  {
    title: "Maru — banking, softened.",
    tags: ["fintech", "app"],
    bg: "linear-gradient(135deg,#FFE9D6 0%,#F7B2FB 60%,#786EF1 100%)",
    tall: true,
  },
  {
    title: "Folio — a library that reads you.",
    tags: ["product", "brand"],
    bg: "linear-gradient(135deg,#DDF3FF 0%,#5588FB 100%)",
  },
  {
    title: "Sundae — DTC ice cream.",
    tags: ["brand", "ecomm"],
    bg: "linear-gradient(135deg,#FFF1B6 0%,#FF9A5E 100%)",
  },
];

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

export default function Showcase() {
  return (
    <section className="codent-section" id="showcase">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">showcase</span>
            <h2 className="mt-[18px]">
              Recent work we&apos;re{" "}
              <em className="italic font-light">
                quietly proud
              </em>{" "}
              of.
            </h2>
          </div>
          <a href="#" className="codent-pill-light">
            All case studies <ChevronArrow />
          </a>
        </div>

        <div
          className="grid gap-[14px] grid-cols-1 md:grid-cols-[1.4fr_1fr]"
        >
          {works.map((w, i) => (
            <a
              key={i}
              href="#"
              className={`relative rounded-[22px] overflow-hidden min-h-[340px] flex flex-col justify-end p-[22px] border border-black/5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] group ${w.tall ? "row-span-2" : ""}`}
              style={{ background: w.bg }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/55 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex items-end justify-between gap-4 text-white">
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.5px]">
                    {w.title}
                  </h3>
                  <div className="flex gap-[6px] mt-[6px]">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11.5px] font-medium px-[10px] py-[3px] rounded-[40px] backdrop-blur-md bg-white/[0.18]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Icon
                  name="north_east"
                  className="w-[38px] h-[38px] rounded-full bg-white text-[#111] inline-flex items-center justify-center text-[20px] transition-transform duration-300 group-hover:translate-x-[3px] rtl:group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] flex-shrink-0"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
