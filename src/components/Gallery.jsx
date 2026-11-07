import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery, galleryCategories } from '../config/content.js';

const spanClass = {
  tall: 'sm:row-span-2',
  wide: 'sm:col-span-2',
  normal: '',
};

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [active, setActive] = useState(null); // index into `items`
  const closeRef = useRef(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const cats = ['All', ...galleryCategories.filter((c) => gallery.some((g) => g.category === c))];

  const step = useCallback(
    (d) => setActive((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (active === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, step]);

  const current = active !== null ? items[active] : null;

  return (
    <div>
      <div role="group" aria-label="Filter gallery by area" className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {cats.map((c) => (
          <button
            key={c}
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] transition-all ${
              cat === c ? 'border-olive bg-olive text-white' : 'border-line text-charcoal/80 hover:border-gold/60 hover:text-olive'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.li
              layout
              key={g.src + g.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`${cat === 'All' ? spanClass[g.span] : ''} overflow-hidden rounded-2xl`}
            >
              <button
                onClick={() => setActive(i)}
                className="group relative block h-full w-full text-left"
                aria-label={`Open photo: ${g.category}. ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between p-5 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="font-display text-xl text-white">{g.category}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <Expand size={16} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.category} photo viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-forest/95 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <button
              ref={closeRef}
              onClick={() => setActive(null)}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-gold-light hover:text-gold-light"
            >
              <X size={22} />
            </button>
            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-forest/60 text-white hover:border-gold-light hover:text-gold-light sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-forest/60 text-white hover:border-gold-light hover:text-gold-light sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <img src={current.src} alt={current.alt} className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain" />
              <figcaption className="mt-4 text-center">
                <span className="font-display text-xl font-bold tracking-wide text-gold-light">{current.category}</span>
                <span className="mt-1 block text-sm text-white/60">{active + 1} / {items.length}</span>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
