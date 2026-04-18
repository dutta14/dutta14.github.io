import { ComponentType } from 'react';
import { Education } from '../../types';
import { USCLogo, ManipalLogo } from '../../assets/logos';

const schoolLogos: Record<string, ComponentType<{ className?: string }>> = {
  'University of Southern California': USCLogo,
  'Manipal University': ManipalLogo,
};

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const Logo = schoolLogos[education.school];
  return (
    <div className="education-card">
      <h3>{education.degree}</h3>
      <p className="fw-bold">{education.field}</p>
      <p className="school-name company-logo">
        {Logo && <Logo className="logo-icon" />}
        {education.school}
      </p>
      <p className="text-muted">{education.years}</p>
    </div>
  );
};

export default EducationCard;
