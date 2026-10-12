import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/LegalLayout";
import { BUSINESS } from "@/lib/business";
import { social } from "@/lib/seo";

const description =
  "When Codent Labs refunds, how quickly, how the money reaches you, and the specific cases where a refund is not available under Indian consumer law.";

export const metadata: Metadata = {
  title: "Refund Policy",
  description,
  alternates: { canonical: "/refund-policy" },
  ...social({
    title: "Refund Policy - Codent Labs",
    description,
    path: "/refund-policy",
  }),
};

const sections: LegalSection[] = [
  {
    id: "important",
    heading: "First, the important bit",
    blocks: [
      {
        type: "p",
        text: "We are a services studio. You are not buying a physical product, so there is no \"7-day return\" the way there is for a physical product bought online. What you have instead is the statutory remedy under the Consumer Protection Act 2019 for deficient service, plus the refund terms written into your engagement agreement, which always win over this page.",
      },
      {
        type: "p",
        text: "Your engagement agreement is the document that actually governs money on a project. Read this page as the baseline that applies where the agreement is silent.",
      },
    ],
  },
  {
    id: "consumer-rights",
    heading: "Your statutory rights if a service is deficient",
    blocks: [
      {
        type: "p",
        text: "If we fail to deliver a service of the promised reasonable standard, or deliver a defective service, you have remedies under the Consumer Protection Act 2019 independent of anything below:",
      },
      {
        type: "ul",
        items: [
          "A refund of the amount paid, or",
          "Free correction or re-performance of the deficient service within a reasonable time, or",
          "Costs incurred to have the deficient service corrected by another provider.",
        ],
      },
      {
        type: "p",
        text: "If you are unhappy, tell us. We would rather fix the work than argue about the clause. Raise it in writing and we respond within 30 days.",
      },
    ],
  },
  {
    id: "before-you-start",
    heading: "Before a project starts",
    blocks: [
      {
        type: "p",
        text: "This is where refunds are genuinely straightforward. Work begins only once the first invoice is paid, and that first invoice is fully refundable if you cancel before we start.",
      },
      {
        type: "ul",
        items: [
          "Cancelled before the kickoff call: full refund of all invoices paid.",
          "Cancelled after the kickoff call but before any design, code or written deliverable has been produced: full refund of the first invoice.",
          "Once substantive work has been delivered, refunds are pro-rata against work actually completed and approved.",
        ],
      },
    ],
  },
  {
    id: "not-refundable",
    heading: "Where a refund is not available",
    blocks: [
      {
        type: "ul",
        items: [
          "Work already delivered and accepted, including rounds of revision included in your engagement.",
          "Third-party costs we have already committed to on your instruction - stock photography, licensed fonts, paid stock, print runs, domain and hosting fees, app store and marketplace fees.",
          "Custom development work commissioned specifically for you, once delivered, where it cannot be returned.",
          "Unused add-on hours or unused time blocks once they have expired, since the capacity was held for you.",
          "Any amount where returning it would mean we end up paying more in transfer fees than the refund is worth.",
        ],
      },
      {
        type: "p",
        text: "Engagement agreements often set out more specific terms - for example, a kill fee covering work already done if a project is cancelled mid-flight. Where they differ from this page, the agreement applies.",
      },
    ],
  },
  {
    id: "how-to-claim",
    heading: "How to claim",
    blocks: [
      {
        type: "ol",
        items: [
          `Email ${BUSINESS.grievance.email} from the address used for the engagement, with the project name or invoice number and the reason.`,
          "We acknowledge within 7 working days and give a decision within 30 days.",
          "If we agree, we tell you the amount and the payment route. No forms beyond that.",
        ],
      },
    ],
  },
  {
    id: "how-you-get-paid",
    heading: "How you get the money back",
    blocks: [
      {
        type: "p",
        text: "Refunds go back the way you paid. Bank transfers are returned to the originating account within 10 working days of approval. We do not refund to a third party or a different account, because that is how refund fraud works.",
      },
      {
        type: "ul",
        items: [
          "Bank transfer or UPI: 10 working days from approval.",
          "Card payment: 5 to 10 working days, and the credit usually appears on your statement. The exact timeline is set by your bank, not by us.",
          "We never charge a cancellation or processing fee for a refund we have agreed to.",
        ],
      },
      {
        type: "p",
        text: "Any interest, statutory or otherwise, is payable where required by law. GST charged on the original invoice is refunded proportionately when the underlying supply is reversed.",
      },
    ],
  },
  {
    id: "chargebacks",
    heading: "Disputes and chargebacks",
    blocks: [
      {
        type: "p",
        text: "If a payment provider or bank starts a chargeback, we will submit the engagement agreement, delivery records and this policy as evidence. Please raise the problem with us first - a direct conversation resolves nearly all of these in days, a chargeback takes months and puts a hold on the rest of the account.",
      },
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      eyebrow="legal"
      title={
        <>
          Refund <em className="italic">policy.</em>
        </>
      }
      lede="No products, no returns window - so here is honestly what happens to money when a project does not work out."
      sections={sections}
    />
  );
}
