import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site } from '../config/site.js';
import { duration, ease, revealViewport } from '../utils/motion.js';

/** Scroll-reveal wrapper. Honours prefers-reduced-motion via MotionConfig in App. */
export function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: duration.slow, delay, ease }}
    >
      {children}
    </M>
  );
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

const sizes = {
  sm: 'min-h-11 px-4 text-[13px]',
  md: 'min-h-12 px-6 text-[14px]',
  lg: 'min-h-14 px-8 text-[15px]',
  /** Square, icon-only. Always pass an aria-label. */
  icon: 'h-12 w-12 shrink-0 text-[14px]',
};

const variants = {
  /** Electric blue — the main conversion action. One per view where possible. */
  primary:
    'bg-blue-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-12px_rgba(31,91,255,0.7)] hover:bg-blue-600',
  /** Solid navy — strong secondary action on light backgrounds. */
  navy: 'bg-navy-900 text-white hover:bg-navy-700',
  /** White with hairline border — quiet action on light backgrounds. */
  secondary: 'border border-hairline bg-white text-ink hover:border-ink/25 hover:bg-cloud',
  /** Transparent with outline — on light backgrounds. */
  outline: 'border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03]',
  /** White fill — primary action on navy backgrounds. */
  light: 'bg-white text-navy-900 hover:bg-blue-100',
  /** Transparent outline — on navy backgrounds. */
  outlineLight: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06]',
  /** WhatsApp brand green, kept recognisable on purpose. */
  whatsapp: 'bg-[#25D366] text-[#062a12] hover:bg-[#1fbd5a]',
};

/** Link-or-button with consistent styling. `to` = router link, `href` = external/tel. */
export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, external, ...rest }) {
  const cls = `${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  return <button className={cls} {...rest}>{children}</button>;
}

/** Small uppercase label with a square accent marker. */
export function Eyebrow({ children, dark = false, className = '', as: Tag = 'p' }) {
  return <Tag className={`eyebrow ${dark ? 'on-dark' : ''} ${className}`}>{children}</Tag>;
}

/**
 * `sample` (true or a label) shows a "Sample" tag under the heading — use it when
 * the section's content is demo data. It disappears with showPlaceholderNotices.
 */
export function SectionHeading({ eyebrow, title, accent, children, align = 'left', className = '', dark = false, sample }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className} ${dark ? 'on-dark' : ''}`}>
      {eyebrow && <Eyebrow dark={dark} className="mb-5">{eyebrow}</Eyebrow>}
      <h2 className={`text-balance text-heading-1 ${dark ? 'text-white' : 'text-ink'}`}>
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h2>
      {children && (
        <p className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-[17px] ${center ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-slate'}`}>
          {children}
        </p>
      )}
      {sample && <SampleTag className="mt-4">{typeof sample === 'string' ? sample : 'Sample content'}</SampleTag>}
    </div>
  );
}

/** Flags demo/placeholder content; disappears when `site.showPlaceholderNotices` is false. */
export function SampleTag({ children = 'Sample', className = '' }) {
  if (!site.showPlaceholderNotices) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border border-amber-300/80 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-amber-800 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
      {children}
    </span>
  );
}

/**
 * Labels a photograph honestly: "Actual photo" for real pictures of Victory Fitness,
 * "Illustrative photo" for licensed stock. Always shown (not tied to the demo switch),
 * because stock photography must never pass for the gym's own premises.
 */
export function PhotoTag({ actual = false, className = '' }) {
  return (
    <span
      className={`pointer-events-none inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] backdrop-blur-md ${
        actual ? 'bg-blue-500 text-white shadow-[0_6px_16px_-8px_rgba(31,91,255,0.8)]' : 'bg-navy-950/60 text-white/85 ring-1 ring-white/15'
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${actual ? 'bg-white' : 'bg-white/60'}`} aria-hidden="true" />
      {actual ? 'Actual photo' : 'Illustrative photo'}
    </span>
  );
}

/** Native size of the logo extracted from the gym's signboard photo (see public/images/brand/). */
export const LOGO_SRC = '/images/brand/victory-logo.png';
const LOGO_W = 394;
const LOGO_H = 53;

/**
 * The gym's real "VICTORY" wordmark (with its trophy and figure emblem), cut from
 * the signboard photograph with its dark panel made transparent. It is illuminated
 * lettering, so it is meant for the site's dark navy surfaces (navbar, footer).
 * The full sign lettering (VICTORY FITNESS GYM) is kept in victory-fitness-logo.png.
 * Size it by width with `className`, e.g. "w-[200px]"; height follows.
 */
export function Logo({ className = 'w-[200px]' }) {
  return (
    <img
      src={LOGO_SRC}
      width={LOGO_W}
      height={LOGO_H}
      alt={site.name}
      decoding="async"
      className={`block h-auto max-w-full select-none ${className}`}
      draggable="false"
    />
  );
}

/**
 * Pill filter used by Gallery and Events. Scrolls sideways on phones, wraps on
 * larger screens. Buttons expose state with aria-pressed.
 */
export function FilterTabs({ label, options, value, onChange, counts }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-200 sm:px-5 ${
              active ? 'border-navy-900 bg-navy-900 text-white' : 'border-hairline bg-white text-ink/75 hover:border-ink/30 hover:text-ink'
            }`}
          >
            {o}
            {counts?.[o] != null && (
              <span className={`rounded-full px-1.5 text-[11px] font-bold tabular-nums ${active ? 'bg-white/15 text-white' : 'bg-cloud text-slate'}`}>
                {counts[o]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * For 2-column (sm/md) → 3-column (lg) card grids: when the item count is odd,
 * the last card is centred on its own row at tablet sizes instead of hanging left.
 */
export const centerOrphan = (i, n) =>
  n % 2 === 1 && i === n - 1 ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto' : '';
