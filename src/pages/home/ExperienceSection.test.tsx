import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceSection from './ExperienceSection';

describe('ExperienceSection', () => {
  it('renders all 5 experience items', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getAllByText('Microsoft')).toHaveLength(2);
    expect(screen.getByText('Meta')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('Samsung R&D')).toBeInTheDocument();
  });

  it('renders job titles', () => {
    render(<ExperienceSection />);
    expect(screen.getAllByText('Principal Software Engineering Manager')).toHaveLength(2);
    expect(screen.getByText('Staff Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer 2')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });
});
