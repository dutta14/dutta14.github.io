import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders name, title, bio, and image', () => {
    render(<Hero />);
    expect(screen.getByText('Anindya Dutta')).toBeInTheDocument();
    expect(screen.getByText('Engineering leader. AI product builder.')).toBeInTheDocument();
    expect(screen.getByText(/I build AI products that real people/)).toBeInTheDocument();
    expect(screen.getByAltText('Portrait of Anindya Dutta')).toBeInTheDocument();
  });

  it('renders hero stats', () => {
    render(<Hero />);
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('5M+')).toBeInTheDocument();
    expect(screen.getByText('Years in industry')).toBeInTheDocument();
    expect(screen.getByText('U.S. Patent')).toBeInTheDocument();
  });

  it('patent stat renders as a clickable link with correct href', () => {
    render(<Hero />);
    const patentLinks = screen.getAllByRole('link', { name: /U\.S\. Patent/ });
    expect(patentLinks.length).toBeGreaterThanOrEqual(1);
    expect(patentLinks[0]).toHaveAttribute(
      'href',
      'https://patents.google.com/patent/US20180188935A1'
    );
  });

  it('patent link opens in new tab', () => {
    render(<Hero />);
    const patentLinks = screen.getAllByRole('link', { name: /U\.S\. Patent/ });
    expect(patentLinks[0]).toHaveAttribute('target', '_blank');
  });

  it('other stats render as plain text, not links', () => {
    render(<Hero />);
    expect(screen.getByText('Years in industry')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Users shipped')).toBeInTheDocument();
  });
});
