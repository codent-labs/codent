import { Logo } from "./logo"
import { NewsletterForm } from "./NewsletterForm"

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
            <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.6] max-w-[300px] mt-[18px]">
              A small lab for curious teams. Brand, product and engineering —
              under one roof, since 2019.
            </p>
          </div>

          {[
            {
              title: "lab",
              links: [
                { label: "About us", href: "/about" },
                { label: "Process", href: "/process" },
                { label: "Journal", href: "/journal" },
                { label: "Services", href: "/services" },
              ],
            },
            {
              title: "Work",
              links: [
                { label: "Case studies", href: "/work" },
                { label: "Maru", href: "/work/maru" },
                { label: "Folio", href: "/work/folio" },
                { label: "Sundae", href: "/work/sundae" },
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
              <h3 className="text-[12px] font-semibold text-main uppercase tracking-[0.1em] mb-[14px]">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[13.5px] text-main opacity-65 py-[5px] hover:opacity-100 transition-opacity"
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
            <h3 className="text-[15px] font-semibold text-main tracking-[-0.3px]">
              Notes from the lab, roughly monthly.
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] mt-[6px] leading-[1.6]">
              Scope, pricing and hand-offs — the stuff we learn by shipping
              for 86+ clients. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="codent-dashed" />

        <div className="flex items-center justify-between pt-6 text-[12.5px] text-[var(--text-secondary)] gap-4 flex-wrap">
          <span>© 2026 Codent lab — All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-2 hover:text-main transition-colors"
            >
              RSS feed
            </a>
            <a
              href="mailto:hello@codentlabs.com"
              className="inline-flex items-center gap-2 py-[3px] hover:text-main transition-colors"
            >
              hello@codentlabs.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
