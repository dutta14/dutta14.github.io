import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MentoringSection from './MentoringSection';
import { mentoringTopics } from '../../data/portfolioData';

describe('MentoringSection', () => {
  beforeEach(() => {
    window.umami = { track: vi.fn() };
  });

  it('renders the heading and the availability framing', () => {
    render(<MentoringSection onBooking={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Happy to Talk About' })).toBeInTheDocument();
    expect(screen.getByText(/No charge, no pitch/)).toBeInTheDocument();
  });

  it('renders every mentoring topic with its description and audience', () => {
    render(<MentoringSection onBooking={vi.fn()} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mentoringTopics.length);
    mentoringTopics.forEach((topic, i) => {
      expect(within(items[i]).getByRole('heading', { level: 3 })).toHaveTextContent(topic.title);
      expect(within(items[i]).getByText(topic.description)).toBeInTheDocument();
      expect(within(items[i]).getByText(topic.forWhom)).toBeInTheDocument();
    });
  });

  it('opens the booking modal in the conversation context when the button is clicked', async () => {
    const onBooking = vi.fn();
    render(<MentoringSection onBooking={onBooking} />);
    await userEvent.click(screen.getByRole('button', { name: /Book 30 Minutes/i }));
    expect(onBooking).toHaveBeenCalledWith('conversation');
  });

  it('tracks the booking click so this section can be attributed separately', async () => {
    render(<MentoringSection onBooking={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /Book 30 Minutes/i }));
    expect(window.umami?.track).toHaveBeenCalledWith('mentoring-booking-click');
  });

  it('invites questions outside the listed topics', () => {
    render(<MentoringSection onBooking={vi.fn()} />);
    expect(screen.getByText(/If your question is not on this list, ask anyway/)).toBeInTheDocument();
  });

  it('labels the section for assistive technology', () => {
    const { container } = render(<MentoringSection onBooking={vi.fn()} />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'mentoring');
    expect(section).toHaveAttribute('aria-labelledby', 'mentoring-heading');
  });

  it('announces the audience line as who the topic is for', () => {
    render(<MentoringSection onBooking={vi.fn()} />);
    expect(screen.getAllByText('Who this is for:')).toHaveLength(mentoringTopics.length);
  });
});
