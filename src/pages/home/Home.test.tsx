import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import Home from './Home';

beforeAll(() => {
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver;
});

afterEach(() => {
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
});

const renderHome = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Home onBooking={vi.fn()} />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('Home page — JSON-LD structured data', () => {
  it('JSON-LD Person data is present in document head', () => {
    renderHome();
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const contents = Array.from(scripts).map((s) => s.textContent ?? '');
    const hasPerson = contents.some((c) => c.includes('"Person"') && c.includes('Anindya Dutta'));
    expect(hasPerson).toBe(true);
  });

  it('JSON-LD WebSite data is present in document head', () => {
    renderHome();
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const contents = Array.from(scripts).map((s) => s.textContent ?? '');
    const hasWebSite = contents.some((c) => c.includes('"WebSite"'));
    expect(hasWebSite).toBe(true);
  });
});

describe('Home page — Helmet meta', () => {
  it('renders the page heading name', () => {
    renderHome();
    expect(screen.getByText('Anindya Dutta')).toBeInTheDocument();
  });
});
