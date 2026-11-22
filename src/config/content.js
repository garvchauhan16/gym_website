/**
 * Editable website content: page copy, events, gallery, programs, facilities,
 * rules, testimonials, trainers, owner.
 *
 * DEMO NOTICE — only the business details in ./site.js are verified. Nothing here
 * may state prices, benefits, trainers, facilities, schedules, reviews or achievements
 * that the gym hasn't confirmed. Sections without real content are switched off in
 * site.sections (events, programs, owner, testimonials).
 * Anything marked `placeholder: true` shows a small "Sample" tag on the site
 * (while `site.showPlaceholderNotices` is true). Replace with real, approved
 * content before launch; see CONTENT-CHECKLIST.md. Business details live in ./site.js.
 */

import { site, reachUs } from './site.js';

// ── Events ───────────────────────────────────────────────────────────────────
// HIDDEN (site.sections.events = false): these are layout samples, not real events.
// date: 'YYYY-MM-DD' — Upcoming/Completed is worked out from the date automatically.
// banner: path in /public/images
export const events = [
  {
    id: 'bodybuilding-showcase',
    title: 'In-House Physique Showcase',
    type: 'Bodybuilding Competition',
    date: '2027-01-17',
    description:
      'Sample listing: an in-house physique showcase for members who have been preparing to step on stage. Replace with real competition details.',
    banner: '/images/member.jpg',
    placeholder: true,
  },
  {
    id: 'transformation-challenge',
    title: '60-Day Transformation Challenge',
    type: 'Transformation Challenge',
    date: '2027-02-01',
    description:
      'Sample listing: a structured two-month body-transformation challenge with check-ins and before/after tracking. Replace with real details.',
    banner: '/images/barbell.jpg',
    placeholder: true,
  },
  {
    id: 'strength-meet',
    title: 'Internal Strength Meet',
    type: 'Internal Competition',
    date: '2027-02-21',
    description:
      'Sample listing: a friendly in-gym lifting meet to test strength and celebrate progress. Replace with real details.',
    banner: '/images/strength-equipment.jpg',
    placeholder: true,
  },
  {
    id: 'community-fitness-day',
    title: 'Community Fitness Day',
    type: 'Fitness Event',
    date: '2027-03-08',
    description:
      'Sample listing: an open event where members and newcomers train together. Replace with real details.',
    banner: '/images/functional.jpg',
    placeholder: true,
  },
  {
    id: 'monthly-gym-challenge',
    title: 'Monthly Gym Challenge',
    type: 'Gym Challenge',
    date: '2026-09-27',
    description:
      'Sample past-event highlight: a members-only monthly challenge. Replace with a real recap and photos.',
    banner: '/images/weight-area.jpg',
    placeholder: true,
  },
  {
    id: 'members-meetup',
    title: 'Members Meet-up & Training Day',
    type: 'Fitness Event',
    date: '2026-08-09',
    description:
      'Sample past-event highlight: a community training day for members. Replace with a real recap and photos.',
    banner: '/images/atmosphere.jpg',
    placeholder: true,
  },
];

// ── Page copy (DEMO COPY) ────────────────────────────────────────────────────
// Narrative paragraphs used across the site. Written for the pitch: they describe
// intent, not facts. Have the owner rewrite these in their own voice.
export const copy = {
  heroIntro:
    `A focused place to train with purpose. Request a trial session or ${reachUs()} — we’ll help you find the right way to get started.`,
  homeIntro: {
    lead: `Whether you’re starting out or training toward something specific, ${site.name} is a place to put in focused, consistent work.`,
    body: 'The goal is simple: help you become stronger, sharper and more consistent than you were yesterday — starting with a conversation about what you want to achieve.',
  },
  aboutHero: `${site.name} is for people who want more from their training — a place where effort is respected and progress is earned.`,
  aboutPhilosophy: [
    `We believe a gym should raise your standards. Not just how much you lift, but how you show up — prepared, consistent and accountable to your goals.`,
    'Good training needs a focused environment and clear etiquette, so every member can concentrate on the work — whether it’s their first week or they’ve been training for years.',
  ],
  aboutAtmosphere: {
    lead: 'A floor where effort is respected, equipment is shared fairly and the space is looked after by everyone who uses it.',
    body: 'The aim is to support members at every stage — building the habits, technique and confidence to keep progressing.',
  },
  membershipsHero: 'Membership options at a glance. Contact the gym for current pricing and what each plan includes.',
  eventsHero: 'Competitions, challenges and community events — a reason to train toward a date.',
  trainersIntro: 'Trainer profiles will appear here once the gym has confirmed them.',
  placeholder: true,
};

// ── Gallery ──────────────────────────────────────────────────────────────────
// `actual: true` = a real photograph of Victory Fitness Gym (tagged "Actual photo").
// Everything else is licensed ILLUSTRATIVE stock photography (tagged "Illustrative")
// and must not be presented as the gym's own equipment, members or interior.
// `span`: grid shape — 'tall' | 'wide' (each = 2 cells) | 'normal' (1 cell).
// Keep the total cell count a multiple of 6 so rows fill evenly on phones (2 cols)
// and laptops (3 cols). Current set: 2 tall + 2 wide + 4 normal = 12 cells.
export const galleryCategories = ['Actual Photos', 'Strength Training', 'Cardio', 'Functional Training', 'Gym Atmosphere'];

export const gallery = [
  {
    src: '/images/victory-fitness-building.jpg',
    alt: 'Victory Fitness Gym signboard on the top floor of SS Plaza, Nabha Road, Bhabat, Zirakpur',
    caption: 'Victory Fitness Gym at SS Plaza',
    category: 'Actual Photos',
    span: 'tall',
    actual: true,
  },
  { src: '/images/weight-area.jpg', alt: 'Illustrative stock photo: dumbbells on racks in a weight training area', caption: 'Strength training', category: 'Strength Training', span: 'wide' },
  { src: '/images/free-weights.jpg', alt: 'Illustrative stock photo: rubber dumbbells on a rack', caption: 'Free weights', category: 'Strength Training', span: 'tall' },
  { src: '/images/cardio.jpg', alt: 'Illustrative stock photo: treadmills in a modern cardio area', caption: 'Cardio', category: 'Cardio', span: 'normal' },
  { src: '/images/barbell.jpg', alt: 'Illustrative stock photo: athlete setting up a deadlift', caption: 'Barbell training', category: 'Strength Training', span: 'normal' },
  { src: '/images/strength-equipment.jpg', alt: 'Illustrative stock photo: squat rack and weight plates', caption: 'Strength equipment', category: 'Strength Training', span: 'normal' },
  { src: '/images/functional.jpg', alt: 'Illustrative stock photo: athlete doing battle-rope training', caption: 'Functional training', category: 'Functional Training', span: 'wide' },
  { src: '/images/atmosphere.jpg', alt: 'Illustrative stock photo: bright gym floor with bikes and machines', caption: 'Gym atmosphere', category: 'Gym Atmosphere', span: 'normal' },
];

// ── Home page content ────────────────────────────────────────────────────────
// `icon` values are lucide-react component names, resolved in components/icons.js
// VERIFIED: "good to know" facts on Home — built only from confirmed details in site.js.
const weekdayHours = site.hours.find((h) => /monday/i.test(h.days) && h.time);
export const goodToKnow = [
  weekdayHours && {
    icon: 'Clock',
    title: `Open ${weekdayHours.time.replace(/:00/g, '')}`,
    text: `${weekdayHours.days.replace(' – ', ' to ')}. Closed on Sunday.`,
  },
  site.address.street && {
    icon: 'MapPin',
    title: 'Easy to Find',
    text: `2nd Floor, SS Plaza, Nabha Road, Bhabat, ${site.address.city} — near Riverdale Apartments.`,
  },
  site.phone && {
    icon: 'Phone',
    title: 'One Call Away',
    text: `Call ${site.phone} for membership options, pricing and trial sessions.`,
  },
].filter(Boolean);

// ILLUSTRATIVE: training areas visitors can ask about. Photos are stock and the text
// makes no claim about what Victory Fitness has — confirm real facilities, then rewrite.
export const facilities = [
  { icon: 'Dumbbell', title: 'Strength Training', text: 'Ask about racks, benches and barbell work.', img: '/images/weight-area.jpg', alt: 'Illustrative stock photo: dumbbells on racks', placeholder: true },
  { icon: 'HeartPulse', title: 'Cardio & Conditioning', text: 'Ask which cardio machines are available.', img: '/images/cardio.jpg', alt: 'Illustrative stock photo: row of treadmills', placeholder: true },
  { icon: 'Weight', title: 'Free Weights', text: 'Ask about the dumbbell and free-weight range.', img: '/images/free-weights.jpg', alt: 'Illustrative stock photo: rubber dumbbells on a rack', placeholder: true },
  { icon: 'Zap', title: 'Functional Training', text: 'Ask about space for conditioning and movement work.', img: '/images/functional.jpg', alt: 'Illustrative stock photo: athlete training with battle ropes', placeholder: true },
];

// HIDDEN (site.sections.programs = false): sample focuses — the gym's real programmes are not confirmed.
export const programs = [
  { icon: 'Dumbbell', title: 'Strength & Muscle Building', text: 'Progressive resistance training to add size and strength.', placeholder: true },
  { icon: 'Medal', title: 'Bodybuilding & Physique', text: 'Training focused on shape, symmetry and stage-ready conditioning.', placeholder: true },
  { icon: 'Flame', title: 'Fat Loss & Conditioning', text: 'Training and cardio structured to burn fat and build stamina.', placeholder: true },
  { icon: 'Activity', title: 'Functional Training', text: 'Movement-based sessions for mobility, power and everyday fitness.', placeholder: true },
  { icon: 'Sprout', title: 'Beginner Foundations', text: 'A confident start: learn the basics with the right technique.', placeholder: true },
  { icon: 'Trophy', title: 'Competition Preparation', text: 'Preparation for members who want to compete and test themselves.', placeholder: true },
];

// ── About page ───────────────────────────────────────────────────────────────
// SAMPLE: what the gym stands for — the owner should rewrite these.
export const aboutPillars = [
  { icon: 'Target', title: 'Our Philosophy', text: 'Results come from consistency, effort and respect for the process. A gym should push people to be sharper — in body and in discipline.', placeholder: true },
  { icon: 'Dumbbell', title: 'Training Environment', text: 'A focused floor, organised so members can concentrate on the work in front of them.', placeholder: true },
  { icon: 'Users', title: 'Fitness Culture', text: 'Respect, accountability and hard work — members hold themselves to a standard and support others doing the same.', placeholder: true },
  { icon: 'TrendingUp', title: 'Member Development', text: 'Helping members keep progressing, from a first workout to whatever goal comes next.', placeholder: true },
];

// ── Gym rules ────────────────────────────────────────────────────────────────
// SAMPLE: house rules carried over as a template — the owner must confirm the real rules.
export const rulesPlaceholder = true;
export const ruleCategories = [
  {
    title: 'Cleanliness & Hygiene',
    blurb: 'A clean gym is a shared responsibility.',
    rules: [
      { n: 1, icon: 'Waves', title: 'Carry a clean gym towel', text: 'Always bring a clean towel and use it on benches and machines.' },
      { n: 2, icon: 'SprayCan', title: 'Wipe down equipment', text: 'Wipe down every machine, bench and handle after use.' },
      { n: 5, icon: 'Sparkles', title: 'Maintain personal hygiene', text: 'Arrive clean and fresh — it makes the gym better for everyone.' },
      { n: 6, icon: 'Wind', title: 'Use deodorant', text: 'Use deodorant and keep your gym wear clean and washed.' },
    ],
  },
  {
    title: 'Equipment Etiquette',
    blurb: 'Leave every station ready for the next member.',
    rules: [
      { n: 3, icon: 'Undo2', title: 'Re-rack your weights', text: 'Return plates and dumbbells to their place after every set or exercise.' },
      { n: 7, icon: 'Timer', title: "Don't occupy equipment unnecessarily", text: 'Avoid long phone breaks on machines and let others work in between sets.' },
      { n: 11, icon: 'TriangleAlert', title: "Don't drop weights carelessly", text: 'Lower weights under control to protect people, equipment and the floor.' },
    ],
  },
  {
    title: 'Respect & Atmosphere',
    blurb: 'Everyone here is working toward something.',
    rules: [
      { n: 8, icon: 'Handshake', title: 'Respect other members', text: 'Be courteous, give people space and support a positive atmosphere.' },
      { n: 9, icon: 'VolumeX', title: 'Avoid unnecessary noise', text: 'Keep disturbance to a minimum so members can focus on training.' },
    ],
  },
  {
    title: 'Safety & Discipline',
    blurb: 'Train hard, train smart, train safe.',
    rules: [
      { n: 4, icon: 'Shirt', title: 'Wear appropriate attire', text: 'Wear proper workout clothing and closed training footwear.' },
      { n: 10, icon: 'UserCheck', title: 'Follow trainer instructions', text: "Listen to the trainers' guidance for your safety and the gym's." },
      { n: 12, icon: 'ShieldCheck', title: 'Maintain discipline & safety', text: 'Train within your limits, use spotters when needed and act responsibly.' },
    ],
  },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
// No reviews are invented. Add REAL member quotes here (with permission) and
// remove the placeholder entries. Example:
// { quote: '…', name: 'Member Name', detail: 'Member since 2025' }
// HIDDEN (site.sections.testimonials = false) — the section only returns once
// genuine reviews are added here. Never invent quotes, names or ratings.
export const testimonials = [];

// ── Trial form options ───────────────────────────────────────────────────────
export const trialTimes = ['Early morning', 'Morning', 'Afternoon', 'Evening', 'Late evening'];
export const trialGoals = [
  'Build muscle',
  'Lose weight / fat loss',
  'Increase strength',
  'General fitness',
  'Prepare for a competition',
  "I'm a beginner — show me the basics",
  'Other',
];

// ── Trainers ─────────────────────────────────────────────────────────────────
// EMPTY until real profiles are supplied — the site shows a tasteful "profiles coming
// soon" placeholder instead. Add only details each trainer has approved, e.g.:
// {
//   id: 'firstname-lastname', name: '…', designation: '…', specialization: '…',
//   experience: '… years', certifications: ['…'], photo: '/images/trainers/….jpg',
//   intro: '…', philosophy: '…',
// }
export const trainers = [];

// ── Owner ────────────────────────────────────────────────────────────────────
// HIDDEN (site.sections.owner = false). Replace with the owner's real details and
// photo ('/images/owner.jpg'), then switch the section back on.
export const owner = {
  name: 'Owner Name',
  role: 'Founder & Owner',
  photo: '',
  bio: `A short biography goes here: the owner's background, how they got into fitness, and why they started ${site.name}.`,
  philosophy: "The owner's fitness philosophy in a sentence or two.",
  vision: `The long-term vision for ${site.name} and the community it is building.`,
  mission: 'The mission: what every member should experience and achieve here.',
  message:
    "A personal message to prospective members goes here, written in the owner's own voice. Keep it warm, honest and specific about what new members can expect.",
  placeholder: true,
};
