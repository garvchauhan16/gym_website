import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { Award, ArrowRight, Clock, Quote, User, UserRound, X } from 'lucide-react';
import { trainers, copy } from '../config/content.js';
import { Button, Reveal, SampleTag, SectionHeading, centerOrphan } from './ui.jsx';
import ContactButton from './ContactButton.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { duration, ease, stagger } from '../utils/motion.js';
import Img from './Img.jsx';

function Photo({ t, className = '' }) {
  if (t.photo) return <Img src={t.photo} alt={`${t.name}, ${t.designation}`} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`grid h-full w-full place-items-center bg-cloud ${className}`} role="img" aria-label="Trainer photograph coming soon">
      <div className="text-center text-slate">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-hairline bg-white text-navy-600">
          <User size={36} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em]">Photo coming soon</p>
      </div>
    </div>
  );
}

function TrainerCard({ t, onOpen, delay, className }) {
  return (
    <Reveal as="li" delay={delay} className={`h-full ${className}`}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-colors duration-300 hover:border-ink/20">
        <div className={`relative overflow-hidden ${t.photo ? 'aspect-[4/4.2] sm:aspect-[4/3.6]' : 'aspect-[16/9] sm:aspect-[4/3.6]'}`}>
          <Photo t={t} />
          {t.placeholder && <SampleTag className="absolute left-4 top-4">Sample profile</SampleTag>}
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">{t.designation}</p>
          <h3 className="mt-2 text-heading-2 text-ink">{t.name}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline text-sm">
            <div className="bg-white px-3 py-2.5">
              <dt className="text-xs text-slate">Specialty</dt>
              <dd className="mt-0.5 font-medium text-ink">{t.specialization}</dd>
            </div>
            <div className="bg-white px-3 py-2.5">
              <dt className="text-xs text-slate">Experience</dt>
              <dd className="mt-0.5 font-medium text-ink">{t.experience}</dd>
            </div>
          </dl>
          <p className="mt-4 line-clamp-3 flex-1 text-[15px] leading-relaxed text-slate">{t.intro}</p>
          <div className="mt-6 flex gap-2.5">
            <Button type="button" variant="outline" onClick={(e) => onOpen(t, e.currentTarget)} className="flex-1" aria-label={`View full profile of ${t.name}`}>
              View Profile <ArrowRight size={15} aria-hidden="true" />
            </Button>
            <Button
              href={whatsappUrl(waMessages.trainer(t))}
              external
              variant="whatsapp"
              size="icon"
              aria-label={`Message about training with ${t.name} on WhatsApp`}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/** Profile dialog: bottom sheet on phones, centred two-column card from md. */
function TrainerModal({ t, onClose, returnFocusRef }) {
  const ref = useRef(null);
  const closeRef = useRef(null);
  // Release the trap (and return focus) as soon as the exit animation starts.
  const isPresent = useIsPresent();
  useFocusTrap(ref, isPresent, { initialFocusRef: closeRef, returnFocusRef });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.fast }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-navy-950/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 32, opacity: 0 }}
        transition={{ duration: duration.base, ease }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white sm:rounded-2xl md:grid-cols-5"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close trainer profile"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white text-ink transition-colors hover:border-ink/30"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <div className="aspect-[4/3] md:col-span-2 md:aspect-auto md:min-h-[480px]">
          <Photo t={t} />
        </div>
        <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-8 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">{t.designation}</p>
          <h3 id="trainer-modal-title" className="mt-2 pr-12 text-heading-1 text-ink">{t.name}</h3>
          {t.placeholder && <SampleTag className="mt-3">Sample profile</SampleTag>}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-hairline p-4">
              <p className="text-xs text-slate">Specialization</p>
              <p className="mt-1 font-medium text-ink">{t.specialization}</p>
            </div>
            <div className="rounded-xl border border-hairline p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate"><Clock size={12} aria-hidden="true" /> Experience</p>
              <p className="mt-1 font-medium text-ink">{t.experience}</p>
            </div>
          </div>
          {t.certifications?.length > 0 && (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-slate">
                <Award size={15} className="text-blue-500" aria-hidden="true" /> Certifications
              </h4>
              <ul className="mt-3 space-y-1.5 text-[15px] text-ink">
                {t.certifications.map((c) => (
                  <li key={c} className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-blue-500" aria-hidden="true" />{c}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-6 leading-relaxed text-slate">{t.intro}</p>
          <figure className="mt-6 rounded-xl bg-cloud p-5">
            <Quote size={20} className="text-blue-500" aria-hidden="true" />
            <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">Training philosophy</figcaption>
            <blockquote className="mt-2 font-display text-lg font-bold leading-snug text-ink">{t.philosophy}</blockquote>
          </figure>
          <Button href={whatsappUrl(waMessages.trainer(t))} external variant="whatsapp" className="mt-7 w-full">
            <WhatsAppIcon className="h-5 w-5" /> Enquire About {t.name}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Shown while no real trainer profiles exist: the section's structure with
 * unnamed profile slots — no invented people, names or biographies.
 */
function TrainersComingSoon({ className, bg }) {
  return (
    <section id="trainers" className={`section-y scroll-mt-20 ${bg} ${className}`} aria-label="Meet our trainers">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Our Team" title="Meet Our" accent="Trainers">
            {copy.trainersIntro}
          </SectionHeading>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6" aria-label="Trainer profiles coming soon">
          {[0, 1, 2].map((i) => (
            <Reveal as="li" key={i} delay={i * stagger} className={i === 2 ? 'hidden sm:block' : ''}>
              <div className="overflow-hidden rounded-2xl border border-dashed border-ink/15 bg-white">
                <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br from-cloud to-blue-100/60 sm:aspect-[4/3.6]">
                  <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-blue-500/10" aria-hidden="true" />
                  <span className="absolute -bottom-14 -left-8 h-44 w-44 rounded-full border border-blue-500/10" aria-hidden="true" />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white bg-white/80 text-navy-600 shadow-[0_12px_30px_-18px_rgba(10,20,40,0.5)]">
                    <UserRound size={34} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                </div>
                <div className="space-y-3 p-5 sm:p-6" aria-hidden="true">
                  <span className="block h-2.5 w-24 rounded-full bg-blue-500/25" />
                  <span className="block h-4 w-40 rounded-full bg-ink/10" />
                  <span className="block h-2.5 w-full rounded-full bg-ink/[0.06]" />
                  <span className="block h-2.5 w-4/5 rounded-full bg-ink/[0.06]" />
                </div>
                <p className="border-t border-hairline px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate sm:px-6">
                  Profile coming soon
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-navy-900 p-6 text-white sm:mt-12 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div>
            <h3 className="text-heading-2 text-white">Want to know about coaching?</h3>
            <p className="mt-2 max-w-lg text-white/70">Trainer profiles will be added once the team shares them. Until then, ask the gym directly.</p>
          </div>
          <ContactButton
            message={waMessages.trainers}
            labels={{ whatsapp: 'Ask on WhatsApp', call: 'Call the Gym' }}
            variants={{ whatsapp: 'whatsapp', call: 'light' }}
            className="w-full shrink-0 md:w-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}

/** Trainers section. `limit` shows a preview; full list on About. */
export default function Trainers({ limit, className = '', bg = 'bg-white' }) {
  const [active, setActive] = useState(null);
  const openerRef = useRef(null);
  const open = useCallback((t, el) => {
    openerRef.current = el;
    setActive(t);
  }, []);
  const close = useCallback(() => setActive(null), []);
  const list = limit ? trainers.slice(0, limit) : trainers;
  if (!trainers.length) return <TrainersComingSoon className={className} bg={bg} />;
  return (
    <section id="trainers" className={`section-y scroll-mt-20 ${bg} ${className}`} aria-label="Meet our trainers">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Our Team" title="Meet Our" accent="Trainers">
              {copy.trainersIntro}
            </SectionHeading>
          </Reveal>
          {limit && (
            <Reveal className="shrink-0">
              <Button to="/about#trainers" variant="secondary">All Trainers <ArrowRight size={16} aria-hidden="true" /></Button>
            </Reveal>
          )}
        </div>
        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {list.map((t, i) => (
            <TrainerCard key={t.id} t={t} delay={(i % 3) * stagger} onOpen={open} className={centerOrphan(i, list.length)} />
          ))}
        </ul>
        <Reveal className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-navy-900 p-6 text-white sm:mt-12 sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div>
            <h3 className="text-heading-2 text-white">Not sure which trainer suits you?</h3>
            <p className="mt-2 max-w-lg text-white/70">Tell us your goal and we'll point you to the right person.</p>
          </div>
          <Button href={whatsappUrl(waMessages.trainers)} external variant="whatsapp" className="w-full shrink-0 md:w-auto">
            <WhatsAppIcon className="h-5 w-5" /> Connect With Our Trainers
          </Button>
        </Reveal>
      </div>
      <AnimatePresence>{active && <TrainerModal t={active} onClose={close} returnFocusRef={openerRef} />}</AnimatePresence>
    </section>
  );
}
