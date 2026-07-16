import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from '../components/Reveal.jsx'

const WHATSAPP_NUMBER = '35796239471'

// Zod is only needed at submit time — load it lazily so it stays out of the
// initial bundle (the form is the last section most visitors reach).
let schemaPromise
const getSchema = () => {
  schemaPromise ??= import('zod').then(({ z }) =>
    z.object({
      name: z.string().trim().min(2, 'Please tell us your name.'),
      email: z.string().trim().email('That email doesn’t look right.'),
      phone: z
        .string()
        .trim()
        .regex(/^\+?[0-9\s()-]{7,17}$/, 'Please enter a valid phone number.'),
      guests: z.number().int().min(1).max(12, 'For parties over 12, please call us.'),
      date: z
        .string()
        .min(1, 'Pick a date for your visit.')
        .refine((d) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return new Date(d + 'T00:00:00') >= today
        }, 'Please choose a date in the future.'),
      time: z.string().min(1, 'Choose a time.'),
      requests: z.string().trim().max(400, 'Please keep requests under 400 characters.').optional(),
    }),
  )
  return schemaPromise
}

const TIME_SLOTS = []
for (let h = 12; h <= 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 22) TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`)
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function CalendarPopover({ value, onSelect, onClose }) {
  const initial = value ? new Date(value + 'T00:00:00') : new Date()
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1))
  const ref = useRef(null)

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7 // Monday-first
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    return [
      ...Array.from({ length: offset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
    ]
  }, [view])

  return (
    <div
      ref={ref}
      className="popover-enter absolute left-0 top-full z-30 mt-2 w-72 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-2xl"
      role="dialog"
      aria-label="Choose a date"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-150 ease-premium hover:bg-cream"
          aria-label="Previous month"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <p className="font-display text-sm font-semibold text-charcoal">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </p>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/70 transition-colors duration-150 ease-premium hover:bg-cream"
          aria-label="Next month"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase text-charcoal/60">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) =>
          d === null ? (
            <span key={`pad-${i}`} />
          ) : (
            <button
              key={d.getTime()}
              type="button"
              disabled={d < today}
              onClick={() => {
                onSelect(toISO(d))
                onClose()
              }}
              className={`flex h-9 items-center justify-center rounded-full text-sm transition-colors duration-150 ease-premium disabled:cursor-not-allowed disabled:text-charcoal/20 ${
                value === toISO(d)
                  ? 'bg-terracotta font-semibold text-cream'
                  : 'text-charcoal hover:bg-cream'
              }`}
            >
              {d.getDate()}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/55 outline-none transition-colors duration-200 ease-premium focus:border-terracotta ${
    hasError ? 'border-terracotta' : 'border-charcoal/15'
  }`

function FieldError({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-terracotta-deep">
      {children}
    </p>
  )
}

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    requests: '',
  })
  const [errors, setErrors] = useState({})
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const prettyDate = form.date
    ? new Date(form.date + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    const schema = await getSchema()
    const result = schema.safeParse(form)
    if (!result.success) {
      const fieldErrors = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (!fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    const data = result.data

    const message =
      `Yiasas! I'd like to reserve a table at Kypriaki Taverna.\n\n` +
      `Name: ${data.name}\n` +
      `Guests: ${data.guests}\n` +
      `Date: ${prettyDate}\n` +
      `Time: ${data.time}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email}` +
      (data.requests ? `\nSpecial requests: ${data.requests}` : '')

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener',
    )
    setSubmitted(data)
  }

  return (
    <section id="reserve" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6">
        <Reveal as="p" className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-deep">
          Reservations
        </Reveal>
        <Reveal
          as="h2"
          delay={100}
          className="mt-4 text-center font-display text-4xl font-semibold leading-tight text-charcoal sm:text-5xl"
        >
          Save your seat <span className="italic text-sage">by the fire.</span>
        </Reveal>
        <Reveal as="p" delay={180} className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-charcoal/70">
          Confirmations arrive by WhatsApp within the hour. For parties over 12, call us on{' '}
          <a href="tel:+35796239471" className="font-semibold text-terracotta-deep">+357 96 239 471</a>.
        </Reveal>

        {submitted ? (
          <Reveal className="mt-12 rounded-2xl border border-sage/25 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4.5 12.5l5 5 10-11" />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-charcoal">
              Efharisto, <span className="italic text-terracotta">{submitted.name.split(' ')[0]}!</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Your request is on its way via WhatsApp. Here's what we received:
            </p>
            <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl bg-cream p-5 text-left text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal/65">Guests</dt>
                <dd className="font-semibold text-charcoal">{submitted.guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal/65">Date</dt>
                <dd className="font-semibold text-charcoal">{prettyDate}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal/65">Time</dt>
                <dd className="font-semibold text-charcoal">{submitted.time}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="mt-8 rounded-full border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition-colors duration-200 ease-premium hover:border-terracotta hover:text-terracotta"
            >
              Make another reservation
            </button>
          </Reveal>
        ) : (
          <Reveal delay={250}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-12 space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Andreas Georgiou"
                    value={form.name}
                    onChange={set('name')}
                    className={inputClass(errors.name)}
                  />
                  <FieldError>{errors.name}</FieldError>
                </div>
                <div>
                  <label htmlFor="res-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Email
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set('email')}
                    className={inputClass(errors.email)}
                  />
                  <FieldError>{errors.email}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Phone
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+357 99 123456"
                    value={form.phone}
                    onChange={set('phone')}
                    className={inputClass(errors.phone)}
                  />
                  <FieldError>{errors.phone}</FieldError>
                </div>

                {/* Guests stepper */}
                <div>
                  <span id="guests-label" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Guests
                  </span>
                  <div
                    role="group"
                    aria-labelledby="guests-label"
                    className="flex items-center justify-between rounded-2xl border border-charcoal/15 bg-white px-2 py-1.5"
                  >
                    <button
                      type="button"
                      aria-label="Fewer guests"
                      disabled={form.guests <= 1}
                      onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-charcoal transition-all duration-150 ease-premium hover:bg-terracotta hover:text-cream disabled:opacity-30 disabled:hover:bg-cream disabled:hover:text-charcoal"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="text-sm font-semibold text-charcoal">
                      {form.guests} {form.guests === 1 ? 'guest' : 'guests'}
                    </span>
                    <button
                      type="button"
                      aria-label="More guests"
                      disabled={form.guests >= 12}
                      onClick={() => setForm((f) => ({ ...f, guests: Math.min(12, f.guests + 1) }))}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-charcoal transition-all duration-150 ease-premium hover:bg-terracotta hover:text-cream disabled:opacity-30 disabled:hover:bg-cream disabled:hover:text-charcoal"
                    >
                      +
                    </button>
                  </div>
                  <FieldError>{errors.guests}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Date with calendar popover */}
                <div className="relative">
                  <label htmlFor="res-date" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Date
                  </label>
                  <button
                    id="res-date"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={calendarOpen}
                    onClick={() => setCalendarOpen((v) => !v)}
                    className={`${inputClass(errors.date)} flex items-center justify-between text-left ${
                      form.date ? '' : 'text-charcoal/55'
                    }`}
                  >
                    {prettyDate || 'Choose a date'}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-charcoal/60" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="16" rx="3" />
                      <path d="M3 10h18M8 3v4M16 3v4" />
                    </svg>
                  </button>
                  {calendarOpen && (
                    <CalendarPopover
                      value={form.date}
                      onSelect={(date) => setForm((f) => ({ ...f, date }))}
                      onClose={() => setCalendarOpen(false)}
                    />
                  )}
                  <FieldError>{errors.date}</FieldError>
                </div>

                {/* Time select */}
                <div>
                  <label htmlFor="res-time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                    Time
                  </label>
                  <select
                    id="res-time"
                    value={form.time}
                    onChange={set('time')}
                    className={`${inputClass(errors.time)} appearance-none ${form.time ? '' : 'text-charcoal/55'}`}
                  >
                    <option value="" disabled>
                      Choose a time
                    </option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <FieldError>{errors.time}</FieldError>
                </div>
              </div>

              <div>
                <label htmlFor="res-requests" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                  Special requests <span className="font-normal normal-case text-charcoal/60">(optional)</span>
                </label>
                <textarea
                  id="res-requests"
                  rows={3}
                  placeholder="Birthday, allergies, a table under the vines…"
                  value={form.requests}
                  onChange={set('requests')}
                  className={`${inputClass(errors.requests)} resize-none`}
                />
                <FieldError>{errors.requests}</FieldError>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-8 py-4 text-sm font-semibold text-cream transition-all duration-200 ease-premium hover:bg-gold hover:text-charcoal"
              >
                Reserve via WhatsApp
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <p className="text-center text-xs text-charcoal/60">
                Submitting opens WhatsApp with your request pre-filled — nothing is sent until you press send.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  )
}
