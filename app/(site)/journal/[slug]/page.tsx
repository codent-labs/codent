import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  hasPost,
  SITE,
  type Post,
} from "@/lib/posts";
import { PostDate } from "@/components/PostDate";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, social } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasPost(slug)) return {};
  const post = getPostBySlug(slug) as Post;
  const image = `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`;
  const meta = social({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
    image,
    type: "article",
  });
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/journal/${post.slug}` },
    ...meta,
    openGraph: { ...meta.openGraph, ...{ url: `${SITE.url}/journal/${post.slug}`, publishedTime: post.date } },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  if (!hasPost(slug)) notFound();
  const post = getPostBySlug(slug) as Post;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE.url}/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
  };

  return (
    <article className="codent-section">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd(`/journal/${post.slug}`, post.title)} />
      <div className="codent-wrap">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-main opacity-60 hover:opacity-100 transition-opacity mb-10"
        >
          ← Back to journal
        </Link>

        <div className="max-w-[680px]">
          <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)] tabular-nums">
            <span>
              <PostDate iso={post.date} />
            </span>
            <span className="codent-dashed !w-[24px]" aria-hidden />
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-[16px] text-[clamp(30px,3.8vw,46px)] font-medium tracking-[-1.3px] leading-[1.08] text-main">
            {post.title}
          </h1>
          <p className="mt-[16px] text-[15px] text-[var(--text-secondary)] leading-[1.7]">
            {post.description}
          </p>
        </div>

        <div className="codent-dashed my-10" />

        <div className="max-w-[640px] flex flex-col gap-5">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-[15.5px] text-main leading-[1.8]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="codent-dashed my-10" />

        <div className="bg-card rounded-[20px] border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[28px] max-w-[680px]">
          <p className="text-[14.5px] text-[var(--text-secondary)] leading-[1.7]">
            Like this? We write about scope, pricing and hand-offs whenever we
            learn something - roughly monthly. Tell us where{" "}
            <Link href="/contact" className="font-semibold text-main underline underline-offset-2">
              you&apos;re stuck
            </Link>{" "}
            and we&apos;ll reply with a one-pager within 48 hours.
          </p>
        </div>
      </div>
    </article>
  );
}