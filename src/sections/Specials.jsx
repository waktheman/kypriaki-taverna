import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import LazyVideo from '../components/LazyVideo.jsx'
import { IMAGES } from '../data/menu.js'

const SPECIALS = [
  {
    name: 'Souvla',
    description:
      'Great cuts of pork, salted and turned for hours over Cypriot charcoal until the fat whispers and the edges char. Served with lemon, warm pita, and patience.',
    price: '€18.99',
    media: { type: 'video', src: '/videos/souvla.mp4', poster: IMAGES.souvlaVideoPoster },
    alt: 'Souvla turning slowly over glowing coals',
  },
  {
    name: 'Kleftiko',
    description:
      'Lamb shank sealed in parchment and slow-roasted overnight with oregano, bay, and lemon jus, until it surrenders to the touch of a spoon.',
    price: '€21.99',
    media: { type: 'video', src: '/videos/kleftiko.mp4', poster: IMAGES.kleftikoVideoPoster },
    alt: 'Slow-roasted kleftiko lamb ready to serve',
  },
  {
    name: 'Commandaria Reserve',
    description:
      "Sun-dried Xynisteri and Mavro grapes, aged the old way. The world's oldest named wine — made in the hills an hour from this table.",
    price: '€9.50',
    media: { type: 'video', src: '/videos/commandaria.mp4', poster: IMAGES.commandariaVideoPoster },
    alt: 'Commandaria wine being poured into a glass',
  },
]

export default function Specials() {
  return (
    <section id="menu" className="bg-charcoal py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          House Specials
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl"
        >
          From the fire, <span className="italic text-gold">to the table.</span>
        </Reveal>

        <div className="mt-16 space-y-20 sm:space-y-24">
          {SPECIALS.map((dish, i) => (
            <Reveal
              key={dish.name}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Media */}
              <div className="group relative overflow-hidden rounded-2xl">
                {dish.media.type === 'video' ? (
                  <LazyVideo
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                    src={dish.media.src}
                    poster={dish.media.poster}
                  />
                ) : (
                  <img
                    src={dish.media.src}
                    alt={dish.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Copy */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-light">
                  Signature
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{dish.name}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-cream/65">{dish.description}</p>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-cream/60">From</span>
                  <span className="font-display text-2xl font-semibold text-gold">{dish.price}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:border-gold hover:text-gold"
          >
            View Full Menu
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
