import { useEffect } from 'react';
import { ctaData } from '../data/portfolioData';
import '../styles/BookingModal.css';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Book an Appointment"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="booking-close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="booking-body">
          <i className="fas fa-calendar-check booking-icon"></i>
          <h3>Let's Find a Time</h3>
          <p>
            You'll be taken to Google Calendar to pick a slot that works for
            you. It only takes a minute.
          </p>
          <a
            href={ctaData.buttonHref}
            className="booking-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            Open Google Calendar
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
