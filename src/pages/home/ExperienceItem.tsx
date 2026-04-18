import { Experience } from '../../types';

const companyLogos: Record<string, string> = {
  Microsoft: '/logos/microsoft.svg',
  Meta: '/logos/meta.svg',
  Amazon: '/logos/amazon.svg',
  'Samsung R&D': '/logos/samsung.svg',
};

function extractStartYear(duration: string): string {
  const match = duration.match(/\d{4}/);
  return match ? match[0] : '';
}

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const logoSrc = companyLogos[experience.company];
  return (
    <div className="experience-item">
      <div className="experience-year">{extractStartYear(experience.duration)}</div>
      <div className="experience-content">
        <h3>{experience.title}</h3>
        <div className="company company-logo">
          {logoSrc && (
            <img
              src={logoSrc}
              alt={`${experience.company} logo`}
              className="logo-icon"
            />
          )}
          {experience.company}
        </div>
        <div className="duration">{experience.duration}</div>
        <p>{experience.description}</p>
      </div>
    </div>
  );
};

export default ExperienceItem;
