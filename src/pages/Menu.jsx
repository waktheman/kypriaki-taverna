import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { MENU_SECTIONS, FALLBACK_IMG } from '../data/menu.js'

function DishCard({ name, description, price, image, delay }) {
  return (
    <Reveal
      delay={delay}
      className="flex items-center gap-5 rounded-2xl border border-charcoal/10 bg-white p-4 transition-shadow duration-300 ease-premium hover:shadow-md sm:p-5"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        width="80"
        height="80"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMG
        }}
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-charcoal">{name}</h3>
          <p className="shrink-0 font-display text-lg font-semibold text-terracotta-deep">{price}</p>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-charcoal/70">{description}</p>
      </div>
    </Reveal>
  )
}

export default function Menu() {
  const [active, setActive] = useState(MENU_SECTIONS[0].id)
  const sectionRefs = useRef({})
  const inView = useRef(new Set())

  // Scrollspy: highlight the first category intersecting the reading band
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.current.add(entry.target.id)
          else inView.current.delete(entry.target.id)
        }
        const first = MENU_SECTIONS.find(({ id }) => inView.current.has(id))
        if (first) setActive(first.id)
      },
      { rootMargin: '-25% 0px -55% 0px' },
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const jumpTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal pb-16 pt-36 text-cream sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            The Full Menu
          </Reveal>
          <Reveal as="h1" delay={120} className="mt-5 font-display text-5xl font-semibold leading-tight sm:text-6xl">
            A village table, <span className="italic text-gold">in Paphos.</span>
          </Reveal>
          <Reveal as="p" delay={240} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
            Everything below is cooked the way it was in 1962 — over charcoal, in copper, and
            without hurry. Prices include a warm welcome.
          </Reveal>
        </div>
      </section>

      {/* Sticky category nav */}
      <nav
        aria-label="Menu categories"
        className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6">
          {MENU_SECTIONS.map(({ id, title }) => (
            <button
              key={id}
              type="button"
              onClick={() => jumpTo(id)}
              aria-current={active === id ? 'true' : undefined}
              className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ease-premium ${
                active === id
                  ? 'bg-terracotta text-cream'
                  : 'text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <div className="bg-cream pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {MENU_SECTIONS.map(({ id, title, blurb, items }) => (
            <section
              key={id}
              id={id}
              ref={(el) => (sectionRefs.current[id] = el)}
              className="scroll-mt-24 pt-16 sm:pt-20"
              aria-labelledby={`${id}-title`}
            >
              <Reveal>
                <h2 id={`${id}-title`} className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-2 max-w-md text-sm italic leading-relaxed text-charcoal/65">
                  {blurb}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {items.map((item, i) => (
                  <DishCard key={item.name} {...item} delay={(i % 4) * 80} />
                ))}
              </div>
            </section>
          ))}

          <Reveal className="mt-20 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-200 ease-premium hover:border-terracotta-deep hover:text-terracotta-deep"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Back Home
            </Link>
          </Reveal>
        </div>
      </div>
    </>
  )
}
