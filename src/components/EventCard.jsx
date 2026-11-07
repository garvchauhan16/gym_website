import { CalendarDays } from 'lucide-react';
import { Button, SampleTag } from './ui.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

const fmt = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function EventCard({ event }) {
  const upcoming = event.status === 'Upcoming';
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-38px_rgba(35,38,42,0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.banner}
          alt={`${event.title} banner`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${upcoming ? '' : 'grayscale'}`}
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${upcoming ? 'bg-olive text-white' : 'bg-forest/75 text-white backdrop-blur-md'}`}>
          {event.status}
        </span>
        {event.placeholder && <SampleTag className="absolute right-4 top-4">Sample</SampleTag>}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{event.type}</p>
        <h3 className="mt-2 text-balance text-2xl text-charcoal sm:text-[1.7rem]">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-charcoal/70">
          <CalendarDays size={16} className="text-olive" aria-hidden="true" />
          <time dateTime={event.date}>{fmt(event.date)}</time>
        </p>
        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-mist">{event.description}</p>
        {upcoming ? (
          <Button href={whatsappUrl(waMessages.event(event))} external className="mt-6 w-full">Register Interest</Button>
        ) : (
          <p className="mt-6 rounded-full border border-line px-6 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-mist">Event completed</p>
        )}
      </div>
    </article>
  );
}
