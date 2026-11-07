import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { Button, Reveal, SampleTag, SectionHeading } from './ui.jsx';
import { InstagramIcon, WhatsAppIcon } from './icons.jsx';
import { site, filled, addressLines } from '../config/site.js';
import { whatsappUrl, waMessages, hasPhone, telHref } from '../utils/whatsapp.js';

function InfoRow({ icon: I, label, children, missing }) {
  return (
    <li className="flex gap-5 rounded-2xl border border-line bg-white p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/[0.07] text-gold">
        <I size={22} aria-hidden="true" className="h-[22px] w-[22px]" />
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">{label}</h3>
        <div className={`mt-2 text-[15px] leading-relaxed ${missing ? 'text-mist' : 'text-charcoal'}`}>{children}</div>
        {missing && <SampleTag className="mt-2">To be added</SampleTag>}
      </div>
    </li>
  );
}

/** Contact & location block — lives at the end of the About page. */
export default function ContactSection() {
  const lines = addressLines();
  const hoursSet = site.hours.filter((h) => filled(h.time));
  return (
    <section id="contact" className="section-y scroll-mt-24 border-t border-line bg-sand" aria-label="Contact and location">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Contact & Location" title="Visit" accent="Powerhouse Gym Today" align="center">
              Walk in, call, or message us on WhatsApp — we'd love to show you around.
            </SectionHeading>
          </Reveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <ul className="space-y-4">
              <InfoRow icon={MapPin} label="Address" missing={!lines.length}>
                {lines.length ? lines.map((l) => <span key={l} className="block">{l}</span>) : 'Gym address will be added here.'}
              </InfoRow>
              <InfoRow icon={Phone} label="Phone" missing={!filled(site.phone)}>
                {filled(site.phone) ? <a className="hover:text-olive" href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a> : 'Phone number will be added here.'}
              </InfoRow>
              <InfoRow icon={Mail} label="Email" missing={!filled(site.email)}>
                {filled(site.email) ? <a className="break-all hover:text-olive" href={`mailto:${site.email}`}>{site.email}</a> : 'Email address will be added here.'}
              </InfoRow>
              <InfoRow icon={Clock} label="Opening hours" missing={!hoursSet.length}>
                {hoursSet.length ? (
                  <dl className="space-y-1">
                    {hoursSet.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6"><dt className="text-mist">{h.days}</dt><dd>{h.time}</dd></div>
                    ))}
                  </dl>
                ) : 'Opening hours will be added here.'}
              </InfoRow>
              <InfoRow icon={InstagramIcon} label="Instagram" missing={!filled(site.instagramUrl)}>
                {filled(site.instagramUrl) ? (
                  <a className="break-all hover:text-olive" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Follow us on Instagram</a>
                ) : 'Instagram link will be added here.'}
              </InfoRow>
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button href={whatsappUrl(waMessages.contact)} external variant="whatsapp">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
              </Button>
              {hasPhone() ? (
                <Button href={telHref()} variant="dark"><Phone size={17} aria-hidden="true" /> Call Now</Button>
              ) : (
                <Button to="/free-trial" variant="dark">Book a Free Trial</Button>
              )}
              <Button to="/free-trial" className="sm:col-span-2">Book a Free Trial</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              {filled(site.mapEmbedUrl) ? (
                <iframe
                  title="Powerhouse Gym location on Google Maps"
                  src={site.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full border-0 sm:aspect-[16/11]"
                />
              ) : (
                <div className="grid aspect-[4/3] place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(200,169,106,0.12),transparent_55%)] p-8 text-center sm:aspect-[16/11]">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold"><MapPin size={28} aria-hidden="true" /></span>
                    <p className="mt-5 font-display text-3xl font-bold">Map coming soon</p>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-mist">Google Maps will appear here once the gym's location is added.</p>
                    <SampleTag className="mt-4">Map placeholder</SampleTag>
                  </div>
                </div>
              )}
            </div>
            {filled(site.mapDirectionsUrl) && (
              <Button href={site.mapDirectionsUrl} external variant="dark" className="mt-4 w-full sm:w-auto">
                <Navigation size={16} aria-hidden="true" /> Get Directions
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
