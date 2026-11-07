import { Check } from 'lucide-react';
import { site, isPlaceholderPrice } from '../config/site.js';
import { Button, SampleTag } from './ui.jsx';
import { WhatsAppIcon } from './icons.jsx';
import { whatsappUrl, waMessages } from '../utils/whatsapp.js';

export default function PricingCard({ plan }) {
  const placeholder = isPlaceholderPrice(plan.price);
  const rec = plan.recommended;
  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${
        rec
          ? 'border-forest bg-forest text-white shadow-[0_35px_70px_-35px_rgba(29,34,30,0.8)]'
          : 'border-line bg-white text-charcoal hover:border-olive/40 hover:shadow-[0_30px_60px_-38px_rgba(35,38,42,0.4)]'
      }`}
    >
      {rec && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-light px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-forest">
          Recommended
        </span>
      )}
      <header>
        <h3 className={`text-3xl ${rec ? 'text-white' : 'text-charcoal'}`}>{plan.name}</h3>
        <p className={`mt-1 text-sm uppercase tracking-[0.16em] ${rec ? 'text-gold-light' : 'text-gold'}`}>{plan.duration}</p>
      </header>

      <div className={`mt-6 border-y py-6 ${rec ? 'border-white/15' : 'border-line'}`}>
        <p className="flex items-baseline gap-1.5 font-display text-5xl">
          <span className={`text-2xl ${rec ? 'text-gold-light' : 'text-gold'}`}>{site.currency}</span>
          <span className={placeholder ? 'opacity-40' : ''}>{plan.price}</span>
        </p>
        <p className={`mt-2 flex flex-wrap items-center gap-2 text-xs ${rec ? 'text-white/65' : 'text-mist'}`}>
          {placeholder ? <>Price to be confirmed <SampleTag>Placeholder price</SampleTag></> : `for ${plan.duration.toLowerCase()}`}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3.5">
        {plan.perks.map((p) => (
          <li key={p} className={`flex gap-3 text-[15px] leading-snug ${rec ? 'text-white/85' : 'text-charcoal/85'}`}>
            <Check size={18} className={`mt-0.5 shrink-0 ${rec ? 'text-gold-light' : 'text-olive'}`} aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <Button
        href={whatsappUrl(waMessages.membership(plan))}
        external
        variant={rec ? 'light' : 'primary'}
        className="mt-8 w-full"
        aria-label={`Enquire about the ${plan.name} membership on WhatsApp`}
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" /> Enquire on WhatsApp
      </Button>
    </article>
  );
}
