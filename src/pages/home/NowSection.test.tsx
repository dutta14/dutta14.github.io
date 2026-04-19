import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NowSection from './NowSection';
import { nowData } from '../../data/portfolioData';

describe('NowSection', () => {
  it('renders the "Now" heading', () => {
    render(<NowSection />);
    expect(screen.getByRole('heading', { name: 'Now', level: 2 })).toBeInTheDocument();
  });

  it('renders current work title and description', () => {
    render(<NowSection />);
    expect(screen.getByText('Currently building')).toBeInTheDocument();
    expect(screen.getByText(nowData.work)).toBeInTheDocument();
  });

  it('renders currently reading book title and author', () => {
    render(<NowSection />);
    expect(screen.getByText('Currently reading')).toBeInTheDocument();
    expect(screen.getByText(nowData.reading.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`by ${nowData.reading.author}`))).toBeInTheDocument();
  });

  it('renders Goodreads link', () => {
    render(<NowSection />);
    const goodreadsLink = screen.getByRole('link', { name: /See all on Goodreads/ });
    expect(goodreadsLink).toHaveAttribute('href', nowData.reading.profileUrl);
    expect(goodreadsLink).toHaveAttribute('target', '_blank');
  });
});
