import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { IMAGES } from '../data/menu.js'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index or null
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)

  const isOpen = lightbox !== null

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % IMAGES.gallery.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + IMAGES.gallery.length) % IMAGES.gallery.length)
      // Focus trap: keep Tab cycling inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
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

  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-deep">
          Gallery
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl"
        >
          Evenings at <span className="italic text-sage">the taverna.</span>
        </Reveal>

        {/* Masonry: 2 tall, 2 wide */}
        <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {IMAGES.gallery.map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 100}
              className={img.tall ? 'row-span-2' : 'col-span-1 lg:col-span-1'}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta"
                aria-label={`Open photo: ${img.alt}`}
              >
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 ease-premium group-hover:bg-charcoal/20"
                  aria-hidden="true"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox modal — scales in from 0.96 per motion rules */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="backdrop-enter fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={IMAGES.gallery[lightbox].alt}
          onClick={() => setLightbox(null)}
        >
          <figure className="modal-enter max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGES.gallery[lightbox].full}
              alt={IMAGES.gallery[lightbox].alt}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-cream/70">
              {IMAGES.gallery[lightbox].alt}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close gallery"
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
