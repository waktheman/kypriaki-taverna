import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SITE } from '../config.js'

const NAV_LINKS = [
  { label: 'About', hash: '#about' },
  { label: 'Menu', hash: '#menu' },
  { label: 'Gallery', hash: '#gallery' },
  { label: 'Visit', hash: '#visit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const goTo = (hash) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        aria-label="Main"
        className={`flex w-full items-center justify-between transition-all duration-500 ease-premium ${
          scrolled
            ? 'max-w-3xl rounded-full border border-cream/15 bg-charcoal/60 px-5 py-2.5 shadow-xl backdrop-blur-xl'
            : 'max-w-6xl bg-transparent px-2 py-3'
        }`}
      >
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-cream"
          onClick={() => pathname === '/' && window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {SITE.name}<span className="text-terracotta">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, hash }) =>
            label === 'Menu' ? (
              <Link
                key={label}
                to="/menu"
                className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition-colors duration-200 ease-premium hover:text-gold"
              >
                {label}
              </Link>
            ) : (
              <button
                key={label}
                type="button"
                onClick={() => goTo(hash)}
                className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition-colors duration-200 ease-premium hover:text-gold"
              >
                {label}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => goTo('#reserve')}
            className="ml-2 rounded-full bg-terracotta px-5 py-2 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:bg-gold hover:text-charcoal"
          >
            Reserve
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 ease-premium ${
              open ? 'translate-y-1 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ease-premium ${
              open ? '-translate-y-1 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile slide-down panel */}
      {open && (
        <div
          id="mobile-menu"
          className="mobile-panel absolute inset-x-4 top-[4.5rem] flex flex-col gap-1 rounded-2xl border border-cream/15 bg-charcoal/90 p-4 shadow-2xl backdrop-blur-xl md:hidden"
        >
          {NAV_LINKS.map(({ label, hash }, i) =>
            label === 'Menu' ? (
              <Link
                key={label}
                to="/menu"
                style={{ animationDelay: `${i * 60}ms` }}
                className="rounded-2xl px-4 py-3 text-base font-medium text-cream/90 hover:bg-cream/10"
              >
                {label}
              </Link>
            ) : (
              <button
                key={label}
                type="button"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => goTo(hash)}
                className="rounded-2xl px-4 py-3 text-left text-base font-medium text-cream/90 hover:bg-cream/10"
              >
                {label}
              </button>
            ),
          )}
          <button
            type="button"
            style={{ animationDelay: `${NAV_LINKS.length * 60}ms` }}
            onClick={() => goTo('#reserve')}
            className="mt-1 rounded-full bg-terracotta px-4 py-3 text-base font-semibold text-cream"
          >
            Reserve a Table
          </button>
        </div>
      )}
    </header>
  )
}
