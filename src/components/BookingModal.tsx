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
        <iframe
          src={ctaData.buttonHref}
          title="Book an Appointment"
          className="booking-iframe"
        />
      </div>
    </div>
  );
};

export default BookingModal;
