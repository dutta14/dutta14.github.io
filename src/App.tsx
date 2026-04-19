import { useRef, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Home from './pages/home/Home';
import CaseStudyPage from './pages/case-study/CaseStudyPage';
import useDarkMode from './hooks/useDarkMode';
import useScrollPastElement from './hooks/useScrollPastElement';

const App = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { isDark, toggle } = useDarkMode();
  const brandVisible = useScrollPastElement(heroRef);
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <BrowserRouter>
      <Navbar isDark={isDark} onToggleTheme={toggle} brandVisible={brandVisible} onBooking={openBooking} />
      <Routes>
        <Route path="/" element={<Home ref={heroRef} onBooking={openBooking} />} />
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
        <Route path="/case-study" element={<Navigate to="/#products" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </BrowserRouter>
  );
};

export default App;
