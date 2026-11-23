import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { Button, SampleTag } from './ui.jsx';
import { site, filled, addressLines } from '../config/site.js';
import { hasPhone, telHref } from '../utils/whatsapp.js';

const hasGeo = () => filled(site.geo.latitude) && filled(site.geo.longitude);

/** "30.6465° N · 76.8007° E" */
function coordLabel() {
  const lat = Number(site.geo.latitude);
  const lng = Number(site.geo.longitude);
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'} · ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
}

/**
 * Map card: interactive Google Map framed in navy, with the full address,
 * "Get Directions" and "Call Now" directly below it. Everything comes from
 * config/site.js. `showHours` adds the opening hours to the address panel.
 */
export default function LocationMap({ showHours = false, className = '' }) {
  const lines = addressLines();

  return (
    <div className={`on-dark overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 text-white shadow-[0_30px_60px_-30px_rgba(5,11,26,0.55)] ${className}`}>
      {/* Map */}
      <div className="relative">
        {filled(site.mapEmbedUrl) ? (
          <iframe
            title={`Map showing ${site.name}, ${lines.join(', ')}`}
            src={site.mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/9] lg:aspect-auto lg:h-[420px]"
          />
        ) : (
          <div className="grid aspect-[4/3] place-items-center p-8 text-center sm:aspect-[16/9] lg:aspect-auto lg:h-[420px]">
            <div>
              <MapPin size={26} aria-hidden="true" className="mx-auto text-blue-300" />
              <p className="mt-4 font-display text-xl font-extrabold">Map coming soon</p>
              <SampleTag className="mt-3">Map placeholder</SampleTag>
            </div>
          </div>
        )}
        {/* Thin electric-blue rule tying the map to the brand */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500" aria-hidden="true" />
        {hasGeo() && (
          <span className="pointer-events-none absolute bottom-4 left-4 hidden rounded-full border border-white/10 bg-navy-950/85 px-3 py-1.5 font-sans text-[11px] font-semibold tabular-nums tracking-[0.08em] text-white/80 backdrop-blur sm:inline-block">
            {coordLabel()}
          </span>
        )}
      </div>

      {/* Address + actions, directly below the map */}
      <div className={`grid gap-6 p-5 sm:p-7 lg:items-center ${showHours ? 'lg:grid-cols-[1.25fr_1fr_auto] lg:gap-8' : 'md:grid-cols-[1fr_auto] md:gap-8'}`}>
        <address className="flex gap-4 not-italic">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500 text-white">
            <MapPin size={20} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-extrabold tracking-[-0.01em]">{site.name}</span>
            {lines.length ? (
              lines.map((l) => (
                <span key={l} className="mt-0.5 block text-[15px] leading-relaxed text-white/70">{l}</span>
              ))
            ) : (
              <span className="mt-0.5 block text-[15px] text-white/45">Address to be confirmed</span>
            )}
          </span>
        </address>

        {showHours && (
          <div className="flex gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <Clock size={18} aria-hidden="true" className="mt-1 shrink-0 text-blue-300" />
            <dl className="w-full space-y-1 text-[14px]">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 max-sm:flex-col max-sm:gap-0.5 max-sm:pb-2 max-sm:last:pb-0">
                  <dt className="text-white/60 max-lg:whitespace-nowrap">{h.days}</dt>
                  <dd className={`max-lg:whitespace-nowrap ${filled(h.time) ? 'font-semibold' : 'text-white/45'}`}>{filled(h.time) ? h.time : 'To be confirmed'}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className={`grid gap-3 sm:grid-cols-2 ${showHours ? 'lg:grid-cols-1' : 'md:grid-cols-1'}`}>
          {filled(site.mapDirectionsUrl) && (
            <Button href={site.mapDirectionsUrl} external size="lg" aria-label={`Get directions to ${site.name} on Google Maps (opens in a new tab)`}>
              <Navigation size={17} aria-hidden="true" /> Get Directions
            </Button>
          )}
          {hasPhone() && (
            <Button href={telHref()} variant="light" size="lg" aria-label={`Call ${site.name} on ${site.phone}`}>
              <Phone size={17} aria-hidden="true" /> Call Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
