import { Logo } from "./logo"
import { Icon } from "./icon"
import { NewsletterForm } from "./NewsletterForm"

const socials = [
  { label: "Twitter", icon: "alternate_email" },
  { label: "Instagram", icon: "camera" },
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
            <p className="text-[13.5px] text-[#666] leading-[1.6] max-w-[300px] mt-[18px]">
              A small lab for curious teams. Brand, product and engineering —
              under one roof, since 2019.
            </p>
          </div>

          {[
            {
              title: "lab",
              links: [
                { label: "Our Team", href: "#" },
                { label: "Process", href: "#" },
                { label: "Journal", href: "/journal" },
                { label: "Careers", href: "#" },
              ],
            },
            {
              title: "Work",
              links: [
                { label: "Case studies", href: "#" },
                { label: "Showcase", href: "#" },
                { label: "Newsletter", href: "#" },
              ],
            },
            {
              title: "Say hi",
              links: [
                { label: "hello@codentlabs.com", href: "mailto:hello@codentlabs.com" },
                { label: "+91 8376045365", href: "tel:+918376045365" },
                { label: "Contact", href: "/contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold text-[#0f0f0f] uppercase tracking-[0.1em] mb-[14px]">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[13.5px] text-[#1a1a1a] opacity-65 py-[5px] hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Newsletter capture (issue #38) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center pb-11">
          <div>
            <h3 className="text-[15px] font-semibold text-[#0f0f0f] tracking-[-0.3px]">
              Notes from the lab, roughly monthly.
            </h3>
            <p className="text-[13px] text-[#666] mt-[6px] leading-[1.6]">
              Scope, pricing and hand-offs — the stuff we learn by shipping
              for 86+ clients. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="codent-dashed" />

        <div className="flex items-center justify-between pt-6 text-[12.5px] text-[#666] gap-4 flex-wrap">
          <span>© 2026 Codent lab — All rights reserved.</span>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-[34px] h-[34px] rounded-full bg-white border border-black/6 inline-flex items-center justify-center text-[#111] transition-all hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
              >
                <Icon name={s.icon} className="text-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
