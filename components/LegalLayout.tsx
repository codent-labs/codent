import Link from "next/link";
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE, POLICY_UPDATED_LABEL } from "@/lib/business";

/**
 * Shared chrome for the four policy pages so they stay structurally identical
 * and a reader who lands on any of them can find the rest.
 */

export type LegalSection = {
  id: string;
  heading: string;
  /** Paragraphs, list items, or both - rendered in order. */
  blocks: LegalBlock[];
};

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export const LEGAL_PAGES = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
] as const;

export function LegalLayout({
  eyebrow,
  title,
  lede,
  sections,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  sections: LegalSection[];
}) {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">{eyebrow}</span>
            <h1 className="mt-[18px]">{title}</h1>
          </div>
          <p className="codent-section-lede">{lede}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-[14px] lg:gap-[40px] items-start">
          {/* In-page contents. Sticky on desktop, plain scroll on mobile. */}
          <nav
            aria-label="On this page"
            className="bg-card rounded-[16px] border border-border p-[20px] lg:sticky lg:top-[120px]"
          >
            <h2 className="text-[12px] font-semibold text-main uppercase tracking-[0.1em]">
              On this page
            </h2>
            <ol className="mt-3 flex flex-col gap-1.5 list-none p-0">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block text-[13px] leading-[1.45] text-[var(--text-secondary)] hover:text-main transition-colors"
                  >
                    {i + 1}. {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="bg-card rounded-[16px] border border-border shadow-[0_2px_14px_rgba(0,0,0,0.04)] p-[26px] sm:p-[34px]">
            <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
              Last updated {POLICY_UPDATED_LABEL}. This policy applies to{" "}
              {BUSINESS.legalName}, {BUSINESS_ADDRESS_ONE_LINE}.
            </p>

            {sections.map((section) => (
              <LegalSection key={section.id} section={section} />
            ))}

            <div className="mt-[40px] pt-[24px] border-t border-border">
              <h2 className="text-[15px] font-semibold text-main tracking-[-0.3px]">
                Questions
              </h2>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-[1.7]">
                Write to{" "}
                <a
                  href={`mailto:${BUSINESS.grievance.email}`}
                  className="text-main underline underline-offset-2"
                >
                  {BUSINESS.grievance.email}
                </a>{" "}
                and we will respond within {BUSINESS.grievance.responseWindowDays}{" "}
                days. See also our{" "}
                {LEGAL_PAGES.filter((p) => p.href !== "/privacy").map((p, i) => (
                  <span key={p.href}>
                    {i > 0 && ", "}
                    <Link href={p.href} className="text-main underline underline-offset-2">
                      {p.label}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalSection({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} className="mt-[34px] scroll-mt-[120px] first:mt-[26px]">
      <h2 className="text-[17px] font-semibold text-main tracking-[-0.3px]">
        {section.heading}
      </h2>
      {section.blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p
              key={i}
              className="mt-3 text-[14px] text-[var(--text-secondary)] leading-[1.75]"
            >
              {block.text}
            </p>
          );
        }
        return (
          <ul
            key={i}
            className="mt-3 flex flex-col gap-2 text-[14px] text-[var(--text-secondary)] leading-[1.7] list-disc pl-5"
          >
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      })}
    </section>
  );
}
