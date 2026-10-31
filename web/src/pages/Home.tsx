import { Seo } from '../components/Seo'
import { Hero } from '../components/home/Hero'
import { Services } from '../components/home/Services'
import { Interiors } from '../components/home/Interiors'
import { FeaturedProjects } from '../components/home/FeaturedProjects'
import { Process } from '../components/home/Process'
import { Testimonials } from '../components/home/Testimonials'
import { QuoteForm } from '../components/QuoteForm'
import { Eyebrow } from '../components/ui'
import { settings } from '../lib/content'

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Services />
      <Interiors />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <section id="quote" className="mx-auto flex max-w-[1360px] scroll-mt-6 flex-wrap gap-16 px-6 pb-28 md:px-8">
        <div className="flex flex-[1_1_380px] flex-col gap-6">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-[52px]">
            Let’s build something together.
          </h2>
          <p className="text-[17px] leading-relaxed text-muted">
            Tell us about your project. We reply within {settings.replyTime} with next steps.
          </p>
          <div className="mt-2 flex flex-col gap-3">
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="font-medium">
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="font-medium">
              {settings.email}
            </a>
          </div>
        </div>
        <div className="flex-[1.3_1_520px] rounded-3xl bg-white p-7 md:p-10">
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
