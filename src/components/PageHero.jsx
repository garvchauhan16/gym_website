import { motion } from 'framer-motion';

/** Light banner for inner pages; optional photo shown on large screens. */
export default function PageHero({ eyebrow, title, accent, children, image, children2 }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-sand pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_95%_0%,rgba(217,193,139,0.4),transparent_60%)]" aria-hidden="true" />
      <div className={`container-x ${image ? 'grid items-center gap-10 lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-7' : ''}>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-balance text-[clamp(2.5rem,6.4vw,5rem)] text-charcoal"
          >
            {title} {accent && <span className="text-gold-gradient">{accent}</span>}
          </motion.h1>
          {children && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-mist sm:text-lg">
              {children}
            </motion.p>
          )}
          {children2}
        </div>
        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="hidden lg:col-span-5 lg:block">
            <img src={image} alt="" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_-35px_rgba(35,38,42,0.6)]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
