import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SpeakingPage from './SpeakingPage';
import {
  speakingIntro,
  talkTopics,
  speakerBios,
  speakingCtaData,
} from '../../data/portfolioData';

const onBooking = vi.fn();

const renderPage = () =>
  render(
    <MemoryRouter>
      <SpeakingPage onBooking={onBooking} />
    </MemoryRouter>,
  );

describe('SpeakingPage', () => {
  beforeEach(() => {
    onBooking.mockClear();
  });

  it('renders the visually-hidden page heading "Speaking & Availability"', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: /Speaking & Availability/i, level: 1 }),
    ).toBeInTheDocument();
  });

  it('renders the speaker intro paragraph', () => {
    renderPage();
    expect(screen.getByText(speakingIntro)).toBeInTheDocument();
  });

  it('renders all 4 talk topic cards with their titles', () => {
    renderPage();
    talkTopics.forEach((topic) => {
      expect(
        screen.getByRole('heading', { name: topic.title, level: 2 }),
      ).toBeInTheDocument();
    });
  });

  it('renders each talk topic card with its audience tag', () => {
    renderPage();
    talkTopics.forEach((topic) => {
      expect(screen.getByText(topic.audience)).toBeInTheDocument();
    });
  });

  it('renders 3 bio sections with their word-count labels and copy buttons', () => {
    renderPage();
    speakerBios.forEach((bio) => {
      // Each bio card shows its word-count label
      expect(screen.getByRole('button', { name: `Copy ${bio.label} bio` })).toBeInTheDocument();
    });
    // All 3 bio text blocks are rendered
    const bioLabels = screen.getAllByText(/^\d+ words$/);
    expect(bioLabels).toHaveLength(3);
  });

  it('copy buttons have proper aria-labels matching each bio label', () => {
    renderPage();
    const expectedLabels = ['Copy 50 words bio', 'Copy 150 words bio', 'Copy 300 words bio'];
    expectedLabels.forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    });
  });

  it('renders the CTA button "Book a speaking engagement"', () => {
    renderPage();
    expect(
      screen.getByRole('button', { name: speakingCtaData.buttonText }),
    ).toBeInTheDocument();
  });

  it('renders the CTA heading and description', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: speakingCtaData.heading, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(speakingCtaData.description)).toBeInTheDocument();
  });

  it('calls onBooking when the CTA button is clicked', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole('button', { name: speakingCtaData.buttonText }));
    expect(onBooking).toHaveBeenCalledTimes(1);
  });

  it('calls navigator.clipboard.writeText with the correct bio text when copy button is clicked', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    renderPage();

    const firstBio = speakerBios[0];
    await user.click(screen.getByRole('button', { name: `Copy ${firstBio.label} bio` }));

    expect(writeText).toHaveBeenCalledWith(firstBio.text);
  });

  it('shows "Copied" text after clicking a copy button', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    renderPage();

    const firstBio = speakerBios[0];
    await user.click(screen.getByRole('button', { name: `Copy ${firstBio.label} bio` }));

    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('renders the "Talk topics" section label', () => {
    renderPage();
    expect(screen.getByText('Talk topics')).toBeInTheDocument();
  });

  it('renders the "Speaker bio" section label', () => {
    renderPage();
    expect(screen.getByText('Speaker bio')).toBeInTheDocument();
  });
});

/* ── Analytics: umami tracking ──────────────────────────── */

describe('SpeakingPage — analytics tracking', () => {
  afterEach(() => {
    delete (window as Record<string, unknown>).umami;
  });

  it('calls window.umami.track with "speaking-page-view" on mount', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    renderPage();

    expect(trackFn).toHaveBeenCalledWith('speaking-page-view');
  });

  it('does not throw when window.umami is undefined on mount', () => {
    expect(window.umami).toBeUndefined();
    expect(() => renderPage()).not.toThrow();
  });

  it('calls track with "speaker-bio-copy" when a bio copy button is clicked', async () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });
    const user = userEvent.setup();

    renderPage();

    await user.click(screen.getByRole('button', { name: `Copy ${speakerBios[0].label} bio` }));

    expect(trackFn).toHaveBeenCalledWith('speaker-bio-copy', { length: '50' });
  });
});
