import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  const noop = () => {};

  it('renders heading and booking button', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Interested in discussing/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book an Appointment' })).toBeInTheDocument();
  });

  it('renders all 4 social links with correct hrefs', () => {
    render(<ContactSection onBooking={noop} />);
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedin).toHaveAttribute('href', 'http://linkedin.com/in/dutta14');
    expect(linkedin).toHaveAttribute('target', '_blank');

    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('href', 'http://github.com/dutta14');

    const email = screen.getByRole('link', { name: 'Email' });
    expect(email).toHaveAttribute('href', 'mailto:hello@anindya.dev');

    const so = screen.getByRole('link', { name: 'Stack Overflow' });
    expect(so).toHaveAttribute('href', 'https://stackoverflow.com/users/3993371/anindya-dutta');
  });

  it('renders copyright', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText(/© 2026 Anindya Dutta/)).toBeInTheDocument();
  });
});
