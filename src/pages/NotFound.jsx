import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import { Button } from '../components/ui.jsx';
import { trial } from '../config/site.js';

const helpful = [
  { to: '/memberships', label: 'Memberships', text: 'Compare plans and enquire' },
  { to: '/free-trial', label: trial.label, text: 'Request a session' },
  { to: '/gallery', label: 'Facilities', text: 'Tour the training zones' },
  { to: '/about#contact', label: 'Contact', text: 'Location, hours, WhatsApp' },
];

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="Error 404" title="Page Not" accent="Found">
        The page you're looking for doesn't exist or has moved.
      </PageHero>
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/">Back to Home</Button>
            <Button to="/about#contact" variant="secondary">Contact Us</Button>
          </div>
          <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-slate">Popular pages</h2>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {helpful.map((h) => (
              <li key={h.to}>
                <Link to={h.to} className="group flex h-full items-start justify-between gap-4 bg-white p-5 transition-colors hover:bg-cloud sm:p-6">
                  <span>
                    <span className="block font-display text-lg font-extrabold text-ink">{h.label}</span>
                    <span className="mt-1 block text-sm text-slate">{h.text}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-slate transition-colors group-hover:text-blue-500" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
