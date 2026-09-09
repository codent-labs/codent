const steps = [
  {
    icon: "chat_bubble",
    title: "Say hi",
    body: "A 30-minute chat. No deck, no jargon — just figuring out if we're a fit.",
    meta: "30 min",
  },
  {
    icon: "explore",
    title: "Discover",
    body: "We pair with your team for a week of interviews, audits and rough sketches.",
    meta: "1 week",
  },
  {
    icon: "draw",
    title: "Design",
    body: "Two cycles of design, each ending in a working prototype you can click through.",
    meta: "2–3 weeks",
  },
  {
    icon: "rocket_launch",
    title: "Ship",
    body: "Engineering, QA, and a hand-off doc that won't make your devs cry.",
    meta: "Ongoing",
  },
];

export default function Process() {
  return (
    <section className="codent-section pt-[60px]" id="process">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">how we work</span>
            <h2 className="mt-[18px]">
              Four steps.{" "}
              <em className="italic font-light">No mystery.</em>
            </h2>
          </div>
          <p className="codent-section-lede">
            Same playbook, every engagement — refined over six years and
            roughly two hundred coffees.
          </p>
        </div>

        {/* Timeline connector row */}
        <div className="codent-process-timeline">
          {steps.map((s, i) => (
            <div key={i} className="codent-process-step">
              {/* Number node */}
              <div className="codent-process-node-row">
                <div className="codent-process-node">
                  <span className="text-[12px] font-bold text-[#111] tabular-nums">0{i + 1}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="codent-process-connector" aria-hidden>
                    <div className="codent-process-connector-line" />
                    <div className="codent-process-connector-arrow" />
                  </div>
                )}
              </div>

              {/* Card */}
              <div className="codent-card codent-process-card">
                <span className="codent-icon codent-gradient-text text-[34px] leading-none">
                  {s.icon}
                </span>
                <h4 className="text-[17px] font-semibold tracking-[-0.3px] text-[#0f0f0f] mt-3">
                  {s.title}
                </h4>
                <p className="text-[13px] text-[#666] leading-[1.55] mt-2">{s.body}</p>
                <span className="codent-process-meta">{s.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
