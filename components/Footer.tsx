import { Logo } from "./logo"

const socials = [
  { label: "Twitter", icon: "alternate_email" },
  { label: "Instagram", icon: "camera_alt" },
  { label: "LinkedIn", icon: "work" },
  { label: "Dribbble", icon: "sports_basketball" },
];

export default function Footer() {
  return (
    <footer className="pt-[60px] pb-10 bg-transparent relative">
      <div className="codent-wrap">
        <div className="codent-dashed mb-12" />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 pb-11"
        >
          <div>
            <Logo/>
            <p className="text-[13.5px] text-[#888] leading-[1.6] max-w-[300px] mt-[18px]">
              A small lab for curious teams. Brand, product and engineering —
              under one roof, since 2019.
            </p>
          </div>

          {[
            {
              title: "lab",
              links: ["Our Team", "Process", "Careers", "News"],
            },
            {
              title: "Work",
              links: ["Case studies", "Showcase", "Lab", "Press"],
            },
            {
              title: "Say hi",
              links: [
                "soctoit@gmail.com",
                "+91 8376045365",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-[12px] font-semibold text-[#0f0f0f] uppercase tracking-[0.1em] mb-[14px]">
                {col.title}
              </h5>
              {col.links.map((link) => (
                <a
                  key={link}
                  href={link.includes("@") ? `mailto:${link}` : "#"}
                  className="block text-[13.5px] text-[#1a1a1a] opacity-65 py-[5px] hover:opacity-100 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="codent-dashed" />

        <div className="flex items-center justify-between pt-6 text-[12.5px] text-[#888] gap-4 flex-wrap">
          <span>© 2026 Codent lab — All rights reserved.</span>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="codent-icon w-[34px] h-[34px] rounded-full bg-white border border-black/6 inline-flex items-center justify-center text-[18px] text-[#111] transition-all hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
