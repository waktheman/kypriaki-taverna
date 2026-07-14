import { useEffect, useRef } from 'react'

/**
 * Decorative background video that only downloads and plays while on screen.
 * preload="none" keeps it out of the initial page load. Playback is driven by
 * IntersectionObserver with a scroll/resize fallback (plus one check on
 * mount), so it still works where observers misbehave. Reduced-motion users
 * just see the poster.
 */
export default function LazyVideo({ src, poster, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const setPlayback = (onScreen) => {
      if (onScreen) video.play().catch(() => {})
      else video.pause()
    }

    const io = new IntersectionObserver(
      ([entry]) => setPlayback(entry.isIntersecting),
      { rootMargin: '120px' },
    )
    io.observe(video)

    // Fallback: rect check on mount and on scroll/resize.
    let raf = 0
    const check = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = video.getBoundingClientRect()
        setPlayback(r.top < window.innerHeight + 120 && r.bottom > -120)
      })
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
