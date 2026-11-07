import { Compass, Flag, Quote, Sparkles } from 'lucide-react';
import { owner } from '../config/content.js';
import { Button, Reveal, SampleTag } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

/** Editorial, dark feature section introducing the gym owner. All copy comes from config/content.js. */
export default function OwnerSection() {
  const o = owner;
  return (
    <section id="owner" className="on-dark relative isolate overflow-hidden bg-forest py-20 text-white sm:py-28" aria-label="The person behind Powerhouse Gym">
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold-light/10 blur-3xl" aria-hidden="true" />
      <div className="container-x">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold-light">
            <span className="h-px w-10 bg-gold-light" aria-hidden="true" /> Our Founder
          </p>
          <h2 className="max-w-4xl text-balance text-5xl text-white sm:text-6xl lg:text-7xl">
            The Person Behind <span className="text-gold-gradient">Powerhouse Gym</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border border-gold-light/40" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2b3229] to-[#3b4535]">
                {o.photo ? (
                  <img src={o.photo} alt={`${o.name}, ${o.role} of Powerhouse Gym`} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center" role="img" aria-label="Owner photograph coming soon">
                    <div className="text-center">
                      <span className="block font-display text-[9rem] italic leading-none text-gold-light/40">S</span>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-light/70">Owner photograph</p>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">coming soon</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-6 pt-20">
                  <p className="font-display text-3xl text-white">{o.name}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gold-light">{o.role}</p>
                </div>
              </div>
              {o.placeholder && <SampleTag className="absolute left-4 top-4">Sample profile</SampleTag>}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">{o.bio}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Compass, label: 'Vision', text: o.vision },
                { icon: Flag, label: 'Mission', text: o.mission },
              ].map((b) => (
                <div key={b.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <b.icon size={22} className="text-gold-light" aria-hidden="true" />
                  <h3 className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">{b.label}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{b.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex gap-4">
              <Sparkles size={22} className="mt-1 shrink-0 text-gold-light" aria-hidden="true" />
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">Fitness philosophy</h3>
                <p className="mt-2 font-display text-2xl italic leading-snug text-white">“{o.philosophy}”</p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="relative mt-10 rounded-3xl bg-ivory p-7 text-charcoal sm:p-9">
              <Quote size={34} className="absolute right-6 top-6 text-gold-light" aria-hidden="true" />
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">A personal message</h3>
              <p className="mt-4 text-pretty text-lg leading-relaxed">{o.message}</p>
              <p className="mt-6 font-display text-2xl italic text-olive">— {o.name}</p>
            </Reveal>

            <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappUrl(waMessages.owner)} external variant="whatsapp">
                <WhatsAppIcon className="h-5 w-5" /> Connect With the Owner / Gym Team
              </Button>
              <Button to="/free-trial" variant="outlineLight">Book Your Free Trial</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
