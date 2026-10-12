import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/cases";
import { social } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies - Maru, Folio and Sundae. Brand, product and engineering for 86+ projects since 2019.",
  alternates: { canonical: "/work" },
  ...social({
    title: "Work - Codent Labs",
    description:
      "Selected case studies - Maru, Folio and Sundae. Brand, product and engineering for 86+ projects since 2019.",
    path: "/work",
  }),
};

export default function WorkPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <h1>
            Case studies, <em className="italic">in the open.</em>
          </h1>
          <p className="codent-section-lede">
            A few of the 86+ projects we&apos;ve shipped since 2019 - with the
            numbers attached, because stats without denominators are vibes.
          </p>
        </div>

        <div className="grid gap-[14px] grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          {caseStudies.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className={`relative rounded-[16px] overflow-hidden min-h-[340px] flex flex-col justify-end p-[22px] border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)] group ${i === 0 ? "row-span-2" : ""}`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="relative z-10 flex items-end justify-between gap-4 text-white">
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.5px]">
                    {c.title}
                  </h3>
                  <div className="flex gap-[6px] mt-[6px]">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11.5px] font-medium px-[10px] py-[3px] rounded-full backdrop-blur-md bg-white/[0.18]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13.5px] text-white/80 mt-[10px] max-w-[420px] leading-[1.55]">
                    {c.headline}
                  </p>
                </div>
                <span className="w-[38px] h-[38px] rounded-full bg-white text-[#111] inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[3px] rtl:group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] flex-shrink-0">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
