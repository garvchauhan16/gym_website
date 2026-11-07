import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

/** Floating WhatsApp button, visible on every page. */
export default function WhatsAppFloat() {
  const [labelOpen, setLabelOpen] = useState(false);
  // briefly reveal the label once after load to draw attention without being pushy
  useEffect(() => {
    const t1 = setTimeout(() => setLabelOpen(true), 3500);
    const t2 = setTimeout(() => setLabelOpen(false), 8500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.a
      href={whatsappUrl(waMessages.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Powerhouse Gym on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      onMouseEnter={() => setLabelOpen(true)}
      onMouseLeave={() => setLabelOpen(false)}
      onFocus={() => setLabelOpen(true)}
      onBlur={() => setLabelOpen(false)}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-[#07240f] shadow-[0_10px_35px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span
        className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
          labelOpen ? 'max-w-[150px] pl-2 opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        Chat with us
      </span>
      <span className="relative grid h-7 w-7 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50 motion-reduce:hidden" aria-hidden="true" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </motion.a>
  );
}
