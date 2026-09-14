import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where you're stuck. We'll send back a one-pager within 48 hours — what we'd do, how long, and what it'd cost.",
  alternates: { canonical: "/contact" },
};

const contactDetails = [
  {
    label: "Email",
    value: "hello@codentlabs.com",
    href: "mailto:hello@codentlabs.com",
  },
  {
    label: "Phone",
    value: "+91 8376045365",
    href: "tel:+918376045365",
  },
];

export default function ContactPage() {
  return (
    <section className="codent-section">
      <div className="codent-wrap">
        <div className="codent-section-head">
          <div>
            <span className="codent-eyebrow">let&apos;s build</span>
            <h2 className="mt-[18px]">
              Tell us where{" "}
              <em className="italic font-light">you&apos;re stuck.</em>
            </h2>
          </div>
          <p className="codent-section-lede">
            We&apos;ll send back a one-pager within 48 hours — what we&apos;d
            do, how long, and roughly what it&apos;d cost. No deck, no
            follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-[14px] items-start">
          <ContactForm />

          <aside className="bg-[#0f0f0f] text-white rounded-[22px] p-[26px] flex flex-col gap-[22px]">
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

            <div className="codent-dashed opacity-40" />

            <div className="flex flex-col gap-[10px]">
              {contactDetails.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center justify-between rounded-[14px] bg-white/[0.07] border border-white/10 px-4 py-3 hover:bg-white/[0.12] transition"
                >
                  <span className="text-[12.5px] text-white/60">
                    {c.label}
                  </span>
                  <span className="text-[13.5px] font-medium">{c.value}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}