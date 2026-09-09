const logos = [
  { name: "Halcyon", icon: "hexagon" },
  { name: "Northwind", icon: "air" },
  { name: "Sundae", icon: "sunny" },
  { name: "Kiln & Co.", icon: "local_fire_department" },
  { name: "Atlas", icon: "public" },
  { name: "Folio", icon: "menu_book" },
];

export default function LogosStrip() {
  return (
    <div className="py-[34px] bg-white/55 border-y border-dashed border-black/[0.12] backdrop-blur-[6px]">
      <div className="codent-wrap flex items-center justify-between gap-8 flex-wrap">
        <span className="text-[12px] text-[#666] tracking-[0.04em] uppercase">
          Trusted by curious teams
        </span>
        {logos.map((l) => (
          <span
            key={l.name}
            className="font-bold text-[18px] tracking-[-0.3px] opacity-70 inline-flex items-center gap-2"
          >
            <span className="codent-icon text-[22px]">{l.icon}</span>
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}
