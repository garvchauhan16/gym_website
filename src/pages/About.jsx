import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Trainers from '../components/Trainers.jsx';
import OwnerSection from '../components/OwnerSection.jsx';
import { Icon } from '../components/icons.jsx';
import { Button, Reveal, SectionHeading } from '../components/ui.jsx';
import { aboutPillars } from '../config/content.js';

const jumps = [
  { to: '/about#philosophy', label: 'Philosophy' },
  { to: '/about#trainers', label: 'Trainers' },
  { to: '/about#owner', label: 'The Owner' },
  { to: '/about#contact', label: 'Contact' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Discipline Is"
        accent="Our Standard"
        image="/images/hero.jpg"
        children2={
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2.5">
            {jumps.map((j) => (
              <Link key={j.to} to={j.to} className="inline-flex min-h-11 items-center rounded-full border border-charcoal/20 bg-white/60 px-5 text-[13px] font-semibold tracking-wide text-charcoal transition-colors hover:border-olive hover:text-olive">
                {j.label}
              </Link>
            ))}
          </nav>
        }
      >
        Powerhouse Gym exists for people who want more from their training — a place where effort is respected and progress is earned.
      </PageHero>

      <section id="philosophy" className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-5">
            <img src="/images/member.jpg" alt="Member performing a barbell curl with focus" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_-40px_rgba(35,38,42,0.55)]" />
            <div className="absolute -bottom-6 -right-2 hidden w-52 sm:block lg:-right-10">
              <img src="/images/free-weights.jpg" alt="Rack of dumbbells" loading="lazy" className="aspect-square w-full rounded-3xl border-[6px] border-ivory object-cover shadow-xl" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <SectionHeading eyebrow="Our Philosophy" title="Strength Is Built" accent="Daily">
              Results aren't an accident. They're the product of consistency, intent and respect for the process.
            </SectionHeading>
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-mist">
              <p>
                We built Powerhouse Gym around a simple belief: a gym should raise your standards. Not just how much
                you lift, but how you show up — on time, prepared, and accountable to your goals.
              </p>
              <p>
                That's why we pair serious equipment with clear etiquette. A clean, organised and respectful floor
                lets every member train without distraction, whether it's their first week or their fiftieth competition prep.
              </p>
            </div>
            <blockquote className="mt-10 border-l-2 border-gold pl-6 font-display text-3xl italic leading-tight text-charcoal sm:text-4xl">
              “Show up. Do the work. <span className="text-gold-gradient">Get sharper.</span>”
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-sand">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="What We Stand For" title="Built On Four" accent="Pillars" align="center" />
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {aboutPillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} y={16} className="group flex gap-6 rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:border-olive/40 hover:shadow-[0_26px_55px_-38px_rgba(35,38,42,0.45)] sm:p-10">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-olive/10 text-olive">
                  <Icon name={p.icon} size={26} />
                </span>
                <div>
                  <h3 className="text-3xl text-charcoal">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-mist">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Trainers />
      <OwnerSection />

      <section className="section-y">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/cardio.jpg" alt="Row of treadmills in the cardio section" loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
              <img src="/images/functional.jpg" alt="Athlete training with battle ropes" loading="lazy" className="mt-12 aspect-[4/5] w-full rounded-[2rem] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <SectionHeading eyebrow="The Atmosphere" title="Professional." accent="Respectful. Focused.">
              The energy on our floor is intense but disciplined. Members support each other, share equipment fairly and keep the space clean.
            </SectionHeading>
            <p className="mt-6 max-w-xl leading-relaxed text-mist">
              We're committed to member development at every stage — helping you build the habits, technique and confidence to keep progressing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/gym-rules" variant="dark">Read Gym Rules</Button>
              <Button to="/free-trial">Book Your Free Trial</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
