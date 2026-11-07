import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import QuickActions from '../components/QuickActions.jsx';
import PricingCard from '../components/PricingCard.jsx';
import EventCard from '../components/EventCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Icon } from '../components/icons.jsx';
import { Button, Reveal, SectionHeading } from '../components/ui.jsx';
import { site, cityOr } from '../config/site.js';
import { whyChoose, facilities, programs, events } from '../config/content.js';

const span = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export default function Home() {
  const upcoming = events.filter((e) => e.status === 'Upcoming').slice(0, 3);
  return (
    <>
      <Hero />
      <Stats />
      <QuickActions />

      {/* Introduction */}
      <section id="intro" className="section-y" aria-label="Introduction">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow={`Welcome to ${site.name}`} title="Not Just a Gym." accent="A Standard.">
              {site.name} is built for people who treat training as a discipline. {cityOr() ? `Based in ${site.city}, we` : 'We'} give
              members a clean, focused space, serious equipment and a culture of respect — so every session counts.
            </SectionHeading>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-mist">
              From your first workout to your first competition, the goal is simple: help you become stronger,
              sharper and more consistent than you were yesterday.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/about" variant="dark">Our Story <ArrowRight size={16} aria-hidden="true" /></Button>
              <Button to="/about#owner" variant="outline">Meet the Owner</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative lg:col-span-6">
            <div className="grid grid-cols-5 gap-4">
              <img src="/images/weight-area.jpg" alt="Dumbbells lined up in the weight training area" loading="lazy" className="col-span-3 aspect-[3/4] w-full rounded-[2rem] object-cover shadow-[0_30px_60px_-35px_rgba(35,38,42,0.5)]" />
              <img src="/images/free-weights.jpg" alt="Rack of rubber dumbbells" loading="lazy" className="col-span-2 mt-14 aspect-[2/3] w-full rounded-[2rem] object-cover shadow-[0_30px_60px_-35px_rgba(35,38,42,0.5)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose — dark contrast section */}
      <section className="on-dark section-y bg-forest text-white" aria-label="Why choose Powerhouse Gym">
        <div className="container-x">
          <Reveal>
            <SectionHeading dark eyebrow="Why Powerhouse Gym" title="Why Choose" accent="Powerhouse Gym?" align="center">
              The details that separate a place to exercise from a place to improve.
            </SectionHeading>
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((w, i) => (
              <Reveal as="li" key={w.title} delay={(i % 3) * 0.06} y={14} className="group bg-forest p-8 transition-colors duration-500 hover:bg-[#262d27] sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-light/30 text-gold-light transition-all duration-500 group-hover:bg-gold-light group-hover:text-forest">
                  <Icon name={w.icon} size={22} />
                </span>
                <h3 className="mt-6 text-2xl text-white">{w.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{w.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities — image cards */}
      <section className="section-y" aria-label="Key facilities">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading eyebrow="Facilities" title="Everything You Need" accent="To Train">
                Purpose-built zones for every kind of training.
              </SectionHeading>
            </Reveal>
            <Reveal><Button to="/gallery" variant="dark">Full Gallery <ArrowRight size={16} aria-hidden="true" /></Button></Reveal>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {facilities.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06} y={16} className={`${span[i] ?? 'lg:col-span-2'}`}>
                <Link to="/gallery" className="group relative block h-72 overflow-hidden rounded-3xl sm:h-80">
                  <img src={f.img} alt={f.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <Icon name={f.icon} size={24} className="text-gold-light" />
                    <span className="mt-3 block font-display text-2xl">{f.title}</span>
                    <span className="mt-1 block max-w-xs text-sm text-white/75">{f.text}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Programs */}
      <section className="section-y bg-sand" aria-label="Training programs">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Training Programs" title="Train For Your" accent="Goal">
              Whatever you're working toward, there's a focus built around it.
            </SectionHeading>
          </Reveal>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 0.07} y={16}>
                <Link to="/free-trial" className="group flex h-full gap-5 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-olive/50 hover:shadow-[0_24px_50px_-34px_rgba(35,38,42,0.45)] sm:p-7">
                  <span className="mt-1 text-olive"><Icon name={p.icon} size={28} /></span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl leading-tight text-charcoal">{p.title}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-mist">{p.text}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" className="mt-1.5 shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Membership highlights */}
      <section className="section-y bg-sand" aria-label="Membership highlights">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Memberships" title="Choose Your" accent="Plan" align="center">
              Flexible options for every commitment level. Message us for current pricing.
            </SectionHeading>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {site.memberships.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.07} className="h-full"><PricingCard plan={m} /></Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/memberships" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-olive transition-colors hover:text-gold">
              Compare all plans <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Events */}
      <section className="section-y" aria-label="Upcoming competitions and events">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <SectionHeading eyebrow="Competitions & Events" title="Compete. Challenge." accent="Celebrate.">
                Give your training a deadline worth working for.
              </SectionHeading>
            </Reveal>
            <Reveal><Button to="/events" variant="dark">All Events <ArrowRight size={16} aria-hidden="true" /></Button></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.08} className="h-full"><EventCard event={e} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTABanner />
    </>
  );
}
