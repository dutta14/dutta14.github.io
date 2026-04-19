import { useRef, useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Home from './pages/home/Home';
import CaseStudyPage from './pages/case-study/CaseStudyPage';
import SpeakingPage from './pages/speaking/SpeakingPage';
import useDarkMode from './hooks/useDarkMode';
import useScrollPastElement from './hooks/useScrollPastElement';
import type { BookingContext } from './components/BookingModal';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let attempts = 0;
      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 10) {
          attempts++;
          requestAnimationFrame(tryScroll);
        }
      };
      const timer = setTimeout(tryScroll, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

const App = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { isDark, toggle } = useDarkMode();
  const brandVisible = useScrollPastElement(heroRef);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<BookingContext>('conversation');
  const openBooking = useCallback((context: BookingContext = 'conversation') => {
    setBookingContext(context);
    setBookingOpen(true);
  }, []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <BrowserRouter>
      <ScrollToHash />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar isDark={isDark} onToggleTheme={toggle} brandVisible={brandVisible} onBooking={() => openBooking('conversation')} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home ref={heroRef} onBooking={openBooking} />} />
          <Route path="/speaking" element={<SpeakingPage onBooking={openBooking} />} />
          <Route path="/case-study/:slug" element={<CaseStudyPage />} />
          <Route path="/case-study" element={<Navigate to="/#products" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BookingModal open={bookingOpen} onClose={closeBooking} context={bookingContext} />
    </BrowserRouter>
  );
};

export default App;
