import { Check, Phone } from 'lucide-react';
import { site, isPlaceholderPrice, hasWhatsapp } from '../config/site.js';
import { waMessages } from '../utils/whatsapp.js';
import ContactButton from './ContactButton.jsx';

/**
 * Membership card. Shows a price and inclusions only when the gym has supplied
 * them (config/site.js); otherwise "Contact gym for pricing" — nothing invented.
 */
export default function PricingCard({ plan }) {
  const hasPrice = !isPlaceholderPrice(plan.price);
  const perks = plan.perks ?? [];
  const rec = plan.recommended;
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-7 lg:p-8 ${
        rec
          ? 'border-navy-900 bg-navy-900 text-white shadow-[0_30px_60px_-30px_rgba(10,20,40,0.7)]'
          : 'border-hairline bg-white text-ink hover:border-ink/20'
      }`}
    >
      {/* Electric-blue rule that grows on hover — the card's one accent */}
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.18] bg-blue-500 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />

      <header>
        <div className="flex min-h-6 flex-wrap items-center gap-2">
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${rec ? 'text-blue-300' : 'text-blue-500'}`}>{plan.duration}</p>
          {rec && (
            <span className="rounded-md bg-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">Recommended</span>
          )}
        </div>
        <h3 className={`mt-2 text-heading-2 ${rec ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
      </header>

      <div className={`mt-6 border-y py-6 ${rec ? 'border-white/10' : 'border-hairline'}`}>
        {hasPrice ? (
          <>
            <p className="flex items-baseline gap-1 font-display font-extrabold tracking-[-0.03em]">
              <span className={`text-2xl ${rec ? 'text-blue-300' : 'text-blue-500'}`}>{site.currency}</span>
              <span className="text-[2.75rem] leading-none sm:text-5xl">{plan.price}</span>
            </p>
            <p className={`mt-3 text-xs ${rec ? 'text-white/60' : 'text-slate'}`}>for {plan.duration.toLowerCase()}</p>
          </>
        ) : (
          <>
            <p className="font-display text-[1.65rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[1.8rem]">
              Contact gym <span className={rec ? 'text-blue-300' : 'text-blue-500'}>for pricing</span>
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${rec ? 'text-white/60' : 'text-slate'}`}>
              Current price and inclusions are confirmed directly by the {site.name} team.
            </p>
          </>
        )}
      </div>

      {perks.length > 0 ? (
        <ul className="mt-6 flex-1 space-y-3" aria-label={`${plan.name} plan inclusions`}>
          {perks.map((p) => (
            <li key={p} className={`flex gap-3 text-[15px] leading-snug ${rec ? 'text-white/85' : 'text-ink/85'}`}>
              <Check size={17} className={`mt-0.5 shrink-0 ${rec ? 'text-blue-300' : 'text-blue-500'}`} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`mt-6 flex flex-1 items-start gap-3 text-[15px] leading-snug ${rec ? 'text-white/70' : 'text-slate'}`}>
          <Phone size={16} className={`mt-0.5 shrink-0 ${rec ? 'text-blue-300' : 'text-blue-500'}`} aria-hidden="true" />
          Ask about what this plan includes when you {hasWhatsapp() ? 'message' : 'call'} the gym.
        </p>
      )}

      <ContactButton
        message={waMessages.membership(plan)}
        labels={{ whatsapp: 'Enquire on WhatsApp', call: 'Call for Pricing' }}
        variants={{ whatsapp: rec ? 'light' : 'whatsapp', call: rec ? 'light' : 'primary' }}
        className="mt-8 w-full"
      />
    </article>
  );
}
