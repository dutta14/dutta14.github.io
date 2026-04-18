import { socialLinks } from '../../data/portfolioData';
import '../../styles/ContactSection.css';

const ContactSection = () => (
  <section className="contact-section" id="contact">
    <div className="container text-center">
      <h2>Get In Touch</h2>
      <p className="mt-4 contact-intro">
        I&apos;m always interested in connecting with fellow engineers, leaders,
        and innovators. Feel free to reach out!
      </p>
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
