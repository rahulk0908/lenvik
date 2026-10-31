import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import { settings, testimonials } from '../../lib/content'
import { SectionHeader } from '../ui'

function initials(t: { name: string; project: { title: string } | null }) {
  const source = t.name.startsWith('[') && t.project ? t.project.title : t.name
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  if (!n) return null
  const cur = testimonials[i]

  return (
    <section id="testimonials" className="mx-auto max-w-[1360px] scroll-mt-6 px-6 py-28 md:px-8">
      <SectionHeader
        eyebrow="Client stories"
        title="What our clients say"
        aside={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setI((i - 1 + n) % n)}
              aria-label="Previous testimonial"
              className="grid size-12 place-items-center rounded-full border border-line-2 bg-white hover:border-navy"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setI((i + 1) % n)}
              aria-label="Next testimonial"
              className="grid size-12 place-items-center rounded-full bg-navy text-white hover:bg-royal"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap items-stretch gap-4">
        <figure className="flex min-h-[460px] flex-[2_1_600px] flex-col justify-between gap-10 rounded-[28px] bg-navy p-8 text-white md:p-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Quote size={44} className="fill-sky text-sky" aria-hidden="true" />
            <span className="rounded-full border border-navy-border px-3.5 py-1.5 text-[13px] text-mist">{cur.service}</span>
          </div>
          <blockquote aria-live="polite" className="font-display text-2xl leading-[1.35] tracking-[-0.02em] md:text-[32px]">
            “{cur.quote}”
          </blockquote>
          <figcaption className="flex flex-wrap items-center justify-between gap-5 border-t border-navy-line pt-7">
            <span className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-sky font-display text-lg font-semibold text-navy">
                {initials(cur)}
              </span>
              <span className="flex flex-col gap-0.5">
                <strong className="text-[17px] font-medium">{cur.name}</strong>
                <span className="text-sm text-on-dark-2">{cur.role}</span>
              </span>
            </span>
            {cur.project && (
              <Link
                to={`/projects/${cur.project.slug}`}
                className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-white underline underline-offset-4 hover:text-sky"
              >
                View {cur.project.title} <ArrowUpRight size={16} />
              </Link>
            )}
          </figcaption>
        </figure>

        <div className="flex flex-[1_1_340px] flex-col gap-3">
          {testimonials.map((t, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setI(k)}
              aria-pressed={k === i}
              className={`flex flex-1 items-center gap-3.5 rounded-[20px] border px-5.5 py-5 text-left transition-colors ${
                k === i ? 'border-navy bg-white' : 'border-line hover:border-line-2 hover:bg-white/60'
              }`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist font-display text-sm font-semibold text-royal">
                {initials(t)}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <strong className="font-medium">{t.project?.title ?? t.name}</strong>
                <span className="text-sm text-muted">
                  {t.service} · {t.name}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {settings.clientLogos.length > 0 && (
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
          <span className="text-sm text-muted">Trusted by</span>
          <ul className="grid flex-[1_1_600px] grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
            {settings.clientLogos.map((c, k) => (
              <li key={k} className="grid h-16 place-items-center rounded-2xl border border-line bg-white px-4 text-[13px] text-muted">
                {c.logo ? <img src={c.logo} alt={c.name} className="max-h-9 w-auto" loading="lazy" /> : c.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
