import Reveal from '../components/Reveal.jsx'
import { IMAGES } from '../data/menu.js'

const CARDS = [
  {
    title: 'Commandaria Reserve',
    subtitle: 'The oldest named wine on earth, from the hills above Paphos.',
    image: IMAGES.commandaria,
    alt: 'Amber Commandaria wine catching the evening light',
  },
  {
    title: 'Sunday Kleftiko',
    subtitle: 'Sealed at midnight, opened at noon. Only on Sundays, only until it runs out.',
    image: IMAGES.kleftiko,
    alt: 'Sunday kleftiko fresh from the wood oven',
  },
]

export default function Wine() {
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
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 150}>
              <a
                href="/menu#drinks"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4]"
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{card.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">
                    {card.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Discover
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
