import { useEffect, useRef } from 'react'
import { onViewportChange } from '../lib/onViewportChange.js'

/**
 * Decorative background video that only downloads and plays while on screen.
 * preload="none" keeps it out of the initial page load. Playback is driven by
 * IntersectionObserver with a shared scroll/resize fallback (plus one check on
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

    // Fallback: rect check on mount and via the shared viewport checker.
    const check = () => {
      const r = video.getBoundingClientRect()
      setPlayback(r.top < window.innerHeight + 120 && r.bottom > -120)
    }
    check()
    const unsubscribe = onViewportChange(check)
    return () => {
      io.disconnect()
      unsubscribe()
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
