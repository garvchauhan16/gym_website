import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { site } from '../config/site.js';

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/** Renders ONLY when the owner has supplied real stats in config/site.js. */
export default function Stats() {
  if (!site.stats.length) return null;
  return (
    <section className="border-y border-line bg-white py-14" aria-label="Powerhouse Gym in numbers">
      <dl className="container-x grid grid-cols-2 gap-10 text-center md:grid-cols-4">
        {site.stats.map((s) => (
          <div key={s.label}>
            <dd className="text-gold-gradient font-display text-5xl font-bold sm:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-2 text-xs uppercase tracking-[0.2em] text-mist">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
