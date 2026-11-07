import { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import { useSeo } from './hooks/useSeo.js';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Memberships from './pages/Memberships.jsx';
import FreeTrial from './pages/FreeTrial.jsx';
import Events from './pages/Events.jsx';
import GymRules from './pages/GymRules.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    const samePage = prev.current === pathname;
    prev.current = pathname;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        // glide when already on the page; jump straight there after a page change
        const t = setTimeout(() => el.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant', block: 'start' }), 60);
        return () => clearTimeout(t);
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useSeo();
  const { pathname } = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-olive px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/free-trial" element={<FreeTrial />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gym-rules" element={<GymRules />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Navigate to="/about#contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
