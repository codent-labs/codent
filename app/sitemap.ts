import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/cases";
import { getAllPosts } from "@/lib/posts";

const BASE = "https://www.codentlabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Journal posts have a real content date; everything else is a marketing
  // page or case study with no publish/update date, so we omit lastmod
  // rather than stamping the build timestamp onto every URL (issue #65).
  const journalPosts = getAllPosts().map((post) => ({
    url: `${BASE}/journal/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workPages = caseStudies.map((study) => ({
    url: `${BASE}/work/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/work`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...workPages,
    {
      url: `${BASE}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/process`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${BASE}/journal`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...journalPosts,
    {
      url: `${BASE}/feed.xml`,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}