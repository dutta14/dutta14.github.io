import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductsSection from './ProductsSection';

describe('ProductsSection', () => {
  it('renders all product cards', () => {
    render(<ProductsSection />);
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Alexa Hands-Free')).toBeInTheDocument();
    expect(screen.getByText('Voice Assistant in Outlook')).toBeInTheDocument();
    expect(screen.getByText('Microsoft 365 Copilot')).toBeInTheDocument();
  });

  it('renders product images with alt text', () => {
    render(<ProductsSection />);
    expect(screen.getByAltText('Alexa Hands-Free')).toBeInTheDocument();
    expect(screen.getByAltText('Semantic Machines Voice Assistant')).toBeInTheDocument();
    expect(screen.getByAltText('Microsoft 365 Copilot Chat')).toBeInTheDocument();
  });
});
