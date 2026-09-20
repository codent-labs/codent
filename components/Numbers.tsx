import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  { value: 86, decimals: 0, suffix: "+", label: "Projects shipped across 14 industries since 2019." },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average client rating across 86 projects, 2019–2026." },
  { value: 23, decimals: 0, suffix: " days", label: "Median time from brief to first prototype, last 12 months." },
  { value: 100, decimals: 0, suffix: "%", label: "Of clients return within a year (measured since 2019)." },
];

export default function Numbers() {
  return (
    <section className="codent-section pt-0">
      <div className="codent-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[22px] bg-card overflow-hidden border border-border shadow-[0_2px_14px_rgba(0,0,0,0.04)]">
          {stats.map((s, i) => (
            <div key={i} className="relative p-[30px_26px]">
              {i > 0 && <div className="codent-dashed-v" />}
              <div className="text-main leading-none text-[46px] font-medium tracking-[-2px] tabular-nums">
                <NumberTicker
                  value={s.value}
                  decimalPlaces={s.decimals}
                  className="!tracking-[-2px]"
                />
                <sup className="text-[22px] font-medium text-main align-super ms-[2px] tracking-[-1px] tabular-nums">
                  {s.suffix}
                </sup>
              </div>
              <div className="text-[13px] text-[var(--text-secondary)] mt-[10px] leading-[1.5] max-w-[200px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}