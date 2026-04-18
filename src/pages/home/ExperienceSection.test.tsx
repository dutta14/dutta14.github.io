import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceSection from './ExperienceSection';

describe('ExperienceSection', () => {
  it('renders all 5 experience items', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getAllByText(/Microsoft|Meta|Amazon|Samsung R&D/)).toHaveLength(5);
  });

  it('renders job titles', () => {
    render(<ExperienceSection />);
    expect(screen.getAllByText('Principal Software Engineering Manager')).toHaveLength(2);
    expect(screen.getByText('Staff Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer 2')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });
});
