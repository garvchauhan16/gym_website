import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { site, navLinks, filled, addressLines } from '../config/site.js';
import { Button, Logo } from './ui.jsx';
import { WhatsAppIcon, InstagramIcon } from './icons.jsx';
import { whatsappUrl, waMessages, hasPhone, telHref } from '../utils/whatsapp.js';

export default function Footer() {
  const lines = addressLines();
  const hoursSet = site.hours.filter((h) => filled(h.time));
  const links = [...navLinks.filter((l) => l.to !== '/'), { to: '/free-trial', label: 'Free Trial' }, { to: '/about#owner', label: 'The Owner' }];
  return (
    <footer className="bg-forest text-white">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappUrl(waMessages.footer)} variant="whatsapp" external>
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
              </Button>
              {hasPhone() && (
                <Button href={telHref()} variant="outlineLight">
                  <Phone size={16} aria-hidden="true" /> Call
                </Button>
              )}
              {filled(site.instagramUrl) && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Powerhouse Gym on Instagram"
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition-all hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.25em] text-gold-light uppercase">Explore</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] lg:grid-cols-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 transition-colors hover:text-gold-light">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="font-sans text-xs font-semibold tracking-[0.25em] text-gold-light uppercase">Visit & Contact</h2>
            <ul className="mt-5 space-y-4 text-[15px] text-white/70">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
                <span>{lines.length ? lines.map((l) => <span key={l} className="block">{l}</span>) : 'Gym address — coming soon'}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
                {hasPhone() ? <a href={telHref()} className="hover:text-gold-light">{site.phone}</a> : <span>Phone number — coming soon</span>}
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
                {filled(site.email) ? <a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">{site.email}</a> : <span>Email — coming soon</span>}
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
                <span>
                  {hoursSet.length ? hoursSet.map((h) => <span key={h.days} className="block">{h.days}: {h.time}</span>) : 'Opening hours — coming soon'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Train sharp. Stay disciplined.</p>
        </div>
      </div>
    </footer>
  );
}
