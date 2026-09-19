import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, SITE } from "@/lib/posts";
import { PostDate } from "@/components/PostDate";
import { social } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from the lab: pricing, scope, hand-offs and the numbers behind 86+ projects. A newsletter about how small teams ship big things.",
  alternates: { canonical: "/journal" },
  ...social({
    title: "Journal - Codent Labs",
    description:
      "Notes from the lab: pricing, scope, hand-offs and the numbers behind 86+ projects. A newsletter about how small teams ship big things.",
    path: "/journal",
  }),
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">journal</span>
            <h1 className="mt-[18px]">
              Notes from{" "}
              <em className="italic font-light">the lab.</em>
            </h1>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <p className="codent-section-lede">
              How we price, scope and hand off work - plus the numbers behind
              86+ projects, published as we learn them.
            </p>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-main opacity-70 hover:opacity-100 transition-opacity"
            >
              RSS feed
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="codent-card group p-[26px] block transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)] tabular-nums">
                <span>
                  <PostDate iso={post.date} />
                </span>
                <span className="codent-dashed !w-[24px]" aria-hidden />
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="mt-[12px] text-[22px] font-semibold tracking-[-0.5px] text-main leading-[1.25] max-w-[640px] group-hover:opacity-80 transition-opacity">
                {post.title}
              </h2>
              <p className="mt-[8px] text-[14px] text-[var(--text-secondary)] leading-[1.6] max-w-[640px]">
                {post.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-[13.5px] text-[var(--text-secondary)]">
          Writing is how we argue with our own pricing. Reply anytime at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-2 hover:opacity-70"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}