import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import useScrollEdges from './useScrollEdges';

const setPageMetrics = (scrollY: number, innerHeight: number, scrollHeight: number) => {
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

describe('useScrollEdges', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) =>
      setTimeout(() => cb(0), 0) as unknown as number
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('reports atTop true and atBottom false on a long page at scroll position zero', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    expect(result.current).toEqual({ atTop: true, atBottom: false });
  });

  it('reports atTop false once the page is scrolled past the edge threshold', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    setPageMetrics(200, 800, 3000);
    scroll();
    expect(result.current.atTop).toBe(false);
  });

  it('keeps atTop true within the 8px threshold to avoid flicker at rest', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    setPageMetrics(8, 800, 3000);
    scroll();
    expect(result.current.atTop).toBe(true);
  });

  it('reports atBottom true when the viewport reaches the end of the document', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    setPageMetrics(2200, 800, 3000);
    scroll();
    expect(result.current.atBottom).toBe(true);
  });

  it('reports atBottom false while content remains below the viewport', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    setPageMetrics(1000, 800, 3000);
    scroll();
    expect(result.current.atBottom).toBe(false);
  });

  it('reports both edges true when the document is shorter than the viewport', () => {
    setPageMetrics(0, 800, 600);
    const { result } = renderHook(() => useScrollEdges());
    expect(result.current).toEqual({ atTop: true, atBottom: true });
  });

  it('recomputes edges when the window is resized', () => {
    setPageMetrics(0, 800, 3000);
    const { result } = renderHook(() => useScrollEdges());
    expect(result.current.atBottom).toBe(false);
    setPageMetrics(0, 3000, 3000);
    act(() => {
      window.dispatchEvent(new Event('resize'));
      vi.advanceTimersByTime(16);
    });
    expect(result.current.atBottom).toBe(true);
  });

  it('removes its scroll and resize listeners on unmount', () => {
    setPageMetrics(0, 800, 3000);
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollEdges());
    unmount();
    const removed = removeSpy.mock.calls.map(([event]) => event);
    expect(removed).toContain('scroll');
    expect(removed).toContain('resize');
  });
});
