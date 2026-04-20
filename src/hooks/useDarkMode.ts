import { useState, useEffect, useCallback, useRef } from 'react';

const MEDIA_QUERY = '(prefers-color-scheme: dark)';

const useDarkMode = () => {
  // Track whether user has an explicit localStorage preference
  const hasExplicitPref = useRef(false);

  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) {
        hasExplicitPref.current = true;
        return stored === 'true';
      }
    } catch {
      // localStorage unavailable
    }
    // No explicit preference — fall back to system preference
    return window.matchMedia(MEDIA_QUERY).matches;
  });

  // Sync body class and persist to localStorage only when user has explicit pref
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);

    if (hasExplicitPref.current) {
      try {
        localStorage.setItem('darkMode', String(isDark));
      } catch {
        // localStorage unavailable
      }
    }
  }, [isDark]);

  // Listen for system preference changes when no explicit user choice
  useEffect(() => {
    const mql = window.matchMedia(MEDIA_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      if (!hasExplicitPref.current) {
        setIsDark(e.matches);
      }
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const toggle = useCallback(() => {
    hasExplicitPref.current = true;
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
};

export default useDarkMode;
