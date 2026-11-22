import { Quote } from 'lucide-react';
import { testimonials } from '../config/content.js';
import { SectionHeading, Reveal, SampleTag } from './ui.jsx';
import { stagger } from '../utils/motion.js';

/** Phone: 1 col · Tablet: 2 cols (an odd last card spans both) · Laptop+: 3 cols. */
export default function Testimonials({ bg = 'bg-cloud' }) {
  if (!testimonials.length) return null;
  const odd = testimonials.length % 2 === 1;
  return (
    <section className={`section-y ${bg}`} aria-label="Member testimonials">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Member Voices" title="What Members" accent="Say" align="center">
            Real words from the people who train here.
          </SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * stagger}
              className={odd && i === testimonials.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 sm:p-8">
                <Quote className="text-blue-500" size={26} aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-pretty text-[15px] leading-relaxed text-ink/80 sm:text-base">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-hairline pt-5">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="mt-0.5 text-sm text-slate">{t.detail}</p>
                  {t.placeholder && <SampleTag className="mt-3">Sample — not a real review</SampleTag>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
