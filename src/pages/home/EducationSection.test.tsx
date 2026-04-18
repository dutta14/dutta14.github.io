import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationSection from './EducationSection';

describe('EducationSection', () => {
  it('renders both education cards', () => {
    render(<EducationSection />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Master of Science')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Engineering')).toBeInTheDocument();
    expect(screen.getByText('University of Southern California')).toBeInTheDocument();
    expect(screen.getByText('Manipal University')).toBeInTheDocument();
  });
});
