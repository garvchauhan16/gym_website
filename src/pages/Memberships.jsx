import { MessageCircle, CalendarCheck, Dumbbell } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import PricingCard from '../components/PricingCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Reveal, SectionHeading, Button } from '../components/ui.jsx';
import { site } from '../config/site.js';

const steps = [
  { icon: CalendarCheck, title: 'Try a session', text: 'Request a free trial to experience the gym first-hand.' },
  { icon: MessageCircle, title: 'Ask us anything', text: 'Message us on WhatsApp for current pricing and plan advice.' },
  { icon: Dumbbell, title: 'Start training', text: 'Pick the plan that fits and begin your journey.' },
];

export default function Memberships() {
  return (
    <>
      <PageHero eyebrow="Memberships" title="Invest In" accent="Your Strength">
        Simple plans, no complicated tiers. Choose the commitment that suits your goals — longer plans offer better value per month.
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {site.memberships.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} className="h-full"><PricingCard plan={m} /></Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-mist">
            Prices, inclusions and offers are confirmed by the Powerhouse Gym team on WhatsApp. Plan details shown here are a
            summary and may be updated.
          </p>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How It Works" title="Getting Started Is" accent="Easy" align="center" />
          </Reveal>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative rounded-3xl border border-line bg-ivory p-8">
                <span className="absolute right-6 top-4 font-display text-7xl font-bold text-charcoal/[0.05]" aria-hidden="true">0{i + 1}</span>
                <s.icon className="text-gold" size={30} aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-mist">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 text-center"><Button to="/free-trial">Book Your Free Trial</Button></Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
