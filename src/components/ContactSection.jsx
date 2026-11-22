import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import LocationMap from './LocationMap.jsx';
import { Button, Reveal, SampleTag, SectionHeading } from './ui.jsx';
import { InstagramIcon, WhatsAppIcon } from './icons.jsx';
import { site, filled, addressLines, trial } from '../config/site.js';
import { whatsappUrl, waMessages, hasPhone, telHref, showWhatsapp } from '../utils/whatsapp.js';

function InfoRow({ icon: I, label, children, missing }) {
  return (
    <li className="flex gap-4 bg-white p-5 sm:p-6">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-100 text-blue-500">
        <I size={19} aria-hidden="true" className="h-[19px] w-[19px]" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-slate">{label}</h3>
        <div className={`mt-1.5 text-[15px] leading-relaxed ${missing ? 'text-slate/80' : 'text-ink'}`}>{children}</div>
      </div>
    </li>
  );
}

/** Contact & location block — lives at the end of the About page. */
export default function ContactSection() {
  const lines = addressLines();
  const hoursSet = site.hours.filter((h) => filled(h.time));
  const missing = [
    !lines.length && 'Address',
    !hasPhone() && 'Phone',
    !filled(site.email) && 'Email',
    site.hours.some((h) => !filled(h.time)) && 'Some opening hours',
  ].filter(Boolean);

  return (
    <section id="contact" className="section-y scroll-mt-20 bg-cloud" aria-label="Contact and location">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Contact & Location" title="Visit" accent={`${site.name} Today`} align="center">
            Find us at SS Plaza, or call or WhatsApp the team with any enquiry.
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <ul className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline">
              <InfoRow icon={MapPin} label="Address" missing={!lines.length}>
                {lines.length ? lines.map((l) => <span key={l} className="block">{l}</span>) : 'To be confirmed'}
              </InfoRow>
              <InfoRow icon={Phone} label="Phone" missing={!hasPhone()}>
                {hasPhone() ? <a className="font-semibold transition-colors hover:text-blue-500" href={telHref()}>{site.phone}</a> : 'To be confirmed'}
              </InfoRow>
              <InfoRow icon={Mail} label="Email" missing={!filled(site.email)}>
                {filled(site.email) ? (
                  <a className="break-all transition-colors hover:text-blue-500" href={`mailto:${site.email}`}>{site.email}</a>
                ) : (
                  'To be confirmed'
                )}
              </InfoRow>
              <InfoRow icon={Clock} label="Opening hours" missing={!hoursSet.length}>
                {hoursSet.length ? (
                  <dl className="space-y-1">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6">
                        <dt className="text-slate">{h.days}</dt>
                        <dd className={filled(h.time) ? '' : 'text-slate/80'}>{filled(h.time) ? h.time : 'To be confirmed'}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  'To be confirmed'
                )}
              </InfoRow>
              {filled(site.instagramUrl) && (
                <InfoRow icon={InstagramIcon} label="Instagram">
                  <a className="break-all transition-colors hover:text-blue-500" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    Follow us on Instagram
                  </a>
                </InfoRow>
              )}
            </ul>
            {missing.length > 0 && <SampleTag className="mt-3">{missing.join(', ')} — to be confirmed</SampleTag>}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {showWhatsapp() && (
                <Button href={whatsappUrl(waMessages.contact)} external variant="whatsapp">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
                </Button>
              )}
              {hasPhone() && (
                <Button href={telHref()} variant="navy" className={showWhatsapp() ? '' : 'sm:col-span-2'}>
                  <Phone size={17} aria-hidden="true" /> Call {site.phone}
                </Button>
              )}
              <Button to="/free-trial" className="sm:col-span-2">{trial.cta}</Button>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <LocationMap />
          </Reveal>
        </div>

        <Reveal className="mt-6 lg:mt-8">
          <div className="on-dark flex flex-col gap-6 rounded-2xl bg-navy-900 p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between lg:p-10">
            <div>
              <p className="eyebrow on-dark mb-4">Have a Question?</p>
              <h3 className="text-heading-2 text-white">Enquire about anything</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-white/70">
                Memberships, pricing, trial sessions or anything else — just call or WhatsApp the {site.name} team.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              {hasPhone() && (
                <Button href={telHref()} variant="light" size="lg" aria-label={`Call ${site.name} on ${site.phone}`}>
                  <Phone size={17} aria-hidden="true" /> Call {site.phone}
                </Button>
              )}
              {showWhatsapp() && (
                <Button href={whatsappUrl(waMessages.contact)} external variant="whatsapp" size="lg">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
