import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import EventCard from '../components/EventCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Reveal } from '../components/ui.jsx';
import { events } from '../config/content.js';

const tabs = ['All', 'Upcoming', 'Completed'];

const order = (a, b) => {
  if (a.status !== b.status) return a.status === 'Upcoming' ? -1 : 1;
  return a.status === 'Upcoming' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
};

export default function Events() {
  const [tab, setTab] = useState('All');
  const list = events.filter((e) => tab === 'All' || e.status === tab).sort(order);

  return (
    <>
      <PageHero eyebrow="Competitions & Events" title="Test Yourself." accent="Celebrate Progress." image="/images/member.jpg">
        Bodybuilding competitions, transformation challenges, internal contests and community events.
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <div role="group" aria-label="Filter events by status" className="flex flex-wrap gap-2.5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                aria-pressed={tab === t}
                className={`rounded-full border px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  tab === t ? 'border-olive bg-olive text-white' : 'border-line text-charcoal/80 hover:border-gold/60 hover:text-olive'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {list.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * 0.08} className="h-full"><EventCard event={e} /></Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 rounded-2xl border border-line bg-white p-10 text-center text-mist">No events in this category yet.</p>
          )}
        </div>
      </section>

      <CTABanner eyebrow="Join The Community" title="Want To" accent="Compete?" text="Tell us about your goals and we'll let you know about upcoming competitions and challenges." image="/images/functional.jpg" />
    </>
  );
}
