import { site, hasCity } from './site.js';

/**
 * Per-route SEO. Shared by the runtime (document head updates) and the Vite
 * build plugin (static HTML per route, sitemap). Pure JS — no browser APIs.
 */
const inCity = hasCity() ? ` in ${site.city}` : '';
const name = site.name;

export const routes = [
  {
    path: '/',
    priority: 1.0,
    title: `${name} — Premium Gym${inCity} | Book a Free Trial`,
    description: `${name} is a premium fitness centre${inCity}. Train in a disciplined, professional environment — explore memberships and book your free trial session.`,
  },
  {
    path: '/about',
    priority: 0.7,
    title: `About ${name} — Our Philosophy & Training Culture`,
    description: `Discover the philosophy, environment and culture behind ${name}: a disciplined, respectful gym — plus our trainers, owner, opening hours and contact details.`,
  },
  {
    path: '/memberships',
    priority: 0.9,
    title: `Gym Membership${inCity} — Plans & Pricing | ${name}`,
    description: `Compare ${name} gym membership plans — monthly, quarterly, half-yearly and annual. Enquire on WhatsApp to get started.`,
  },
  {
    path: '/free-trial',
    priority: 0.9,
    title: `Book a Free Trial Session | ${name}`,
    description: `Request a trial session at ${name}. Tell us your goal and preferred time, and send your enquiry straight to the team on WhatsApp.`,
  },
  {
    path: '/events',
    priority: 0.6,
    title: `Competitions, Challenges & Events | ${name}`,
    description: `Bodybuilding competitions, transformation challenges and member events at ${name}. See what's coming up and register your interest.`,
  },
  {
    path: '/gym-rules',
    priority: 0.4,
    title: `Gym Rules & Etiquette | ${name}`,
    description: `The standards that keep ${name} clean, safe and respectful for every member — hygiene, equipment etiquette, conduct and safety.`,
  },
  {
    path: '/gallery',
    priority: 0.6,
    title: `Gym Facilities & Photo Gallery | ${name}`,
    description: `Tour the facilities at ${name}: weight training area, cardio, strength equipment, free weights and functional training.`,
  },
];

export const routeFor = (path) =>
  routes.find((r) => r.path === path) ?? {
    path,
    title: `Page not found | ${name}`,
    description: site.description,
  };
