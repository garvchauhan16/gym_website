import PageHero from '../components/PageHero.jsx';
import CTABanner from '../components/CTABanner.jsx';
import { Icon } from '../components/icons.jsx';
import { Reveal, SampleTag } from '../components/ui.jsx';
import { ruleCategories, rulesPlaceholder } from '../config/content.js';
import { site } from '../config/site.js';
import { stagger } from '../utils/motion.js';

const totalRules = ruleCategories.reduce((n, c) => n + c.rules.length, 0);

/**
 * Phone: category heading then 1-col rules · Tablet: 2-col rules (an odd last
 * rule spans the row) · Laptop+: sticky category heading on the left.
 */
export default function GymRules() {
  return (
    <>
      <PageHero eyebrow="Gym Rules & Etiquette" title="Respect The Space." accent="Respect Each Other.">
        {totalRules} simple standards that help keep {site.name} clean, safe and focused for every member.
      </PageHero>

      <section className="section-y bg-white">
        {rulesPlaceholder && site.showPlaceholderNotices && (
          <div className="container-x">
            <p className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate sm:mb-14">
              <SampleTag>Sample rules</SampleTag>
              <span>A starting template — the gym’s own rules will replace these.</span>
            </p>
          </div>
        )}
        <div className="container-x divide-y divide-hairline">
          {ruleCategories.map((cat, ci) => (
            <div key={cat.title} className="grid gap-8 py-12 first:pt-0 last:pb-0 sm:py-16 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-display text-sm font-bold tabular-nums text-blue-500">0{ci + 1}</p>
                  <h2 className="mt-2 text-heading-1 text-ink">{cat.title}</h2>
                  <p className="mt-3 max-w-sm text-slate">{cat.blurb}</p>
                </div>
              </Reveal>
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
                {cat.rules.map((r, i) => (
                  <Reveal
                    as="li"
                    key={r.n}
                    delay={(i % 2) * stagger}
                    className={`relative flex gap-4 rounded-2xl border border-hairline bg-white p-5 transition-colors duration-300 hover:border-ink/20 sm:block sm:p-6 ${
                      cat.rules.length % 2 === 1 && i === cat.rules.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <span className="absolute right-5 top-5 font-display text-sm font-bold tabular-nums text-slate/45" aria-hidden="true">
                      {String(r.n).padStart(2, '0')}
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-500">
                      <Icon name={r.icon} size={19} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="pr-8 font-display text-lg font-extrabold leading-snug text-ink sm:mt-4 sm:text-xl">
                        <span className="sr-only">Rule {r.n}: </span>
                        {r.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{r.text}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        eyebrow="Ready To Train"
        title="Meet The Standard"
        accent="Yourself"
        text="Experience our disciplined environment first-hand with a trial session."
        image="/images/strength-equipment.jpg"
      />
    </>
  );
}
