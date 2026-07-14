import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import { IMAGES } from '../data/menu.js'

const STATS = [
  { end: 64, suffix: '', label: 'Years' },
  { end: 3, suffix: '', label: 'Generations' },
  { end: 100, suffix: '%', label: 'Local' },
]

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Text */}
        <div>
          <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-deep">
            Our Story
          </Reveal>
          <Reveal as="h2" delay={100} className="mt-4 font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl">
            Three generations, <span className="italic text-sage">one table.</span>
          </Reveal>
          <Reveal as="p" delay={200} className="mt-6 max-w-lg leading-relaxed text-charcoal/70">
            In 1962, our grandfather Andreas lit his first charcoal fire on Terpsithea Street. His
            recipes never left the family — and neither did the fire. Today his grandchildren turn
            the same souvla, knead the same bread, and pour Commandaria from vineyards we have known
            all our lives.
          </Reveal>
          <Reveal as="p" delay={280} className="mt-4 max-w-lg leading-relaxed text-charcoal/70">
            Everything on your plate is grown, caught, or raised within a morning's drive of Paphos.
            Halloumi from the village dairy, herbs from our own garden, fish from the harbour below.
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
            {STATS.map(({ end, suffix, label }, i) => (
              <Reveal key={label} delay={i * 120}>
                <p className="font-display text-4xl font-semibold text-terracotta sm:text-5xl">
                  <CountUp end={end} suffix={suffix} />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/65">
                  {label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Image */}
        <Reveal delay={150} className="relative">
          <div
            className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-terracotta/20 to-sage/20 blur-2xl"
            aria-hidden="true"
          />
          <img
            src={IMAGES.about}
            alt="Traditional whitewashed Cypriot taverna with checkered tables in the sun"
            loading="lazy"
            className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute -bottom-5 -left-3 rounded-xl bg-charcoal px-5 py-4 shadow-xl sm:-left-6">
            <p className="font-display text-lg italic text-gold">kali orexi</p>
            <p className="text-xs text-cream/60">Good appetite</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
