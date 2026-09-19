import type { Metadata } from "next";
import { SITE } from "@/lib/posts";

export type SocialOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

/** Per-route OpenGraph + Twitter metadata so sharing a page never falls back
 *  to the homepage card (issue #64). */
export function social({
  title,
  description,
  path,
  image = "/og",
  type = "website",
}: SocialOptions): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${SITE.url}${path}`;
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Organization schema with the site's published rating claim, rendered on
 *  every page from the root layout (issue #63). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
  foundingDate: "2019",
  email: SITE.email,
  telephone: "+91 8376045365",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: "86",
  },
};

export function breadcrumbJsonLd(path: string, leaf: string) {
  const parts = path.split("/").filter(Boolean);
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
    ...parts.map((part, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: i === parts.length - 1 ? leaf : part,
      item: `${SITE.url}/${parts.slice(0, i + 1).join("/")}`,
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}