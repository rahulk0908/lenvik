import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { settings } from '../../lib/content'

// The video only loads on larger screens without reduced motion; phones and the prerendered HTML get the poster
function useHeroVideo() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShow(wide && !calm && Boolean(settings.heroVideo))
  }, [])
  return show
}

export function Hero() {
  const showVideo = useHeroVideo()

  return (
    <section className="bg-navy px-4 pb-6 text-white">
      <div className="relative isolate mx-auto flex min-h-[560px] max-w-[1360px] flex-col justify-end overflow-hidden rounded-[22px] md:min-h-[640px] md:rounded-[28px]">
        {settings.heroPoster && (
          <img src={settings.heroPoster} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
        )}
        {showVideo && settings.heroVideo && (
          <video
            src={settings.heroVideo}
            poster={settings.heroPoster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-navy/60" />

        <div className="flex flex-wrap items-end justify-between gap-10 p-6 md:p-14">
          <div className="flex flex-[1_1_560px] flex-col gap-6">
            <span className="inline-flex items-center gap-2.5 text-sm text-mist">
              <span className="size-2 rounded-full bg-sky" />
              {settings.heroEyebrow} · Since {settings.yearFounded}
            </span>
            <h1 className="max-w-[900px] font-display text-[clamp(42px,6.2vw,92px)] font-medium leading-none tracking-[-0.04em]">
              {settings.tagline}
            </h1>
          </div>
          <div className="flex flex-[0_1_360px] flex-col gap-6">
            <p className="text-[17px] leading-relaxed text-mist">{settings.heroText}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-sky px-6 font-medium text-navy hover:bg-sky-pale"
              >
                Explore projects <ArrowUpRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-[52px] items-center rounded-full border border-navy-border px-6 font-medium text-white hover:border-white"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      <dl className="mx-auto grid max-w-[1360px] grid-cols-3 gap-4 px-2 pb-2 pt-10 md:gap-6 md:px-4">
        {settings.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1.5 border-t border-navy-line pt-5">
            <dt className="text-sm text-on-dark-2">{s.label}</dt>
            <dd className="font-display text-3xl font-medium leading-none tracking-[-0.03em] md:text-[44px]">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
