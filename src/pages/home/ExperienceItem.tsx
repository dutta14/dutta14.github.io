import { ComponentType } from 'react';
import { Experience } from '../../types';
import { MicrosoftLogo, MetaLogo, AmazonLogo, SamsungLogo } from '../../assets/logos';

const companyLogos: Record<string, ComponentType<{ className?: string }>> = {
  Microsoft: MicrosoftLogo,
  Meta: MetaLogo,
  Amazon: AmazonLogo,
  'Samsung R&D': SamsungLogo,
};

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  const Logo = companyLogos[experience.company];
  return (
    <div className="experience-item">
      <h3>{experience.title}</h3>
      <div className="company company-logo">
        {Logo && <Logo className="logo-icon" />}
        {experience.company}
      </div>
      <div className="duration">{experience.duration}</div>
      <p>{experience.description}</p>
    </div>
  );
};

export default ExperienceItem;
