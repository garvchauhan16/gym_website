import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderCircle, Send } from 'lucide-react';
import { trial } from '../config/site.js';
import { trialGoals, trialTimes } from '../config/content.js';
import { validateTrial, todayISO } from '../utils/validate.js';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import { deliveryMode, postSubmission } from '../utils/submit.js';
import { Button } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { Field, useFormState, ErrorSummary, DeliveryNote, FormResult } from './forms.jsx';

const empty = { name: '', phone: '', email: '', date: '', time: '', goal: '', message: '' };

/**
 * Trial request. Delivery follows config (see utils/submit.js); with nothing
 * configured it runs in demo mode and never claims a request was sent or booked.
 */
export default function TrialForm() {
  const f = useFormState(empty, validateTrial);
  const [status, setStatus] = useState('idle'); // idle | loading | demo | whatsapp | sent | error
  const [sentUrl, setSentUrl] = useState('');
  const formRef = useRef(null);
  const mode = deliveryMode();
  const message = waMessages.trial(f.values);

  const deliver = async () => {
    if (mode === 'demo') return setStatus('demo');
    if (mode === 'whatsapp') {
      // Open synchronously inside the click so mobile browsers don't block the pop-up.
      const url = whatsappUrl(message);
      setSentUrl(url);
      window.open(url, '_blank', 'noopener,noreferrer');
      return setStatus('whatsapp');
    }
    setStatus('loading');
    const { ok } = await postSubmission('trial', f.values, message);
    setStatus(ok ? 'sent' : 'error');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading' || !f.check(formRef.current)) return;
    deliver();
  };

  const reset = () => {
    f.reset();
    setStatus('idle');
  };

  const done = ['demo', 'whatsapp', 'sent', 'error'].includes(status);

  return (
    <div className="relative rounded-2xl border border-hairline bg-white p-5 shadow-[0_24px_60px_-40px_rgba(10,20,40,0.45)] sm:p-8 lg:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <FormResult
            key="result"
            status={status}
            firstName={f.values.name.trim().split(' ')[0]}
            message={message}
            waUrl={sentUrl}
            noun={`${trial.noun} request`}
            onEdit={() => setStatus('idle')}
            onReset={reset}
            onRetry={deliver}
          />
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative space-y-5 sm:space-y-6"
            aria-label="Trial request form"
          >
            <div>
              <h2 className="text-heading-1">Request Your <span className="text-accent">Trial</span></h2>
              <p className="mt-3 text-slate">Takes under a minute. Fields marked <span className="text-blue-500">*</span> are required.</p>
            </div>

            <ErrorSummary failedSubmits={f.failedSubmits} errors={f.errors} />

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Field id="name" label="Full name" error={f.show('name')}>
                <input type="text" autoComplete="name" placeholder="Your full name" maxLength={80} {...f.props('name')} />
              </Field>
              <Field id="phone" label="Phone number" error={f.show('phone')}>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98765 43210" maxLength={20} {...f.props('phone')} />
              </Field>
            </div>

            <Field id="email" label="Email" optional error={f.show('email')}>
              <input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...f.props('email')} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Field id="date" label="Preferred date" error={f.show('date')} hint="Open Monday–Saturday, 6 AM–10 PM. Closed on Sunday.">
                <input type="date" min={todayISO()} {...f.props('date')} />
              </Field>
              <Field id="time" label="Preferred time" error={f.show('time')}>
                <select {...f.props('time')}>
                  <option value="">Select a time</option>
                  {trialTimes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>

            <Field id="goal" label="Fitness goal" error={f.show('goal')}>
              <select {...f.props('goal')}>
                <option value="">Select your main goal</option>
                {trialGoals.map((g) => <option key={g}>{g}</option>)}
              </select>
            </Field>

            <Field id="message" label="Additional message" optional error={f.show('message')}>
              <textarea rows={4} maxLength={500} placeholder="Anything we should know — experience level, injuries, questions…" {...f.props('message')} />
            </Field>

            <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full disabled:cursor-wait disabled:opacity-80">
              {status === 'loading' ? (
                <><LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending…</>
              ) : mode === 'whatsapp' ? (
                <><WhatsAppIcon className="h-5 w-5" /> Send Trial Request on WhatsApp</>
              ) : (
                <><Send size={17} aria-hidden="true" /> Submit Trial Request</>
              )}
            </Button>
            <DeliveryNote mode={mode} />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
