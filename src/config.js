/**
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  BRAND CONFIG — edit this ONE file to rebrand the whole site.         │
 * │  A new restaurant needs only these values changed (plus the photos    │
 * │  in /public and the menu items in src/data/menu.js).                  │
 * │  Note: index.html holds the static SEO <head> — update the title,     │
 * │  description, domain, and JSON-LD there too when you rebrand.          │
 * └──────────────────────────────────────────────────────────────────────┘
 */
export const SITE = {
  // Identity
  name: 'Kypriaki',            // logo wordmark (the "." dot is added in the UI)
  fullName: 'Kypriaki Taverna',
  tagline: 'Paphos · Cyprus · Est. 1962',
  established: '1962',

  // One-line description used in the hero + footer
  description:
    'Authentic Cypriot traditions, modern touch. Souvla over coal, garden-fresh meze, and Commandaria under the Paphos sky.',

  // Contact
  phoneDisplay: '+357 96 239 471',   // shown to users
  phoneTel: '+35796239471',          // used in tel: links
  whatsapp: '35796239471',           // digits only, for wa.me links
  instagram: 'kypriakitaverna',      // handle without @

  // Location
  address: {
    street: 'Terpsithea Street',
    locality: 'Paphos',
    postalCode: '8011',
    country: 'Cyprus',
    // Map + geo
    query: 'Terpsithea Street, Paphos 8011, Cyprus', // used for the map + directions
    lat: 34.7754,
    lng: 32.4245,
  },

  // Opening hours (shown in Visit + footer)
  hours: [
    { days: 'Monday – Saturday', time: '12:00 – 23:00' },
    { days: 'Sunday', time: '12:00 – 22:00' },
  ],
}
