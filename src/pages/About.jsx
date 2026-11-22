import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Trainers from '../components/Trainers.jsx';
import OwnerSection from '../components/OwnerSection.jsx';
import { Icon } from '../components/icons.jsx';
import { Button, Reveal, SectionHeading, PhotoTag } from '../components/ui.jsx';
import { aboutPillars, copy } from '../config/content.js';
import { site, trial, isOn } from '../config/site.js';
import { stagger } from '../utils/motion.js';
import Img from '../components/Img.jsx';

const jumps = [
  { to: '/about#philosophy', label: 'Philosophy' },
  isOn('trainers') && { to: '/about#trainers', label: 'Trainers' },
  isOn('owner') && { to: '/about#owner', label: 'The Owner' },
  { to: '/about#contact', label: 'Contact' },
].filter(Boolean);

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Discipline Is"
        accent="Our Standard"
        image="/images/hero.jpg"
        children2={
          <nav aria-label="On this page" className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {jumps.map((j) => (
              <Link
                key={j.to}
                to={j.to}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/20 px-5 text-[14px] font-semibold text-white/85 transition-colors hover:border-white/60 hover:text-white"
              >
                {j.label}
              </Link>
            ))}
          </nav>
        }
      >
        {copy.aboutHero}
      </PageHero>

      {/* Philosophy */}
      <section id="philosophy" className="section-y scroll-mt-20 bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <Reveal className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            <figure>
              <div className="relative">
                <Img
                  src="/images/victory-fitness-building.jpg"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  alt="Victory Fitness Gym signboard on the top floor of SS Plaza, Nabha Road, Bhabat, Zirakpur"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover object-[50%_28%] sm:aspect-square lg:aspect-[4/5]"
                />
                <PhotoTag actual className="absolute left-4 top-4" />
              </div>
              <figcaption className="mt-3 text-sm text-slate">Victory Fitness Gym — 2nd Floor, SS Plaza, Nabha Road, Bhabat.</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-7">
            <SectionHeading eyebrow="Our Philosophy" title="Strength Is Built" accent="Daily" sample={copy.placeholder && 'Sample copy'}>
              Results aren't an accident. They're the product of consistency, intent and respect for the process.
            </SectionHeading>
            <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-slate">
              {copy.aboutPhilosophy.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-blue-500 pl-5 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-ink sm:mt-10 sm:pl-6 sm:text-3xl">
              “Show up. Do the work. <span className="text-accent">Get sharper.</span>”
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-y bg-cloud">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What We Stand For"
              title="Built On Four"
              accent="Pillars"
              align="center"
              sample={aboutPillars.some((p) => p.placeholder) && 'Sample copy'}
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 md:gap-5">
            {aboutPillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={(i % 2) * stagger}
                className="flex gap-4 rounded-2xl border border-hairline bg-white p-5 transition-colors duration-300 hover:border-ink/20 sm:gap-5 sm:p-8"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-500 sm:h-12 sm:w-12">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-heading-2 text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {isOn('trainers') && <Trainers />}
      {isOn('owner') && <OwnerSection />}

      {/* Atmosphere */}
      <section className="section-y bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto grid max-w-xl grid-cols-2 gap-3 sm:gap-4 lg:max-w-none">
              <PhotoTag className="absolute left-3 top-3 z-10" />
              <Img src="/images/cardio.jpg" alt="Illustrative stock photo: row of treadmills" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <Img src="/images/functional.jpg" alt="Illustrative stock photo: athlete training with battle ropes" sizes="(min-width: 1024px) 25vw, 50vw" className="mt-10 aspect-[4/5] w-full rounded-2xl object-cover sm:mt-12" />
            </div>
          </Reveal>
          <Reveal delay={0.06} className="order-1 lg:order-2">
            <SectionHeading eyebrow="The Atmosphere" title="Professional." accent="Respectful. Focused." sample={copy.placeholder && 'Sample copy'}>
              {copy.aboutAtmosphere.lead}
            </SectionHeading>
            <p className="mt-5 max-w-xl leading-relaxed text-slate">{copy.aboutAtmosphere.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/free-trial">{trial.cta}</Button>
              {isOn('gymRules') && <Button to="/gym-rules" variant="outline">Read Gym Rules</Button>}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
