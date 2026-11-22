import { CalendarDays } from 'lucide-react';
import { Button, SampleTag } from './ui.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import { eventStatus } from '../utils/events.js';
import Img from './Img.jsx';

const fmt = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function EventCard({ event }) {
  const status = eventStatus(event);
  const upcoming = status === 'Upcoming';
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-colors duration-300 hover:border-ink/20">
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        <Img
          src={event.banner}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          alt={`${event.title} banner`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${upcoming ? '' : 'grayscale'}`}
        />
        <span
          className={`absolute left-4 top-4 rounded-md px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] ${
            upcoming ? 'bg-blue-500 text-white' : 'bg-navy-900/80 text-white backdrop-blur-md'
          }`}
        >
          {status}
        </span>
        {event.placeholder && <SampleTag className="absolute right-4 top-4">Sample</SampleTag>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">{event.type}</p>
        <h3 className="mt-2 text-balance text-heading-2 text-ink">{event.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate">
          <CalendarDays size={15} className="text-blue-500" aria-hidden="true" />
          <time dateTime={event.date}>{fmt(event.date)}</time>
        </p>
        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate">{event.description}</p>
        {upcoming ? (
          <Button href={whatsappUrl(waMessages.event(event))} external variant="navy" className="mt-6 w-full">
            Register Interest
          </Button>
        ) : (
          <p className="mt-6 rounded-full border border-hairline px-6 py-3 text-center text-[13px] font-semibold text-slate">Event completed</p>
        )}
      </div>
    </article>
  );
}
