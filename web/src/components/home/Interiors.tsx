import { Link } from 'react-router-dom'
import { settings } from '../../lib/content'
import { Eyebrow, Reveal } from '../ui'

export function Interiors() {
  return (
    <section id="interiors" className="mx-auto max-w-[1360px] scroll-mt-6 px-6 pb-28 md:px-8">
      <Reveal>
        <div className="flex flex-wrap gap-14 rounded-[28px] bg-navy p-8 text-white md:p-16">
          <div className="flex flex-[1_1_380px] flex-col gap-5">
            <Eyebrow dot dark>
              Interiors
            </Eyebrow>
            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl">
              Designed in 3D. Delivered on site.
            </h2>
            <p className="max-w-[420px] text-[17px] leading-relaxed text-on-dark">
              From the first layout to the last coat of paint, our interior team plans the space and our own crews carry it out.
            </p>
            <Link
              to="/contact"
              className="mt-2 inline-flex h-[52px] items-center self-start rounded-full bg-sky px-6 font-medium text-navy hover:bg-sky-pale"
            >
              Plan your interior
            </Link>
          </div>
          <ul className="grid flex-[1.4_1_480px] gap-3 sm:grid-cols-2">
            {settings.interiorOfferings.map((o, i) => (
              <li key={o.title} className="flex flex-col gap-1.5 rounded-2xl bg-navy-2 px-5.5 py-5">
                <span className="text-[13px] text-on-dark-2">{String(i + 1).padStart(2, '0')}</span>
                <strong className="font-display text-[19px] font-medium">{o.title}</strong>
                <span className="text-sm leading-normal text-on-dark">{o.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
