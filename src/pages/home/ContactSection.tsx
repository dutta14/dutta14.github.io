import { socialLinks, ctaData } from '../../data/portfolioData';
import '../../styles/ContactSection.css';

interface ContactSectionProps {
  onBooking: () => void;
}

const ContactSection = ({ onBooking }: ContactSectionProps) => (
  <section className="contact-section" id="contact">
    <div className="container text-center">
      <h2>{ctaData.heading}</h2>
      <p className="mt-3 contact-intro">{ctaData.description}</p>
      <button className="cta-button" onClick={onBooking}>
        {ctaData.buttonText}
      </button>
      <footer>
        {socialLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            title={link.title}
            aria-label={link.title}
            {...(link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <i className={link.icon}></i>
          </a>
        ))}
        <p>&copy; 2026 Anindya Dutta. All rights reserved.</p>
      </footer>
    </div>
  </section>
);

export default ContactSection;
