import { useState, useEffect, useCallback } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    try {
      localStorage.setItem('darkMode', String(isDark));
    } catch {
      // localStorage unavailable
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggle };
};

export default useDarkMode;
