import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CtaSection from './CtaSection';

describe('CtaSection', () => {
  it('renders heading, description, and booking link', () => {
    render(<CtaSection />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByText(/Interested in discussing/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Book an Appointment' });
    expect(link).toHaveAttribute('href', 'https://calendar.app.google/UeHBbGhSZYHaBGMC9');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
