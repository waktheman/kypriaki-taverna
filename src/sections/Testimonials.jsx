import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { TESTIMONIALS } from '../data/menu.js'

function GoogleLogo({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.07-1.5-.2-2.2H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.78 1.1a6.6 6.6 0 0 1-6.2-4.5H2.18v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.18a11 11 0 0 0 0 9.9L5.8 14.2z" />
      <path fill="#EA4335" d="M12 5.4c1.62 0 3.06.55 4.2 1.64l3.1-3.1A11 11 0 0 0 2.18 7.1L5.8 9.9A6.6 6.6 0 0 1 12 5.4z" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ name, text }) {
  return (
    <figure className="mx-3 w-80 shrink-0 rounded-2xl border border-charcoal/10 bg-white/60 p-6 shadow-sm">
      <Stars />
      <blockquote className="mt-3 text-sm leading-relaxed text-charcoal/75">“{text}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-2 text-sm font-semibold text-charcoal">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 font-display text-xs text-sage">
          {name[0]}
        </span>
        {name}
        <span className="ml-auto flex items-center gap-1 text-xs font-medium text-charcoal/60">
          <GoogleLogo />
          Google
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const [offscreen, setOffscreen] = useState(false)
  const marqueeRef = useRef(null)

  // Don't burn compositor time animating the marquee while it's off-screen
  useEffect(() => {
    const el = marqueeRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      rootMargin: '80px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-deep">
          Word of Mouth
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl"
        >
          Guests say it <span className="italic text-sage">best.</span>
        </Reveal>
      </div>

      {/* Infinite marquee; pauses on hover, touch, or keyboard focus */}
      <Reveal delay={200}>
        <div
          ref={marqueeRef}
          className={`marquee relative mt-14 ${offscreen ? 'is-offscreen' : ''}`}
          aria-label="Guest reviews carousel"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-28"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-28"
            aria-hidden="true"
          />
          <div className="marquee-track py-2">
            <div className="flex">
              {TESTIMONIALS.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </div>
            {/* Visual copy for the seamless loop; hidden from assistive tech */}
            <div className="flex" aria-hidden="true">
              {TESTIMONIALS.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={300} className="mt-12 text-center">
        <a
          href="https://www.google.com/maps/search/Kypriaki+Taverna+Paphos"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-7 py-3.5 text-sm font-semibold text-charcoal transition-all duration-200 ease-premium hover:border-terracotta-deep hover:text-terracotta-deep"
        >
          <GoogleLogo className="h-4 w-4" />
          See all reviews on Google
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </Reveal>
    </section>
  )
}
