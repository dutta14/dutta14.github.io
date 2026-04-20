import { useEffect } from 'react';

/**
 * Injects a JSON-LD script into the document head and removes it on unmount.
 * Accepts a single object or an array of objects.
 */
export default function useJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  useEffect(() => {
    const items = Array.isArray(data) ? data : [data];
    const scripts: HTMLScriptElement[] = [];

    for (const item of items) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      scripts.push(script);
    }

    return () => {
      for (const s of scripts) s.remove();
    };
  }, [JSON.stringify(data)]);
}
