# Victory Fitness Gym — Content Checklist

This website is a **sales demo**. Only the details under "Verified" are confirmed.
Everything else is either hidden, shown as a clearly-labelled placeholder, or uses
illustrative stock photography tagged as such. Nothing has been invented.

After any change, rebuild with `npm run build`.

---

## Verified (in `src/config/site.js`)

- [x] Name — Victory Fitness Gym
- [x] Phone — 080548 88811 (`phone`, `phoneIntl`)
- [x] Address — 2nd Floor, SS Plaza, Near Riverdale Apartments, Highland Marg, Nabha Road, Bhabat, Zirakpur, Punjab 140603, India
- [x] Coordinates + Google Maps link
- [x] Hours — Monday–Saturday 6 AM–10 PM, Sunday closed
- [x] Logo — taken from the signboard photo (`public/images/brand/`)
- [x] Building photo — `public/images/victory-fitness-building.jpg` (tagged "Actual photo")

## To collect from the owner

### Contact & website
- [ ] **WhatsApp number** — WhatsApp buttons are shown but not linked to a number yet (visitors pick the
      recipient). Once confirmed, set `whatsappNumber: '918054888811'` (or the right number): buttons then
      open a chat with the gym, and the forms send via WhatsApp.
      _(The signboard also shows **75270 43733** — ask whether that is a second number.)_
- [ ] **Email** — `email`
- [ ] **Instagram / social links** — `instagramUrl`
- [ ] **Website domain** — `url` (currently `https://your-domain.com`; used for SEO + sitemap)
- [ ] **Form delivery** — where trial/enquiry requests should go. Until `formEndpoint` (or a confirmed
      WhatsApp number) is set, both forms run in demo mode and say nothing was sent.

### Offer & memberships
- [ ] **Trial** — is a trial session offered, and is it free? (`freeTrial`; currently neutral "Book a Trial Session")
- [ ] **Plans** — real plan names and lengths (current Monthly/Quarterly/Half-Yearly/Annual are layout only), then set `plansConfirmed: true`
- [ ] **Prices** — per plan (`price: '1500'` etc.); cards say "Contact gym for pricing" until then
- [ ] **Inclusions** — what each plan includes (`perks`)
- [ ] **Joining fee / offers** — if any
- [ ] **Recommended plan** — only if the gym wants one highlighted

### People
- [ ] **Trainers** — name, role, specialty, experience, certifications, photo, short intro — each approved by the trainer (`trainers` in `content.js`)
- [ ] **Owner** — name, photo, short bio, message (`owner`), then `sections.owner: true`

### Facilities & activities
- [ ] **Facilities & equipment** — which training areas/equipment actually exist (`facilities`); the Home section currently says "Ask about our training areas"
- [ ] **Programmes / classes / coaching** — and any class schedule (`programs`), then `sections.programs: true`
- [ ] **Events / competitions** — real dates and details (`events`), then `sections.events: true`
- [ ] **Gym rules** — confirm or replace the sample template (`ruleCategories`, then `rulesPlaceholder = false`), or switch off `sections.gymRules`

### Proof
- [ ] **Member reviews** — genuine quotes with permission (`testimonials`), then `sections.testimonials: true`
- [ ] **Statistics / achievements** — only true figures (`stats`)

### Words & photos
- [ ] **Brand copy** — tagline, hero intro, home intro, About philosophy/pillars/atmosphere (tagged "Sample copy") — rewrite in the owner's voice
- [ ] **Interior photos** — gym floor, equipment, changing areas (landscape, ~1600–2000px wide); replace stock images and remove their "Illustrative" tags (`actual: true` in `gallery`)
- [ ] **Higher-resolution logo** — original artwork file if available (the current logo is cut from a 765px photo)
- [ ] **Social sharing image** — `og-image.jpg`, 1200×630
- [ ] Run `bash scripts/optimize-images.sh` after adding photos

## Before launch

- [ ] Everything above collected and entered
- [ ] `showPlaceholderNotices: false`
- [ ] `npm run build` and check every page on a phone
- [ ] Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages…)
