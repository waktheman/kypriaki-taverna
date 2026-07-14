import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll wrapper. Content is visible by default; the hidden state is
 * only applied as a progressive enhancement, so environments where observers
 * or animations never fire still render everything.
 *
 * - In-view elements at mount animate in on the next frame (load stagger via
 *   `delay`), with a timeout failsafe so nothing can stay hidden.
 * - Below-fold elements reveal via IntersectionObserver, with a scroll/resize
 *   fallback in case the observer misbehaves.
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)

    // Fallback: reveal on any scroll/resize that puts the element on screen.
    let raf = 0
    const check = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) reveal()
      })
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
      cancelAnimationFrame(raf)
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
