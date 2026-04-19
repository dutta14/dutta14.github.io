import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import BookingModal from './BookingModal';

beforeEach(() => {
  // Stub requestAnimationFrame for focus management
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0; });
});

afterEach(() => {
  delete (window as Record<string, unknown>).umami;
  vi.restoreAllMocks();
});

describe('BookingModal — analytics tracking', () => {
  it('calls window.umami.track with "booking-modal-open" and context when modal opens', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    render(<BookingModal open={true} onClose={vi.fn()} context="conversation" />);

    expect(trackFn).toHaveBeenCalledWith('booking-modal-open', { context: 'conversation' });
  });

  it('calls track with speaking context when opened for speaking', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    render(<BookingModal open={true} onClose={vi.fn()} context="speaking" />);

    expect(trackFn).toHaveBeenCalledWith('booking-modal-open', { context: 'speaking' });
  });

  it('does not throw when window.umami is undefined and modal opens', () => {
    expect(window.umami).toBeUndefined();
    expect(() =>
      render(<BookingModal open={true} onClose={vi.fn()} />)
    ).not.toThrow();
  });

  it('does not track when modal is closed', () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };

    render(<BookingModal open={false} onClose={vi.fn()} />);

    expect(trackFn).not.toHaveBeenCalled();
  });

  it('renders the dialog with correct title when open', () => {
    render(<BookingModal open={true} onClose={vi.fn()} context="conversation" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Let\u2019s find a time')).toBeInTheDocument();
  });

  it('calls track with "booking-calendar-click" when calendar link is clicked', async () => {
    const trackFn = vi.fn();
    window.umami = { track: trackFn };
    const user = userEvent.setup();

    render(<BookingModal open={true} onClose={vi.fn()} context="conversation" />);

    await user.click(screen.getByRole('link', { name: /Open Google Calendar/ }));

    expect(trackFn).toHaveBeenCalledWith('booking-calendar-click', { context: 'conversation' });
  });
});
