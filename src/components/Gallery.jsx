import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery, galleryCategories } from '../config/content.js';
import { FilterTabs, PhotoTag } from './ui.jsx';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { duration, ease } from '../utils/motion.js';
import Img, { avifSrcSet } from './Img.jsx';

/** Grid shapes (applied in the "All" view only). Dense flow back-fills any gaps. */
const spanClass = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  normal: '',
};

function Lightbox({ items, index, onClose, onStep, returnFocusRef }) {
  const ref = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const current = items[index];

  // Release the trap (and return focus) as soon as the exit animation starts.
  const isPresent = useIsPresent();
  useFocusTrap(ref, isPresent, { initialFocusRef: closeRef, returnFocusRef });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onStep]);

  // Swipe left/right on touch screens
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const navBtn =
    'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-navy-950/60 text-white transition-colors hover:border-white/60';

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.caption ?? current.category} photo viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.fast }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/60"
      >
        <X size={22} aria-hidden="true" />
      </button>
      {items.length > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous photo" className={`${navBtn} left-3 hidden sm:left-6 sm:grid`}>
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next photo" className={`${navBtn} right-3 hidden sm:right-6 sm:grid`}>
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}
      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {/* Keyed so each photo is a fresh element that fades in; AVIF when available */}
        <picture key={current.src} className="contents">
          {avifSrcSet(current.src) && <source type="image/avif" srcSet={avifSrcSet(current.src)} sizes="90vw" />}
          <motion.img
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.fast, ease }}
            className="max-h-[72svh] w-auto max-w-full rounded-xl object-contain sm:max-h-[78svh]"
          />
        </picture>
        <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <PhotoTag actual={current.actual} />
          <span className="font-semibold text-white">{current.caption ?? current.category}</span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="tabular-nums text-white/60">{index + 1} / {items.length}</span>
        </figcaption>
        {items.length > 1 && (
          <div className="mt-4 flex gap-3 sm:hidden">
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        )}
      </figure>
    </motion.div>
  );
}

/**
 * Filterable photo grid + lightbox.
 * Phone: 2 cols · Tablet: 2 cols, taller rows · Laptop+: 3 cols.
 */
export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [active, setActive] = useState(null); // index into `items`
  const openerRef = useRef(null);
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.category === cat);
  const cats = ['All', ...galleryCategories.filter((c) => gallery.some((g) => g.category === c))];

  const step = useCallback((d) => setActive((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setActive(null), []);

  return (
    <div>
      <FilterTabs label="Filter gallery" options={cats} value={cat} onChange={setCat} />

      <motion.ul
        layout
        className="mt-8 grid grid-flow-row-dense auto-rows-[150px] grid-cols-2 gap-2 sm:mt-10 sm:auto-rows-[210px] sm:gap-3 lg:auto-rows-[240px] lg:grid-cols-3 lg:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.li
              layout
              key={g.src + g.category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.base, ease }}
              className={`${cat === 'All' ? spanClass[g.span] : ''} overflow-hidden rounded-xl bg-navy-900 sm:rounded-2xl`}
            >
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setActive(i);
                }}
                className="group relative block h-full w-full text-left"
                aria-label={`Open photo: ${g.alt}`}
              >
                <Img
                  src={g.src}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" aria-hidden="true" />
                <PhotoTag actual={g.actual} className="absolute left-2 top-2 scale-90 origin-top-left sm:left-3 sm:top-3 sm:scale-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-5">
                  <span className="text-[13px] font-semibold leading-tight text-white sm:font-display sm:text-lg sm:font-bold">{g.caption ?? g.category}</span>
                  <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-navy-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:grid">
                    <Expand size={15} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {active !== null && items[active] && <Lightbox items={items} index={active} onClose={close} onStep={step} returnFocusRef={openerRef} />}
      </AnimatePresence>
    </div>
  );
}
