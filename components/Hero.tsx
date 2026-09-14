import { Icon } from "./icon";

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

const avatars = [
  { initials: "RM", style: { background: "linear-gradient(135deg,#F7B2FB,#786EF1)" } },
  { initials: "JK", style: { background: "linear-gradient(135deg,#FFE9D6,#FF9A5E)" } },
  { initials: "AT", style: { background: "linear-gradient(135deg,#DDF3FF,#5588FB)" } },
  { initials: "+24", style: { background: "#0f0f0f", color: "#fff", fontSize: 11 } },
];

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center relative min-h-[calc(100vh-84px)] px-5 pt-10 pb-[60px]">
      <div className="max-w-[700px] w-full flex flex-col items-center">
        <p className="text-[15px] text-[#666] font-normal mb-[14px]">
          A lab for curious teams · est. 2019
        </p>

        <div className="relative inline-block mb-[18px]">
          <Icon
            name="cloud"
            className="codent-gradient-text codent-float-cloud absolute"
          />
          <Icon
            name="favorite"
            className="codent-gradient-text codent-float-star absolute"
          />
          <h1 className="text-[clamp(34px,5vw,52px)] font-medium tracking-[-1.5px] leading-[1.08] text-[#0f0f0f]">
            Big ideas, made
            <br />
            small enough to ship.
          </h1>
        </div>

        <p className="text-[14px] text-[#666] leading-[1.7] max-w-[470px] mx-auto mb-7">
          We partner with founders and product teams on{" "}
          <span className="inline-flex items-center bg-[#E0E2E7] text-[12.5px] font-semibold px-3 py-[2px] rounded-[6px] text-[#3a3a3a]">
            brand
          </span>
          , product and engineering — turning fuzzy bets into shipped work that earns its keep, in{" "}
          <span className="inline-flex items-center bg-[#E0E2E7] text-[12.5px] font-semibold px-3 py-[2px] rounded-[6px] text-[#3a3a3a]">
            weeks
          </span>
          , not quarters.
        </p>

        <div className="flex items-center gap-[18px] flex-wrap justify-center mb-8">
          <a href="/contact" className="codent-pill-dark lg">
            <span className="codent-arrow-circ lg">
              <ChevronArrow />
            </span>
            Start a project
          </a>
          <a
            href="#showcase"
            className="inline-flex items-center gap-[10px] text-[14px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity"
          >
            <Icon
              name="play_arrow"
              className="w-[30px] h-[30px] rounded-full bg-white border border-black/8 inline-flex items-center justify-center text-[18px] text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            />
            See our work
          </a>
        </div>

        <div className="mt-8 inline-flex items-center gap-[14px] rounded-[40px] px-[18px] py-[6px] ps-[6px] bg-white/55 border border-black/5 backdrop-blur-[8px]">
          <div className="flex">
            {avatars.map((a, i) => (
              <span
                key={i}
                className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-white text-[11px] font-bold border-2 border-[#F5F5F5] ${i > 0 ? "-ml-2" : ""}`}
                style={a.style}
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div className="flex flex-col leading-[1.3]">
            <strong className="text-[12.5px] font-semibold text-[#0f0f0f]">
              86 projects shipped
            </strong>
            <span className="text-[11.5px] text-[#666]">
              for teams like Halcyon, Sundae &amp; Folio.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
