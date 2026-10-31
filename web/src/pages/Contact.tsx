import { useState } from "react";
import { Mail, MessageCircle, Minus, Phone, Plus } from "lucide-react";
import { faqs, settings } from "../lib/content";
import { whatsappLink } from "../lib/quote";
import { QuoteForm } from "../components/QuoteForm";
import { Seo } from "../components/Seo";
import { Eyebrow } from "../components/ui";

const methods = [
  {
    label: "Call us",
    value: settings.phone,
    note: settings.hours,
    href: `tel:${settings.phone.replace(/\s/g, "")}`,
    Icon: Phone,
  },
  {
    label: "WhatsApp",
    value: settings.phone,
    note: "Send photos or plans directly",
    href: whatsappLink(),
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "Email",
    value: settings.email,
    note: "For tenders and documents",
    href: `mailto:${settings.email}`,
    Icon: Mail,
  },
];

const nextSteps = [
  {
    title: "We call you",
    desc: `Within ${settings.replyTime}, to understand the project.`,
  },
  {
    title: "Site visit",
    desc: "Our engineer visits the site to measure and assess.",
  },
  {
    title: "Detailed quote",
    desc: "A written estimate with scope, timeline and costs.",
  },
];

export default function Contact() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Seo
        title="Contact"
        description="Request a quote for house construction, interiors, steel, PEB, roofing or piping work."
        path="/contact"
      />

      <section className="mx-auto flex max-w-[1360px] flex-wrap items-end justify-between gap-8 px-6 pb-12 pt-16 md:px-8">
        <div className="flex flex-col gap-4">
          <Eyebrow dot>Contact</Eyebrow>
          <h1 className="max-w-[820px] font-display text-[clamp(44px,6vw,84px)] font-medium leading-none tracking-[-0.04em]">
            Let’s build your vision.
          </h1>
        </div>
        <p className="max-w-[420px] text-[17px] leading-relaxed text-muted">
          A new home, an interior, a PEB shed or piping for your plant — tell us
          what you need and we will get back within {settings.replyTime}.
        </p>
      </section>

      <section
        aria-label="Ways to reach us"
        className="mx-auto max-w-[1360px] px-6 pb-14 md:px-8"
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {methods.map(({ label, value, note, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-full flex-col gap-5 rounded-[20px] border border-line bg-white p-6 transition-colors hover:border-navy"
              >
                <span className="grid size-12 place-items-center rounded-[14px] bg-mist text-royal">
                  <Icon size={22} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm text-muted">{label}</span>
                  <strong className="break-words font-display text-[19px] font-medium">
                    {value}
                  </strong>
                  <span className="text-[13px] text-muted">{note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto flex max-w-[1360px] flex-wrap items-start gap-6 px-6 pb-24 md:px-8">
        <div className="flex-[1.6_1_560px] rounded-[28px] bg-white p-7 md:p-11">
          <QuoteForm />
        </div>
        <aside className="flex flex-[1_1_360px] flex-col gap-5 rounded-[28px] bg-navy p-8 text-white">
          <strong className="font-display text-xl font-medium">
            What happens next
          </strong>
          <ol className="flex flex-col gap-4.5">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-3.5">
                <span className="grid size-7.5 shrink-0 place-items-center rounded-full bg-sky text-sm font-semibold text-navy">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5">
                  <strong className="font-medium">{s.title}</strong>
                  <span className="text-sm leading-normal text-on-dark">
                    {s.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {faqs.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto flex max-w-[1360px] flex-wrap gap-16 px-6 py-24 md:px-8">
            <div className="flex flex-[1_1_320px] flex-col gap-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-[44px]">
                Questions we hear often
              </h2>
            </div>
            <div className="flex flex-[2_1_560px] flex-col">
              {faqs.map((f, k) => {
                const isOpen = open === k;
                return (
                  <div key={f.question} className="border-t border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : k)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${k}`}
                        className="flex min-h-18 w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-display text-[19px] font-medium">
                          {f.question}
                        </span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-2">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                    </h3>
                    <p
                      id={`faq-${k}`}
                      hidden={!isOpen}
                      className="mb-6 max-w-[680px] leading-[1.7] text-muted"
                    >
                      {f.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
