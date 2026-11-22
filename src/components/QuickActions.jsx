import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, CreditCard, LayoutGrid, UserRound, Trophy, ShieldCheck, MapPin } from 'lucide-react';
import { Eyebrow, Reveal } from './ui.jsx';
import { isOn, trial } from '../config/site.js';

const featured = { to: '/free-trial', icon: CalendarCheck, title: trial.cta, text: 'Pick a preferred date and time — takes under a minute.' };

const peopleTile = isOn('trainers')
  ? { to: '/about#trainers', icon: UserRound, title: isOn('owner') ? 'Owner & Trainers' : 'Trainers', text: 'Profiles coming soon' }
  : isOn('owner') && { to: '/about#owner', icon: UserRound, title: 'Meet the Owner', text: 'The person behind the gym' };

const tiles = [
  { to: '/memberships', icon: CreditCard, title: 'Memberships', text: 'Plan options & pricing on request' },
  { to: '/gallery', icon: LayoutGrid, title: 'Gallery', text: 'The building & illustrative photos' },
  peopleTile,
  isOn('events') && { to: '/events', icon: Trophy, title: 'Events', text: 'Challenges & competitions' },
  isOn('gymRules') && { to: '/gym-rules', icon: ShieldCheck, title: 'Gym Rules', text: 'The standards we keep' },
  { to: '/#location', icon: MapPin, title: 'Location & Hours', text: 'Find us on Nabha Road, Bhabat' },
].filter(Boolean);

/** Laptop layout fills 3 columns beside the featured tile; fewer tiles shrink the grid. */
const lgCols = { 3: 'lg:grid-cols-4', 2: 'lg:grid-cols-3', 1: 'lg:grid-cols-2' };

/**
 * One-click access to every key journey.
 * Phone: 2 cols (featured spans the row) · Tablet: 3 cols (featured spans the row)
 * Laptop+: 4 cols, featured tile spans two rows on the left.
 */
export default function QuickActions() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="quick-title">
      <div className="container-x">
        <Reveal className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow className="mb-3">Everything in one click</Eyebrow>
            <h2 id="quick-title" className="text-heading-2 text-ink">Where would you like to start?</h2>
          </div>
        </Reveal>

        <Reveal>
          <ul
            className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3 ${
              lgCols[Math.ceil(tiles.length / 2)] ?? 'lg:grid-cols-4'
            }`}
          >
            <li className="col-span-2 md:col-span-3 lg:col-span-1 lg:row-span-2">
              <Link
                to={featured.to}
                className="group flex h-full min-h-[148px] flex-col justify-between gap-6 bg-blue-500 p-5 text-white transition-colors hover:bg-blue-600 sm:p-6 lg:p-7"
              >
                <span className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-white/15">
                    <featured.icon size={20} aria-hidden="true" />
                  </span>
                  <ArrowUpRight size={20} className="text-white/80 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="block">
                  <span className="block font-display text-xl font-extrabold leading-tight tracking-[-0.015em] sm:text-2xl">{featured.title}</span>
                  <span className="mt-2 block max-w-xs text-sm leading-relaxed text-white/80">{featured.text}</span>
                </span>
              </Link>
            </li>
            {tiles.map((t, i) => (
              // An odd last tile spans the remaining width on phones so rows stay complete
              <li key={t.to} className={tiles.length % 2 === 1 && i === tiles.length - 1 ? 'col-span-2 md:col-span-1' : ''}>
                <Link
                  to={t.to}
                  className="group flex h-full min-h-[124px] flex-col justify-between gap-5 bg-white p-4 text-ink transition-colors hover:bg-cloud sm:p-6"
                >
                  <span className="flex items-start justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-100 text-blue-500">
                      <t.icon size={19} aria-hidden="true" />
                    </span>
                    <ArrowUpRight size={18} className="text-slate transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" aria-hidden="true" />
                  </span>
                  <span className="block">
                    <span className="block font-display text-[15px] font-bold leading-tight sm:text-[17px]">{t.title}</span>
                    <span className="mt-1 hidden text-sm text-slate sm:block">{t.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
