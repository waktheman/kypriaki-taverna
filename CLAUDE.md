# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment quirk (read first)

Node is NOT on the system PATH on this machine. It lives at `~/.local/node/bin`. Prefix commands accordingly:

```sh
export PATH="$HOME/.local/node/bin:$PATH"
npm run dev        # dev server on http://localhost:5173 (LAN: http://192.168.10.3:5173)
npm run build      # production build to dist/
npm run lint       # oxlint
npm run preview    # serve dist/
```

A static ffmpeg lives at `~/.local/bin/ffmpeg` (installed for the media pipeline below). There is no test suite. This directory is not a git repository.

## What this is

A Cypriot restaurant marketing site (Kypriaki Taverna, Paphos): Vite + React 19 (plain JSX, no TS) + Tailwind CSS 3 + React Router 7 + Zod. Two real routes — `/` (eight sections in fixed order: Hero → About → Specials → Wine → Gallery → Testimonials → Reservation → Visit) and `/menu` — plus a `*` 404 page. No backend: the reservation form validates with Zod and opens a prefilled WhatsApp message to +357 96 239 471.

## Architecture that isn't obvious from a single file

**Design tokens** live in `tailwind.config.js`. The palette is fixed by the client spec: terracotta `#C85A3C`, gold `#D4AF6F`, sage `#556B4D`, cream `#F5F1E8`, charcoal `#2B2B2B`. Two derived tokens exist purely for WCAG AA on small text: `terracotta-deep` (#A6462B, for eyebrows/prices/errors on cream or white) and `terracotta-light` (#E0825F, for labels on charcoal). Keep using them; raw `terracotta` fails 4.5:1 on all site backgrounds at small sizes.

**Contrast floors (audited, don't regress):** muted text is opacity-based and was tuned to pass AA — minimum `text-charcoal/55` for placeholders, `/65` for small labels, `/70` for body on cream/white; minimum `text-cream/60` on charcoal. Don't introduce new `/35`–`/50` text.

**Motion system:** all keyframes and the `--ease-premium` curve (`cubic-bezier(0.32, 0.72, 0, 1)`) are in `src/index.css`; a global `prefers-reduced-motion` block disables everything. Two components carry hard-won contracts:

- `src/components/Reveal.jsx` — scroll-reveal wrapper. Content is **visible by default**; the hidden state is added post-mount only, revealed via IntersectionObserver **plus** a scroll/resize fallback and a load-time failsafe timeout. This exists because IO doesn't fire in some renderers and sections used to ship blank. Never revert to "hidden until observer fires".
- `src/components/LazyVideo.jsx` — all `<video>` elements go through this. `preload="none"`, muted/loop/playsInline, play/pause driven by IO with the same rect-check fallback, poster shown to reduced-motion users. Page-weight budget: total video payload is kept under ~10 MB.

**Brand is centralized for rebranding:** `src/config.js` (`SITE`) holds name, tagline, description, phone (display/tel/whatsapp variants), instagram, address (with `query`/lat/lng), and hours. Navbar, Footer, Hero, Visit, Reservation, and Testimonials all read from it — a new restaurant = edit this one file (plus photos in `/public`, menu items in `src/data/menu.js`, and the static SEO `<head>` in `index.html`). The About story paragraph is intentionally left as literal prose (clients rewrite it wholesale). The footer's compact hours line ("Mon–Sat · 12:00–23:00") is literal, not from `SITE.hours`, to keep its abbreviated format.

**Reservation validation is hand-rolled** (`validateReservation` in `Reservation.jsx`), not Zod — Zod was removed to save ~62 KB gzip. It returns `{ success, errors, data }` like `safeParse`.

**Content is data-driven:** menu items, section images, testimonials, and the broken-image fallback SVG all live in `src/data/menu.js`. Dish photos are hot-linked Unsplash URLs — verify a photo ID returns 200 before adding one (dead IDs have shipped before; `DishCard` has an `onError` fallback but hero/gallery images don't).

**Menu page scrollspy** (`src/pages/Menu.jsx`): the sticky category nav tracks the first section in document order present in an in-view set — not "last entry that intersected", which mis-highlights after programmatic jumps.

**SEO is split:** static meta/OG/Twitter/JSON-LD Restaurant schema live in `index.html`; per-route `document.title` and canonical URL are updated in `App.jsx`'s pathname effect. `robots.txt`, `sitemap.xml`, `og-image.jpg` are in `public/`.

## Media pipeline (videos & posters)

House Specials videos are cropped to the card's 4:3 aspect and heavily compressed. To swap one, keep the filename and no code changes are needed:

```sh
# crop to 4:3 (adjust crop offsets to frame the subject), compress, strip audio
~/.local/bin/ffmpeg -i input.mp4 -vf "crop=W:H:X:Y,scale=1152:864" \
  -c:v libx264 -crf 27 -preset medium -an -movflags +faststart \
  public/videos/<souvla|kleftiko|commandaria>.mp4
# regenerate the matching poster from the new footage
~/.local/bin/ffmpeg -ss 2 -i public/videos/<name>.mp4 -frames:v 1 -q:v 3 \
  public/images/<name>-poster.jpg
```

Posters must be frames extracted from the video itself (they're what shows before lazy playback starts). The hero video is `public/videos/souvla-hero.mp4` with an Unsplash poster in `src/data/menu.js`. Verify new footage content by extracting a frame and viewing it before installing — filenames from stock sites lie. Stock sourcing so far: Pexels (free license); when downloads via `pexels.com/download/video/<id>/` stall, the page embeds a direct `videos.pexels.com/video-files/...` URL.

## Verification notes

- The Claude preview browser tab is throttled: IntersectionObserver may never fire and Chrome pauses background video ("video-only background media was paused to save power"). Don't chase these as app bugs — verify via DOM/eval checks, and confirm real playback in a visible browser.
- Preview-server launch config is at `../.claude/launch.json` (one level up, in `Desktop/claude/.claude/`); it launches Vite via a shell script because the preview sandbox can't exec scripts under `~/Desktop`.
