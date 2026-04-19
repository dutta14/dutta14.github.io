import { socialLinks, ctaData } from '../../data/portfolioData';
import '../../styles/ContactSection.css';
import type { BookingContext } from '../../components/BookingModal';

interface ContactSectionProps {
  onBooking: (context?: BookingContext) => void;
}

const ContactSection = ({ onBooking }: ContactSectionProps) => (
  <section className="contact-section" id="contact" aria-labelledby="contact-heading">
    <div className="container">
      <div className="contact-content">
        <h2 id="contact-heading" className="contact-heading">{ctaData.heading}</h2>
        <p className="contact-subheading">{ctaData.subheading}</p>

        <div className="contact-channels">
          {ctaData.channels.map((channel) => (
            <div className="contact-channel" key={channel.id}>
              <div className="contact-channel-icon" aria-hidden="true">
                <i className={channel.icon}></i>
              </div>
              <div className="contact-channel-body">
                <h3 className="contact-channel-title">{channel.title}</h3>
                <p className="contact-channel-desc">{channel.description}</p>
                {channel.id === 'book' ? (
                  <button
                    className="contact-channel-action"
                    onClick={() => onBooking('conversation')}
                  >
                    {channel.action.label} <span aria-hidden="true">&#8594;</span>
                  </button>
                ) : (
                  <a
                    className="contact-channel-action"
                    href={channel.action.href}
                    {...(channel.id === 'blog' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {channel.action.label}
                    {channel.id === 'blog' && <span className="visually-hidden"> (opens in new tab)</span>}
                    {' '}<span aria-hidden="true">&#8594;</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="contact-response-time">{ctaData.responseTime}</p>

        <footer className="contact-footer">
          <nav className="contact-social" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                title={link.title}
                aria-label={link.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={link.icon}></i>
                <span className="visually-hidden"> (opens in new tab)</span>
              </a>
            ))}
          </nav>
          <p className="contact-copyright">&copy; 2026 Anindya Dutta</p>
        </footer>
      </div>
    </div>
  </section>
);

export default ContactSection;
