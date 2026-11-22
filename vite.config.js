import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { site, filled } from './src/config/site.js';
import { routes } from './src/config/seo.js';
import { imageVariants } from './src/config/images.generated.js';

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
  if (filled(site.phone)) ld.telephone = site.phoneIntl || site.phone;
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
  if (filled(site.mapDirectionsUrl)) ld.hasMap = site.mapDirectionsUrl;
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

/** Preload the home hero: the AVIF set when optimised variants exist, else the JPEG. */
function heroPreload() {
  const widths = imageVariants['/images/hero.jpg'];
  if (!widths?.length) return '\n    <link rel="preload" as="image" href="/images/hero.jpg" fetchpriority="high" />';
  const set = widths.map((w) => `/images/opt/hero-${w}.avif ${w}w`).join(', ');
  return `\n    <link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="100vw" fetchpriority="high" />`;
}

function headFor(route) {
  const url = site.url + (route.path === '/' ? '/' : route.path);
  const preload = route.path === '/' ? heroPreload() : '';
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
/** Route path → page component file in src/pages (for chunk preloading). */
const routePage = {
  '/about': 'About',
  '/memberships': 'Memberships',
  '/free-trial': 'FreeTrial',
  '/events': 'Events',
  '/gym-rules': 'GymRules',
  '/gallery': 'GalleryPage',
};

function seoPlugin() {
  let outDir = 'dist';
  let pageChunks = {};
  return {
    name: 'site-seo',
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('<!--SEO_HEAD-->', headFor(routes[0])).replaceAll('<!--SITE_NAME-->', esc(site.name)),
    },
    // Record which output chunk holds each lazily-loaded page (src/pages/*.jsx).
    generateBundle(_options, bundle) {
      pageChunks = {};
      for (const chunk of Object.values(bundle)) {
        const m = chunk.type === 'chunk' && chunk.facadeModuleId?.match(/src[\\/]pages[\\/](\w+)\.jsx$/);
        if (m) pageChunks[m[1]] = [chunk.fileName, ...chunk.imports];
      }
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const base = fs.readFileSync(indexPath, 'utf8');

      /**
       * Pages are code-split, so a direct visit to e.g. /memberships would otherwise
       * download the main bundle, *then* discover the page chunk. Preloading the page's
       * chunk (and its imports) in its static HTML fetches them in parallel.
       */
      const preloadFor = (page) =>
        (pageChunks[page] ?? [])
          .filter((file) => !base.includes(`/${file}`))
          .map((file) => `\n    <link rel="modulepreload" crossorigin href="/${file}" />`)
          .join('');
      const withHead = (route, extra = '') =>
        base.replace(/<!--SEO_START-->[\s\S]*<!--SEO_END-->/, `<!--SEO_START-->${headFor(route)}${extra}<!--SEO_END-->`);

      for (const route of routes.slice(1)) {
        const dir = path.join(outDir, route.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), withHead(route, preloadFor(routePage[route.path])));
      }
      // /contact is a client-side redirect to /about#contact — give it a real file so
      // direct visits work on any static host (kept out of the sitemap; canonical → /about).
      const about = routes.find((r) => r.path === '/about');
      fs.mkdirSync(path.join(outDir, 'contact'), { recursive: true });
      fs.writeFileSync(path.join(outDir, 'contact', 'index.html'), withHead(about, preloadFor('About')));
      // 404.html: static hosts (Netlify, GitHub Pages, Cloudflare Pages…) serve this for unknown
      // URLs; the app then renders its own branded "Page not found" page. Not indexed.
      fs.writeFileSync(
        path.join(outDir, '404.html'),
        withHead(
          { path: '/404', title: `Page not found | ${site.name}`, description: site.description },
          '\n    <meta name="robots" content="noindex" />' + preloadFor('NotFound'),
        ).replace(/\s*<link rel="canonical"[^>]*>/, ''), // a not-found page has no canonical URL
      );

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
        if (url === '/contact' || routes.some((r) => r.path !== '/' && r.path === url)) req.url = `${url}/index.html`;
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
});
