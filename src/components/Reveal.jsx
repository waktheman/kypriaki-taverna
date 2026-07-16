import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { onViewportChange } from '../lib/onViewportChange.js'

/**
 * Reveal-on-scroll wrapper. Content is visible by default; the hidden state is
 * only applied as a progressive enhancement, so environments where observers
 * or animations never fire still render everything.
 *
 * - In-view elements at mount animate in on the next frame (load stagger via
 *   `delay`), with a timeout failsafe so nothing can stay hidden.
 * - Below-fold elements reveal via IntersectionObserver (pre-triggered ~120px
 *   early so fast scrolling doesn't see content pop in), backed by a single
 *   shared scroll/resize checker instead of per-element listeners.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [hidden, setHidden] = useState(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (typeof IntersectionObserver === 'undefined') return

    setHidden(true)
    const inView = el.getBoundingClientRect().top < window.innerHeight * 0.9
    if (inView) {
      // Entrance animation: hide, then release a frame later.
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setHidden(false)))
      const failsafe = setTimeout(() => setHidden(false), 400)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(failsafe)
      }
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !hidden) return

    const reveal = () => setHidden(false)
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && reveal(),
      { threshold: 0.01, rootMargin: '0px 0px 120px 0px' },
    )
    io.observe(el)

    // Fallback via the shared checker, in case the observer misbehaves.
    const unsubscribe = onViewportChange(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight + 120 && r.bottom > 0) reveal()
    })
    return () => {
      io.disconnect()
      unsubscribe()
    }
  }, [hidden])

  return (
    <Tag
      ref={ref}
      className={`reveal ${hidden ? 'reveal-hidden' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
