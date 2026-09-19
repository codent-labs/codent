import { DM_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Display serif for headline accents (issue #48) — pairs with DM Sans.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Material Symbols Rounded, subset to exactly the ~22 glyphs the site uses
// (see issue #41) and served from this domain instead of fonts.googleapis.com.
const materialSymbols = localFont({
  src: "./fonts/material-symbols-rounded.woff2",
  display: "swap",
  variable: "--font-material-symbols",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codentlabs.com"),
  title: {
    default: "Codent Labs — Brand, Product & Engineering",
    template: "%s — Codent Labs",
  },
  description:
    "Codent Labs partners with founders and product teams on brand, product design, and engineering. 86+ projects shipped for teams like Halcyon, Sundae & Folio. Est. 2019.",
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Codent Labs — Brand, Product & Engineering",
    description:
      "We partner with founders and product teams on brand, product and engineering — turning fuzzy bets into shipped work.",
    url: "https://www.codentlabs.com/",
    siteName: "Codent Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Codent Labs — Brand, Product & Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codent Labs — Brand, Product & Engineering",
    description:
      "We partner with founders and product teams on brand, product and engineering.",
    images: ["/og"],
  },
};

export default function codentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${materialSymbols.variable} ${instrumentSerif.variable} min-h-screen`}
      >
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#111] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
