import { cn } from "@/lib/utils";

// Issue #66: "Northwind" is Microsoft's sample-database company and read as
// placeholder - removed. Remaining names are clients with case studies or
// testimonials (Halcyon, Sundae, Folio).
const logos = [
  { name: "Halcyon", mark: "H", tint: "from-[#786ef1] to-[#a78bfa]" },
  { name: "Sundae", mark: "S", tint: "from-[#f7b2fb] to-[#c084fc]" },
  { name: "Kiln & Co.", mark: "K", tint: "from-[#5588fb] to-[#60a5fa]" },
  { name: "Atlas", mark: "A", tint: "from-[#34d399] to-[#6ee7b7]" },
  { name: "Folio", mark: "F", tint: "from-[#ff9a5e] to-[#f7b2fb]" },
];

export default function LogosStrip() {
  return (
    <div className="py-[34px] bg-card/55 border-y border-dashed border-border/[0.12] backdrop-blur-[6px]">
      <div className="codent-wrap flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="text-[12px] text-[var(--text-secondary)] tracking-[0.04em] uppercase shrink-0">
          Trusted by curious teams
        </span>
        {logos.map((l) => (
          <span
            key={l.name}
            className="inline-flex items-center gap-2 font-bold text-[18px] tracking-[-0.3px] text-foreground/70"
          >
            <span
              aria-hidden
              className={cn(
                "w-6 h-6 rounded-full bg-gradient-to-br inline-flex items-center justify-center text-[11px] font-black text-white",
                l.tint
              )}
            >
              {l.mark}
            </span>
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}