import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders name, title, bio, and image', () => {
    render(<Hero />);
    expect(screen.getByText('Anindya Dutta')).toBeInTheDocument();
    expect(screen.getByText('Principal Software Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText(/I build AI products that real people/)).toBeInTheDocument();
    expect(screen.getByAltText('Anindya Dutta')).toBeInTheDocument();
  });

  it('renders hero stats', () => {
    render(<Hero />);
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByText('5M+')).toBeInTheDocument();
    expect(screen.getByText('Years in industry')).toBeInTheDocument();
    expect(screen.getByText('U.S. Patent')).toBeInTheDocument();
  });
});
