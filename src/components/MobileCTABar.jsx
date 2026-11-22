import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import { duration, ease } from '../utils/motion.js';
import { Phone } from 'lucide-react';
import { site, trial } from '../config/site.js';
import { hasPhone, telHref, showWhatsapp } from '../utils/whatsapp.js';

/** Routes where the mobile CTA bar is NOT shown (it would cover the form). */
const HIDDEN_ON = ['/free-trial'];
export const mobileBarHiddenOn = (pathname) => HIDDEN_ON.includes(pathname.replace(/\/$/, '') || '/');

/** Slim bottom bar on phones (< md): trial booking + call + WhatsApp. Appears after a short scroll. */
export default function MobileCTABar() {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (mobileBarHiddenOn(pathname)) return null;

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: duration.base, ease }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden"
          role="region"
          aria-label="Quick actions"
        >
          <div className="mx-auto flex max-w-md gap-2.5">
            <Button to="/free-trial" className="flex-1">{trial.ctaShort}</Button>
            {hasPhone() && (
              <Button href={telHref()} variant="light" size="icon" aria-label={`Call ${site.name}`}>
                <Phone size={19} aria-hidden="true" />
              </Button>
            )}
            {showWhatsapp() && (
              <Button
                href={whatsappUrl(waMessages.floating)}
                external
                variant="whatsapp"
                size="icon"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
