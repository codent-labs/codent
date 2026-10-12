import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";
import { BUSINESS, BUSINESS_ADDRESS_ONE_LINE } from "@/lib/business";
import { social } from "@/lib/seo";

const description =
  "The terms governing use of the Codent Labs website and our studio services, under Indian law including the IT Act 2000, MSMED Act 2006 and Consumer Protection Act 2019.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: "/terms" },
  ...social({
    title: "Terms of Service - Codent Labs",
    description,
    path: "/terms",
  }),
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    blocks: [
      {
        type: "p",
        text: `These terms govern your use of ${BUSINESS.siteUrl} and any services ${BUSINESS.legalName} provides. By using the site or engaging us, you accept them. If you do not accept them, do not use the site.`,
      },
      {
        type: "p",
        text: "Where these terms conflict with a signed engagement agreement or statement of work for a specific project, that document wins for that project and these terms apply to everything else.",
      },
    ],
  },
  {
    id: "about-us",
    heading: "About us",
    blocks: [
      {
        type: "p",
        text: `${BUSINESS.legalName} is a ${BUSINESS.legalForm} of ${BUSINESS.tradingName}, with its registered office at ${BUSINESS_ADDRESS_ONE_LINE}, operating since ${BUSINESS.established}. We can be reached at ${BUSINESS.email} or ${BUSINESS.phone}.`,
      },
      {
        type: "p",
        text: "Because we are a sole proprietorship, there is no separate corporate entity behind this name. Contracts, invoices and legal correspondence are made in the proprietor's name, and our liability is that of the proprietor rather than a limited-liability company.",
      },
    ],
  },
  {
    id: "services",
    heading: "What we actually sell",
    blocks: [
      {
        type: "p",
        text: "We provide brand, product design and engineering services. Nothing on this site is an offer capable of acceptance. A project begins only when both sides sign an engagement agreement setting out scope, deliverables, dates, price and payment terms.",
      },
      {
        type: "p",
        text: "Estimates and one-pagers sent before that point are indicative. They are a good-faith description of what we would do and roughly what it would cost, not a fixed quotation, and they are not binding until confirmed in writing.",
      },
      {
        type: "p",
        text: "Where we quote a fixed price, that price is fixed for the agreed scope. Work outside that scope is quoted separately before we start it. We will not bill you for work we did not agree to in writing.",
      },
    ],
  },
  {
    id: "your-obligations",
    heading: "Your obligations",
    blocks: [
      {
        type: "ul",
        items: [
          "Give us accurate information and the access we need to do the work. A project blocked on your inputs runs on the calendar, not on ours.",
          "Confirm in writing that we may use work you supply, and that you have the rights to it.",
          "Comply with applicable law in connection with the work, including export and sector-specific rules.",
          "Do not send us special category personal data through a form or a shared document.",
        ],
      },
    ],
  },
  {
    id: "ip",
    heading: "Intellectual property",
    blocks: [
      {
        type: "p",
        text: "On full payment of all invoices, ownership of the final deliverables transfers to you. Until then we retain ownership and you may use deliverables only to evaluate the work.",
      },
      {
        type: "p",
        text: "We keep ownership of our methods, tooling, internal process and any pre-existing materials, and grant you a perpetual, non-exclusive licence to use those embedded in the deliverables. We may show the work in our portfolio unless the agreement says otherwise in writing - if a project is confidential, say so before we start and we will agree how it is referenced.",
      },
      {
        type: "p",
        text: "Third-party and open-source components remain under their own licences, and we will identify them where a licence requires it.",
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    blocks: [
      {
        type: "p",
        text: "Invoices are payable within the period stated on the engagement agreement. We may pause work on an engagement if an invoice is more than 30 days overdue, after written notice. Fees are exclusive of GST, which is charged at the prevailing rate where applicable.",
      },
    ],
  },
  {
    id: "liability",
    heading: "Liability",
    blocks: [
      {
        type: "p",
        text: "We provide professional services with reasonable skill and care, but we do not warrant that the site or the work will be uninterrupted, error-free, or fit for a particular purpose unless we have expressly agreed that in writing.",
      },
      {
        type: "p",
        text: "To the extent permitted by law, our total aggregate liability arising out of an engagement is limited to the fees you paid us for that engagement in the 6 months before the claim. We are not liable for indirect or consequential loss, including lost profit, lost data or business interruption.",
      },
      {
        type: "p",
        text: "Nothing in these terms excludes or limits liability that cannot lawfully be excluded, including for death or personal injury caused by negligence, for fraud, or under the Consumer Protection Act 2019 where it applies to you as a consumer.",
      },
    ],
  },
  {
    id: "client-materials",
    heading: "Client materials and confidentiality",
    blocks: [
      {
        type: "p",
        text: "You keep all rights in what you give us. We may use it solely to deliver your project. We treat project material as confidential, use reasonable care, and only disclose it where the engagement agreement requires it or where we are legally compelled to.",
      },
    ],
  },
  {
    id: "indian-law",
    heading: "Governing law and consumer rights",
    blocks: [
      {
        type: "p",
        text: `These terms are governed by the laws of India. Subject to the next paragraph, the courts at ${BUSINESS.jurisdictionCity}, ${BUSINESS.jurisdictionState} have exclusive jurisdiction.`,
      },
      {
        type: "p",
        text: "If you are a consumer under the Consumer Protection Act 2019, nothing in this section takes away your right to approach the appropriate consumer forum or the National Consumer Helpline, and we will participate in good-faith grievance resolution. Micro and small enterprises may additionally rely on the protections of the Micro, Small and Medium Enterprises Development Act 2006, including the authority to seek interim relief for delayed payment.",
      },
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use of this site",
    blocks: [
      {
        type: "p",
        text: "You may read, print and share this site for lawful purposes. You may not attempt to disrupt it, probe it for vulnerabilities without written permission, scrape it at a rate that degrades service for others, or republish substantial parts of it commercially without our written consent. We may block access that we reasonably believe is abusive or automated.",
      },
      {
        type: "p",
        text: "We own the site design, copy and images, or hold the rights to use them. See the terms in the footer for reuse.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: "We may update these terms. The revision date at the top always reflects the current version, and continuing to use the site after a change means you accept it.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="legal"
      title={
        <>
          Terms of <em className="italic">service.</em>
        </>
      }
      lede="The rules for using this site and working with us, in plain language and under Indian law."
      sections={sections}
    />
  );
}
