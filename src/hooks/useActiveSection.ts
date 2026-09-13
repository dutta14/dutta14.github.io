import { useState, useEffect } from 'react';

const ACTIVE_OFFSET = 80;
const BOTTOM_THRESHOLD = 2;

const useActiveSection = (ids: string[], enabled = true): string => {
  const [activeId, setActiveId] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    if (!enabled) {
      setActiveId('');
      return undefined;
    }

    const sectionIds = key ? key.split(',') : [];
    let frame = 0;

    const measure = () => {
      frame = 0;
      const present = sectionIds.filter((id) => document.getElementById(id));
      if (!present.length) {
        setActiveId('');
        return;
      }

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - BOTTOM_THRESHOLD;

      let current = present[0];
      if (atBottom) {
        current = present[present.length - 1];
      } else {
        present.forEach((id) => {
          const top = document.getElementById(id)!.getBoundingClientRect().top;
          if (top - ACTIVE_OFFSET <= 0) current = id;
        });
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key, enabled]);

  return activeId;
};

export default useActiveSection;
