import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  const noop = () => {};

  it('renders heading and subheading', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText("Let's Talk")).toBeInTheDocument();
    expect(screen.getByText(/currently open to speaking/)).toBeInTheDocument();
  });

  it('renders three contact channels', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText('Book a conversation')).toBeInTheDocument();
    expect(screen.getByText('Professional inquiries')).toBeInTheDocument();
    expect(screen.getByText('Read the blog')).toBeInTheDocument();
  });

  it('renders booking button that calls onBooking', () => {
    const onBooking = vi.fn();
    render(<ContactSection onBooking={onBooking} />);
    const bookBtn = screen.getByRole('button', { name: /Book 30 Minutes/ });
    bookBtn.click();
    expect(onBooking).toHaveBeenCalledOnce();
  });

  it('renders email link with mailto href', () => {
    render(<ContactSection onBooking={noop} />);
    const emailLink = screen.getByRole('link', { name: /hello@anindya\.dev/ });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@anindya.dev');
  });

  it('renders blog link', () => {
    render(<ContactSection onBooking={noop} />);
    const blogLink = screen.getByRole('link', { name: /Read essays/ });
    expect(blogLink).toHaveAttribute('href', 'https://anindya.dev/blog');
  });

  it('renders response time message', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText(/respond within 48 hours/)).toBeInTheDocument();
  });

  it('renders social links with https', () => {
    render(<ContactSection onBooking={noop} />);
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/dutta14');
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('href', 'https://github.com/dutta14');
    const rss = screen.getByRole('link', { name: 'RSS' });
    expect(rss).toHaveAttribute('href', 'https://anindya.dev/blog/feed.xml');
  });

  it('renders copyright', () => {
    render(<ContactSection onBooking={noop} />);
    expect(screen.getByText(/© 2026 Anindya Dutta/)).toBeInTheDocument();
  });
});
