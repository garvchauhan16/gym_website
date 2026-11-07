import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { Button } from './ui.jsx';

const rise = (i) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-0" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_88%_10%,rgba(217,193,139,0.35),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgba(86,99,67,0.10),transparent_60%)]" aria-hidden="true" />
      <div className="container-x grid items-center gap-12 pb-16 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-28">
        <div className="lg:col-span-6">
          <motion.p {...rise(0)} className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {site.name}
          </motion.p>
          <h1 id="hero-title" className="text-[clamp(2.9rem,7.4vw,6.2rem)] leading-[0.98] text-charcoal">
            <motion.span {...rise(1)} className="block">Build Strength.</motion.span>
            <motion.span {...rise(2)} className="block text-gold-gradient">Define Yourself.</motion.span>
          </h1>
          <motion.p {...rise(3)} className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-mist sm:text-lg">
            A premium, welcoming fitness club for people who train with purpose. Serious equipment, a respectful
            atmosphere, and a community that helps you get sharper every session.
          </motion.p>
          <motion.div {...rise(4)} className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Button to="/free-trial" className="sm:min-w-[230px]">Book Your Free Trial</Button>
            <Button to="/memberships" variant="outline" className="sm:min-w-[230px]">Explore Memberships</Button>
          </motion.div>
          <motion.ul {...rise(5)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
            {['Request in under a minute', 'No payment to enquire', 'Reply on WhatsApp'].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check size={16} className="text-olive" aria-hidden="true" />{t}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative ml-auto aspect-[4/4.4] w-full max-w-xl overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_40px_90px_-40px_rgba(35,38,42,0.55)] sm:aspect-[4/4.6]">
            <img
              src="/images/atmosphere.jpg"
              alt="Bright, modern gym floor with spin bikes and training equipment"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <img
            src="/images/barbell.jpg"
            alt="Athlete setting up a loaded barbell"
            loading="eager"
            className="absolute -bottom-6 left-0 hidden aspect-square w-40 rounded-3xl border-[6px] border-ivory object-cover shadow-xl sm:block lg:-left-6 lg:w-48"
          />
          <Link
            to="/free-trial"
            className="group absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_20px_50px_-20px_rgba(35,38,42,0.5)] transition-transform hover:-translate-y-1 sm:right-0 lg:-right-2"
          >
            <span className="text-left">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">First visit</span>
              <span className="block font-display text-xl text-charcoal">Try a free session</span>
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-olive text-white transition-transform group-hover:rotate-45">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
