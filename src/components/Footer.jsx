import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { site, navLinks, filled, addressLines, isOn, trial } from '../config/site.js';
import { Button, Logo } from './ui.jsx';
import { WhatsAppIcon, InstagramIcon } from './icons.jsx';
import { whatsappUrl, waMessages, hasPhone, telHref, showWhatsapp } from '../utils/whatsapp.js';

function ColumnTitle({ children }) {
  return <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{children}</h2>;
}

/** Shows the value, or a muted "to be confirmed" line when the owner hasn't supplied it yet. */
function ContactRow({ icon: I, children, missing }) {
  return (
    <li className="flex gap-3">
      <I size={17} className="mt-[3px] shrink-0 text-blue-300" aria-hidden="true" />
      <span className={missing ? 'text-white/40' : ''}>{children}</span>
    </li>
  );
}

export default function Footer() {
  const lines = addressLines();
  const hoursSet = site.hours.filter((h) => filled(h.time));
  const links = [
    ...navLinks.filter((l) => l.to !== '/'),
    { to: '/free-trial', label: trial.label },
    isOn('trainers') && { to: '/about#trainers', label: 'Trainers' },
    isOn('owner') && { to: '/about#owner', label: 'The Owner' },
    { to: '/about#contact', label: 'Contact' },
  ].filter(Boolean);

  return (
    <footer className="on-dark bg-navy-950 text-white">
      <div className="container-x py-14 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="md:col-span-2 lg:col-span-4">
            <Logo className="w-[220px] max-w-full" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">{site.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {hasPhone() && (
                <Button href={telHref()} variant="light" aria-label={`Call ${site.name} on ${site.phone}`}>
                  <Phone size={17} aria-hidden="true" /> Call Now
                </Button>
              )}
              {showWhatsapp() && (
                <Button href={whatsappUrl(waMessages.footer)} variant="whatsapp" external>
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> WhatsApp Us
                </Button>
              )}
              {filled(site.instagramUrl) && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on Instagram`}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-[15px]">
              {links.map((l) => (
                <li key={l.to}>
                  {/* min-h-10 gives a comfortable 40px tap target on phones */}
                  <Link to={l.to} className="group inline-flex min-h-10 items-center gap-1 text-white/70 transition-colors hover:text-white">
                    {l.label}
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <ColumnTitle>Visit &amp; Contact</ColumnTitle>
            <ul className="mt-5 space-y-4 text-[15px] text-white/75">
              <ContactRow icon={MapPin} missing={!lines.length}>
                {lines.length ? lines.map((l) => <span key={l} className="block">{l}</span>) : 'Address — to be confirmed'}
                {filled(site.mapDirectionsUrl) && (
                  <a
                    href={site.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex min-h-10 items-center gap-1 font-semibold text-blue-300 transition-colors hover:text-white"
                  >
                    Get Directions <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </ContactRow>
              <ContactRow icon={Phone} missing={!hasPhone()}>
                {hasPhone() ? <a href={telHref()} className="font-semibold text-white transition-colors hover:text-blue-300">{site.phone}</a> : 'Phone — to be confirmed'}
              </ContactRow>
              <ContactRow icon={Mail} missing={!filled(site.email)}>
                {filled(site.email) ? (
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">{site.email}</a>
                ) : (
                  'Email — to be confirmed'
                )}
              </ContactRow>
              <ContactRow icon={Clock} missing={!hoursSet.length}>
                {hoursSet.length
                  ? site.hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}: {filled(h.time) ? h.time : <span className="text-white/40">To be confirmed</span>}
                      </span>
                    ))
                  : 'Opening hours — to be confirmed'}
              </ContactRow>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 pb-6 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            Photos marked “Illustrative” are licensed stock images, not {site.name}’s premises.
            {site.showPlaceholderNotices && ' Demo website — sample content is labelled.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
