import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useJsonLd from './useJsonLd';

afterEach(() => {
  // Clean up any leftover script tags
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
});

describe('useJsonLd', () => {
  it('injects a script tag with type application/ld+json into document head', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Person', name: 'Test' };
    renderHook(() => useJsonLd(data));

    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThanOrEqual(1);
  });

  it('script content matches JSON.stringify of input', () => {
    const data = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Test Site' };
    renderHook(() => useJsonLd(data));

    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const lastScript = scripts[scripts.length - 1];
    expect(lastScript.textContent).toBe(JSON.stringify(data));
  });

  it('removes script tag on unmount', () => {
    const data = { '@context': 'https://schema.org', '@type': 'Person', name: 'Unmount Test' };
    const { unmount } = renderHook(() => useJsonLd(data));

    const beforeUnmount = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(beforeUnmount.length).toBeGreaterThanOrEqual(1);

    unmount();

    const afterUnmount = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(afterUnmount.length).toBe(0);
  });

  it('handles array of objects', () => {
    const data = [
      { '@context': 'https://schema.org', '@type': 'Person', name: 'Person A' },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Site B' },
    ];
    const { unmount } = renderHook(() => useJsonLd(data));

    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const contents = Array.from(scripts).map((s) => s.textContent);
    expect(contents).toContain(JSON.stringify(data[0]));
    expect(contents).toContain(JSON.stringify(data[1]));

    unmount();

    const afterUnmount = document.head.querySelectorAll('script[type="application/ld+json"]');
    expect(afterUnmount.length).toBe(0);
  });
});
