import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { caseStudies } from "@/lib/cases";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Icon } from "@/components/icon";

const GLYPHS: Record<string, string> = {
  maru: "rocket_launch",
  folio: "menu_book",
  sundae: "sunny",
};

export default function Showcase() {
  const works = caseStudies.map((c) => ({
    name: c.title,
    description: c.headline,
    href: `/work/${c.slug}`,
    cta: "View case study",
    bg: c.bg,
    glyph: GLYPHS[c.slug] ?? "work",
  }));

  // Bento: one large feature tile (2/3 wide, 2 rows) + two stacked (1/3 each).
  const spans = [
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
  ];

  return (
    <section id="showcase" className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">showcase</span>
            <h2 className="mt-[18px]">
              Recent work we&apos;re{" "}
              <em className="italic font-light">quietly proud</em> of.
            </h2>
          </div>
          <Link href="/work" className="codent-pill-light">
            All case studies <ChevronRight className="size-3" />
          </Link>
        </div>

        <BentoGrid>
          {works.map((w, i) => (
            <BentoCard
              key={w.name}
              name={w.name}
              description={w.description}
              href={w.href}
              cta={w.cta}
              className={spans[i]}
              Icon={({ className }: { className?: string }) => (
                <Icon name={w.glyph} className={className} />
              )}
              background={
                <div
                  className="absolute inset-0"
                  style={{ background: w.bg }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}