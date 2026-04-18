import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  it('renders heading and booking link', () => {
    render(<ContactSection />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Interested in discussing/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Book an Appointment' });
    expect(link).toHaveAttribute('href', 'https://calendar.app.google/UeHBbGhSZYHaBGMC9');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders all 4 social links with correct hrefs', () => {
    render(<ContactSection />);
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
    render(<ContactSection />);
    expect(screen.getByText(/© 2026 Anindya Dutta/)).toBeInTheDocument();
  });
});
