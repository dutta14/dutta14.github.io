import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Navbar from './Navbar';

const defaultProps = {
  isDark: false,
  onToggleTheme: () => {},
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
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Writing')).toBeInTheDocument();
    expect(screen.getByText('Speaking')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('always shows the brand name, reachable by keyboard and assistive tech', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    const brand = container.querySelector('.navbar-brand');
    expect(brand).toHaveTextContent('Anindya Dutta');
    expect(brand).not.toHaveAttribute('aria-hidden');
    expect(brand).not.toHaveAttribute('tabindex');
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
    expect(screen.getByRole('button', { name: /open navigation/i })).toBeInTheDocument();
  });

  it('mobile menu is collapsed by default', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    const collapse = container.querySelector('.navbar-collapse');
    expect(collapse?.classList.contains('show')).toBe(false);
  });

  it('clicking hamburger opens the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /open navigation/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(true);
  });

  it('clicking hamburger twice closes the menu again', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /open navigation/i }));
    await user.click(screen.getByRole('button', { name: /close navigation/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(false);
  });

  it('clicking a nav link closes the mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    await user.click(screen.getByRole('button', { name: /open navigation/i }));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(true);
    await user.click(screen.getByText('Experience'));
    expect(container.querySelector('.navbar-collapse')?.classList.contains('show')).toBe(false);
  });

  it('clicking Book 30 Minutes closes the mobile menu and calls onBooking', async () => {
    const user = userEvent.setup();
    let bookingCalled = false;
    renderWithRouter(
      <Navbar {...defaultProps} onBooking={() => { bookingCalled = true; }} />
    );
    await user.click(screen.getByRole('button', { name: /open navigation/i }));
    const bookButtons = screen.getAllByRole('button', { name: /book 30 minutes/i });
    // Click the inner sidebar button (first one found inside the open menu)
    await user.click(bookButtons[0]);
    expect(bookingCalled).toBe(true);
  });

  it('hamburger aria-expanded reflects open state', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Navbar {...defaultProps} />);
    const toggle = screen.getByRole('button', { name: /open navigation/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    const closeBtn = screen.getByRole('button', { name: /close navigation/i });
    expect(closeBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('brand is a Link to /', () => {
    const { container } = renderWithRouter(<Navbar {...defaultProps} />);
    const brand = container.querySelector('.navbar-brand');
    expect(brand?.tagName).toBe('A');
    expect(brand?.getAttribute('href')).toBe('/');
  });

  it('exposes a labelled navigation landmark', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
  });

  describe('active section highlighting', () => {
    const mountSections = (ids: string[], tops: Record<string, number>) => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        value: 5400,
        configurable: true,
      });
      ids.forEach((id) => {
        const el = document.createElement('section');
        el.id = id;
        el.getBoundingClientRect = () => ({ top: tops[id], bottom: tops[id] + 500 }) as DOMRect;
        document.body.appendChild(el);
      });
    };

    const sectionIds = ['home', 'products', 'experience', 'writing', 'skills', 'contact'];

    afterEach(() => {
      document.querySelectorAll('section').forEach((el) => el.remove());
    });

    it('marks About as active when the page is scrolled to the top', () => {
      mountSections(sectionIds, { home: 0, products: 900, experience: 1800, writing: 2700, skills: 3600, contact: 4500 });
      renderWithRouter(<Navbar {...defaultProps} />);
      expect(screen.getByText('About')).toHaveClass('active');
      expect(screen.getByText('Work')).not.toHaveClass('active');
    });

    it('marks Work as active when the products section is under the navbar', () => {
      mountSections(sectionIds, { home: -900, products: 0, experience: 900, writing: 1800, skills: 2700, contact: 3600 });
      renderWithRouter(<Navbar {...defaultProps} />);
      expect(screen.getByText('Work')).toHaveClass('active');
      expect(screen.getByText('About')).not.toHaveClass('active');
    });

    it('marks exactly one nav link active at a time', () => {
      mountSections(sectionIds, { home: -1800, products: -900, experience: 0, writing: 900, skills: 1800, contact: 2700 });
      const { container } = renderWithRouter(<Navbar {...defaultProps} />);
      expect(container.querySelectorAll('.nav-link.active')).toHaveLength(1);
      expect(screen.getByText('Experience')).toHaveClass('active');
    });

    it('exposes the active section link to assistive technology with aria-current', () => {
      mountSections(sectionIds, { home: -900, products: 0, experience: 900, writing: 1800, skills: 2700, contact: 3600 });
      renderWithRouter(<Navbar {...defaultProps} />);
      expect(screen.getByText('Work')).toHaveAttribute('aria-current', 'location');
      expect(screen.getByText('About')).not.toHaveAttribute('aria-current');
    });

    it('marks Speaking as the current page when on the speaking route', () => {
      render(
        <MemoryRouter initialEntries={['/speaking']}><Navbar {...defaultProps} /></MemoryRouter>
      );
      expect(screen.getByText('Speaking')).toHaveClass('active');
      expect(screen.getByText('Speaking')).toHaveAttribute('aria-current', 'page');
    });

    it('marks no section link active when off the home route', () => {
      mountSections(sectionIds, { home: 0, products: 900, experience: 1800, writing: 2700, skills: 3600, contact: 4500 });
      const { container } = render(
        <MemoryRouter initialEntries={['/case-study/m365-copilot']}><Navbar {...defaultProps} /></MemoryRouter>
      );
      expect(container.querySelectorAll('.nav-link.active')).toHaveLength(0);
    });
  });
});
