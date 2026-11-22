import { Check, Clock, Send, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import TrialForm from '../components/TrialForm.jsx';
import { Reveal } from '../components/ui.jsx';
import ContactButton from '../components/ContactButton.jsx';
import { site, trial } from '../config/site.js';
import { waMessages } from '../utils/whatsapp.js';
import { deliveryMode } from '../utils/submit.js';

const mode = deliveryMode();
const points = [
  { icon: Clock, title: 'Pick your slot', text: 'Tell us the day and time window that works for you.' },
  mode === 'whatsapp'
    ? { icon: Send, title: 'Send on WhatsApp', text: 'Your details open in WhatsApp, ready to send to the team.' }
    : { icon: Send, title: 'Submit your request', text: mode === 'demo' ? 'On this demo site you’ll see a preview of what would be sent.' : 'Your details go straight to the team.' },
  { icon: ShieldCheck, title: 'The gym confirms', text: 'A session is booked only once the team contacts you to confirm.' },
];

const assurances = [
  'No account or payment needed to request',
  mode === 'endpoint' ? 'Your details are used only to reply to your request' : 'Nothing is stored on this website',
  'Open Mon–Sat, 6 AM–10 PM · Sunday closed',
];

/**
 * Phone/tablet: form first (the reason people came), then how it works.
 * Laptop+: form on the left, sticky "how it works" on the right.
 */
export default function FreeTrial() {
  return (
    <>
      <PageHero eyebrow={trial.label} title="Train With Us." accent="See The Difference." image="/images/barbell.jpg">
        See {site.name} for yourself before you commit. Tell us when suits you and the team will confirm.
      </PageHero>

      <section className="section-y bg-cloud">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <Reveal className="lg:col-span-7">
            <TrialForm />
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-heading-1">How It <span className="text-accent">Works</span></h2>
              <ol className="relative mt-8 space-y-6">
                {points.map((p, i) => (
                  <li key={p.title} className="relative flex gap-4">
                    {/* connector line between steps */}
                    {i < points.length - 1 && <span className="absolute left-5 top-12 h-[calc(100%-1.5rem)] w-px bg-hairline" aria-hidden="true" />}
                    <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline bg-white text-blue-500">
                      <p.icon size={18} aria-hidden="true" />
                    </span>
                    <div className="pt-1.5">
                      <h3 className="font-display text-lg font-extrabold text-ink">
                        <span className="mr-2 text-slate/60 tabular-nums">0{i + 1}</span>
                        {p.title}
                      </h3>
                      <p className="mt-1 text-slate">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="mt-8 space-y-3 rounded-2xl border border-hairline bg-white p-5 text-[15px] text-ink/85 sm:p-6">
                {assurances.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-blue-500" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-slate">
                <span>Prefer to talk it through?</span>
                <ContactButton
                  message={waMessages.general}
                  size="sm"
                  labels={{ whatsapp: 'Message on WhatsApp', call: `Call ${site.phone}` }}
                  variants={{ whatsapp: 'whatsapp', call: 'secondary' }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
