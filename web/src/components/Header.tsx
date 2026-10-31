import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const nav = [
  { to: '/projects', label: 'Projects' },
  { to: '/#services', label: 'Services' },
  { to: '/#interiors', label: 'Interiors' },
  { to: '/#testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ dark }: { dark: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${dark ? 'text-white' : 'text-navy'}`}>
      <span className={`grid size-10 place-items-center rounded-[10px] bg-white ${dark ? '' : 'border border-line'}`}>
        <img src="/logo-mark.png" alt="" className="h-[30px] w-auto" />
      </span>
      <span className="font-display text-[21px] font-semibold tracking-[0.22em]">LENVIK</span>
    </Link>
  )
}

export function Header({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location])

  const link = dark ? 'text-on-dark hover:text-white' : 'text-muted hover:text-navy'
  const active = dark ? 'text-white' : 'text-navy font-medium'
  const cta = dark ? 'bg-white text-navy' : 'bg-navy text-white'

  return (
    <header className={dark ? 'bg-navy' : 'bg-ground'}>
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-6 py-5 md:px-8">
        <Logo dark={dark} />
        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] lg:flex">
          {nav.map((n) =>
            n.to.includes('#') ? (
              <Link key={n.to} to={n.to} className={link}>
                {n.label}
              </Link>
            ) : (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? active : link)}>
                {n.label}
              </NavLink>
            ),
          )}
          <Link to="/contact" className={`inline-flex h-11 items-center rounded-full px-5 font-medium ${cta}`}>
            Start a project
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`grid size-11 place-items-center rounded-full border lg:hidden ${
            dark ? 'border-navy-border text-white' : 'border-line-2 text-navy'
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className={`px-6 pb-6 lg:hidden ${dark ? 'text-white' : 'text-navy'}`}>
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={`block border-b py-4 font-display text-xl ${dark ? 'border-navy-line' : 'border-line'}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-6 flex h-12 items-center justify-center rounded-full bg-sky font-medium text-navy">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  )
}
