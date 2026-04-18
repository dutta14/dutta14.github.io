import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillsSection from './SkillsSection';

describe('SkillsSection', () => {
  it('renders all 12 skill badges', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
    expect(screen.getByText('Engineering Management (IC to GM track)')).toBeInTheDocument();
    expect(screen.getByText('AI products shipped at scale')).toBeInTheDocument();
    expect(screen.getByText('U.S. Patent holder (Android systems)')).toBeInTheDocument();
  });
});
