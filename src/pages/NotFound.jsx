import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-cream px-6 pt-24">
      <div className="text-center">
        <p className="font-display text-7xl font-semibold text-terracotta-deep sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          This table doesn't exist.
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-charcoal/70">
          The page you're looking for isn't on our menu. Come back to the taverna and we'll find
          you a seat by the fire.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:bg-gold hover:text-charcoal"
          >
            Back Home
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center rounded-full border border-charcoal/20 px-8 py-4 text-sm font-semibold text-charcoal transition-all duration-200 ease-premium hover:border-terracotta-deep hover:text-terracotta-deep"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
