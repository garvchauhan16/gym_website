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
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const cols = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' };

/** Renders ONLY when the owner has supplied real stats in config/site.js. */
export default function Stats() {
  if (!site.stats.length) return null;
  const n = Math.min(site.stats.length, 4);
  return (
    <section className="border-b border-hairline bg-white" aria-label={`${site.name} in numbers`}>
      <div className="container-x">
        <dl className={`grid grid-cols-2 gap-px bg-hairline ${cols[n]}`}>
          {site.stats.slice(0, 4).map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse bg-white px-4 py-8 sm:px-6 sm:py-10 ${n % 2 === 1 && i === n - 1 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              {/* dt precedes dd in the DOM; flex-col-reverse shows the number first */}
              <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-[-0.03em] text-navy-900 sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
