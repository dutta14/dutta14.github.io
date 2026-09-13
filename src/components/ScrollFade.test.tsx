import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScrollFade from './ScrollFade';

describe('ScrollFade', () => {
  it('hides the top fade while the page is resting at the top', () => {
    render(<ScrollFade atTop={true} atBottom={false} />);
    expect(screen.getByTestId('scroll-fade-top')).not.toHaveClass('show');
  });

  it('shows the top fade once content has scrolled above the viewport', () => {
    render(<ScrollFade atTop={false} atBottom={false} />);
    expect(screen.getByTestId('scroll-fade-top')).toHaveClass('show');
  });

  it('shows the bottom fade while more content remains below the fold', () => {
    render(<ScrollFade atTop={true} atBottom={false} />);
    expect(screen.getByTestId('scroll-fade-bottom')).toHaveClass('show');
  });

  it('hides the bottom fade once the end of the page is reached', () => {
    render(<ScrollFade atTop={false} atBottom={true} />);
    expect(screen.getByTestId('scroll-fade-bottom')).not.toHaveClass('show');
  });

  it('hides both fades on a page short enough to need no scrolling', () => {
    render(<ScrollFade atTop={true} atBottom={true} />);
    expect(screen.getByTestId('scroll-fade-top')).not.toHaveClass('show');
    expect(screen.getByTestId('scroll-fade-bottom')).not.toHaveClass('show');
  });

  it('hides both fades from assistive technology', () => {
    render(<ScrollFade atTop={false} atBottom={false} />);
    expect(screen.getByTestId('scroll-fade-top')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('scroll-fade-bottom')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders no focusable content that could trap keyboard users', () => {
    const { container } = render(<ScrollFade atTop={false} atBottom={false} />);
    expect(container.querySelectorAll('a, button, input, [tabindex]')).toHaveLength(0);
  });
});
