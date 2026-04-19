import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Navbar from './Navbar';

const defaultProps = {
  isDark: false,
  onToggleTheme: () => {},
  brandVisible: false,
  onBooking: () => {},
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all nav links', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Writing')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows brand when brandVisible is true', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} brandVisible={true} />);
    expect(container.querySelector('.navbar-brand')?.classList.contains('show')).toBe(true);
  });

  it('hides brand when brandVisible is false', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} brandVisible={false} />);
    expect(container.querySelector('.navbar-brand')?.classList.contains('show')).toBe(false);
  });

  it('calls onToggleTheme when theme button is clicked', async () => {
    const user = userEvent.setup();
    let called = false;
    renderWithRouter(<Navbar {...defaultProps} onToggleTheme={() => { called = true; }} />);
    await user.click(screen.getByRole('button', { name: /switch to dark mode/i }));
    expect(called).toBe(true);
  });

  it('shows sun icon in dark mode and moon icon in light mode', () => {
    const { rerender } = render(
      <MemoryRouter><Navbar {...defaultProps} isDark={true} /></MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    rerender(
      <MemoryRouter><Navbar {...defaultProps} isDark={false} /></MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it('renders a hamburger toggle button', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
  });

  it('mobile menu is collapsed by default', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    const collapse = container.querySelector('.navbar-collapse');
    expect(collapse?.classList.contains('show')).toBe(false);
  });

  it('clicking hamburger opens the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(true);
  });

  it('clicking hamburger twice closes the menu again', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /toggle navigation/i });
    await user.click(toggle);
    await user.click(toggle);
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(false);
  });

  it('clicking a nav link closes the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(true);
    await user.click(screen.getByText('Experience'));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(false);
  });

  it('clicking Book 30 Minutes closes the mobile menu and calls onBooking', async () => {
    const user = userEvent.setup();
    let bookingCalled = false;
    const { container } = renderWithRouter(
      <Navbar {...defaultProps} onBooking={() => { bookingCalled = true; }} />
    );
    await user.click(screen.getByRole('button', { name: /toggle navigation/i }));
    await user.click(screen.getByRole('button', { name: /book 30 minutes/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(false);
    expect(bookingCalled).toBe(true);
  });

  it('hamburger aria-expanded reflects open state', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('brand is a Link to /', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} brandVisible={true} />);
    const brand = container.querySelector('.navbar-brand');
    expect(brand?.tagName).toBe('A');
    expect(brand?.getAttribute('href')).toBe('/');
  });
});
