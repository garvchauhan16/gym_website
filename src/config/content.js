/**
 * Editable website content: events, gallery, programs, facilities, rules,
 * testimonials. Everything marked `placeholder: true` is SAMPLE content to be
 * replaced by the gym owner. Business details live in ./site.js.
 */

// ── Events ───────────────────────────────────────────────────────────────────
// status: 'Upcoming' | 'Completed'. date: 'YYYY-MM-DD'. banner: path in /public/images
export const events = [
  {
    id: 'bodybuilding-showcase',
    title: 'Powerhouse Gym Bodybuilding Showcase',
    type: 'Bodybuilding Competition',
    date: '2027-01-17',
    status: 'Upcoming',
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
    status: 'Upcoming',
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
    status: 'Upcoming',
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
    status: 'Upcoming',
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
    status: 'Completed',
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
    status: 'Completed',
    description:
      'Sample past-event highlight: a community training day for members. Replace with a real recap and photos.',
    banner: '/images/atmosphere.jpg',
    placeholder: true,
  },
];

// ── Gallery ──────────────────────────────────────────────────────────────────
// Replace `src` with your own photos (drop files in /public/images and update the path).
// `span`: grid shape on desktop — 'tall' | 'wide' | 'normal'
export const galleryCategories = [
  'Weight Training Area',
  'Cardio Section',
  'Strength Equipment',
  'Free Weights',
  'Functional Training',
  'Gym Atmosphere',
  'Member Activities',
];

export const gallery = [
  { src: '/images/weight-area.jpg', alt: 'Rows of dumbbells on racks in a spacious weight training area', category: 'Weight Training Area', span: 'wide' },
  { src: '/images/free-weights.jpg', alt: 'Line of rubber dumbbells on a rack', category: 'Free Weights', span: 'tall' },
  { src: '/images/cardio.jpg', alt: 'Treadmills lined up in a dark, modern cardio section', category: 'Cardio Section', span: 'normal' },
  { src: '/images/barbell.jpg', alt: 'Athlete setting up a deadlift with a loaded barbell', category: 'Weight Training Area', span: 'normal' },
  { src: '/images/strength-equipment.jpg', alt: 'Squat rack and weight plates in a strength training corner', category: 'Strength Equipment', span: 'normal' },
  { src: '/images/functional.jpg', alt: 'Athlete performing battle rope training', category: 'Functional Training', span: 'wide' },
  { src: '/images/hero.jpg', alt: 'Black and white view of a bright gym floor with treadmills and benches', category: 'Gym Atmosphere', span: 'normal' },
  { src: '/images/atmosphere.jpg', alt: 'Bright gym floor with spin bikes and machines', category: 'Cardio Section', span: 'normal' },
  { src: '/images/member.jpg', alt: 'Member performing a barbell curl', category: 'Member Activities', span: 'tall' },
];

// ── Home page content ────────────────────────────────────────────────────────
// `icon` values are lucide-react component names, resolved in components/icons.js
export const whyChoose = [
  {
    icon: 'ShieldCheck',
    title: 'A Disciplined Environment',
    text: 'Clear standards for conduct, hygiene and equipment use keep the floor focused and respectful.',
  },
  {
    icon: 'Target',
    title: 'Goal-Driven Training',
    text: 'Whether you want to build muscle, lose fat or compete, training here is built around a goal.',
  },
  {
    icon: 'Sparkles',
    title: 'Clean & Well-Kept',
    text: 'A maintained space where members take responsibility for the equipment they use.',
  },
  {
    icon: 'Users',
    title: 'A Serious Community',
    text: 'Train alongside people who show up, push limits and respect the work of others.',
  },
  {
    icon: 'Trophy',
    title: 'Challenges & Competitions',
    text: 'Regular challenges and events give your progress a purpose beyond the mirror.',
  },
  {
    icon: 'MessageCircle',
    title: 'Easy to Reach',
    text: 'Questions about plans or trials? Message us directly on WhatsApp and get a real reply.',
  },
];

export const facilities = [
  { icon: 'Dumbbell', title: 'Weight Training Area', text: 'Dedicated space for compound lifts and progressive overload.', img: '/images/weight-area.jpg', alt: 'Dumbbells on racks in the weight training area' },
  { icon: 'HeartPulse', title: 'Cardio Section', text: 'Cardio machines for conditioning, endurance and warm-ups.', img: '/images/cardio.jpg', alt: 'Row of treadmills in the cardio section' },
  { icon: 'Settings2', title: 'Strength Equipment', text: 'Racks, benches and machines for structured strength work.', img: '/images/strength-equipment.jpg', alt: 'Squat rack and plates' },
  { icon: 'Weight', title: 'Free Weights', text: 'Dumbbells and barbells for every level of lifter.', img: '/images/free-weights.jpg', alt: 'Rubber dumbbells lined up on a rack' },
  { icon: 'Zap', title: 'Functional Training Zone', text: 'Open floor for ropes, conditioning and movement work.', img: '/images/functional.jpg', alt: 'Athlete training with battle ropes' },
];

export const programs = [
  { icon: 'Dumbbell', title: 'Strength & Muscle Building', text: 'Progressive resistance training to add size and strength.' },
  { icon: 'Medal', title: 'Bodybuilding & Physique', text: 'Training focused on shape, symmetry and stage-ready conditioning.' },
  { icon: 'Flame', title: 'Fat Loss & Conditioning', text: 'Training and cardio structured to burn fat and build stamina.' },
  { icon: 'Activity', title: 'Functional Training', text: 'Movement-based sessions for mobility, power and everyday fitness.' },
  { icon: 'Sprout', title: 'Beginner Foundations', text: 'A confident start: learn the basics with the right technique.' },
  { icon: 'Trophy', title: 'Competition Preparation', text: 'Preparation for members who want to compete and test themselves.' },
];

// ── About page ───────────────────────────────────────────────────────────────
export const aboutPillars = [
  {
    icon: 'Target',
    title: 'Our Philosophy',
    text: 'Results come from consistency, effort and respect for the process. We believe a gym should push people to be sharper — in body and in discipline.',
  },
  {
    icon: 'Dumbbell',
    title: 'Training Environment',
    text: 'A focused floor with the equipment serious training demands, kept clean and organised so you can concentrate on the work.',
  },
  {
    icon: 'Users',
    title: 'Fitness Culture',
    text: 'Respect, accountability and hard work. Members hold themselves to a standard and support others doing the same.',
  },
  {
    icon: 'TrendingUp',
    title: 'Member Development',
    text: 'We are committed to helping every member progress — from a first workout to a first competition.',
  },
];

// ── Gym rules ────────────────────────────────────────────────────────────────
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
export const testimonials = [
  {
    quote: 'Your member’s real words will appear here. Add genuine reviews, with permission, in src/config/content.js.',
    name: 'Member Name',
    detail: 'Placeholder — replace with a real review',
    placeholder: true,
  },
  {
    quote: 'Share a real result, what changed, or what they value most about training at Powerhouse Gym.',
    name: 'Member Name',
    detail: 'Placeholder — replace with a real review',
    placeholder: true,
  },
  {
    quote: 'Short, honest and specific reviews convert best. Ask members to mention their goal and experience.',
    name: 'Member Name',
    detail: 'Placeholder — replace with a real review',
    placeholder: true,
  },
];

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
// PLACEHOLDERS. Replace each entry with a real trainer (only information they approve).
// `photo`: path in /public/images (e.g. '/images/trainers/name.jpg'). Leave '' to show a
// tidy "photo coming soon" panel. Delete `certifications` entries if none apply (empty
// array hides that block). Remove `placeholder: true` once the entry is real.
export const trainers = [
  {
    id: 'trainer-1',
    name: 'Trainer Name',
    designation: 'Designation / Role',
    specialization: 'Specialization',
    experience: 'X years',
    certifications: ['Certification name (if applicable)'],
    photo: '',
    intro: 'A short professional introduction goes here: background, the kind of members they enjoy working with, and what they are known for on the gym floor.',
    philosophy: 'Their training philosophy in one or two sentences.',
    placeholder: true,
  },
  {
    id: 'trainer-2',
    name: 'Trainer Name',
    designation: 'Designation / Role',
    specialization: 'Specialization',
    experience: 'X years',
    certifications: ['Certification name (if applicable)'],
    photo: '',
    intro: 'A short professional introduction goes here: background, the kind of members they enjoy working with, and what they are known for on the gym floor.',
    philosophy: 'Their training philosophy in one or two sentences.',
    placeholder: true,
  },
  {
    id: 'trainer-3',
    name: 'Trainer Name',
    designation: 'Designation / Role',
    specialization: 'Specialization',
    experience: 'X years',
    certifications: [],
    photo: '',
    intro: 'A short professional introduction goes here: background, the kind of members they enjoy working with, and what they are known for on the gym floor.',
    philosophy: 'Their training philosophy in one or two sentences.',
    placeholder: true,
  },
];

// ── Owner ────────────────────────────────────────────────────────────────────
// PLACEHOLDER. Replace with the owner's real details and photo ('/images/owner.jpg').
export const owner = {
  name: 'Owner Name',
  role: 'Founder & Owner',
  photo: '',
  bio: "A short biography goes here: the owner's background, how they got into fitness, and why they started Powerhouse Gym.",
  philosophy: "The owner's fitness philosophy in a sentence or two.",
  vision: 'The long-term vision for Powerhouse Gym and the community it is building.',
  mission: 'The mission: what every member should experience and achieve here.',
  message:
    "A personal message to prospective members goes here, written in the owner's own voice. Keep it warm, honest and specific about what new members can expect.",
  placeholder: true,
};
