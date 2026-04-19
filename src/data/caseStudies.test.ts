import { describe, it, expect } from 'vitest';
import { caseStudies } from './caseStudies';

describe('caseStudies data integrity', () => {
  it('all case studies have unique slugs', () => {
    const slugs = caseStudies.map((cs) => cs.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all case studies have non-empty title, subtitle, company, year, role, impact', () => {
    for (const cs of caseStudies) {
      expect(cs.title).toBeTruthy();
      expect(cs.subtitle).toBeTruthy();
      expect(cs.company).toBeTruthy();
      expect(cs.year).toBeTruthy();
      expect(cs.role).toBeTruthy();
      expect(cs.impact).toBeTruthy();
    }
  });

  it('all case studies have at least one section', () => {
    for (const cs of caseStudies) {
      expect(cs.sections.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('all sections have non-empty heading and body', () => {
    for (const cs of caseStudies) {
      for (const section of cs.sections) {
        expect(section.heading).toBeTruthy();
        expect(section.body).toBeTruthy();
      }
    }
  });

  it('slugs are URL-safe (lowercase, hyphens only)', () => {
    for (const cs of caseStudies) {
      expect(cs.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });
});
