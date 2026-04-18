import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useDarkMode from './useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('dark-mode');
  });

  it('defaults to light mode when localStorage is empty', () => {
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
    Storage.prototype.getItem = Storage.prototype.getItem;
  });
});
