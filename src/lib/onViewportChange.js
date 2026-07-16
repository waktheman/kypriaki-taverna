/**
 * Single shared scroll/resize listener with one rAF per frame.
 * Components register a callback instead of attaching their own listeners —
 * with dozens of revealed elements this avoids N listeners each doing
 * getBoundingClientRect work on every scroll event.
 */
const registry = new Set()
let listening = false
let rafId = 0

const runChecks = () => {
  rafId = 0
  for (const cb of registry) cb()
}

const onChange = () => {
  if (!rafId) rafId = requestAnimationFrame(runChecks)
}

export function onViewportChange(cb) {
  registry.add(cb)
  if (!listening) {
    window.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange, { passive: true })
    listening = true
  }
  return () => {
    registry.delete(cb)
    if (registry.size === 0 && listening) {
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
      listening = false
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }
  }
}
