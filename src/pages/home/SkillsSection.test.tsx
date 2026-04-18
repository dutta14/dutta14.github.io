import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillsSection from './SkillsSection';

describe('SkillsSection', () => {
  it('renders all 12 skill badges', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('AI Product Engineering')).toBeInTheDocument();
    expect(screen.getByText('High-Performance Team Building')).toBeInTheDocument();
  });
});
