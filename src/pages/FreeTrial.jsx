import { Check, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import TrialForm from '../components/TrialForm.jsx';
import { Reveal } from '../components/ui.jsx';

const points = [
  { icon: Clock, title: 'Pick your slot', text: 'Tell us the date and time window that works for you.' },
  { icon: MessageCircle, title: 'Send on WhatsApp', text: 'Your details open in WhatsApp, ready to send to our team.' },
  { icon: ShieldCheck, title: 'We confirm with you', text: 'Your trial is booked only once our team replies and confirms.' },
];

export default function FreeTrial() {
  return (
    <>
      <PageHero eyebrow="Free Trial" title="Train With Us." accent="See The Difference." image="/images/barbell.jpg">
        Experience Powerhouse Gym before you commit. Request a trial session and we'll get back to you on WhatsApp.
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:order-2 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-4xl font-bold sm:text-5xl">How It <span className="text-gold-gradient">Works</span></h2>
              <ol className="mt-8 space-y-7">
                {points.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold">
                      <p.icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold"><span className="mr-2 text-gold/60">0{i + 1}</span>{p.title}</h3>
                      <p className="mt-1.5 text-mist">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ul className="mt-10 space-y-3 rounded-2xl border border-line bg-white p-6 text-[15px] text-charcoal/80">
                {['No account or payment needed to request', 'We never store your details on this website', 'Bring a clean towel and training shoes'].map((t) => (
                  <li key={t} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-7" delay={0.1}>
            <TrialForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
