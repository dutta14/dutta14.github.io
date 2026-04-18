import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductsSection from './ProductsSection';
import { products } from '../../data/portfolioData';

describe('ProductsSection', () => {
  it('renders section heading', () => {
    render(<ProductsSection />);
    expect(screen.getByText("What I've Shipped")).toBeInTheDocument();
  });

  it('renders all product cards', () => {
    render(<ProductsSection />);
    expect(screen.getByText('Alexa Hands-Free')).toBeInTheDocument();
    expect(screen.getByText('Voice Assistant in Outlook')).toBeInTheDocument();
    expect(screen.getByText('Microsoft 365 Copilot')).toBeInTheDocument();
  });

  it('renders scale pills', () => {
    render(<ProductsSection />);
    expect(screen.getByText('5M+ users')).toBeInTheDocument();
    expect(screen.getByText('First LLM feature in M365')).toBeInTheDocument();
    expect(screen.getByText('Enterprise · 400M+ seat platform')).toBeInTheDocument();
  });

  it('renders product images with non-empty src and alt text', () => {
    render(<ProductsSection />);
    const imgs = screen.getAllByRole('img') as HTMLImageElement[];
    expect(imgs.length).toBe(products.length);
    imgs.forEach(img => {
      expect(img.getAttribute('src')).toBeTruthy();
      expect(img.getAttribute('alt')).toBeTruthy();
    });
  });

  it('every product card has title, scale pill, description, and image', () => {
    render(<ProductsSection />);
    products.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(product.scale)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByAltText(product.alt)).toBeInTheDocument();
    });
  });

  it('image src paths are non-empty strings starting with /', () => {
    render(<ProductsSection />);
    products.forEach(product => {
      const img = screen.getByAltText(product.alt) as HTMLImageElement;
      expect(img.src).toBeTruthy();
      expect(product.image.startsWith('/')).toBe(true);
    });
  });

  it('renders the correct number of product cards', () => {
    const { container } = render(<ProductsSection />);
    const cards = container.querySelectorAll('.product-card');
    expect(cards.length).toBe(products.length);
  });

  it('each card has an image wrapper and a body', () => {
    const { container } = render(<ProductsSection />);
    const cards = container.querySelectorAll('.product-card');
    cards.forEach(card => {
      expect(card.querySelector('.product-card-img-wrap')).toBeTruthy();
      expect(card.querySelector('.product-card-body')).toBeTruthy();
    });
  });
});
