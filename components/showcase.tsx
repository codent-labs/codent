import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight, Rocket, Sun } from "lucide-react";

import { caseStudies } from "@/lib/cases";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

// Placeholder glyphs per case study, keyed by slug.
const GLYPHS = {
  maru: Rocket,
  folio: BookOpen,
  sundae: Sun,
} as const;

export default function Showcase() {
  const works = caseStudies.map((c) => ({
    name: c.title,
    description: c.headline,
    href: `/work/${c.slug}`,
    cta: "View case study",
    image: c.image,
    Icon: GLYPHS[c.slug as keyof typeof GLYPHS] ?? BookOpen,
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
          <h2>
            Recent work we&apos;re <em className="italic">quietly proud</em> of.
          </h2>
          <Link href="/work" className="codent-pill-light mt-5">
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
              Icon={w.Icon}
              background={
                <div className="absolute inset-0">
                  <Image
                    src={w.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 760px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
