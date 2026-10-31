import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

// Scrolls to #hash targets after navigation, otherwise back to the top
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-white px-4 py-2 text-navy focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header dark={pathname === '/'} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
