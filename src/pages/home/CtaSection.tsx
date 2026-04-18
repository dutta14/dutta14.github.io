import { ctaData } from '../../data/portfolioData';
import '../../styles/CtaSection.css';

const CtaSection = () => (
  <section className="cta-section">
    <div className="container">
      <h2>{ctaData.heading}</h2>
      <p>{ctaData.description}</p>
      <a
        href={ctaData.buttonHref}
        className="cta-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaData.buttonText}
      </a>
    </div>
  </section>
);

export default CtaSection;
