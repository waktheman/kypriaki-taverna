import Reveal from '../components/Reveal.jsx'
import { SITE } from '../config.js'

const mapQuery = SITE.address.query.replace(/ /g, '+')

export default function Visit() {
  return (
    <section id="visit" className="bg-cream pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-deep">
          Location
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl"
        >
          Visit us <span className="italic text-sage">in {SITE.address.locality}.</span>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <Reveal className="overflow-hidden rounded-2xl shadow-sm lg:col-span-3">
            {/* The old maps.google.com?output=embed URL now redirects through a
                response with X-Frame-Options and renders blank; this /maps/embed
                endpoint is the frameable one. */}
            <iframe
              title={`Map to ${SITE.fullName}, ${SITE.address.street}, ${SITE.address.locality}`}
              src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${mapQuery}!6i15`}
              className="h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          {/* Info */}
          <div className="space-y-6 lg:col-span-2">
            <Reveal delay={100} className="rounded-2xl border border-charcoal/10 bg-white p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
                Find us
              </h3>
              <address className="mt-3 text-lg font-medium not-italic leading-relaxed text-charcoal">
                {SITE.address.street}
                <br />
                {SITE.address.locality} {SITE.address.postalCode}, {SITE.address.country}
              </address>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-terracotta-deep transition-colors duration-200 ease-premium hover:text-charcoal"
              >
                Get directions
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </Reveal>

            <Reveal delay={200} className="rounded-2xl border border-charcoal/10 bg-white p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/60">
                Hours
              </h3>
              <dl className="mt-3 space-y-2">
                {SITE.hours.map(({ days, time }) => (
                  <div key={days} className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-charcoal/60">{days}</dt>
                    <dd className="font-semibold text-charcoal">{time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs italic text-charcoal/60">
                The kitchen rests when the last table finishes — as it should.
              </p>
            </Reveal>

            <Reveal delay={300} className="rounded-2xl bg-charcoal p-7 text-cream">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
                Contact
              </h3>
              <p className="mt-3">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="font-display text-2xl font-semibold text-gold transition-colors duration-200 ease-premium hover:text-cream"
                >
                  {SITE.phoneDisplay}
                </a>
              </p>
              <p className="mt-1 text-sm text-cream/60">Calls &amp; WhatsApp, daily from 10:00</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
