import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { site, navLinks, trial } from '../config/site.js';
import { Button, Logo } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages, hasPhone, telHref, showWhatsapp } from '../utils/whatsapp.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { duration, ease, stagger } from '../utils/motion.js';

/** A plain link is active on its path (any #hash); a #hash link only on that exact hash. */
function useIsActive() {
  const { pathname, hash } = useLocation();
  return (to) => {
    const [p, h] = to.split('#');
    return pathname === p && (!h || hash === `#${h}`);
  };
}

/**
 * The header is always dark-themed. It is transparent while sitting over a page
 * whose first section is marked `data-nav-theme="dark"`, and becomes frosted navy
 * once the page scrolls, the menu opens, or the page starts light.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const { pathname, hash } = useLocation();
  const isActive = useIsActive();

  const trapRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const closedByNav = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Read the current page's first section after it commits.
  useLayoutEffect(() => {
    const first = document.querySelector('#main > *');
    setOverDark(first?.getAttribute('data-nav-theme') === 'dark');
  }, [pathname]);

  useEffect(() => {
    closedByNav.current = true;
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    closedByNav.current = false;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useFocusTrap(trapRef, open, {
    initialFocusRef: firstLinkRef,
    returnFocusRef: toggleRef,
    shouldRestoreFocus: () => !closedByNav.current,
  });

  const transparent = overDark && !scrolled && !open;

  return (
    <div ref={trapRef}>
      <header
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          transparent ? 'border-transparent bg-transparent' : 'border-white/10 bg-navy-950/95 backdrop-blur-xl'
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between gap-3 sm:h-[76px] sm:gap-4">
          <Link to="/" aria-label={`${site.name} — home`} className="min-w-0 shrink rounded-md py-2">
            <Logo className="w-[168px] sm:w-[196px] xl:w-[216px]" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.filter((l) => !l.mobileOnly).map((l) => {
              const active = isActive(l.to);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                      active ? 'text-white' : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        transition={{ duration: duration.base, ease }}
                        className="absolute inset-x-3 -bottom-[3px] h-0.5 bg-blue-500"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {hasPhone() && (
              <a
                href={telHref()}
                aria-label={`Call ${site.name}`}
                className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-white/40 hover:text-white xl:grid"
              >
                <Phone size={17} aria-hidden="true" />
              </a>
            )}
            {showWhatsapp() && (
            <a
              href={whatsappUrl(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-11 w-11 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-[#25D366] hover:text-[#25D366] xl:grid"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
            )}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy-950 px-5 pb-10 pt-[92px] text-white sm:px-8 sm:pt-[100px] lg:hidden"
          >
            <ul className="flex flex-col border-t border-white/10">
              {navLinks.map((l, i) => {
                const active = isActive(l.to);
                return (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: duration.base, delay: 0.04 + i * stagger * 0.6, ease }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={l.to}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-16 items-center justify-between border-b border-white/10 font-display text-[1.75rem] font-extrabold tracking-[-0.02em] ${
                        active ? 'text-white' : 'text-white/75'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {active && <span className="h-2 w-2 bg-blue-500" aria-hidden="true" />}
                        {l.label}
                      </span>
                      <ArrowUpRight size={20} className="text-blue-300" aria-hidden="true" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
              <Button to="/free-trial" size="lg" className="sm:col-span-2">{trial.cta}</Button>
              {showWhatsapp() && (
                <Button href={whatsappUrl(waMessages.general)} variant="whatsapp" size="lg" external>
                  <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
                </Button>
              )}
              {hasPhone() && (
                <Button href={telHref()} variant="outlineLight" size="lg" className={showWhatsapp() ? '' : 'sm:col-span-2'}>
                  <Phone size={17} aria-hidden="true" /> Call {site.phone}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
