import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";
import { BUSINESS } from "@/lib/business";
import { social } from "@/lib/seo";

const description =
  "Every cookie and browser storage mechanism used by codentlabs.com, why it is set, how long it lasts, and how to change your choice.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: { canonical: "/cookies" },
  ...social({
    title: "Cookie Policy - Codent Labs",
    description,
    path: "/cookies",
  }),
};

const sections: LegalSection[] = [
  {
    id: "what-this-is",
    heading: "What this covers",
    blocks: [
      {
        type: "p",
        text: "Cookies are small text files a site stores in your browser. Related technologies - `localStorage`, `sessionStorage`, pixels and SDKs - do the same job of letting a site remember things about you, and they are covered here too.",
      },
      {
        type: "p",
        text: "This is a full and accurate list of what this site sets, not a template. If something is added later, it appears here before or at the same time as it is deployed.",
      },
    ],
  },
  {
    id: "categories",
    heading: "What we set today",
    blocks: [
      {
        type: "p",
        text: "Strictly necessary (no consent needed). These keep the site working and cannot be switched off:",
      },
      {
        type: "ul",
        items: [
          "`localStorage` key `theme` - remembers whether you chose light or dark mode. Set by our theme provider. No expiry. No personal data.",
          "`localStorage` key `codent.consent.v1` - stores your cookie decision (which categories, which version, when). Necessary so we stop asking. No expiry until you clear it.",
        ],
      },
      {
        type: "p",
        text: "Analytics (consent required). Loads only if you accept:",
      },
      {
        type: "ul",
        items: [
          "Vercel Web Analytics - aggregate page view data: the page path, the referring site and rough country. Before the event is sent we strip the referrer, the user agent string and any campaign parameters, so no persistent identifier or advertising identifier is created. Provider: Vercel Inc.",
        ],
      },
      {
        type: "p",
        text: "That is the complete list. We do not run advertising cookies, cross-site trackers, social media pixels, session recorders, heatmaps or fingerprinting. If a third-party script ever needs a cookie, it goes in this table and behind the same consent.",
      },
      {
        type: "p",
        text: "Emailing you is not a cookie and is not gated by this choice. If you give us an address on a form, we use it to reply to you — see the privacy policy.",
      },
    ],
  },
  {
    id: "your-choice",
    heading: "Your choice and how to change it",
    blocks: [
      {
        type: "p",
        text: "When you first visit, a banner offers \"Accept analytics\" and \"Necessary only\". Choosing either stores your decision in your browser; analytics never load before that, and declining is as easy as accepting. Pressing Escape or closing the banner also declines.",
      },
      {
        type: "p",
        text: "You can change your mind at any time using the \"Cookie choices\" button in the bottom-left corner, which reopens the same banner on every page. Clearing your browser storage for this site also resets the record and the banner will ask again on your next visit.",
      },
      {
        type: "p",
        text: "Blocking cookies entirely in your browser settings also works: the site still functions, but it cannot remember your theme or your consent between visits and will ask you again each time.",
      },
      {
        type: "p",
        text: "If you decline, we have no record of you beyond the server log needed to serve the page, and no analytics is collected.",
      },
    ],
  },
  {
    id: "legal-basis",
    heading: "Legal basis",
    blocks: [
      {
        type: "p",
        text: "Necessary storage relies on our legitimate interest in operating a working site and, for the consent record, on the need to demonstrate consent as required by the Digital Personal Data Protection Act 2023 and the rules made under the IT Act 2000. Analytics relies solely on your consent, which you may withdraw at any time without affecting anything done before you withdrew it.",
      },
    ],
  },
  {
    id: "third-party-storage",
    heading: "Third-party embeds and storage",
    blocks: [
      {
        type: "p",
        text: "This site embeds no third-party content — no video players, no maps, no social widgets, no chat widgets, no fonts fetched from a third party at page load. Fonts are served from our own domain. That means no third-party `<iframe>`, embedded SDK or third-party cookie is present unless you have consented to analytics. If you submit a form, our email provider processes what you sent us, which is not a browser cookie and is covered by the privacy policy instead.",
      },
      {
        type: "p",
        text: "If you follow a link to another website, that site is governed by its own cookie policy, not this one.",
      },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    blocks: [
      {
        type: "p",
        text: `Questions about this policy, or a request to delete the data tied to your browser, go to ${BUSINESS.grievance.email}. See also the privacy policy for retention periods and your wider rights, and the terms of service for the commercial rules.`,
      },
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="legal"
      title={
        <>
          Cookie <em className="italic">policy.</em>
        </>
      }
      lede="The complete list of what this site stores in your browser. It is short on purpose."
      sections={sections}
    />
  );
}
