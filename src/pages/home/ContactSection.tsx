import { socialLinks, ctaData } from '../../data/portfolioData';
import '../../styles/ContactSection.css';

const ContactSection = () => (
  <section className="contact-section" id="contact">
    <div className="container text-center">
      <h2>{ctaData.heading}</h2>
      <p className="mt-3 contact-intro">{ctaData.description}</p>
      <a
        href={ctaData.buttonHref}
        className="cta-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaData.buttonText}
      </a>
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
