import { Phone } from 'lucide-react';
import { Button } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { contactChannel } from '../utils/whatsapp.js';
import { site } from '../config/site.js';

/**
 * "Enquire" button that always reaches the gym: WhatsApp (pre-filled) once a
 * confirmed number is configured, otherwise a call to the verified phone number.
 *
 * `labels` = { whatsapp, call }; `variants` = { whatsapp, call } (Button variants).
 */
export default function ContactButton({
  message,
  labels = { whatsapp: 'Chat on WhatsApp', call: 'Call Now' },
  variants = { whatsapp: 'whatsapp', call: 'primary' },
  iconOnly = false,
  className = '',
  ...rest
}) {
  const ch = contactChannel(message);
  const wa = ch.kind === 'whatsapp';
  const label = wa ? labels.whatsapp : labels.call;
  return (
    <Button
      href={ch.href}
      external={ch.external}
      variant={wa ? variants.whatsapp : variants.call}
      size={iconOnly ? 'icon' : rest.size}
      className={className}
      aria-label={iconOnly ? (wa ? `Chat with ${site.name} on WhatsApp` : `Call ${site.name}`) : undefined}
      {...rest}
    >
      {wa ? <WhatsAppIcon className="h-5 w-5" /> : <Phone size={iconOnly ? 19 : 17} aria-hidden="true" />}
      {!iconOnly && label}
    </Button>
  );
}
