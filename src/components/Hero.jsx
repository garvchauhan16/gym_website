import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { site, filled, hasCity, trial } from '../config/site.js';
import { copy } from '../config/content.js';
import { Button, Eyebrow, PhotoTag } from './ui.jsx';
import { fadeUp } from '../utils/motion.js';
import Img from './Img.jsx';

/** Splits "Build Strength. Define Yourself." into a white line and an accent line. */
function splitTagline(t) {
  const parts = String(t).split(/(?<=[.!?])\s+/);
  return parts.length > 1 ? [parts[0], parts.slice(1).join(' ')] : [t, ''];
}

/**
 * Facts shown in the hero's bottom strip — verified details from config/site.js
 * only (location, weekday hours, phone), plus how to request a trial.
 */
function heroFacts() {
  const weekday = site.hours.find((h) => /monday/i.test(h.days) && filled(h.time));
  return [
    hasCity() && { label: 'Location', value: `Bhabat, ${site.city}` },
    weekday && { label: weekday.days.replace(' – ', '–'), value: weekday.time.replace(/:00/g, '') },
    filled(site.phone) && { label: 'Call', value: site.phone, href: `tel:${site.phoneIntl || site.phone}` },
    { label: trial.label, value: 'Request online' },
  ].filter(Boolean).slice(0, 4);
}

const mdCols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

export default function Hero() {
  const [line1, line2] = splitTagline(site.tagline);
  const facts = heroFacts();

  return (
    <section
      data-nav-theme="dark"
      className="on-dark relative isolate flex flex-col overflow-hidden bg-navy-950 text-white lg:min-h-[min(100svh,980px)]"
      aria-labelledby="hero-title"
    >
      {/* Photo + legibility overlay (stronger on the copy side) */}
      <Img
        src="/images/hero.jpg"
        alt=""
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center] opacity-60"
      />
      <div
        className="absolute inset-0 -z-10 bg-navy-950/70 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(5,11,26,0.94)_0%,rgba(5,11,26,0.82)_45%,rgba(5,11,26,0.35)_100%)]"
        aria-hidden="true"
      />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-36">
        <PhotoTag className="absolute bottom-4 right-5 sm:right-6" />
        <div className="max-w-[46rem]">
          <motion.div {...fadeUp(0)}>
            <Eyebrow dark className="mb-6 sm:mb-8">
              {site.name}{hasCity() ? ` · ${site.city}` : ''}
            </Eyebrow>
          </motion.div>

          <h1 id="hero-title" className="text-display-1 text-balance">
            <motion.span {...fadeUp(0.05, 18)} className="block">{line1}</motion.span>
            {line2 && <motion.span {...fadeUp(0.12, 18)} className="block text-accent">{line2}</motion.span>}
          </h1>

          <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg">
            {copy.heroIntro}
          </motion.p>

          <motion.div {...fadeUp(0.28)} className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Button to="/free-trial" size="lg">{trial.cta}</Button>
            <Button to="/memberships" size="lg" variant="outlineLight">Explore Memberships</Button>
          </motion.div>

          <motion.ul {...fadeUp(0.34)} className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/65">
            {['Request in under a minute', 'No payment to enquire'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={15} className="text-blue-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Key facts strip — hairline dividers come from the 1px grid gap */}
      <motion.div {...fadeUp(0.4, 10)} className="border-t border-white/10 bg-navy-950">
        <div className="container-x">
          <dl className={`grid grid-cols-2 gap-px bg-white/10 ${mdCols[facts.length] ?? 'md:grid-cols-4'}`}>
            {facts.map((f, i) => {
              const lastOdd = facts.length % 2 === 1 && i === facts.length - 1;
              return (
                <div
                  key={f.label}
                  className={`bg-navy-950 py-5 sm:py-6 ${i % 2 === 0 ? 'pr-4' : 'px-4 sm:px-6'} ${lastOdd ? 'col-span-2 md:col-span-1' : ''} ${
                    i === 0 ? 'md:pr-6' : 'md:px-6 lg:px-8'
                  }`}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-[15px] font-bold text-white sm:text-lg">
                    {f.href ? <a href={f.href} className="transition-colors hover:text-blue-300">{f.value}</a> : f.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
