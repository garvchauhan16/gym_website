import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { navLinks } from '../config/site.js';
import { Button, Logo } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages, hasPhone, telHref } from '../utils/whatsapp.js';

function useIsActive() {
  const { pathname, hash } = useLocation();
  return (to) => {
    const [p, h = ''] = to.split('#');
    return pathname === p && (hash || '') === (h ? `#${h}` : '');
  };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isActive = useIsActive();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled || open ? 'border-b border-line bg-ivory/90 shadow-[0_8px_30px_-20px_rgba(35,38,42,0.4)] backdrop-blur-xl' : 'border-b border-transparent bg-ivory/60 backdrop-blur-md'
        }`}
      >
        <nav aria-label="Main" className="container-x flex h-[68px] items-center justify-between gap-3 sm:h-[76px]">
          <Link to="/" aria-label="Powerhouse Gym — home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center xl:flex">
            {navLinks.filter((l) => !l.mobileOnly).map((l) => {
              const active = isActive(l.to);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block px-3 py-2 text-[13px] font-medium tracking-wide transition-colors hover:text-olive ${active ? 'text-olive' : 'text-charcoal/80'}`}
                  >
                    {l.label}
                    {active && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {hasPhone() && (
              <a href={telHref()} aria-label="Call Powerhouse Gym" className="hidden h-11 w-11 place-items-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-olive hover:text-olive sm:grid">
                <Phone size={18} />
              </a>
            )}
            <a
              href={whatsappUrl(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-11 w-11 place-items-center rounded-full border border-line bg-white text-[#128C4B] transition-colors hover:border-[#25D366] sm:grid"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Button to="/free-trial" className="!min-h-11 !px-4 !py-2.5 !text-[12px] sm:!px-6 sm:!text-[13px]">
              Free Trial
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-olive hover:text-olive xl:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory px-6 pb-10 pt-24 xl:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => {
                const active = isActive(l.to);
                return (
                  <motion.li key={l.to} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 + i * 0.035 }}>
                    <Link
                      to={l.to}
                      aria-current={active ? 'page' : undefined}
                      className={`flex min-h-14 items-center justify-between border-b border-line py-3 font-display text-[1.9rem] ${active ? 'text-olive' : 'text-charcoal'}`}
                    >
                      {l.label}
                      <ArrowRight size={20} className="text-gold" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-8 grid gap-3">
              <Button to="/free-trial">Book Your Free Trial</Button>
              <Button href={whatsappUrl(waMessages.general)} variant="whatsapp" external>
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </Button>
              {hasPhone() && (
                <Button href={telHref()} variant="dark">
                  <Phone size={17} aria-hidden="true" /> Call Us
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
