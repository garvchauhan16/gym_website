import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import QuickActions from '../components/QuickActions.jsx';
import PricingCard from '../components/PricingCard.jsx';
import EventCard from '../components/EventCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Icon } from '../components/icons.jsx';
import { Button, Reveal, SectionHeading, PhotoTag } from '../components/ui.jsx';
import { site, isOn, cityOr } from '../config/site.js';
import { goodToKnow, facilities, programs, events, copy } from '../config/content.js';
import { stagger } from '../utils/motion.js';
import { upcomingEvents } from '../utils/events.js';
import Img from '../components/Img.jsx';
import LocationMap from '../components/LocationMap.jsx';

/**
 * Facilities grid spans for any number of cards, so no row is left with a lone card.
 * Tablet (2 cols): with an odd count the first card spans the full row.
 * Laptop (6-col grid, 3 per row): leftover cards are widened to fill their row.
 */
function facilitySpan(i, n) {
  const sm = n % 2 === 1 && i === 0 ? 'sm:col-span-2' : '';
  const r = n % 3;
  let lg = 'lg:col-span-2';
  if (n === 1) lg = 'lg:col-span-6';
  else if (r === 2 && i < 2) lg = 'lg:col-span-3';
  else if (r === 1 && i < 4) lg = 'lg:col-span-3';
  return `${sm} ${lg}`;
}

/** Heading on the left, action on the right; stacks on phones. */
function SectionHeader({ children, action }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal>{children}</Reveal>
      {action && <Reveal className="shrink-0">{action}</Reveal>}
    </div>
  );
}

export default function Home() {
  const upcoming = isOn('events') ? upcomingEvents(events).slice(0, 3) : [];
  const sample = (list) => list.some((x) => x.placeholder);
  // Light sections after Facilities (white) alternate cloud/white, whichever are switched on.
  let n = 0;
  const nextBg = () => (n++ % 2 === 0 ? 'bg-cloud' : 'bg-white');
  const bg = {
    programs: isOn('programs') ? nextBg() : '',
    memberships: nextBg(),
    events: upcoming.length ? nextBg() : '',
    testimonials: isOn('testimonials') ? nextBg() : '',
    location: nextBg(),
  };

  return (
    <>
      <Hero />
      <Stats />
      <QuickActions />

      {/* Introduction */}
      <section id="intro" className="section-y bg-cloud" aria-label="Introduction">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow={`Welcome to ${site.name}`} title="Not Just a Gym." accent="A Standard." sample={copy.placeholder && 'Sample copy'}>
              {copy.homeIntro.lead}
            </SectionHeading>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-slate">{copy.homeIntro.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <Button to="/about" variant="navy">
                Our Story <ArrowRight size={16} aria-hidden="true" />
              </Button>
              {isOn('owner') && <Button to="/about#owner" variant="outline">Meet the Owner</Button>}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="relative mx-auto grid max-w-xl grid-cols-5 gap-3 sm:gap-4 lg:max-w-none">
              <PhotoTag className="absolute left-3 top-3 z-10" />
              <Img
                src="/images/weight-area.jpg"
                sizes="(min-width: 1024px) 30vw, 60vw"
                alt="Dumbbells lined up in the weight training area"
                loading="lazy"
                className="col-span-3 aspect-[3/4] w-full rounded-2xl object-cover"
              />
              <Img
                src="/images/free-weights.jpg"
                sizes="(min-width: 1024px) 20vw, 40vw"
                alt="Rack of rubber dumbbells"
                loading="lazy"
                className="col-span-2 mt-10 aspect-[2/3] w-full rounded-2xl object-cover sm:mt-14"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Good to know — navy contrast section, verified facts only */}
      {goodToKnow.length > 0 && (
        <section className="on-dark section-y bg-navy-900 text-white" aria-label={`Good to know about ${site.name}`}>
          <div className="container-x">
            <Reveal>
              <SectionHeading dark eyebrow="Plan Your Visit" title="Good to Know" accent="Before You Come" align="center">
                The essentials, confirmed by {site.name}.
              </SectionHeading>
            </Reveal>
            <Reveal>
              <ul className={`mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 ${goodToKnow.length === 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
                {goodToKnow.map((w, i) => (
                  <li key={w.title} className="relative flex gap-4 bg-navy-900 p-5 transition-colors duration-300 hover:bg-navy-800 sm:gap-6 sm:p-8 lg:block lg:p-10">
                    <span className="absolute right-5 top-5 font-display text-sm font-bold text-white/25 sm:right-8 sm:top-8" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-blue-300">
                      <Icon name={w.icon} size={20} />
                    </span>
                    <div className="min-w-0 pr-6 lg:pr-0">
                      <h3 className="text-heading-2 text-white lg:mt-6">{w.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-white/65 lg:mt-3">{w.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Facilities — image cards */}
      <section className="section-y bg-white" aria-label="Key facilities">
        <div className="container-x">
          <SectionHeader
            action={
              <Button to="/gallery" variant="secondary">
                Full Gallery <ArrowRight size={16} aria-hidden="true" />
              </Button>
            }
          >
            <SectionHeading eyebrow="Facilities" title="Ask About Our" accent="Training Areas" sample={sample(facilities) && 'Facilities to be confirmed'}>
              Equipment and facility details will be listed once confirmed by the gym. Photos below are illustrative.
            </SectionHeading>
          </SectionHeader>
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
            {facilities.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * stagger} className={facilitySpan(i, facilities.length)}>
                <Link to="/gallery" className="group relative block h-64 overflow-hidden rounded-2xl bg-navy-900 sm:h-72 lg:h-80">
                  <Img
                    src={f.img}
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" aria-hidden="true" />
                  <PhotoTag className="absolute left-4 top-4" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                    <span>
                      <Icon name={f.icon} size={22} className="text-blue-300" />
                      <span className="mt-3 block font-display text-xl font-extrabold tracking-[-0.015em] sm:text-2xl">{f.title}</span>
                      <span className="mt-1 block max-w-xs text-sm text-white/75">{f.text}</span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-navy-900">
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs */}
      {isOn('programs') && (
      <section className={`section-y ${bg.programs}`} aria-label="Training programs">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Training Programs" title="Train For Your" accent="Goal" sample={sample(programs) && 'Sample programmes'}>
              Whatever you're working toward, there's a focus built around it.
            </SectionHeading>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * stagger}>
                <Link
                  to="/free-trial"
                  className="group flex h-full items-start gap-4 rounded-2xl border border-hairline bg-white p-5 transition-colors duration-300 hover:border-ink/20 sm:p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-500">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-extrabold leading-tight tracking-[-0.015em] text-ink sm:text-xl">{p.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-slate">{p.text}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-slate transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      )}

      {/* Membership highlights */}
      <section className={`section-y ${bg.memberships}`} aria-label="Membership highlights">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Memberships" title="Choose Your" accent="Plan" align="center">
              Membership options at a glance. Contact the gym for current pricing.
            </SectionHeading>
          </Reveal>
          {/* Phone: horizontal swipe row · Tablet: 2×2 grid · Laptop (xl): 4 columns */}
          <Reveal className="mt-12 sm:mt-14">
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
              {site.memberships.map((m) => (
                <div key={m.id} className="w-[84%] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <PricingCard plan={m} />
                </div>
              ))}
            </div>
            <p className="-mt-3 text-center text-xs text-slate sm:hidden">Swipe to compare plans →</p>
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Link
              to="/memberships"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-blue-500 transition-colors hover:text-blue-600"
            >
              View membership options <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Events — hidden entirely when nothing is upcoming */}
      {upcoming.length > 0 && (
        <section className={`section-y ${bg.events}`} aria-label="Upcoming competitions and events">
          <div className="container-x">
            <SectionHeader
              action={
                <Button to="/events" variant="secondary">
                  All Events <ArrowRight size={16} aria-hidden="true" />
                </Button>
              }
            >
              <SectionHeading eyebrow="Competitions & Events" title="Compete. Challenge." accent="Celebrate.">
                Give your training a deadline worth working for.
              </SectionHeading>
            </SectionHeader>
            <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e, i) => (
                <Reveal
                  key={e.id}
                  delay={i * stagger}
                  // Tablet shows two cards side by side; the third returns on laptop.
                  className={`h-full ${i === 2 ? 'md:hidden lg:block' : ''}`}
                >
                  <EventCard event={e} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {isOn('testimonials') && <Testimonials bg={bg.testimonials} />}

      {/* Location */}
      <section id="location" className={`section-y scroll-mt-20 ${bg.location}`} aria-label="Location and opening hours">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Location & Hours" title="Find Us in" accent={cityOr('Zirakpur')}>
              On the 2nd floor of SS Plaza, Nabha Road, Bhabat. Tap Get Directions to open Google Maps, or call before you visit.
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.06} className="mt-10 sm:mt-12">
            <LocationMap showHours />
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
