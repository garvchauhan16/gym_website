import { motion } from 'framer-motion';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages, showWhatsapp } from '../utils/whatsapp.js';
import { site } from '../config/site.js';
import { duration, ease } from '../utils/motion.js';

/**
 * Floating WhatsApp button — tablet and desktop only. On phones the mobile CTA
 * bar carries WhatsApp instead, and on /free-trial the form itself sends via
 * WhatsApp, so a floating button there would only cover the form fields.
 * The label expands on hover/focus only — no pulsing or auto-popups.
 */
export default function WhatsAppFloat() {
  if (!showWhatsapp()) return null;
  return (
    <motion.a
      href={whatsappUrl(waMessages.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, delay: 0.8, ease }}
      className={`group fixed bottom-7 right-7 z-40 hidden items-center rounded-full bg-[#25D366] p-3.5 text-[#062a12] shadow-[0_12px_30px_-12px_rgba(5,11,26,0.55)] ring-1 ring-black/5 transition-colors hover:bg-[#1fbd5a] md:flex`}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:pl-1.5 group-hover:pr-2 group-hover:opacity-100 group-focus-visible:max-w-[140px] group-focus-visible:pl-1.5 group-focus-visible:pr-2 group-focus-visible:opacity-100">
        Chat with us
      </span>
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
    </motion.a>
  );
}
