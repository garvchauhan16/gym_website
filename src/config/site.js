/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  VICTORY FITNESS — CENTRAL BUSINESS CONFIGURATION
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
  // `name` is used everywhere on the site (headings, WhatsApp messages, SEO).
  name: 'Victory Fitness Gym', // VERIFIED
  // Short brand text (e.g. initial-letter fallbacks). The visual logo is the image in public/images/brand/.
  wordmark: { primary: 'VICTORY', secondary: 'FITNESS' },
  // DEMO COPY: tagline and description are placeholders — confirm wording with the client.
  tagline: 'Build Strength. Define Yourself.',
  description:
    'Victory Fitness Gym is a gym in Bhabat, Zirakpur for people who want to train with purpose. Explore memberships and book a trial session.',

  // ── Trial offer (UNCONFIRMED) ──────────────────────────────────────────────
  // true  → wording says "Free Trial" everywhere ("Book Your Free Trial").
  // false → neutral wording ("Book a Trial Session"). The page URL stays /free-trial.
  // Kept false until the gym confirms whether trials are free.
  freeTrial: false,

  // ── Sections (switch off anything the gym doesn't offer) ───────────────────
  // false hides the section, its nav/footer/quick links and sitemap entry;
  // its page (if it has one) redirects to Home.
  // Switched off until the gym supplies real content — nothing is invented.
  sections: {
    events: false, // Events page + home events strip — no confirmed events
    gymRules: true, // Gym Rules page — shown as a clearly-labelled sample template
    trainers: true, // "Meet our trainers" — shows a placeholder until real profiles exist
    owner: false, // Founder section on About — no confirmed owner profile
    testimonials: false, // Member reviews — hidden until genuine reviews are supplied
    programs: false, // Training programmes on Home — offerings not confirmed
  },

  // ── Website ────────────────────────────────────────────────────────────────
  // Your final public web address, no trailing slash. Used for sitemap + SEO.
  url: 'https://your-domain.com',

  // ── Location (leave blank until confirmed) ─────────────────────────────────
  // VERIFIED location details.
  city: 'Zirakpur', // powers "Gym in {city}" SEO copy
  address: {
    street: '2nd Floor, SS Plaza, Near Riverdale Apartments, Highland Marg, Nabha Road, Bhabat',
    city: 'Zirakpur',
    region: 'Punjab', // state / province
    postalCode: '140603',
    country: 'IN', // ISO code, used in structured data
    countryName: 'India', // shown on the site
  },
  // Google Maps embed (iframe src), centred on the coordinates below.
  mapEmbedUrl: 'https://www.google.com/maps?q=30.6464603,76.8007287&output=embed',
  // Google Maps share link — used by every "Get Directions" button.
  mapDirectionsUrl: 'https://maps.app.goo.gl/HyvemZyKF1TuQHrz9',
  geo: { latitude: '30.6464603', longitude: '76.8007287' },

  // ── Contact ────────────────────────────────────────────────────────────────
  phone: '080548 88811', // VERIFIED — as displayed on the site
  // Same number in international format, used for tel: links and structured data.
  phoneIntl: '+918054888811',
  /**
   * WhatsApp number in INTERNATIONAL format, DIGITS ONLY — no "+", spaces,
   * dashes or leading zeros. Example (India): "919876543210".
   * Until this is filled, WhatsApp buttons open WhatsApp with the message
   * pre-filled and let the visitor pick a contact (so nothing breaks).
   *
   * NOT SET ON PURPOSE: it is not yet confirmed that 080548 88811 has an
   * active WhatsApp account. Once confirmed, enter "918054888811".
   */
  whatsappNumber: '',
  // Show WhatsApp buttons across the site. With no number above they open WhatsApp
  // with the message ready and let the visitor choose the recipient.
  showWhatsappButtons: true,
  email: '',
  instagramUrl: '', // e.g. "https://www.instagram.com/yourgymhandle"

  /**
   * Where the trial and enquiry forms send submissions. Leave blank and the forms
   * run in DEMO MODE: inputs are validated and the visitor sees exactly what would
   * be sent, but nothing is delivered and nothing is claimed to be booked.
   * Set to a form-handling endpoint (e.g. a Formspree / Getform URL) that accepts
   * a JSON POST to deliver submissions. If blank but a confirmed `whatsappNumber`
   * is set, the forms open WhatsApp with the message ready to send instead.
   */
  formEndpoint: '',

  // ── Opening hours ──────────────────────────────────────────────────────────
  // A blank `time` is shown as "To be confirmed" — never guessed.
  hours: [
    { days: 'Monday – Saturday', time: '6:00 AM – 10:00 PM' }, // VERIFIED
    { days: 'Sunday', time: 'Closed' }, // VERIFIED
  ],
  // Machine-readable hours for Google (verified).
  // A day with opens = closes = '00:00' is Google's way of saying "closed all day".
  structuredHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '06:00', closes: '22:00' },
    { days: ['Sunday'], opens: '00:00', closes: '00:00' },
  ],

  // ── Memberships ────────────────────────────────────────────────────────────
  currency: '₹',
  /**
   * PLAN OPTIONS ARE UNCONFIRMED. No prices or benefits are shown: each card says
   * "Contact gym for pricing" until the owner supplies real details.
   *  - price:  a number as a string (e.g. "1500") shows that price; '' = contact for pricing
   *  - perks:  list of CONFIRMED inclusions; leave [] to show none
   *  - recommended: highlight one plan — only if the gym asks for it
   * The plan lengths below are common options used for the demo layout only.
   */
  plansConfirmed: false,
  memberships: [
    { id: 'monthly', name: 'Monthly', duration: '1 Month', price: '', perks: [], recommended: false },
    { id: 'quarterly', name: 'Quarterly', duration: '3 Months', price: '', perks: [], recommended: false },
    { id: 'half-yearly', name: 'Half-Yearly', duration: '6 Months', price: '', perks: [], recommended: false },
    { id: 'annual', name: 'Annual', duration: '12 Months', price: '', perks: [], recommended: false },
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

/** True once a plausible international WhatsApp number has been confirmed and entered. */
export const hasWhatsapp = () => String(site.whatsappNumber ?? '').replace(/\D/g, '').length >= 8;
/** How visitors can reach the gym, for copy: "call us" or "call or WhatsApp us". */
export const reachUs = () => (hasWhatsapp() ? 'call or WhatsApp us' : 'call us');

export const addressLines = () =>
  [
    site.address.street,
    [site.address.city, [site.address.region, site.address.postalCode].filter(filled).join(' '), site.address.countryName]
      .filter(filled)
      .join(', '),
  ].filter(filled);

/** Address on one line, e.g. for SEO copy. */
export const addressOneLine = () => addressLines().join(', ');

/** True unless the section is switched off in `site.sections`. */
export const isOn = (key) => site.sections?.[key] !== false;

/** Trial wording, driven by `site.freeTrial`. */
export const trial = site.freeTrial
  ? { label: 'Free Trial', cta: 'Book Your Free Trial', ctaShort: 'Book Free Trial', noun: 'free trial' }
  : { label: 'Trial Session', cta: 'Book a Trial Session', ctaShort: 'Book a Trial', noun: 'trial session' };

const allNavLinks = [
  { to: '/', label: 'Home', mobileOnly: true },
  { to: '/memberships', label: 'Memberships' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events', section: 'events' },
  { to: '/gym-rules', label: 'Gym Rules', section: 'gymRules' },
  { to: '/about', label: 'About' },
];
export const navLinks = allNavLinks.filter((l) => !l.section || isOn(l.section));
