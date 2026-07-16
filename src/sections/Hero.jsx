import Reveal from '../components/Reveal.jsx'
import LazyVideo from '../components/LazyVideo.jsx'
import { IMAGES } from '../data/menu.js'

export default function Hero() {
  const scrollTo = (hash) => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal">
      {/* Video background with poster fallback; plays only while on screen */}
      <LazyVideo
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src="/videos/souvla-hero.mp4"
        poster={IMAGES.hero}
      />
      <div className="absolute inset-0 bg-charcoal/50" aria-hidden="true" />
      {/* Soft center scrim keeps the headline legible over the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(43,43,43,0.55) 0%, rgba(43,43,43,0) 65%)',
        }}
        aria-hidden="true"
      />

      {/* Ember glow */}
      <div className="ember-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Smoke wisps — desktop only: large animated blurs are expensive on phone GPUs */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block" aria-hidden="true">
        <div className="smoke-wisp left-[18%] h-64 w-40" />
        <div className="smoke-wisp left-[48%] h-72 w-48" />
        <div className="smoke-wisp left-[72%] h-56 w-36" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-32 text-center">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.35em] text-gold sm:text-sm">
          Paphos · Cyprus · Est. 1962
        </Reveal>

        <Reveal as="h1" delay={120} className="mt-6 font-display text-6xl font-semibold leading-[0.95] sm:text-8xl">
          <span className="shiny-text block">Kypriaki</span>
          <span className="-mt-1 block italic text-gold">Taverna</span>
        </Reveal>

        <Reveal
          as="p"
          delay={240}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Authentic Cypriot traditions, modern touch. Souvla over coal, garden-fresh meze, and
          Commandaria under the Paphos sky.
        </Reveal>

        <Reveal delay={360} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollTo('#reserve')}
            className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:bg-gold hover:text-charcoal"
          >
            Reserve a Table
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <a
            href="/menu"
            className="inline-flex items-center rounded-full border border-cream/40 px-8 py-4 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:border-gold hover:text-gold"
          >
            View Menu
          </a>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/50"
        aria-hidden="true"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/30 pt-2">
          <div className="scroll-cue-dot h-2 w-1 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  )
}
