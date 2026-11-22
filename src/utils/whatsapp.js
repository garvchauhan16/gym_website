import { site, hasWhatsapp } from '../config/site.js';

const digits = (s) => String(s ?? '').replace(/\D/g, '');

/** True once the owner has entered a plausible international WhatsApp number. */
export const isWhatsappConfigured = hasWhatsapp;
/** Whether WhatsApp buttons are shown (with or without a confirmed number). */
export const showWhatsapp = () => site.showWhatsappButtons !== false || hasWhatsapp();

/**
 * Official WhatsApp click-to-chat URL: https://wa.me/<number>?text=<encoded>
 * If no number is configured yet, https://wa.me/?text= still opens WhatsApp
 * with the message ready and lets the visitor choose who to send it to.
 */
export function whatsappUrl(message = '') {
  const n = digits(site.whatsappNumber);
  const text = encodeURIComponent(message);
  return n ? `https://wa.me/${n}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Click-to-call. Only usable once the owner has entered a public phone number. */
export const hasPhone = () => String(site.phone ?? '').replace(/[^\d+]/g, '').length >= 5;
/** Prefers the international form (+91…) so the link works from any phone or desktop dialler. */
export const telHref = () => `tel:${String(site.phoneIntl || site.phone).replace(/[^\d+]/g, '')}`;

/**
 * The channel every "enquire" button uses: WhatsApp once a confirmed number is set,
 * otherwise a call to the verified phone number. Nothing ever opens a WhatsApp chat
 * that can't reach the gym.
 */
export const contactChannel = (message = '') =>
  isWhatsappConfigured()
    ? { kind: 'whatsapp', href: whatsappUrl(message), external: true }
    : { kind: 'call', href: telHref(), external: false };

const name = site.name;

export const waMessages = {
  general: `Hi ${name}! I'd like to know more about the gym.`,
  floating: `Hi ${name}! I found your website and would like some information.`,
  footer: `Hi ${name}! I have a question about the gym.`,
  contact: `Hi ${name}! I'd like to visit the gym. Could you share the details?`,
  trainers: `Hi ${name}! I'd like to know more about your trainers and which one would suit my goals.`,
  trainer: (t) =>
    `Hi ${name}! I'd like to know more about training with ${t.name} (${t.specialization}). Could you share availability and how to get started?`,
  owner: `Hi ${name}! I'd like to get in touch with the gym team. Could someone please reach out?`,
  membership: (plan) =>
    `Hi ${name}! I'm interested in the ${plan.name} Membership (${plan.duration}). Could you share the current price and how to join?`,
  event: (event) =>
    `Hi ${name}! I'd like to register my interest for "${event.title}". Could you share the details?`,
  trial: (v) =>
    [
      `Hi ${name}! I'd like to request a trial session.`,
      '',
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim()}`,
      v.email.trim() ? `Email: ${v.email.trim()}` : null,
      `Preferred date: ${formatLongDate(v.date)}`,
      `Preferred time: ${v.time}`,
      `Fitness goal: ${v.goal}`,
      v.message.trim() ? `Message: ${v.message.trim()}` : null,
      '',
      'Please let me know if this slot is available. Thank you!',
    ]
      .filter((l) => l !== null)
      .join('\n'),
};

export function formatLongDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
