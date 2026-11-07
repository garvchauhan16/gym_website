import PageHero from '../components/PageHero.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Icon } from '../components/icons.jsx';
import { Reveal } from '../components/ui.jsx';
import { ruleCategories } from '../config/content.js';

export default function GymRules() {
  return (
    <>
      <PageHero eyebrow="Gym Rules & Etiquette" title="Respect The Space." accent="Respect Each Other.">
        Twelve simple standards that keep Powerhouse Gym clean, safe and focused for every member.
      </PageHero>

      <section className="section-y">
        <div className="container-x space-y-20">
          {ruleCategories.map((cat, ci) => (
            <div key={cat.title} className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-display text-7xl font-bold text-charcoal/[0.07]" aria-hidden="true">0{ci + 1}</p>
                  <h2 className="-mt-4 text-4xl font-bold sm:text-5xl">{cat.title}</h2>
                  <p className="mt-4 text-mist">{cat.blurb}</p>
                </div>
              </Reveal>
              <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
                {cat.rules.map((r, i) => (
                  <Reveal as="li" key={r.n} delay={(i % 2) * 0.08} y={16} className="group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
                    <span className="absolute right-5 top-3 font-display text-5xl font-bold text-charcoal/[0.05] transition-colors group-hover:text-gold/20" aria-hidden="true">
                      {String(r.n).padStart(2, '0')}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold">
                      <Icon name={r.icon} size={22} />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold">
                      <span className="sr-only">Rule {r.n}: </span>{r.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-mist">{r.text}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTABanner eyebrow="Ready To Train" title="Meet The Standard" accent="Yourself" text="Experience our disciplined environment first-hand with a trial session." image="/images/strength-equipment.jpg" />
    </>
  );
}
