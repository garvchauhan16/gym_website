import { motion } from 'framer-motion';
import { Eyebrow } from './ui.jsx';
import { duration, ease, fadeUp } from '../utils/motion.js';
import Img from './Img.jsx';

/**
 * Navy banner for inner pages. Optional `image` is shown beside the copy on large
 * screens; `children` is the intro paragraph, `children2` renders below it
 * (e.g. on-page jump links).
 */
export default function PageHero({ eyebrow, title, accent, children, image, children2 }) {
  return (
    <section data-nav-theme="dark" className="on-dark relative isolate overflow-hidden border-b border-white/10 bg-navy-900 pb-16 pt-32 text-white sm:pb-20 sm:pt-40 lg:pb-24">
      <div className={`container-x ${image ? 'grid items-center gap-12 lg:grid-cols-12' : ''}`}>
        <div className={image ? 'lg:col-span-7' : ''}>
          {eyebrow && (
            <motion.div {...fadeUp(0)}>
              <Eyebrow dark className="mb-6">{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 {...fadeUp(0.06, 18)} className="max-w-4xl text-balance text-display-2 text-white">
            {title} {accent && <span className="text-accent">{accent}</span>}
          </motion.h1>
          {children && (
            <motion.p {...fadeUp(0.12)} className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              {children}
            </motion.p>
          )}
          {children2 && <motion.div {...fadeUp(0.18)}>{children2}</motion.div>}
        </div>
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, delay: 0.1, ease }}
            className="hidden lg:col-span-5 lg:block"
          >
            <Img
              src={image}
              alt=""
              sizes="(min-width: 1280px) 500px, 40vw"
              loading="eager"
              className="aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
