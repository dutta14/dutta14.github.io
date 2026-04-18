import { useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import Home from './pages/home/Home';
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
    <>
      <Navbar isDark={isDark} onToggleTheme={toggle} brandVisible={brandVisible} onBooking={openBooking} />
      <Home ref={heroRef} onBooking={openBooking} />
      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
};

export default App;
