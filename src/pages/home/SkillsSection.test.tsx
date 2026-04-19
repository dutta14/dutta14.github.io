import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SkillsSection from './SkillsSection';

describe('SkillsSection', () => {
  it('renders all 4 skill pillars', () => {
    render(<SkillsSection />);
    expect(screen.getByText('What I Bring')).toBeInTheDocument();
    expect(screen.getByText('AI Product Engineering')).toBeInTheDocument();
    expect(screen.getByText('Zero-to-One Builds')).toBeInTheDocument();
    expect(screen.getByText('Engineering Leadership')).toBeInTheDocument();
    expect(screen.getByText('Writing and Thinking')).toBeInTheDocument();
  });

  it('renders evidence text for each pillar', () => {
    render(<SkillsSection />);
    expect(screen.getByText(/M365 Copilot, Alexa Hands-Free, Voice Assistant in Outlook/)).toBeInTheDocument();
    expect(screen.getByText(/40 essays on engineering leadership/)).toBeInTheDocument();
  });
});
