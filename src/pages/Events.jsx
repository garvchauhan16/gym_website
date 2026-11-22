import { useState } from 'react';
import { CalendarX } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import EventCard from '../components/EventCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Button, FilterTabs, Reveal, SampleTag, centerOrphan } from '../components/ui.jsx';
import { WhatsAppIcon } from '../components/icons.jsx';
import { events, copy } from '../config/content.js';
import { eventStatus, byStatusThenDate } from '../utils/events.js';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import { stagger } from '../utils/motion.js';
import { site } from '../config/site.js';

const tabs = ['All', 'Upcoming', 'Completed'];

export default function Events() {
  const [tab, setTab] = useState('All');
  const list = events.filter((e) => tab === 'All' || eventStatus(e) === tab).sort(byStatusThenDate);
  const counts = {
    All: events.length,
    Upcoming: events.filter((e) => eventStatus(e) === 'Upcoming').length,
    Completed: events.filter((e) => eventStatus(e) === 'Completed').length,
  };

  return (
    <>
      <PageHero eyebrow="Competitions & Events" title="Test Yourself." accent="Celebrate Progress." image="/images/member.jpg">
        {copy.eventsHero}
      </PageHero>

      <section className="section-y bg-cloud">
        <div className="container-x">
          {site.showPlaceholderNotices && events.some((e) => e.placeholder) && (
            <p className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate">
              <SampleTag>Sample events</SampleTag>
              <span>Listings below are examples — real events will replace them.</span>
            </p>
          )}
          <FilterTabs label="Filter events by status" options={tabs} value={tab} onChange={setTab} counts={counts} />

          {list.length ? (
            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {list.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * stagger} className={`h-full ${centerOrphan(i, list.length)}`}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-hairline bg-white px-6 py-14 text-center sm:mt-12">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-100 text-blue-500">
                <CalendarX size={22} aria-hidden="true" />
              </span>
              <p className="mt-5 font-display text-xl font-extrabold text-ink">No {tab.toLowerCase()} events right now</p>
              <p className="mt-2 max-w-sm text-slate">Message us on WhatsApp and we’ll let you know when the next one is announced.</p>
              <Button href={whatsappUrl(waMessages.general)} external variant="whatsapp" className="mt-6">
                <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
              </Button>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        eyebrow="Join The Community"
        title="Want To"
        accent="Compete?"
        text="Tell us about your goals and we'll let you know about upcoming competitions and challenges."
        image="/images/functional.jpg"
      />
    </>
  );
}
