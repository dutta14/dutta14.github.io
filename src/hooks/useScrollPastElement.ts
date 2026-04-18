import { useState, useEffect, RefObject } from 'react';

const useScrollPastElement = (ref: RefObject<HTMLElement | null>): boolean => {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPast(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
      },
      { threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return isPast;
};

export default useScrollPastElement;
