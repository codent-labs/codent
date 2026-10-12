import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { BUSINESS } from "@/lib/business";
import { social } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where you're stuck. We'll send back a one-pager within 48 hours - what we'd do, how long, and what it'd cost.",
  alternates: { canonical: "/contact" },
  ...social({
    title: "Contact - Codent Labs",
    description:
      "Tell us where you're stuck. We'll send back a one-pager within 48 hours - what we'd do, how long, and what it'd cost.",
    path: "/contact",
  }),
};

const contactDetails = [
  {
    label: "Email",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    label: "Phone",
    value: BUSINESS.phone,
    href: BUSINESS.phoneHref,
  },
  {
    label: "Grievances",
    value: BUSINESS.grievance.email,
    href: `mailto:${BUSINESS.grievance.email}`,
  },
];

export default function ContactPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">let&apos;s build</span>
            <h1 className="mt-[18px]">
              Tell us where{" "}
              <em className="italic">you&apos;re stuck.</em>
            </h1>
          </div>
          <p className="codent-section-lede">
            We&apos;ll send back a one-pager within 48 hours - what we&apos;d
            do, how long, and roughly what it&apos;d cost. No deck, no
            follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-[14px] items-start">
          <ContactForm />

          <aside className="bg-[#0f0f0f] dark:bg-card text-white rounded-[16px] p-[26px] flex flex-col gap-[22px]">
            <div>
              <h3 className="text-[15px] font-semibold">What happens next</h3>
              <ol className="mt-[14px] flex flex-col gap-[14px]">
                {[
                  "We read your note and reply within 48 hours.",
                  "You get a one-pager: what we'd do, how long, what it'd cost.",
                  "If it feels right, a 30-minute call. No deck, no pressure.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-[13.5px] text-white/75 leading-[1.55]">
                    <span className="w-5 h-5 rounded-full bg-white/12 text-[11px] font-bold inline-flex items-center justify-center flex-shrink-0 text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex flex-col gap-[10px]">
              {contactDetails.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center justify-between rounded-[16px] bg-white/[0.07] border border-white/10 px-4 py-3 hover:bg-white/[0.12] transition"
                >
                  <span className="text-[12.5px] text-white/70">
                    {c.label}
                  </span>
                  <span className="text-[13.5px] font-medium">{c.value}</span>
                </a>
              ))}
            </div>

            {/* Registered entity and postal address. Required to be published
                alongside a contact route for an Indian seller, and it gives a
                visitor a way to serve formal notice by post. */}
            <div className="text-[12.5px] text-white/75 leading-[1.65] pt-1">
              <div className="font-semibold text-white">{BUSINESS.legalName}</div>
              <address className="not-italic mt-1">
                {BUSINESS.address.line1},<br />
                {BUSINESS.address.line2} {BUSINESS.address.postalCode}
              </address>
              <div className="mt-2 text-white/70">
                We respond to grievances within{" "}
                {BUSINESS.grievance.responseWindowDays} days.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}