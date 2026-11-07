import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, ArrowRight, Clock, Quote, User, X } from 'lucide-react';
import { trainers } from '../config/content.js';
import { Button, Reveal, SampleTag, SectionHeading } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

function Photo({ t, className = '' }) {
  if (t.photo) return <img src={t.photo} alt={`${t.name}, ${t.designation}`} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`grid h-full w-full place-items-center bg-gradient-to-br from-sand via-[#eadfc8] to-gold-light/60 ${className}`} role="img" aria-label="Trainer photograph coming soon">
      <div className="text-center text-olive/70">
        <User size={64} strokeWidth={1.2} aria-hidden="true" className="mx-auto" />
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em]">Photo coming soon</p>
      </div>
    </div>
  );
}

function TrainerCard({ t, onOpen, delay }) {
  return (
    <Reveal as="li" delay={delay} y={18} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(35,38,42,0.45)]">
        <div className="relative aspect-[4/4.3] overflow-hidden">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-105"><Photo t={t} /></div>
          {t.placeholder && <SampleTag className="absolute left-4 top-4">Sample profile</SampleTag>}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.designation}</p>
          <h3 className="mt-2 text-[1.7rem] text-charcoal">{t.name}</h3>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex gap-2"><dt className="w-24 shrink-0 text-mist">Specialty</dt><dd className="text-charcoal">{t.specialization}</dd></div>
            <div className="flex gap-2"><dt className="w-24 shrink-0 text-mist">Experience</dt><dd className="text-charcoal">{t.experience}</dd></div>
          </dl>
          <p className="mt-4 line-clamp-3 flex-1 text-[15px] leading-relaxed text-mist">{t.intro}</p>
          <div className="mt-6 flex gap-2.5">
            <button
              type="button"
              onClick={() => onOpen(t)}
              className="btn-shine inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-charcoal/20 px-5 text-[13px] font-semibold uppercase tracking-[0.1em] text-charcoal transition-all hover:border-olive hover:text-olive active:scale-[0.97]"
              aria-label={`View full profile of ${t.name}`}
            >
              View Profile <ArrowRight size={15} aria-hidden="true" />
            </button>
            <a
              href={whatsappUrl(waMessages.trainer(t))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message about training with ${t.name} on WhatsApp`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-[#07240f] transition-all hover:-translate-y-0.5 hover:bg-[#1fbd5a] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function TrainerModal({ t, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-forest/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-ivory sm:rounded-3xl md:grid-cols-5"
      >
        <button ref={closeRef} onClick={onClose} aria-label="Close trainer profile" className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-charcoal shadow transition-colors hover:text-olive">
          <X size={20} />
        </button>
        <div className="aspect-[4/3] md:col-span-2 md:aspect-auto md:min-h-[480px]"><Photo t={t} /></div>
        <div className="p-6 sm:p-9 md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.designation}</p>
          <h3 id="trainer-modal-title" className="mt-2 text-4xl text-charcoal">{t.name}</h3>
          {t.placeholder && <SampleTag className="mt-3">Sample profile</SampleTag>}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line bg-white p-4"><p className="text-xs uppercase tracking-wider text-mist">Specialization</p><p className="mt-1 font-medium text-charcoal">{t.specialization}</p></div>
            <div className="rounded-2xl border border-line bg-white p-4"><p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-mist"><Clock size={12} aria-hidden="true" /> Experience</p><p className="mt-1 font-medium text-charcoal">{t.experience}</p></div>
          </div>
          {t.certifications?.length > 0 && (
            <div className="mt-6">
              <h4 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold"><Award size={15} aria-hidden="true" /> Certifications</h4>
              <ul className="mt-3 space-y-1.5 text-[15px] text-charcoal">
                {t.certifications.map((c) => <li key={c} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive" aria-hidden="true" />{c}</li>)}
              </ul>
            </div>
          )}
          <p className="mt-6 leading-relaxed text-mist">{t.intro}</p>
          <figure className="mt-6 rounded-2xl bg-sand p-5">
            <Quote size={22} className="text-gold" aria-hidden="true" />
            <figcaption className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">Training philosophy</figcaption>
            <blockquote className="mt-2 font-display text-lg italic leading-snug text-charcoal">{t.philosophy}</blockquote>
          </figure>
          <Button href={whatsappUrl(waMessages.trainer(t))} external variant="whatsapp" className="mt-7 w-full">
            <WhatsAppIcon className="h-5 w-5" /> Enquire About {t.name}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Trainers section. `limit` shows a preview (home page); full list on About. */
export default function Trainers({ limit, className = '', bg = 'bg-ivory' }) {
  const [active, setActive] = useState(null);
  const list = limit ? trainers.slice(0, limit) : trainers;
  if (!trainers.length) return null;
  return (
    <section id="trainers" className={`section-y ${bg} ${className}`} aria-label="Meet our trainers">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Our Team" title="Meet Our" accent="Trainers">
              Experienced guidance, tailored to your goals. Get to know the people who'll train alongside you.
            </SectionHeading>
          </Reveal>
          {limit && <Reveal><Button to="/about#trainers" variant="dark">All Trainers <ArrowRight size={16} aria-hidden="true" /></Button></Reveal>}
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => <TrainerCard key={t.id} t={t} delay={i * 0.08} onOpen={setActive} />)}
        </ul>
        <Reveal className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-line bg-white p-8 text-center sm:p-10">
          <h3 className="text-3xl text-charcoal">Not sure which trainer suits you?</h3>
          <p className="max-w-lg text-mist">Tell us your goal and we'll point you to the right person.</p>
          <Button href={whatsappUrl(waMessages.trainers)} external variant="whatsapp">
            <WhatsAppIcon className="h-5 w-5" /> Connect With Our Trainers
          </Button>
        </Reveal>
      </div>
      <AnimatePresence>{active && <TrainerModal t={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}
