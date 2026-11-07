import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, CreditCard, LayoutGrid, UserRound, Trophy, ShieldCheck, MapPin } from 'lucide-react';
import { Reveal } from './ui.jsx';

const tiles = [
  { to: '/free-trial', icon: CalendarCheck, title: 'Book a Free Trial', text: 'Pick a date, send on WhatsApp', featured: true },
  { to: '/memberships', icon: CreditCard, title: 'Memberships & Pricing', text: 'Compare plans, enquire instantly' },
  { to: '/gallery', icon: LayoutGrid, title: 'Facilities', text: 'Tour the training zones' },
  { to: '/about#owner', icon: UserRound, title: 'Owner & Trainers', text: 'The people behind the gym' },
  { to: '/events', icon: Trophy, title: 'Events & Competitions', text: 'What’s coming up' },
  { to: '/gym-rules', icon: ShieldCheck, title: 'Gym Rules & Hygiene', text: 'The standards we keep' },
  { to: '/about#contact', icon: MapPin, title: 'Location & Hours', text: 'Find us, call or WhatsApp' },
];

/** One-click access to every key action — the customer-journey hub. */
export default function QuickActions() {
  return (
    <section className="border-y border-line bg-sand py-12 sm:py-16" aria-label="Quick links">
      <div className="container-x">
        <Reveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.26em] text-gold">Everything in one click</p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal as="li" key={t.to} delay={i * 0.04} y={14}>
              <Link
                to={t.to}
                className={`group flex h-full min-h-[132px] flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
                  t.featured
                    ? 'border-olive bg-olive text-white shadow-[0_18px_40px_-20px_rgba(63,74,49,0.8)] hover:bg-olive-dark'
                    : 'border-line bg-white text-charcoal hover:border-olive/50 hover:shadow-[0_18px_40px_-24px_rgba(35,38,42,0.35)]'
                }`}
              >
                <span className="flex items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${t.featured ? 'bg-white/15' : 'bg-olive/10 text-olive'}`}>
                    <t.icon size={20} aria-hidden="true" />
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${t.featured ? 'text-white/80' : 'text-gold'}`} />
                </span>
                <span className="mt-4 block">
                  <span className="block font-display text-[1.15rem] leading-tight sm:text-xl">{t.title}</span>
                  <span className={`mt-1 hidden text-sm sm:block ${t.featured ? 'text-white/75' : 'text-mist'}`}>{t.text}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
