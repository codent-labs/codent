import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import {
  caseStudies,
  getCaseStudy,
  hasCaseStudy,
  type CaseStudy,
} from "@/lib/cases";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, social } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) return {};
  const study = getCaseStudy(slug) as CaseStudy;
  const image = `/og?title=${encodeURIComponent(study.title)}&description=${encodeURIComponent(study.summary)}`;
  return {
    title: study.client,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    ...social({
      title: study.title,
      description: study.summary,
      path: `/work/${study.slug}`,
      image,
      type: "article",
    }),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) notFound();
  const study = getCaseStudy(slug) as CaseStudy;

  return (
    <article className="codent-section">
      <JsonLd data={breadcrumbJsonLd(`/work/${study.slug}`, study.title)} />
      <div className="codent-wrap">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-main opacity-60 hover:opacity-100 transition-opacity mb-10"
        >
          ← All case studies
        </Link>

        <div
          className="rounded-[24px] border border-border overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          style={{ background: study.bg }}
        >
          <div className="bg-gradient-to-t from-black/60 to-transparent p-[26px] md:p-[34px] text-white">
            <div className="flex flex-wrap gap-[6px] mb-[16px]">
              {study.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11.5px] font-medium px-[10px] py-[3px] rounded-[40px] backdrop-blur-md bg-card/[0.18]"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-[clamp(28px,4vw,44px)] font-medium tracking-[-1.3px] leading-[1.08]">
              {study.title}
            </h1>
            <p className="text-[14.5px] text-white/85 mt-[12px] max-w-[560px] leading-[1.6]">
              {study.headline}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[10px] mt-[14px]">
          {[
            { label: "Client", value: study.client },
            { label: "Industry", value: study.industry },
            { label: "Duration", value: study.duration },
            { label: "Scope", value: study.role },
          ].map((cell) => (
            <div
              key={cell.label}
              className="bg-card rounded-[16px] border border-border p-[16px]"
            >
              <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-[0.06em]">
                {cell.label}
              </div>
              <div className="text-[13.5px] font-medium text-main mt-[6px] leading-[1.4]">
                {cell.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mt-[14px]">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-[#0f0f0f] dark:bg-card text-white rounded-[16px] p-[18px] text-center"
            >
              <div className="text-[26px] font-semibold tracking-[-1px] leading-none">
                {m.value}
              </div>
              <div className="text-[12px] text-white/60 mt-2">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-[680px] mt-[54px] flex flex-col gap-4">
          <h2 className="text-[24px] font-medium tracking-[-0.7px] text-main">
            The brief
          </h2>
          <p className="text-[15.5px] text-main leading-[1.8]">
            {study.challenge}
          </p>

          <h2 className="text-[24px] font-medium tracking-[-0.7px] text-main mt-[18px]">
            What we did
          </h2>
          <ol className="flex flex-col gap-3">
            {study.approach.map((step, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] text-main leading-[1.75]"
              >
                <span className="w-6 h-6 rounded-full bg-muted text-[12px] font-bold inline-flex items-center justify-center flex-shrink-0 mt-[2px]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <h2 className="text-[24px] font-medium tracking-[-0.7px] text-main mt-[18px]">
            The outcome
          </h2>
          <p className="text-[15.5px] text-main leading-[1.8]">
            {study.outcome}
          </p>
        </div>

        <div className="mt-[54px]">
          <Link href="/contact" className="codent-pill-dark lg">
            <span className="codent-arrow-circ lg">
              <Icon name="north_east" className="text-[13px]" />
            </span>
            Start something like it
          </Link>
        </div>
      </div>
    </article>
  );
}