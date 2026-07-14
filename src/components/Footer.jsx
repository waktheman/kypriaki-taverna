import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-display text-2xl font-semibold">
            Kypriaki<span className="text-terracotta">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
            Authentic Cypriot traditions, modern touch — souvla over coal, garden-fresh meze, and
            Commandaria under the Paphos sky.
          </p>
          <p className="mt-4 font-display text-sm italic text-gold">Est. 1962 · Paphos, Cyprus</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">Follow</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://instagram.com/kypriakitaverna"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-cream/70 transition-colors duration-200 ease-premium hover:text-gold"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                @kypriakitaverna
              </a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="/#about" className="text-cream/70 transition-colors duration-200 ease-premium hover:text-gold">Our Story</a>
            </li>
            <li>
              <Link to="/menu" className="text-cream/70 transition-colors duration-200 ease-premium hover:text-gold">Full Menu</Link>
            </li>
            <li>
              <a href="/#gallery" className="text-cream/70 transition-colors duration-200 ease-premium hover:text-gold">Gallery</a>
            </li>
            <li>
              <a href="/#reserve" className="text-cream/70 transition-colors duration-200 ease-premium hover:text-gold">Reservations</a>
            </li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">Visit</h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-cream/70">
            <p>Terpsithea Street</p>
            <p>Paphos 8011, Cyprus</p>
            <p className="pt-2">Mon–Sat · 12:00–23:00</p>
            <p>Sun · 12:00–22:00</p>
            <p className="pt-2">
              <a href="tel:+35796239471" className="transition-colors duration-200 ease-premium hover:text-gold">
                +357 96 239 471
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Kypriaki Taverna. All rights reserved.</p>
          <p className="font-display italic">kali orexi — good appetite</p>
        </div>
      </div>
    </footer>
  )
}
