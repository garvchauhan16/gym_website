import { Button, Reveal } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

/** Reusable closing call-to-action (dark contrast band). */
export default function CTABanner({
  eyebrow = 'Your First Session Awaits',
  title = 'Ready to Train',
  accent = 'Powerhouse?',
  text = 'Book a trial session, experience the gym first-hand, and see why members choose to train here.',
  image = '/images/barbell.jpg',
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forest py-20 text-white sm:py-28" aria-label="Book a trial">
      <img src={image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/85 to-forest/40" aria-hidden="true" />
      <div className="container-x">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold-light">
            <span className="h-px w-10 bg-gold-light" aria-hidden="true" /> {eyebrow}
          </p>
          <h2 className="max-w-3xl text-balance text-5xl text-white sm:text-7xl">
            {title} <span className="text-gold-gradient">{accent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">{text}</p>
          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <Button to="/free-trial" variant="light">Book Your Free Trial</Button>
            <Button href={whatsappUrl(waMessages.general)} external variant="whatsapp">
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
