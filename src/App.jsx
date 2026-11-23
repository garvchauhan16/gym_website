import { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import { useSeo } from './hooks/useSeo.js';
import { isOn } from './config/site.js';
import Home from './pages/Home.jsx';

/*
 * Home ships in the main bundle (most visitors land there). Every other page is
 * split into its own chunk, loaded on first visit and prefetched once the
 * browser is idle, so navigation still feels instant.
 */
const pageImports = {
  About: () => import('./pages/About.jsx'),
  Memberships: () => import('./pages/Memberships.jsx'),
  FreeTrial: () => import('./pages/FreeTrial.jsx'),
  Events: () => import('./pages/Events.jsx'),
  GymRules: () => import('./pages/GymRules.jsx'),
  GalleryPage: () => import('./pages/GalleryPage.jsx'),
  NotFound: () => import('./pages/NotFound.jsx'),
};
const About = lazy(pageImports.About);
const Memberships = lazy(pageImports.Memberships);
const FreeTrial = lazy(pageImports.FreeTrial);
const Events = lazy(pageImports.Events);
const GymRules = lazy(pageImports.GymRules);
const GalleryPage = lazy(pageImports.GalleryPage);
const NotFound = lazy(pageImports.NotFound);

/**
 * Prefetch the other pages only after this one has fully loaded (plus a short
 * pause), so the extra downloads never compete with the page being viewed.
 */
function usePrefetchPages() {
  useEffect(() => {
    let timer;
    const prefetch = () => {
      timer = setTimeout(() => Object.values(pageImports).forEach((load) => load().catch(() => {})), 1500);
    };
    if (document.readyState === 'complete') prefetch();
    else window.addEventListener('load', prefetch, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', prefetch);
    };
  }, []);
}

/**
 * Shown for the instant a lazy page is loading. Every inner page opens with a
 * navy PageHero, so a navy block (marked dark for the navbar) avoids any flash.
 */
function PageFallback() {
  return <div data-nav-theme="dark" className="min-h-[100svh] bg-navy-900" aria-busy="true" />;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    const samePage = prev.current === pathname;
    prev.current = pathname;
    if (hash) {
      // The target may live in a lazy page that hasn't rendered yet — wait for it (≤ 3s).
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let t;
      const attempt = () => {
        const el = document.getElementById(id);
        // glide when already on the page; jump straight there after a page change
        if (el) el.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant', block: 'start' });
        else if (++tries < 60) t = setTimeout(attempt, 50);
      };
      if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      t = setTimeout(attempt, 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useSeo();
  usePrefetchPages();
  const { pathname } = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-blue-500 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar />
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/free-trial" element={<FreeTrial />} />
          {/* Pages for switched-off sections redirect home (see site.sections) */}
          <Route path="/events" element={isOn('events') ? <Events /> : <Navigate to="/" replace />} />
          <Route path="/gym-rules" element={isOn('gymRules') ? <GymRules /> : <Navigate to="/" replace />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.main>
      <Footer />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
