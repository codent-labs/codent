import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import AsyncStylesheet from "@/components/AsyncStylesheet";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codent Labs — Brand, Product & Engineering",
  description:
    "Codent Labs partners with founders and product teams on brand, product design, and engineering. 86+ projects shipped for teams like Halcyon, Sundae & Folio. Est. 2019.",
  openGraph: {
    title: "Codent Labs — Brand, Product & Engineering",
    description:
      "We partner with founders and product teams on brand, product and engineering — turning fuzzy bets into shipped work.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codent Labs — Brand, Product & Engineering",
    description:
      "We partner with founders and product teams on brand, product and engineering.",
  },
};

export default function codentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <AsyncStylesheet href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0&display=optional" />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0&display=optional"
          />
        </noscript>
      </head>
      <body className={`${dmSans.variable} min-h-screen`}>
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
