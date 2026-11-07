import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, LoaderCircle, TriangleAlert, RotateCcw } from 'lucide-react';
import { site } from '../config/site.js';
import { trialGoals, trialTimes } from '../config/content.js';
import { validateTrial, todayISO } from '../utils/validate.js';
import { whatsappUrl, waMessages, isWhatsappConfigured } from '../utils/whatsapp.js';
import { Button } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';

const empty = { name: '', phone: '', email: '', date: '', time: '', goal: '', message: '' };

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-charcoal/90">
        <span>{label}{!optional && <span className="ml-0.5 text-gold" aria-hidden="true">*</span>}</span>
        {optional && <span className="text-xs font-normal text-mist">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-[#b42318]">
          <TriangleAlert size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function TrialForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [sentUrl, setSentUrl] = useState('');
  const formRef = useRef(null);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validateTrial(next));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateTrial(values));
  };
  const show = (k) => (touched[k] ? errors[k] : undefined);
  const props = (k) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': show(k) ? 'true' : 'false',
    'aria-describedby': show(k) ? `${k}-error` : undefined,
    className: 'field',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    const errs = validateTrial(values);
    setErrors(errs);
    setTouched({ name: 1, phone: 1, email: 1, date: 1, time: 1, goal: 1, message: 1 });
    const firstBad = Object.keys(errs)[0];
    if (firstBad) {
      formRef.current?.querySelector(`#${firstBad}`)?.focus();
      return;
    }
    // Open WhatsApp synchronously inside the click so mobile browsers don't block the pop-up.
    const url = whatsappUrl(waMessages.trial(values));
    setSentUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('loading');
    setTimeout(() => setStatus('success'), 800);
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="relative py-4 text-center sm:py-8"
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
              <CircleCheck size={34} aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">Request <span className="text-gold-gradient">Ready</span></h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-charcoal/75">
              Thanks, {values.name.trim().split(' ')[0]}. We've opened WhatsApp with your trial request pre-filled —
              just press <strong className="text-charcoal">Send</strong> to deliver it to the {site.name} team.
            </p>
            <p className="mx-auto mt-4 max-w-md rounded-xl border border-gold/25 bg-gold/[0.06] px-4 py-3 text-sm text-gold-dark">
              Your session isn't confirmed yet. It's booked only once our team replies to confirm your date and time.
            </p>
            {!isWhatsappConfigured() && site.showPlaceholderNotices && (
              <p className="mx-auto mt-4 max-w-md rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3 text-sm text-amber-800">
                Setup note: no WhatsApp number is configured yet, so WhatsApp lets you pick the recipient. Add it in
                <code className="mx-1">src/config/site.js</code>.
              </p>
            )}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={sentUrl} external variant="whatsapp">
                <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp Again
              </Button>
              <Button type="button" variant="dark" onClick={reset}>
                <RotateCcw size={16} aria-hidden="true" /> New Request
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative space-y-6"
            aria-label="Free trial request form"
          >
            <div>
              <h2 className="text-4xl font-bold sm:text-5xl">Request Your <span className="text-gold-gradient">Trial</span></h2>
              <p className="mt-3 text-mist">Takes under a minute. Fields marked <span className="text-gold">*</span> are required.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Full name" error={show('name')}>
                <input type="text" autoComplete="name" placeholder="Your full name" {...props('name')} />
              </Field>
              <Field id="phone" label="Phone number" error={show('phone')}>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. +91 98765 43210" {...props('phone')} />
              </Field>
            </div>

            <Field id="email" label="Email" optional error={show('email')}>
              <input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...props('email')} />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="date" label="Preferred date" error={show('date')}>
                <input type="date" min={todayISO()} {...props('date')} />
              </Field>
              <Field id="time" label="Preferred time" error={show('time')}>
                <select {...props('time')}>
                  <option value="">Select a time</option>
                  {trialTimes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <Field id="goal" label="Fitness goal" error={show('goal')}>
              <select {...props('goal')}>
                <option value="">Select your main goal</option>
                {trialGoals.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>

            <Field id="message" label="Additional message" optional error={show('message')}>
              <textarea rows={4} maxLength={500} placeholder="Anything we should know — experience level, injuries, questions…" {...props('message')} />
            </Field>

            <Button type="submit" disabled={status === 'loading'} className="w-full disabled:cursor-wait disabled:opacity-80">
              {status === 'loading' ? (
                <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Opening WhatsApp…</>
              ) : (
                <><WhatsAppIcon className="h-5 w-5" /> Send Trial Request on WhatsApp</>
              )}
            </Button>
            <p className="text-center text-xs leading-relaxed text-mist">
              Submitting opens WhatsApp with your details pre-filled. Nothing is stored on this website.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
