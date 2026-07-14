# Kypriaki Taverna

Cypriot restaurant website — homepage + `/menu` page. Built with React (Vite), Tailwind CSS, React Router, and Zod.

**Paphos · Cyprus · Est. 1962** — souvla over coal, garden-fresh meze, and Commandaria under the Paphos sky.

## Run it

Node was installed locally at `~/.local/node` (it wasn't on this machine's PATH). Either add it to your PATH or call it directly:

```sh
export PATH="$HOME/.local/node/bin:$PATH"
cd kypriaki-taverna
npm run dev        # dev server on http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build
```

## Structure

```
index.html                 SEO meta, Open Graph, Twitter card, JSON-LD Restaurant schema, fonts
src/
  App.jsx                  Routes, skip link, grain overlay, per-route titles & scroll handling
  index.css                Design tokens, grain, shiny text, marquee, modal/popover motion, reduced-motion
  components/
    Navbar.jsx             Fixed nav → glass pill on scroll, mobile slide-down panel
    Footer.jsx             4-column footer
    Reveal.jsx             IntersectionObserver reveal-on-scroll wrapper (stagger via delay prop)
    CountUp.jsx            Count-up stat animation
  sections/                Hero, About, Specials, Wine, Gallery (+lightbox), Testimonials (marquee),
                           Reservation (Zod + WhatsApp), Visit (map/hours/contact)
  pages/
    Home.jsx               Section order: Hero → About → Specials → Wine → Gallery → Testimonials → Reservation → Visit
    Menu.jsx               Sticky category nav with IO scrollspy, 2-col dish cards, Back Home
  data/menu.js             All menu items, images, testimonials
```

## Design system

- **Colors:** terracotta `#C85A3C`, gold `#D4AF6F`, sage `#556B4D`, cream `#F5F1E8`, charcoal `#2B2B2B`
- **Fonts:** Fraunces (display, italics for emphasis) + Manrope (body), via Google Fonts
- **Motion:** `cubic-bezier(0.32, 0.72, 0, 1)` easing, transform/opacity only, micro-interactions <300 ms,
  reveals 600–1000 ms, modals scale from 0.96, staggered children, `prefers-reduced-motion` respected.
  The testimonial marquee is the only linear animation (continuous scroll, not a UI transition).

## Media

Hero and the two video specials use `<video>` with poster-image fallbacks. To use real footage, drop files at:

- `public/videos/souvla-hero.mp4`
- `public/videos/souvla.mp4`
- `public/videos/kleftiko.mp4`

Photos are hot-linked from Unsplash for the demo; dish thumbnails fall back to a branded placeholder if an
image fails to load. For production, replace with owned photography and add `public/og-image.jpg` (1200×630).

## Reservations

The form validates with Zod (name, email, phone, guests 1–12 stepper, future-date calendar popover, time
select, optional requests) and opens WhatsApp to **+357 96 239 471** with a pre-filled message. Nothing is
sent until the user presses send in WhatsApp.
