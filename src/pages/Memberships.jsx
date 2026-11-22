import { CalendarCheck, Dumbbell, Phone, BadgeIndianRupee, ListChecks, Ticket, Sparkles } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import PricingCard from '../components/PricingCard.jsx';
import CTABanner from '../components/CTABanner.jsx';
import ContactButton from '../components/ContactButton.jsx';
import { Reveal, SectionHeading, Button, SampleTag } from '../components/ui.jsx';
import { site, trial, hasWhatsapp } from '../config/site.js';
import { waMessages } from '../utils/whatsapp.js';
import { stagger } from '../utils/motion.js';
import { copy } from '../config/content.js';

const steps = [
  { icon: Phone, title: hasWhatsapp() ? 'Get in touch' : 'Call the gym', text: `Ask the team for current membership options and pricing${site.phone ? ` on ${site.phone}` : ''}.` },
  { icon: CalendarCheck, title: 'Request a trial', text: `Ask about a ${trial.noun} to see the gym for yourself before you decide.` },
  { icon: Dumbbell, title: 'Start training', text: 'Choose the plan that fits your goals and schedule.' },
];

/** Neutral questions a visitor can ask — no claims about what the gym offers. */
const askAbout = [
  { icon: BadgeIndianRupee, title: 'Current prices', text: 'For each plan length.' },
  { icon: ListChecks, title: 'What’s included', text: 'Access and any extras per plan.' },
  { icon: Ticket, title: 'Joining fees', text: 'Whether any one-time fee applies.' },
  { icon: Sparkles, title: 'Current offers', text: 'Any seasonal or introductory deals.' },
];

export default function Memberships() {
  return (
    <>
      <PageHero eyebrow="Memberships" title="Invest In" accent="Your Strength">
        {copy.membershipsHero}
      </PageHero>

      {/* Plans */}
      <section className="section-y bg-white" aria-label="Membership options">
        <div className="container-x">
          {!site.plansConfirmed && (
            <p className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate sm:mb-10">
              <SampleTag>Plan options to be confirmed</SampleTag>
              <span>Plan lengths are shown for layout; prices and inclusions come directly from the gym.</span>
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {site.memberships.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * stagger} className="h-full">
                <PricingCard plan={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to ask */}
      <section className="on-dark section-y bg-navy-900 text-white" aria-label="What to ask the gym">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading dark eyebrow="Before You Join" title="Questions to Ask" accent="The Team">
              Pricing is quoted directly by {site.name}, so you always get current figures. These are worth asking about.
            </SectionHeading>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ContactButton
                message={waMessages.general}
                labels={{ whatsapp: 'Ask on WhatsApp', call: `Call ${site.phone}` }}
                variants={{ whatsapp: 'whatsapp', call: 'light' }}
                size="lg"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {askAbout.map((a) => (
                <li key={a.title} className="flex gap-4 bg-navy-900 p-5 sm:p-7">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-blue-300">
                    <a.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-white">{a.title}</h3>
                    <p className="mt-1 text-[15px] text-white/65">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y bg-white">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="How It Works" title="Getting Started Is" accent="Easy" align="center" />
          </Reveal>
          <ol className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * stagger} className="relative rounded-2xl border border-hairline bg-white p-6 sm:p-8">
                <span className="absolute right-6 top-6 font-display text-sm font-bold tabular-nums text-slate/50" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-100 text-blue-500">
                  <s.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-heading-2 text-ink">{s.title}</h3>
                <p className="mt-2 text-slate">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 flex justify-center sm:mt-12">
            <Button to="/free-trial" size="lg" className="w-full sm:w-auto">{trial.cta}</Button>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
