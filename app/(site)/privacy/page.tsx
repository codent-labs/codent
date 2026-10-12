import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from "@/lib/business";
import { social } from "@/lib/seo";

const description =
  "How Codent Labs collects, uses, shares and deletes personal data under India's Digital Personal Data Protection Act 2023 and IT Act 2000.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  ...social({
    title: "Privacy Policy - Codent Labs",
    description,
    path: "/privacy",
  }),
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: `${BUSINESS.legalName} is a ${BUSINESS.legalForm} operating as ${BUSINESS.tradingName}, registered at ${BUSINESS_ADDRESS_ONE_LINE}. For the purposes of the Digital Personal Data Protection Act 2023 we are a Data Fiduciary: we decide why and how your personal data is processed.`,
      },
      {
        type: "p",
        text: "This policy covers this website and the services we deliver under it. It does not cover third-party websites we link to - those have their own policies, and we do not control them.",
      },
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect, and what we deliberately do not",
    blocks: [
      {
        type: "p",
        text: "We collect the minimum needed to answer you and to run this site. Specifically:",
      },
      {
        type: "ul",
        items: [
          "Enquiry data you type into our forms: your name, email address, project timeline and the description of your problem. The contact form does not ask for your company name, phone number, budget or any government identifier.",
          "Newsletter data: the email address you submit, if you subscribe.",
          "Technical data our hosting provider records to serve the page securely: IP address, browser and device type, and the page requested. This is server log data, not something we ask for.",
          "Aggregate analytics data, but only if you consent. See the cookie policy.",
          "Your consent choice itself, stored in your browser.",
        ],
      },
      {
        type: "p",
        text: "If you use the contact form, we also run a spam check: an off-screen field that only an automated filler completes, and a temporary limit on how often one address can submit. Neither records anything about you beyond what you already submitted.",
      },
      {
        type: "p",
        text: "We do not collect special category data (health, biometrics, financial account credentials, political or religious belief, sexual orientation, or any data about a child under 18) and you should not send it to us through a form. We do not ask for passwords, card numbers or banking details under any circumstances - if anyone claiming to represent us does, it is not us.",
      },
      {
        type: "p",
        text: "If a project we deliver requires access to your systems, your customers' data or credentials, that is governed by a separate signed data processing agreement, not by this policy.",
      },
    ],
  },
  {
    id: "why",
    heading: "Why we use it, and on what basis",
    blocks: [
      {
        type: "p",
        text: "Under the DPDP Act 2023 we rely on the following lawful grounds:",
      },
      {
        type: "ul",
        items: [
          "Performance of a contract - to respond to your enquiry, deliver agreed work, and administer a client relationship.",
          "Compliance with a legal obligation - including retaining business records and responding to lawful requests from authorities.",
          "Consent - for optional analytics cookies, and for any marketing email you subscribe to. You may withdraw consent at any time without affecting processing already carried out.",
          "Legitimate interests - responding to you efficiently and securing our own systems, balanced against your rights.",
        ],
      },
    ],
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal data and we do not share it for anyone else's advertising. We share it only with processors who need it to do a job for us, under a written obligation to use it only for that job:",
      },
      {
        type: "ul",
        items: [
          "Our email provider (Resend), which receives the contents of what you submit so it can be delivered to us.",
          "Our newsletter provider (Resend), which holds newsletter subscribers as a contact list and processes our campaign emails. You can leave that list from any email we send.",
          "Our hosting provider, including its CDN edge, which serves the pages and applies basic bot protection.",
          "Vercel Web Analytics, if you consent to analytics cookies. It processes aggregate page view data under our instruction.",
          "Professional advisers, auditors, or law enforcement where we are legally required to disclose.",
        ],
      },
      {
        type: "p",
        text: "Some processors may be outside India. Where that happens we rely on contractual protections and, where required, the transfer mechanisms permitted under Indian law. Our current processors are listed above so you can see where your data actually goes.",
      },
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    blocks: [
      {
        type: "ul",
        items: [
          "Enquiries that do not become projects: deleted within 12 months of our last exchange.",
          "Enquiries that become projects: retained for the duration of the engagement and for 8 years afterwards, because Indian tax and accounting law requires business records to be kept for that period.",
          "Newsletter subscriptions: held in our provider's contact list until you unsubscribe, plus a suppression record of your address so we do not mail you again by mistake.",
          "Server logs: as set by our hosting provider, typically 30 days.",
          "Analytics: aggregate and short-lived, and deleted by the provider within 24 months.",
        ],
      },
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Subject to the DPDP Act 2023, you may:",
      },
      {
        type: "ul",
        items: [
          "Ask what personal data we hold about you and get a copy of it (access).",
          "Have inaccurate or incomplete data corrected.",
          "Ask us to erase data we no longer have a lawful reason to keep.",
          "Withdraw consent, including for the newsletter and for analytics cookies.",
          "Nominate someone to exercise these rights on your behalf.",
          "Receive a grievance response from us.",
        ],
      },
      {
        type: "p",
        text: `Send any request to ${BUSINESS.grievance.email}. We respond within ${BUSINESS.grievance.responseWindowDays} days and we do not charge for it. We may ask you to confirm your identity before releasing data, to make sure we do not hand your information to the wrong person.`,
      },
      {
        type: "p",
        text: "If you are not satisfied with our response, you can complain to the Data Protection Board of India, or to the relevant consumer forum for a service complaint.",
      },
    ],
  },
  {
    id: "security",
    heading: "How we protect it",
    blocks: [
      {
        type: "p",
        text: "Data is sent over TLS. Access to enquiry records is limited to the people who need it to respond to you. Contact form submissions are validated server-side rather than trusted from the browser. No system is perfectly secure, and if a breach affects your personal data we will notify you and the relevant authority within the statutory timelines rather than quietly waiting.",
      },
    ],
  },
  {
    id: "your-controls",
    heading: "Your controls",
    blocks: [
      {
        type: "p",
        text: "Clearing your browser storage for this site removes your saved consent and theme choice; the cookie banner will ask again. You can also block cookies entirely in your browser - the site will still work, it just cannot remember your consent or theme between visits.",
      },
      {
        type: "p",
        text: "See the cookie policy for the per-category detail, and the terms of service for the commercial rules that apply to paid work.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="legal"
      title={
        <>
          Privacy <em className="italic">policy.</em>
        </>
      }
      lede="What we collect, why, who sees it, and how to make us delete it. Written for people, not lawyers."
      sections={sections}
    />
  );
}
