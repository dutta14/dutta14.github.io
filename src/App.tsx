import { useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import useDarkMode from './hooks/useDarkMode';
import useScrollPastElement from './hooks/useScrollPastElement';

const App = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { isDark, toggle } = useDarkMode();
  const brandVisible = useScrollPastElement(heroRef);

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggle} brandVisible={brandVisible} />
      <Home ref={heroRef} />
    </>
  );
};

export default App;
