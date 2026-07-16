import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { IMAGES } from '../data/menu.js'

const CARDS = [
  {
    title: 'Commandaria Reserve',
    subtitle: 'The oldest named wine on earth, from the hills above Paphos.',
    image: IMAGES.commandaria,
    alt: 'Amber Commandaria wine catching the evening light',
    meta: 'Dessert wine · Xynisteri & Mavro · €9.50',
    story: [
      'Commandaria begins in the vineyards of the Troodos foothills, where Xynisteri and Mavro grapes are left to ripen well past harvest, then laid out in the sun for ten days until they wrinkle and their sugars deepen to honey.',
      'The pressed must is boiled down, fortified, and rested in old oak for years — sometimes decades — in a solera of barrels that are never fully emptied, so a drop of every vintage lives on in the next.',
      'We pour it the way our grandfather did: unhurried, in a small glass, at the end of the evening — amber, warm, and tasting of raisins, carob, and Cypriot sun.',
    ],
  },
  {
    title: 'Sunday Kleftiko',
    subtitle: 'Sealed at midnight, opened at noon. Only on Sundays, only until it runs out.',
    image: IMAGES.kleftiko,
    alt: 'Sunday kleftiko fresh from the wood oven',
    meta: 'Slow-roasted lamb · Sundays only · €21.99',
    story: [
      'The name means "stolen" — bandits once cooked lamb sealed underground so no smoke would give them away. We keep the method, if not the crime.',
      'Late on Saturday the lamb is rubbed with oregano, garlic, and lemon, wrapped tight in parchment with potatoes and a little wine, and sealed into the wood oven while the coals are still glowing.',
      'It roasts low and slow all night. By Sunday noon the parcel opens to steam and falling-apart meat — no knife needed, just a spoon. When the day’s batch is gone, it’s gone until next Sunday.',
    ],
  },
]

export default function Wine() {
  const [open, setOpen] = useState(null) // card index or null
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)
  const isOpen = open !== null

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        )
        if (f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    lastFocused.current = document.activeElement
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocused.current?.focus?.()
    }
  }, [isOpen])

  const card = isOpen ? CARDS[open] : null

  return (
    <section className="bg-sage py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/90">
          Wine &amp; Specialties
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl"
        >
          Poured slowly, <span className="italic text-gold">made slower.</span>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 150}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left sm:aspect-[3/4]"
              >
                <img
                  src={c.image.src}
                  srcSet={c.image.srcSet}
                  sizes="(min-width: 768px) 44vw, 90vw"
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">{c.subtitle}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    How it’s made
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Preparation story modal — scales in from 0.96 per motion rules */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wine-modal-title"
          onClick={() => setOpen(null)}
          className="backdrop-enter fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-enter grid max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-cream text-charcoal shadow-2xl sm:grid-cols-2"
          >
            <img
              src={card.image.src}
              srcSet={card.image.srcSet}
              sizes="(min-width: 640px) 24rem, 0px"
              alt={card.alt}
              className="hidden h-full max-h-[88vh] w-full object-cover sm:block"
            />
            <div className="overflow-y-auto p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-deep">
                {card.meta}
              </p>
              <h3 id="wine-modal-title" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                {card.title}
              </h3>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-charcoal/70">
                {card.story.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="mt-8 rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition-colors duration-200 ease-premium hover:border-terracotta-deep hover:text-terracotta-deep"
              >
                Close
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-200 ease-premium hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
