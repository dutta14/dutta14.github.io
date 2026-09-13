import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import useActiveSection from './useActiveSection';

const IDS = ['home', 'products', 'experience', 'contact'];

const mountSections = (ids: string[]) => {
  ids.forEach((id) => {
    const el = document.createElement('section');
    el.id = id;
    document.body.appendChild(el);
  });
};

const positionSections = (tops: Record<string, number>) => {
  Object.entries(tops).forEach(([id, top]) => {
    const el = document.getElementById(id)!;
    el.getBoundingClientRect = () => ({ top, bottom: top + 500 }) as DOMRect;
  });
};

const setScroll = (scrollY: number, innerHeight: number, scrollHeight: number) => {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: scrollHeight,
    configurable: true,
  });
};

const scroll = () => act(() => {
  window.dispatchEvent(new Event('scroll'));
  vi.advanceTimersByTime(16);
});

describe('useActiveSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) =>
      setTimeout(() => cb(0), 0) as unknown as number
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
    mountSections(IDS);
    setScroll(0, 800, 5000);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('activates the first section when the page is at the top', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('home');
  });

  it('activates the section whose top has passed under the navbar offset', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    positionSections({ home: -900, products: 0, experience: 900, contact: 1800 });
    scroll();
    expect(result.current).toBe('products');
  });

  it('keeps the previous section active while the next section is still below the offset', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    positionSections({ home: -819, products: 81, experience: 981, contact: 1881 });
    scroll();
    expect(result.current).toBe('home');
  });

  it('activates the deepest section when several have scrolled past the offset', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    positionSections({ home: -1800, products: -900, experience: 0, contact: 900 });
    scroll();
    expect(result.current).toBe('experience');
  });

  it('activates the last section at the bottom of the page even if it never reaches the offset', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    setScroll(4200, 800, 5000);
    positionSections({ home: -4200, products: -3300, experience: -2400, contact: 790 });
    scroll();
    expect(result.current).toBe('contact');
  });

  it('returns an empty string when disabled so no nav item is marked active', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS, false));
    expect(result.current).toBe('');
  });

  it('clears the active section when it becomes disabled after being enabled', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result, rerender } = renderHook(
      ({ enabled }) => useActiveSection(IDS, enabled),
      { initialProps: { enabled: true } }
    );
    expect(result.current).toBe('home');
    rerender({ enabled: false });
    expect(result.current).toBe('');
  });

  it('ignores ids that have no matching element in the document', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(['missing', ...IDS]));
    expect(result.current).toBe('home');
  });

  it('returns an empty string when none of the ids exist in the document', () => {
    const { result } = renderHook(() => useActiveSection(['nope', 'nada']));
    expect(result.current).toBe('');
  });

  it('recomputes the active section on resize', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('home');
    positionSections({ home: -900, products: 0, experience: 900, contact: 1800 });
    act(() => {
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(16);
    });
    expect(result.current).toBe('products');
  });

  it('removes its scroll and resize listeners on unmount', () => {
    positionSections({ home: 0, products: 900, experience: 1800, contact: 2700 });
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useActiveSection(IDS));
    unmount();
    const removed = removeSpy.mock.calls.map(([event]) => event);
    expect(removed).toContain('scroll');
    expect(removed).toContain('resize');
  });
});
