import { Link } from 'react-router-dom'
import { phoneHref, settings } from '../lib/content'
import { whatsappLink } from '../lib/quote'

const columns = [
  {
    title: 'Work',
    links: [
      { to: '/projects', label: 'Projects' },
      { to: '/#services', label: 'Services' },
      { to: '/#interiors', label: 'Interiors' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/#testimonials', label: 'Reviews' },
      { to: '/#process', label: 'How we work' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-navy text-on-dark-2">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12 px-6 pb-8 pt-16 md:px-8">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex flex-[1_1_300px] items-center gap-5">
            <span className="block rounded-[18px] bg-white p-3.5">
              <img src="/logo.png" alt="Lenvik Construction and Fabrication logo" className="block h-[120px] w-auto" />
            </span>
            <p className="max-w-[260px] text-[15px] leading-relaxed">
              {settings.tagline}
              <br />
              <a href={phoneHref} className="text-white hover:text-sky">
                {settings.phone}
              </a>
              <br />
              <a href={`mailto:${settings.email}`} className="text-white hover:text-sky">
                {settings.email}
              </a>
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-16 text-[15px]">
            {columns.map((c) => (
              <div key={c.title} className="flex flex-col gap-2.5">
                <strong className="font-medium text-white">{c.title}</strong>
                {c.links.map((l) => (
                  <Link key={l.to} to={l.to} className="hover:text-white">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-2.5">
              <strong className="font-medium text-white">Talk to us</strong>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp
              </a>
              <a href={phoneHref} className="hover:text-white">
                Call
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-navy-line pt-6 text-sm">
          <span>
            © {new Date().getFullYear()} {settings.companyName}
          </span>
          <span>{settings.hours}</span>
        </div>
      </div>
    </footer>
  )
}
