import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders name, title, bio, and image', () => {
    render(<Hero />);
    expect(screen.getByText('Anindya Dutta')).toBeInTheDocument();
    expect(screen.getByText('Principal Software Engineering Manager')).toBeInTheDocument();
    expect(screen.getByText(/Experienced engineering leader/)).toBeInTheDocument();
    expect(screen.getByAltText('Anindya Dutta')).toBeInTheDocument();
  });
});
