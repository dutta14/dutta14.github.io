import { useEffect, useRef, useCallback } from 'react';
import { ctaData } from '../data/portfolioData';
import '../styles/BookingModal.css';

export type BookingContext = 'conversation' | 'speaking';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  context?: BookingContext;
}

const COPY = {
  conversation: {
    label: 'CONVERSATION',
    title: 'Let\u2019s find a time',
    body: 'You\u2019ll be taken to Google Calendar to pick a slot that works for you. It only takes a minute.',
    cta: 'Open Google Calendar \u2192',
  },
  speaking: {
    label: 'SPEAKING ENGAGEMENT',
    title: 'Book a speaking engagement',
    body: 'You\u2019ll be taken to my calendar to find a time that works. I\u2019ll follow up within 48 hours.',
    cta: 'Open Google Calendar \u2192',
  },
} as const;

const BookingModal = ({ open, onClose, context = 'conversation' }: BookingModalProps) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButtonRef.current?.focus());
      window.umami?.track('booking-modal-open', { context });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, context]);

  // Restore focus on close
  useEffect(() => {
    if (!open && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  const copy = COPY[context];

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="booking-close"
          onClick={onClose}
          aria-label="Close"
          ref={closeButtonRef}
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        <div className="booking-body">
          <span className="booking-context-label">{copy.label}</span>
          <h2 id="booking-title">{copy.title}</h2>
          <p>{copy.body}</p>
          <a
            href={ctaData.channels[0].action.href}
            className="booking-action"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              window.umami?.track('booking-calendar-click', { context });
              onClose();
            }}
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
