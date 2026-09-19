function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const faqs = [
  {
    q: "How do we start working together?",
    a: "No deck required. Tell us where you're stuck through the contact form and we'll reply within 48 hours with a one-pager: what we'd do, how long, and roughly what it'd cost. If it feels right, we jump on a 30-minute call — no commitment.",
  },
  {
    q: "What does a project cost, roughly? Do you quote fixed hours?",
    a: "We quote fixed scope for a fixed price — no hourly meters. A brand engagement usually lands around 6 weeks, product design 8–12 weeks, and growth work 4–6 weeks. The 48-hour one-pager includes a ballpark so you know the shape before we start.",
  },
  {
    q: "How long does a typical project take?",
    a: "A clickable prototype runs about 23 days median from first brief. Full brands take ~6 weeks, product design 8–12 weeks, and growth engagements 4–6 weeks. Engineering is continuous — we hand off incrementally, not in one lump.",
  },
  {
    q: "What does the 48-hour one-pager include?",
    a: "What we'd do in plain language, how long each phase runs, and a rough cost — plus the handful of questions we'd need answered to start. It's a working document, not a sales call.",
  },
  {
    q: "Which industries do you work with?",
    a: "We've shipped 86+ projects across 14 industries — fintech, DTC and e-commerce, SaaS, healthcare, and more. We work anywhere a fuzzy bet needs to turn into shipped software; domain jargon isn't a requirement.",
  },
  {
    q: "Who is actually on the team?",
    a: "A deliberately small studio. The two people who design and build your project are the two people on your account — no hand-offs between account managers and juniors. It's why clients describe us as the two smartest people on their team.",
  },
  {
    q: "What stack do you build with?",
    a: "React, Next.js and TypeScript on the front-end; Node and Postgres on the back. Brand work ships as a system — logos, type, voice — your team can run itself. Everything ends with a hand-off doc your devs won't cry over.",
  },
];

export default function FAQ() {
  return (
    <section className="codent-section" id="faq">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">faq</span>
            <h2 className="mt-[18px]">
              Questions,{" "}
              <em className="italic font-light">answered.</em>
            </h2>
          </div>
          <p className="codent-section-lede">
            The things clients ask before saying yes — pricing, timeline,
            scope, and who actually shows up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className={`codent-card group p-[22px] ${i === faqs.length - 1 ? "md:col-span-2" : ""}`}
            >
              <summary className="list-none cursor-pointer flex items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="text-[16.5px] font-semibold tracking-[-0.3px] text-main leading-[1.35]">
                  {f.q}
                </span>
                <span className="w-[30px] h-[30px] rounded-full bg-foreground text-background inline-flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                  <PlusIcon />
                </span>
              </summary>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6] mt-4 max-w-[620px]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}