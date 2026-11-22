import { Compass, Flag, Quote, Sparkles } from 'lucide-react';
import { owner } from '../config/content.js';
import { site, trial } from '../config/site.js';
import { Button, Eyebrow, Reveal, SampleTag } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';
import Img from './Img.jsx';

/** Navy feature section introducing the gym owner. All copy comes from config/content.js. */
export default function OwnerSection() {
  const o = owner;
  return (
    <section id="owner" className="on-dark section-y scroll-mt-20 bg-navy-900 text-white" aria-label={`The person behind ${site.name}`}>
      <div className="container-x">
        <Reveal>
          <Eyebrow dark className="mb-6">Our Founder</Eyebrow>
          <h2 className="max-w-4xl text-balance text-display-2 text-white">
            The Person Behind <span className="text-accent">{site.name}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-12 lg:gap-16">
          {/* Portrait: full width on phones, left column from tablet */}
          <Reveal className="md:col-span-5">
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-800 ring-1 ring-white/10">
                {o.photo ? (
                  <Img src={o.photo} alt={`${o.name}, ${o.role} of ${site.name}`} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center" role="img" aria-label="Owner photograph coming soon">
                    <div className="text-center">
                      <span className="block font-display text-[7rem] font-black leading-none text-white/10 sm:text-[9rem]">
                        {site.wordmark.primary.charAt(0)}
                      </span>
                      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Owner photograph coming soon</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
                  <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{o.name}</p>
                  <p className="mt-1 text-sm text-blue-300">{o.role}</p>
                </div>
              </div>
              {o.placeholder && <SampleTag className="absolute left-4 top-4">Sample profile</SampleTag>}
            </div>
          </Reveal>

          <div className="md:col-span-7">
            <Reveal>
              <p className="text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{o.bio}</p>
            </Reveal>

            <Reveal className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                { icon: Compass, label: 'Vision', text: o.vision },
                { icon: Flag, label: 'Mission', text: o.mission },
              ].map((b) => (
                <div key={b.label} className="bg-navy-900 p-5 sm:p-6">
                  <b.icon size={20} className="text-blue-300" aria-hidden="true" />
                  <h3 className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{b.label}</h3>
                  <p className="mt-2 leading-relaxed text-white/80">{b.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-8 flex gap-4">
              <Sparkles size={20} className="mt-1 shrink-0 text-blue-300" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Fitness philosophy</h3>
                <p className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">“{o.philosophy}”</p>
              </div>
            </Reveal>

            <Reveal className="relative mt-10 rounded-2xl bg-white p-6 text-ink sm:p-8">
              <Quote size={28} className="absolute right-6 top-6 text-blue-100" aria-hidden="true" />
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">A personal message</h3>
              <p className="mt-4 text-pretty text-base leading-relaxed sm:text-lg">{o.message}</p>
              <p className="mt-6 font-display text-lg font-extrabold text-navy-900">— {o.name}</p>
            </Reveal>

            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl(waMessages.owner)} external variant="whatsapp">
                <WhatsAppIcon className="h-5 w-5" /> Contact the Gym Team
              </Button>
              <Button to="/free-trial" variant="outlineLight">{trial.cta}</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
