import { useState, useEffect } from 'react';

export interface ScrollEdges {
  atTop: boolean;
  atBottom: boolean;
}

const EDGE_THRESHOLD = 8;

const useScrollEdges = (): ScrollEdges => {
  const [edges, setEdges] = useState<ScrollEdges>({ atTop: true, atBottom: true });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const remaining =
        document.documentElement.scrollHeight - window.innerHeight - scrolled;
      setEdges((prev) => {
        const atTop = scrolled <= EDGE_THRESHOLD;
        const atBottom = remaining <= EDGE_THRESHOLD;
        return prev.atTop === atTop && prev.atBottom === atBottom
          ? prev
          : { atTop, atBottom };
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const observer =
      typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null;
    observer?.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, []);

  return edges;
};

export default useScrollEdges;
