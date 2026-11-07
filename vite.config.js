import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { site, filled } from './src/config/site.js';
import { routes } from './src/config/seo.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const waDigits = String(site.whatsappNumber).replace(/\D/g, '');

/** LocalBusiness JSON-LD built only from fields the owner has filled in. */
function localBusinessJsonLd() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/og-image.jpg`,
  };
  if (filled(site.phone)) ld.telephone = site.phone;
  if (filled(site.email)) ld.email = site.email;
  if (filled(site.instagramUrl)) ld.sameAs = [site.instagramUrl];
  const a = site.address;
  if (filled(a.street) || filled(a.city)) {
    ld.address = {
      '@type': 'PostalAddress',
      ...(filled(a.street) && { streetAddress: a.street }),
      ...(filled(a.city) && { addressLocality: a.city }),
      ...(filled(a.region) && { addressRegion: a.region }),
      ...(filled(a.postalCode) && { postalCode: a.postalCode }),
      ...(filled(a.country) && { addressCountry: a.country }),
    };
  }
  if (filled(site.geo.latitude) && filled(site.geo.longitude)) {
    ld.geo = {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }
  if (site.structuredHours.length) {
    ld.openingHoursSpecification = site.structuredHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (waDigits) ld.potentialAction = { '@type': 'ContactAction', target: `https://wa.me/${waDigits}` };
  return JSON.stringify(ld);
}

function headFor(route) {
  const url = site.url + (route.path === '/' ? '/' : route.path);
  const preload = route.path === '/' ? '\n    <link rel="preload" as="image" href="/images/atmosphere.jpg" fetchpriority="high" />' : '';
  return `${preload}
    <title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:title" content="${esc(route.title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(site.url)}/images/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(route.title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${esc(site.url)}/images/og-image.jpg" />
    <script type="application/ld+json">${localBusinessJsonLd()}</script>`;
}

/**
 * Generates, from src/config: per-page <head> tags, a static HTML entry for every
 * route (so /about/ etc. have correct titles for crawlers), sitemap.xml, robots.txt.
 */
function seoPlugin() {
  let outDir = 'dist';
  return {
    name: 'powerhouse-seo',
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--SEO_HEAD-->', headFor(routes[0])),
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const base = fs.readFileSync(indexPath, 'utf8');
      for (const route of routes.slice(1)) {
        const html = base.replace(/<!--SEO_START-->[\s\S]*<!--SEO_END-->/, `<!--SEO_START-->${headFor(route)}<!--SEO_END-->`);
        const dir = path.join(outDir, route.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);
      }
      const today = new Date().toISOString().slice(0, 10);
      const urls = routes
        .map(
          (r) =>
            `  <url><loc>${site.url}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`,
        )
        .join('\n');
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
    },
    // Make `vite preview` serve each route's own static HTML, like a real static host does.
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = (req.url ?? '').split('?')[0].replace(/\/$/, '');
        if (routes.some((r) => r.path !== '/' && r.path === url)) req.url = `${url}/index.html`;
        next();
      });
    },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.setHeader('Content-Type', 'application/xml');
        res.end(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
            .map((r) => `<url><loc>${site.url}${r.path}</loc></url>`)
            .join('\n')}\n</urlset>`,
        );
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: {
    chunkSizeWarningLimit: 700,
  },
});
