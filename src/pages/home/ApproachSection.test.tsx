import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ApproachSection from './ApproachSection';
import { principles } from '../../data/portfolioData';

describe('ApproachSection', () => {
  it('renders the section heading and subheading', () => {
    render(<ApproachSection />);
    expect(screen.getByRole('heading', { level: 2, name: 'How I Work' })).toBeInTheDocument();
    expect(screen.getByText(/Four things I believe about this job/)).toBeInTheDocument();
  });

  it('renders every principle as a list item with its belief and detail', () => {
    render(<ApproachSection />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(principles.length);
    principles.forEach((principle, i) => {
      expect(within(items[i]).getByRole('heading', { level: 3 })).toHaveTextContent(principle.belief);
      expect(within(items[i]).getByText(principle.detail)).toBeInTheDocument();
    });
  });

  it('links each principle to the blog post it came from', () => {
    render(<ApproachSection />);
    principles.forEach((principle) => {
      const link = screen.getByRole('link', { name: new RegExp(principle.postTitle, 'i') });
      expect(link).toHaveAttribute('href', `https://anindya.dev/blog/post/${principle.postSlug}`);
    });
  });

  it('opens post links in a new tab safely and says so for screen readers', () => {
    render(<ApproachSection />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(principles.length);
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveTextContent('(opens in new tab)');
    });
  });

  it('uses an ordered list so the numbering is real structure, not decoration', () => {
    const { container } = render(<ApproachSection />);
    expect(container.querySelector('ol.approach-list')).toBeInTheDocument();
    container.querySelectorAll('.approach-number').forEach((el) => {
      expect(el).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('points every principle at a different post so no source is reused', () => {
    const slugs = principles.map((p) => p.postSlug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
