export const todayISO = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an object of { field: message } — empty when everything is valid. */
export function validateTrial(v) {
  const e = {};
  const name = v.name.trim();
  if (!name) e.name = 'Please enter your full name.';
  else if (name.length < 2) e.name = 'Name looks too short.';

  const phone = v.phone.trim();
  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone) e.phone = 'Please enter your phone number.';
  else if (!/^[+\d\s\-()]+$/.test(phone) || phoneDigits.length < 8 || phoneDigits.length > 15)
    e.phone = 'Enter a valid phone number (8–15 digits).';

  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address or leave it blank.';

  if (!v.date) e.date = 'Please choose a preferred date.';
  else if (v.date < todayISO()) e.date = 'Please choose today or a future date.';

  if (!v.time) e.time = 'Please choose a preferred time.';
  if (!v.goal) e.goal = 'Please select your fitness goal.';
  if (v.message.length > 500) e.message = 'Please keep your message under 500 characters.';
  return e;
}
