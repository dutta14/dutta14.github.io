import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import useDarkMode from './useDarkMode';

type ChangeListener = (e: MediaQueryListEvent) => void;

function createMockMatchMedia(initialMatches: boolean) {
  const listeners: ChangeListener[] = [];
  let currentMatches = initialMatches;

  const mql = {
    get matches() { return currentMatches; },
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((_event: string, cb: unknown) => {
      listeners.push(cb as ChangeListener);
    }),
    removeEventListener: vi.fn((_event: string, cb: unknown) => {
      const idx = listeners.indexOf(cb as ChangeListener);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  const fireChange = (newMatches: boolean) => {
    currentMatches = newMatches;
    for (const cb of [...listeners]) {
      cb({ matches: newMatches } as MediaQueryListEvent);
    }
  };

  return { mql, fireChange, listeners };
}

describe('useDarkMode', () => {
  let mockMM: ReturnType<typeof createMockMatchMedia>;
  const originalGetItem = Storage.prototype.getItem;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-mode');
    // Default: system prefers light
    mockMM = createMockMatchMedia(false);
    vi.stubGlobal('matchMedia', () => mockMM.mql);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Storage.prototype.getItem = originalGetItem;
  });

  // --- Existing behavior (localStorage-based) ---

  it('defaults to light mode when localStorage is empty and system prefers light', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('initializes from localStorage when darkMode is true', () => {
    localStorage.setItem('darkMode', 'true');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  it('initializes from localStorage when darkMode is false', () => {
    localStorage.setItem('darkMode', 'false');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('toggles dark mode on and off', () => {
    const { result } = renderHook(() => useDarkMode());

    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');

    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });

  it('handles corrupt localStorage gracefully', () => {
    Storage.prototype.getItem = () => { throw new Error('quota'); };
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
  });

  // --- System preference detection ---

  it('uses system dark preference on first visit when no localStorage key exists', () => {
    mockMM = createMockMatchMedia(true);
    vi.stubGlobal('matchMedia', () => mockMM.mql);

    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  it('does not write to localStorage when following system preference', () => {
    mockMM = createMockMatchMedia(true);
    vi.stubGlobal('matchMedia', () => mockMM.mql);

    renderHook(() => useDarkMode());
    expect(localStorage.getItem('darkMode')).toBeNull();
  });

  it('localStorage explicit false overrides system dark preference', () => {
    mockMM = createMockMatchMedia(true);
    vi.stubGlobal('matchMedia', () => mockMM.mql);
    localStorage.setItem('darkMode', 'false');

    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  // --- Live system preference tracking ---

  it('tracks live system preference changes when no explicit user choice', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(false);

    act(() => mockMM.fireChange(true));
    expect(result.current.isDark).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);

    act(() => mockMM.fireChange(false));
    expect(result.current.isDark).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
  });

  it('stops tracking system changes after manual toggle', () => {
    const { result } = renderHook(() => useDarkMode());

    // User explicitly toggles
    act(() => result.current.toggle());
    expect(result.current.isDark).toBe(true);

    // System changes should be ignored
    act(() => mockMM.fireChange(false));
    expect(result.current.isDark).toBe(true);
  });

  it('ignores system changes when localStorage preference exists from start', () => {
    mockMM = createMockMatchMedia(true);
    vi.stubGlobal('matchMedia', () => mockMM.mql);
    localStorage.setItem('darkMode', 'true');

    const { result } = renderHook(() => useDarkMode());
    expect(result.current.isDark).toBe(true);

    act(() => mockMM.fireChange(false));
    expect(result.current.isDark).toBe(true);
  });

  // --- Cleanup ---

  it('removes the matchMedia listener on unmount', () => {
    const { unmount } = renderHook(() => useDarkMode());
    expect(mockMM.mql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();
    expect(mockMM.mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(mockMM.listeners).toHaveLength(0);
  });
});
