import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { site } from '../config/site.js';

/** Scroll-reveal wrapper. Honours prefers-reduced-motion via MotionConfig in App. */
export function Reveal({ children, delay = 0, y = 20, className = '', as = 'div' }) {
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

const base =
  'btn-shine group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.97] min-h-12 text-center';
const primary =
  'bg-olive text-white shadow-[0_10px_28px_-12px_rgba(63,74,49,0.7)] hover:-translate-y-0.5 hover:bg-olive-dark hover:shadow-[0_16px_34px_-12px_rgba(63,74,49,0.8)]';
const variants = {
  gold: primary,
  primary,
  outline: 'border border-charcoal/25 bg-white/40 text-charcoal hover:-translate-y-0.5 hover:border-olive hover:text-olive',
  light: 'bg-white text-charcoal hover:-translate-y-0.5 hover:bg-gold-light',
  outlineLight: 'border border-white/40 text-white hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light',
  whatsapp: 'bg-[#25D366] text-[#07240f] shadow-[0_10px_28px_-12px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 hover:bg-[#1fbd5a]',
  dark: 'border border-line bg-white text-charcoal hover:-translate-y-0.5 hover:border-olive hover:text-olive',
};

/** Link-or-button with consistent styling. `to` = router link, `href` = external/tel. */
export function Button({ to, href, variant = 'gold', className = '', children, external, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  return <button className={cls} {...rest}>{children}</button>;
}

export function SectionHeading({ eyebrow, title, accent, children, align = 'left', className = '', dark = false }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className} ${dark ? 'on-dark' : ''}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] ${dark ? 'text-gold-light' : 'text-gold'} ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
          {eyebrow}
          {center && <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />}
        </p>
      )}
      <h2 className={`text-balance text-4xl sm:text-5xl lg:text-[3.4rem] ${dark ? 'text-white' : 'text-charcoal'}`}>
        {title} {accent && <span className="text-gold-gradient">{accent}</span>}
      </h2>
      {children && <p className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-mist'}`}>{children}</p>}
    </div>
  );
}

/** Small tag that flags sample content; disappears when showPlaceholderNotices is false. */
export function SampleTag({ children = 'Sample', className = '' }) {
  if (!site.showPlaceholderNotices) return null;
  return (
    <span className={`inline-flex items-center rounded-full border border-amber-700/25 bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-900 ${className}`}>
      {children}
    </span>
  );
}

export function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#3f4a31" />
        <path d="M24.5 7 11 22.5h9L15.5 33 29 17h-9z" fill="url(#lg)" />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3e6c2" />
            <stop offset="1" stopColor="#c9a65a" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[21px] font-semibold tracking-[0.08em] ${light ? 'text-white' : 'text-charcoal'}`}>POWERHOUSE</span>
        <span className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.5em] ${light ? 'text-gold-light' : 'text-gold'}`}>Gym</span>
      </span>
    </span>
  );
}
