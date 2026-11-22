import { site, hasCity, isOn, trial, filled } from './site.js';

/**
 * Per-route SEO. Shared by the runtime (document head updates) and the Vite
 * build plugin (static HTML per route, sitemap). Pure JS — no browser APIs.
 */
const inCity = hasCity() ? ` in ${site.city}` : '';
const name = site.name;
/** "Nabha Road, Bhabat, Zirakpur" — locality phrase for descriptions (verified address only). */
const area = hasCity() ? ` on Nabha Road, Bhabat, ${site.city}` : '';
const callLine = filled(site.phone) ? ` Call ${site.phone}.` : '';

/** `section`: route is dropped (no static page, no sitemap entry) when that section is switched off. */
const allRoutes = [
  {
    path: '/',
    priority: 1.0,
    title: `${name} — Gym${inCity}, Punjab | Book a ${trial.label}`,
    description: `${name} is a gym${area}, Punjab (2nd Floor, SS Plaza). Open Monday–Saturday, 6 AM–10 PM.${callLine} Explore memberships and book a ${trial.noun}.`,
  },
  {
    path: '/about',
    priority: 0.7,
    title: `About ${name} — Our Philosophy & Training Culture`,
    description: `The philosophy and training culture behind ${name}${inCity}, plus our address, map, opening hours and how to get in touch.${callLine}`,
  },
  {
    path: '/memberships',
    priority: 0.9,
    title: `Gym Membership${inCity} — Plans | ${name}`,
    description: `Membership options at ${name}${inCity}. Contact the gym for current pricing and inclusions.${callLine}`,
  },
  {
    path: '/free-trial',
    priority: 0.9,
    title: `Book a ${trial.label} | ${name}`,
    description: `Request a ${trial.noun} at ${name}${inCity}. Tell us your goal and preferred time, and the team will confirm.`,
  },
  {
    path: '/events',
    section: 'events',
    priority: 0.6,
    title: `Events & Challenges | ${name}`,
    description: `Competitions, challenges and community events at ${name}. See what's coming up and register your interest.`,
  },
  {
    path: '/gym-rules',
    section: 'gymRules',
    priority: 0.4,
    title: `Gym Rules & Etiquette | ${name}`,
    description: `The standards that keep ${name} safe and respectful for every member — hygiene, equipment etiquette, conduct and safety.`,
  },
  {
    path: '/gallery',
    priority: 0.6,
    title: `Gallery | ${name}`,
    description: `Photos of ${name} at SS Plaza, Nabha Road, Bhabat${hasCity() ? `, ${site.city}` : ''}, with illustrative training photography.`,
  },
];

export const routes = allRoutes.filter((r) => !r.section || isOn(r.section));

export const routeFor = (path) =>
  routes.find((r) => r.path === path) ?? {
    path,
    title: `Page not found | ${name}`,
    description: site.description,
  };
