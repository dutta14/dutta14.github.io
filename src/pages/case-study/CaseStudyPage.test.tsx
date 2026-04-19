import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
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
});
