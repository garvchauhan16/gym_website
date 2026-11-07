/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POWERHOUSE GYM — CENTRAL BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  This is the ONE file the gym owner needs to edit to update the website.
 *  Anything left as an empty string ("") is treated as "not provided yet":
 *   - the website shows a clearly-marked placeholder instead of fake data
 *   - it is left out of SEO / structured data (nothing is ever invented)
 *
 *  After changing values, rebuild the site (`npm run build`).
 *  This file is also read at build time to generate sitemap.xml, robots.txt,
 *  page <title>/<meta> tags and LocalBusiness structured data.
 */

export const site = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  name: 'Powerhouse Gym',
  tagline: 'Build Strength. Define Yourself.',
  description:
    'Powerhouse Gym is a premium, discipline-first gym built for people who take their training seriously. Book a free trial session today.',

  // ── Website ────────────────────────────────────────────────────────────────
  // Your final public web address, no trailing slash. Used for sitemap + SEO.
  url: 'https://your-domain.com',

  // ── Location (leave blank until confirmed) ─────────────────────────────────
  city: '', // e.g. "Pune" — powers "Fitness Centre in {city}" SEO copy
  address: {
    street: '', // e.g. "12, Example Road, Example Area"
    city: '',
    region: '', // state / province
    postalCode: '',
    country: '', // ISO code recommended, e.g. "IN"
  },
  // Paste the Google Maps "Embed a map" src URL (https://www.google.com/maps/embed?pb=...)
  mapEmbedUrl: '',
  // Paste the normal Google Maps share link (for the "Get Directions" button)
  mapDirectionsUrl: '',
  geo: { latitude: '', longitude: '' }, // optional, improves local SEO

  // ── Contact ────────────────────────────────────────────────────────────────
  phone: '', // as you want it displayed, e.g. "+91 98765 43210"
  /**
   * WhatsApp number in INTERNATIONAL format, DIGITS ONLY — no "+", spaces,
   * dashes or leading zeros. Example (India): "919876543210".
   * Until this is filled, WhatsApp buttons open WhatsApp with the message
   * pre-filled and let the visitor pick a contact (so nothing breaks).
   */
  whatsappNumber: '',
  email: '',
  instagramUrl: '', // e.g. "https://www.instagram.com/yourgymhandle"

  // ── Opening hours (leave `time` blank until confirmed) ─────────────────────
  hours: [
    { days: 'Monday – Saturday', time: '' },
    { days: 'Sunday', time: '' },
  ],
  // Optional machine-readable hours for Google (only used when filled), e.g.
  // [{ days: ['Monday','Tuesday'], opens: '06:00', closes: '22:00' }]
  structuredHours: [],

  // ── Memberships ────────────────────────────────────────────────────────────
  currency: '₹',
  /**
   * `price` is a string so it can be a number ("1500") or a placeholder.
   * Leave "XXXX" until the owner confirms real pricing — the card will show a
   * "Placeholder price" tag automatically. `oldPrice` is optional (strike-through).
   */
  memberships: [
    {
      id: 'monthly',
      name: 'Monthly',
      duration: '1 Month',
      price: 'XXXX',
      perks: [
        'Full access to the gym floor',
        'Weight training & cardio areas',
        'Free & functional training zones',
        'Gym orientation on joining',
      ],
      recommended: false,
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      duration: '3 Months',
      price: 'XXXX',
      perks: [
        'Everything in Monthly',
        'Lower cost per month',
        'Enough time to build real momentum',
        'Priority for member events & challenges',
      ],
      recommended: true,
    },
    {
      id: 'half-yearly',
      name: 'Half-Yearly',
      duration: '6 Months',
      price: 'XXXX',
      perks: [
        'Everything in Quarterly',
        'Better value per month',
        'Commit to a long-term transformation',
        'Priority for member events & challenges',
      ],
      recommended: false,
    },
    {
      id: 'annual',
      name: 'Annual',
      duration: '12 Months',
      price: 'XXXX',
      perks: [
        'Everything in Half-Yearly',
        'Best value per month',
        'A full year of consistent training',
        'Priority for member events & challenges',
      ],
      recommended: false,
    },
  ],

  // ── Real statistics (optional) ─────────────────────────────────────────────
  // Only add numbers that are TRUE. When this list is empty, no stats strip or
  // animated counters are shown. Example:
  // { value: 250, suffix: '+', label: 'Active members' }
  stats: [],

  // ── Launch switch ──────────────────────────────────────────────────────────
  // While true, sample content shows small "Sample" tags so nothing placeholder
  // can be mistaken for real information. Set to false at launch.
  showPlaceholderNotices: true,
};

// ── Helpers ─────────────────────────────────────────────────────────────────
export const filled = (v) => typeof v === 'string' && v.trim() !== '';
export const hasCity = () => filled(site.city);
export const cityOr = (fallback = '') => (hasCity() ? site.city : fallback);
export const isPlaceholderPrice = (p) => !/^\d[\d,.]*$/.test(String(p).trim());

export const addressLines = () =>
  [
    site.address.street,
    [site.address.city, site.address.region, site.address.postalCode]
      .filter(filled)
      .join(', '),
  ].filter(filled);

export const navLinks = [
  { to: '/', label: 'Home', mobileOnly: true },
  { to: '/memberships', label: 'Memberships' },
  { to: '/gallery', label: 'Facilities' },
  { to: '/events', label: 'Events' },
  { to: '/gym-rules', label: 'Gym Rules' },
  { to: '/about', label: 'About' },
];
