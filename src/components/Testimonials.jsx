import { Quote } from 'lucide-react';
import { testimonials } from '../config/content.js';
import { SectionHeading, Reveal, SampleTag } from './ui.jsx';

export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="section-y bg-sand" aria-label="Member testimonials">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Member Voices" title="What Members" accent="Say" align="center">
            Real words from the people who train here.
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-line bg-ivory p-8">
                <Quote className="text-gold/60" size={32} aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-charcoal/80">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-sm text-mist">{t.detail}</p>
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
