import Link from "next/link";
import { Logo } from "./logo";
import { NewsletterForm } from "./NewsletterForm";
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from "@/lib/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-[60px] pb-10 bg-transparent relative">
      <div className="codent-wrap">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 pb-11"
        >
          <div>
            <Logo/>
            <p className="text-[13.5px] text-[var(--text-secondary)] leading-[1.6] max-w-[300px] mt-[18px]">
              A small lab for curious teams. Brand, product and engineering -
              under one roof, since {BUSINESS.established}.
            </p>
          </div>

          {[
            {
              title: "Lab",
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
                {
                  label: BUSINESS.email,
                  href: `mailto:${BUSINESS.email}`,
                },
                { label: BUSINESS.phone, href: BUSINESS.phoneHref },
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
              Scope, pricing and hand-offs - the stuff we learn by shipping.
              No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Registered business details. Publishing the seller name, postal
            address and grievance contact is required under the Consumer
            Protection Act 2019 and the rules made under the IT Act 2000. */}
        <div className="pb-8 text-[12.5px] text-[var(--text-secondary)] leading-[1.7] max-w-[640px]">
          <address className="not-italic">
            {BUSINESS.legalName} · {BUSINESS_ADDRESS_ONE_LINE}
          </address>
          <br />
          Grievances:{" "}
          <a
            href={`mailto:${BUSINESS.grievance.email}`}
            className="text-main underline underline-offset-2 hover:opacity-100"
          >
            {BUSINESS.grievance.email}
          </a>{" "}
          · We reply within {BUSINESS.grievance.responseWindowDays} days.
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border text-[12.5px] text-[var(--text-secondary)] flex-wrap">
          <span>
            © {year} {BUSINESS.tradingName} - All rights reserved.
          </span>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-main transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-main transition-colors">
              Cookies
            </Link>
            <Link href="/terms" className="hover:text-main transition-colors">
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-main transition-colors"
            >
              Refunds
            </Link>
            <a href="/feed.xml" className="hover:text-main transition-colors">
              RSS feed
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
