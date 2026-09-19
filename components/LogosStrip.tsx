import { Icon } from "./icon";
import { Marquee } from "@/components/ui/marquee";

// Issue #66: "Northwind" is Microsoft's sample-database company and read as
// placeholder — removed. Remaining names are clients with case studies or
// testimonials (Halcyon, Sundae, Folio).
const logos = [
  { name: "Halcyon", icon: "hexagon" },
  { name: "Sundae", icon: "sunny" },
  { name: "Kiln & Co.", icon: "local_fire_department" },
  { name: "Atlas", icon: "public" },
  { name: "Folio", icon: "menu_book" },
];

export default function LogosStrip() {
  return (
    <div className="py-[34px] bg-card/55 border-y border-dashed border-border/[0.12] backdrop-blur-[6px]">
      <div className="codent-wrap flex items-center gap-8">
        <span className="text-[12px] text-[var(--text-secondary)] tracking-[0.04em] uppercase shrink-0">
          Trusted by curious teams
        </span>
        <Marquee pauseOnHover repeat={3} className="min-w-0 flex-1">
          {logos.map((l) => (
            <span
              key={l.name}
              className="font-bold text-[18px] tracking-[-0.3px] opacity-70 inline-flex items-center gap-2"
            >
              <Icon name={l.icon} className="text-[22px]" />
              {l.name}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
