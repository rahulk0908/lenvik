import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../../lib/content'
import { sized } from '../../lib/image'
import { Reveal, SectionHeader } from '../ui'

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1360px] scroll-mt-6 px-6 pb-24 pt-28 md:px-8">
      <SectionHeader
        eyebrow="Services"
        title="A complete house construction solution."
        aside={
          <p className="max-w-[400px] text-[17px] leading-relaxed text-muted">
            Planning, structure, steel, roofing and interiors from one team, so you deal with one partner instead of six.
          </p>
        }
      />
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Reveal className="h-full">
              <Link
                to="/projects"
                className="group relative isolate flex h-full min-h-[460px] flex-col justify-between gap-8 overflow-hidden rounded-[22px] p-7 text-white"
              >
                {s.image ? (
                  <img
                    src={sized(s.image, 900)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 -z-30 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="placeholder-dark absolute inset-0 -z-30 flex justify-center pt-24 text-xs uppercase tracking-[0.14em] text-on-dark-2 transition-transform duration-700 group-hover:scale-105">
                    [Photo: {s.imageHint}]
                  </div>
                )}
                <div className="service-scrim absolute inset-0 -z-20" />
                <div className="absolute inset-0 -z-10 bg-navy/35 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-medium">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="grid size-11 place-items-center rounded-full border border-white/40 transition-colors group-hover:border-sky group-hover:bg-sky group-hover:text-navy">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <h3 className="font-display text-[28px] font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-mist">{s.description}</p>
                  <ul className="mt-1 flex flex-col gap-2 border-t border-white/20 pt-4">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm">
                        <Check size={16} strokeWidth={2.2} className="shrink-0 text-sky" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
