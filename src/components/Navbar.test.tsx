import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all nav links', () => {
    render(<Navbar isDark={false} onToggleTheme={() => {}} brandVisible={false} onBooking={() => {}} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows brand when brandVisible is true', () => {
    const { container } = render(
      <Navbar isDark={false} onToggleTheme={() => {}} brandVisible={true} onBooking={() => {}} />
    );
    const brand = container.querySelector('.navbar-brand');
    expect(brand?.classList.contains('show')).toBe(true);
  });

  it('hides brand when brandVisible is false', () => {
    const { container } = render(
      <Navbar isDark={false} onToggleTheme={() => {}} brandVisible={false} onBooking={() => {}} />
    );
    const brand = container.querySelector('.navbar-brand');
    expect(brand?.classList.contains('show')).toBe(false);
  });

  it('calls onToggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    let called = false;
    render(
      <Navbar isDark={false} onToggleTheme={() => { called = true; }} brandVisible={false} onBooking={() => {}} />
    );
    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }));
    expect(called).toBe(true);
  });

  it('shows sun icon in dark mode and moon icon in light mode', () => {
    const { rerender } = render(
      <Navbar isDark={true} onToggleTheme={() => {}} brandVisible={false} onBooking={() => {}} />
    );
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();

    rerender(<Navbar isDark={false} onToggleTheme={() => {}} brandVisible={false} onBooking={() => {}} />);
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });
});
