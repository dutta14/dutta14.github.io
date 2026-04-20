import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest';
import CaseStudyPage from './CaseStudyPage';
import { caseStudies } from '../../data/caseStudies';

beforeAll(() => {
  // jsdom doesn't implement IntersectionObserver
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver;
});

afterEach(() => {
  // Clean up any JSON-LD script tags injected by useJsonLd
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
});

beforeAll(() => {
  // jsdom doesn't implement IntersectionObserver
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.IntersectionObserver;
});

const renderWithSlug = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/case-study/${slug}`]}>
      <Routes>
        <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      </Routes>
    </MemoryRouter>
  );

const study = caseStudies[0]; // alexa-hands-free

describe('CaseStudyPage', () => {
  it('renders the hero with title, subtitle, company pill, and year', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByRole('heading', { name: study.title, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(study.subtitle)).toBeInTheDocument();
    expect(screen.getByText(study.company)).toBeInTheDocument();
    expect(screen.getAllByText(study.year).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the stats bar with Role, Timeline, and Impact', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText(study.role)).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
    expect(screen.getByText(study.impact)).toBeInTheDocument();
  });

  it('renders all section headings with numbered prefixes (01, 02, etc.)', () => {
    renderWithSlug('alexa-hands-free');
    study.sections.forEach((section, i) => {
      const prefix = String(i + 1).padStart(2, '0');
      expect(screen.getByText(prefix)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: section.heading, level: 2 })).toBeInTheDocument();
    });
  });

  it('renders paragraph text from sections', () => {
    renderWithSlug('alexa-hands-free');
    // Check a snippet from the first section body
    expect(screen.getByText(/Amazon wanted Alexa to work hands-free/)).toBeInTheDocument();
  });

  it('shows reading time estimate (X min read)', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByText(/\d+ min read/)).toBeInTheDocument();
  });

  it('renders table of contents with all section headings as links', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByText('Contents')).toBeInTheDocument();
    study.sections.forEach((section) => {
      const tocLinks = screen.getAllByRole('link', { name: section.heading });
      expect(tocLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders "Next case study" link at the bottom pointing to next study', () => {
    renderWithSlug('alexa-hands-free');
    const nextStudy = caseStudies[1];
    expect(screen.getByText('Next case study')).toBeInTheDocument();
    expect(screen.getByText(nextStudy.title)).toBeInTheDocument();
  });

  it('renders "Back to projects" link', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByRole('link', { name: /Back to projects/ })).toBeInTheDocument();
  });

  it('shows not-found message for an invalid slug', () => {
    renderWithSlug('nonexistent-slug');
    expect(screen.getByText('Case study not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to home/ })).toBeInTheDocument();
  });

  /* ── "From the blog" section ────────────────────────────── */

  it('renders "From the blog" section on the Alexa case study with 2 blog post links', () => {
    renderWithSlug('alexa-hands-free');
    expect(screen.getByText('From the blog')).toBeInTheDocument();
    const alexaPosts = caseStudies[0].relatedBlogPosts!;
    alexaPosts.forEach((post) => {
      expect(screen.getByRole('link', { name: new RegExp(post.title) })).toBeInTheDocument();
    });
  });

  it('blog post links point to the correct external blog URLs', () => {
    renderWithSlug('alexa-hands-free');
    const alexaPosts = caseStudies[0].relatedBlogPosts!;
    alexaPosts.forEach((post) => {
      const link = screen.getByRole('link', { name: new RegExp(post.title) });
      expect(link).toHaveAttribute('href', `https://anindya.dev/blog/post/${post.slug}`);
    });
  });

  it('blog post links open in a new tab with noopener noreferrer', () => {
    renderWithSlug('alexa-hands-free');
    const alexaPosts = caseStudies[0].relatedBlogPosts!;
    alexaPosts.forEach((post) => {
      const link = screen.getByRole('link', { name: new RegExp(post.title) });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders "From the blog" on M365 Copilot case study with 2 blog post links', () => {
    renderWithSlug('m365-copilot');
    expect(screen.getByText('From the blog')).toBeInTheDocument();
    const m365Posts = caseStudies[2].relatedBlogPosts!;
    m365Posts.forEach((post) => {
      expect(screen.getByRole('link', { name: new RegExp(post.title) })).toBeInTheDocument();
    });
  });

  it('renders "From the blog" on Voice Assistant case study with 1 blog post link', () => {
    renderWithSlug('voice-assistant-outlook');
    expect(screen.getByText('From the blog')).toBeInTheDocument();
    const outlookPosts = caseStudies[1].relatedBlogPosts!;
    expect(screen.getByRole('link', { name: new RegExp(outlookPosts[0].title) })).toBeInTheDocument();
  });
});

/* ── Analytics: umami tracking ──────────────────────────── */

describe('CaseStudyPage — analytics tracking', () => {
  afterEach(() => {
    delete (window as unknown as Record<string, unknown>).umami;
  });

  it('calls window.umami.track with "case-study-view" and slug on mount', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    renderWithSlug('alexa-hands-free');

    expect(trackFn).toHaveBeenCalledWith('case-study-view', { slug: 'alexa-hands-free' });
  });

  it('does not throw when window.umami is undefined', () => {
    expect(window.umami).toBeUndefined();
    expect(() => renderWithSlug('alexa-hands-free')).not.toThrow();
  });

  it('does not call track for an invalid slug (case study not found)', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    renderWithSlug('nonexistent-slug');

    expect(trackFn).not.toHaveBeenCalled();
  });
});

/* ── JSON-LD structured data ───────────────────────────── */

describe('CaseStudyPage — JSON-LD structured data', () => {
  afterEach(() => {
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
  });

  it('JSON-LD Article data present with correct headline', () => {
    renderWithSlug('alexa-hands-free');
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const contents = Array.from(scripts).map((s) => s.textContent ?? '');
    const hasArticle = contents.some(
      (c) => c.includes('"Article"') && c.includes(study.title)
    );
    expect(hasArticle).toBe(true);
  });

  it('JSON-LD is not injected for invalid slug', () => {
    renderWithSlug('nonexistent-slug');
    const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
    const contents = Array.from(scripts).map((s) => s.textContent ?? '');
    const hasArticle = contents.some((c) => c.includes('"Article"'));
    expect(hasArticle).toBe(false);
  });
});
