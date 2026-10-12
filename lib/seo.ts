import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
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

/**
 * Organization schema, rendered on every page from the root layout.
 *
 * No `aggregateRating`: the previous value (4.9 / 86 reviews) was derived from
 * project counts rather than genuine reviews of this business. Google's
 * structured-data policy treats review markup that is not a true aggregate of
 * published reviews as a violation, and it is a factual claim we cannot
 * evidence. Only add it back if real, attributable reviews are published on the
 * site and visible to visitors.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#org`,
  name: SITE.name,
  legalName: BUSINESS.legalName,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
  foundingDate: String(BUSINESS.established),
  email: SITE.email,
  telephone: BUSINESS.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
    addressLocality: BUSINESS.jurisdictionCity,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer complaints",
    email: BUSINESS.grievance.email,
    availableLanguage: ["en"],
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