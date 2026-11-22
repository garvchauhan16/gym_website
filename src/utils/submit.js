import { site, filled } from '../config/site.js';
import { isWhatsappConfigured } from './whatsapp.js';

/**
 * How form submissions are delivered, decided from config/site.js:
 *  - 'endpoint' : POST to `site.formEndpoint` (only reported as sent on a 2xx reply)
 *  - 'whatsapp' : open WhatsApp to the confirmed number; the visitor presses Send
 *  - 'demo'     : nothing is configured — validate and preview, never claim delivery
 */
export const deliveryMode = () =>
  filled(site.formEndpoint) ? 'endpoint' : isWhatsappConfigured() ? 'whatsapp' : 'demo';

/** POST a submission as JSON. Resolves { ok } — never throws. */
export async function postSubmission(kind, values, message) {
  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form: kind, gym: site.name, ...values, summary: message }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
