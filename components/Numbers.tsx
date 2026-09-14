const stats = [
  { n: "86", sup: "+", label: "Projects shipped across 14 industries since 2019." },
  { n: "4.9", sup: "/5", label: "Average client rating across 86 projects, 2019–2026." },
  { n: "23", sup: " days", label: "Median time from brief to first prototype, last 12 months." },
  { n: "100", sup: "%", label: "Of clients return within a year (measured since 2019)." },
];

export default function Numbers() {
  return (
    <section className="codent-section pt-0">
      <div className="codent-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[22px] bg-white overflow-hidden border border-black/5 shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
          {stats.map((s, i) => (
            <div key={i} className="relative p-[30px_26px]">
              {i > 0 && <div className="codent-dashed-v" />}
              <div className="text-[#0f0f0f] leading-none text-[46px] font-medium tracking-[-2px]">
                {s.n}
                <sup className="text-[22px] font-medium text-[#0f0f0f] align-super ms-[2px] tracking-[-1px]">
                  {s.sup}
                </sup>
              </div>
              <div className="text-[13px] text-[#666] mt-[10px] leading-[1.5] max-w-[200px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
