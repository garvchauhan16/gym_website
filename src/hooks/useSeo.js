import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeFor } from '../config/seo.js';
import { site } from '../config/site.js';

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Keeps <title>, description, canonical and OG tags in sync on client-side navigation. */
export function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const r = routeFor(path);
    document.title = r.title;
    const url = site.url + (path === '/' ? '/' : path);
    setMeta('meta[name="description"]', 'content', r.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', r.title);
    setMeta('meta[property="og:description"]', 'content', r.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', r.title);
    setMeta('meta[name="twitter:description"]', 'content', r.description);
  }, [pathname]);
}
