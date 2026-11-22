export const todayISO = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

/** 'YYYY-MM-DD' → true if it falls on a Sunday (local calendar date). */
const isSunday = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function nameAndPhone(v, e) {
  const name = v.name.trim();
  if (!name) e.name = 'Please enter your full name.';
  else if (name.length < 2) e.name = 'Name looks too short.';
  else if (name.length > 80) e.name = 'Please keep your name under 80 characters.';

  const phone = v.phone.trim();
  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone) e.phone = 'Please enter your phone number.';
  else if (!/^[+\d\s\-()]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 15)
    e.phone = 'Enter a valid phone number (10–15 digits).';
}

/** Returns an object of { field: message } — empty when everything is valid. */
export function validateTrial(v) {
  const e = {};
  nameAndPhone(v, e);

  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address or leave it blank.';

  if (!v.date) e.date = 'Please choose a preferred date.';
  else if (v.date < todayISO()) e.date = 'Please choose today or a future date.';
  else if (isSunday(v.date)) e.date = 'The gym is closed on Sundays — please choose another day.';

  if (!v.time) e.time = 'Please choose a preferred time.';
  if (!v.goal) e.goal = 'Please select your fitness goal.';
  if (v.message.length > 500) e.message = 'Please keep your message under 500 characters.';
  return e;
}
