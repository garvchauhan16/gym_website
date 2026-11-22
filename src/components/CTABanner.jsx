import { Button, Eyebrow, Reveal } from './ui.jsx';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages, showWhatsapp, hasPhone, telHref } from '../utils/whatsapp.js';
import { site, trial } from '../config/site.js';
import Img from './Img.jsx';

/**
 * Reusable closing call-to-action (navy band). The photo is desaturated so any
 * stock image sits inside the navy palette; the overlay is stronger behind the copy.
 */
export default function CTABanner({
  eyebrow = 'Your First Session Awaits',
  title = 'Ready to Train at',
  accent = `${site.name}?`,
  text = 'Book a trial session, experience the gym first-hand, and see if it’s the right fit for you.',
  image = '/images/barbell.jpg',
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-24 lg:py-32" aria-label="Book a trial">
      <Img src={image} alt="" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35 grayscale" />
      <div
        className="absolute inset-0 -z-10 bg-navy-900/75 md:bg-transparent md:bg-[linear-gradient(90deg,rgba(10,20,40,0.96)_0%,rgba(10,20,40,0.85)_50%,rgba(10,20,40,0.55)_100%)]"
        aria-hidden="true"
      />
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow dark className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="text-balance text-display-2 text-white">
            {title} <span className="text-accent">{accent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Button to="/free-trial" variant="light" size="lg">{trial.cta}</Button>
            {showWhatsapp() && (
              <Button href={whatsappUrl(waMessages.general)} external variant="whatsapp" size="lg">
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </Button>
            )}
            {hasPhone() && (
              <Button href={telHref()} variant="outlineLight" size="lg">
                <Phone size={17} aria-hidden="true" /> Call Now
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
