import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck, Info, TriangleAlert, RotateCcw, Phone, Copy, Check, PencilLine } from 'lucide-react';
import { site } from '../config/site.js';
import { hasPhone, telHref } from '../utils/whatsapp.js';
import { Button } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';

/**
 * Errors are linked with aria-describedby (read when the field is focused) rather
 * than role="alert", so screen readers aren't interrupted on every keystroke.
 */
export function Field({ id, label, optional, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        <span>
          {label}
          {!optional && <span className="ml-0.5 text-blue-500" aria-hidden="true">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-slate">Optional</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-xs text-slate">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-[#b42318]">
          <TriangleAlert size={14} className="mt-[3px] shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Wiring for a validated form: values, touched-state errors and field props.
 * `prefix` namespaces element ids so two forms can share a page.
 */
export function useFormState(empty, validate, prefix = '') {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [failedSubmits, setFailedSubmits] = useState(0);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };
  const show = (k) => (touched[k] ? errors[k] : undefined);
  const id = (k) => `${prefix}${k}`;
  const props = (k) => ({
    id: id(k),
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': show(k) ? 'true' : 'false',
    'aria-describedby': show(k) ? `${id(k)}-error` : undefined,
    className: 'field',
  });

  /** Validates everything; focuses the first bad field. Returns true when valid. */
  const check = (formEl) => {
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const firstBad = Object.keys(errs)[0];
    if (firstBad) {
      setFailedSubmits((n) => n + 1);
      formEl?.querySelector(`#${id(firstBad)}`)?.focus();
      return false;
    }
    setFailedSubmits(0);
    return true;
  };
  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setFailedSubmits(0);
  };
  return { values, errors, show, props, id, check, reset, failedSubmits };
}

export function ErrorSummary({ failedSubmits, errors }) {
  if (!(failedSubmits > 0 && Object.keys(errors).length > 0)) return null;
  // Remounted via key so a repeated failed submit is announced again.
  return (
    <p key={failedSubmits} role="alert" className="flex items-start gap-2 rounded-xl border border-[#b42318]/20 bg-[#fef3f2] px-4 py-3 text-sm text-[#b42318]">
      <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      Please check the highlighted fields below.
    </p>
  );
}

/** One line under the submit button saying exactly what pressing it will do. */
export function DeliveryNote({ mode }) {
  if (mode === 'demo')
    return (
      <p className="flex items-start gap-2 rounded-xl border border-amber-300/80 bg-amber-50 px-4 py-3 text-left text-xs leading-relaxed text-amber-900">
        <Info size={15} className="mt-px shrink-0" aria-hidden="true" />
        <span>
          <strong>Demo website:</strong> this form checks your details and shows what would be sent, but it isn’t connected to
          the gym yet — nothing is delivered.{hasPhone() && <> To reach {site.name} now, call <a className="font-semibold underline underline-offset-2" href={telHref()}>{site.phone}</a>.</>}
        </span>
      </p>
    );
  if (mode === 'whatsapp')
    return <p className="text-center text-xs leading-relaxed text-slate">Submitting opens WhatsApp with your details pre-filled. Nothing is stored on this website.</p>;
  return <p className="text-center text-xs leading-relaxed text-slate">Your details are sent securely to the {site.name} team.</p>;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the text is still visible to select */
    }
  };
  return (
    <Button type="button" variant="secondary" onClick={copy}>
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy Details'}
    </Button>
  );
}

/**
 * Result panel after a valid submit. Wording depends on what really happened:
 *  demo     → "not sent" + preview of the message + call the gym
 *  whatsapp → WhatsApp opened, not delivered until the visitor presses Send
 *  sent     → the endpoint accepted it (still not a confirmed booking)
 *  error    → the endpoint failed; offer to retry or call
 */
export function FormResult({ status, firstName, message, waUrl, noun, onEdit, onReset, onRetry }) {
  const tone = {
    demo: { icon: Info, wrap: 'bg-amber-50 text-amber-700', title: <>Demo Preview — <span className="text-accent">Not Sent</span></> },
    whatsapp: { icon: CircleCheck, wrap: 'bg-blue-100 text-blue-500', title: <>Almost <span className="text-accent">Done</span></> },
    sent: { icon: CircleCheck, wrap: 'bg-blue-100 text-blue-500', title: <>Request <span className="text-accent">Received</span></> },
    error: { icon: TriangleAlert, wrap: 'bg-[#fef3f2] text-[#b42318]', title: <>Couldn’t <span className="text-accent">Send</span></> },
  }[status];
  const I = tone.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="py-2 text-center sm:py-6">
      <span className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${tone.wrap}`}>
        <I size={28} aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-heading-1">{tone.title}</h2>

      <p className="mx-auto mt-4 max-w-md text-pretty text-ink/75">
        {status === 'demo' && (
          <>Thanks{firstName ? `, ${firstName}` : ''} — your details look good. This is a demonstration website that isn’t connected to {site.name} yet, so <strong className="text-ink">your {noun} has not been sent</strong> and nothing has been booked.</>
        )}
        {status === 'whatsapp' && (
          <>Thanks{firstName ? `, ${firstName}` : ''}. WhatsApp has opened with your {noun} pre-filled — it reaches the {site.name} team only once you press <strong className="text-ink">Send</strong> there.</>
        )}
        {status === 'sent' && <>Thanks{firstName ? `, ${firstName}` : ''}. Your {noun} has been sent to the {site.name} team, who will contact you on the number you gave.</>}
        {status === 'error' && <>Sorry — your {noun} couldn’t be sent just now. Please try again, or call the gym directly.</>}
      </p>

      {(status === 'whatsapp' || status === 'sent') && (
        <p className="mx-auto mt-5 max-w-md rounded-xl border border-blue-500/20 bg-blue-100/60 px-4 py-3 text-sm text-blue-600">
          Nothing is confirmed until the team replies to you.
        </p>
      )}

      {status === 'demo' && (
        <figure className="mx-auto mt-6 max-w-md text-left">
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate">What would be sent</figcaption>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-hairline bg-cloud p-4 font-sans text-sm leading-relaxed text-ink/85">{message}</pre>
        </figure>
      )}

      <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
        {(status === 'demo' || status === 'error') && hasPhone() && (
          <Button href={telHref()} aria-label={`Call ${site.name} on ${site.phone}`}>
            <Phone size={17} aria-hidden="true" /> Call {site.phone}
          </Button>
        )}
        {status === 'error' && <Button type="button" variant="secondary" onClick={onRetry}>Try Again</Button>}
        {status === 'whatsapp' && (
          <Button href={waUrl} external variant="whatsapp">
            <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp Again
          </Button>
        )}
        {status === 'demo' && <CopyButton text={message} />}
        {(status === 'demo' || status === 'error') && (
          <Button type="button" variant="outline" onClick={onEdit}>
            <PencilLine size={16} aria-hidden="true" /> Edit Details
          </Button>
        )}
        <Button type="button" variant={status === 'demo' ? 'outline' : 'secondary'} onClick={onReset}>
          <RotateCcw size={16} aria-hidden="true" /> Start Over
        </Button>
      </div>
    </motion.div>
  );
}
