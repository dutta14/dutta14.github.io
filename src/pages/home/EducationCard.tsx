import { ComponentType } from 'react';
import { Education } from '../../types';
import { USCLogo, ManipalLogo } from '../../assets/logos';

const schoolLogos: Record<string, ComponentType<{ className?: string }>> = {
  'University of Southern California': USCLogo,
  'Manipal University': ManipalLogo,
};

function extractStartYear(years: string): string {
  const match = years.match(/\d{4}/);
  return match ? match[0] : '';
}

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const Logo = schoolLogos[education.school];
  return (
    <div className="education-card">
      <div className="education-year">{extractStartYear(education.years)}</div>
      <div className="education-content">
        <h3>{education.degree}</h3>
        <p className="fw-bold">{education.field}</p>
        <p className="school-name company-logo">
          {Logo && <Logo className="logo-icon" />}
          {education.school}
        </p>
        <p className="text-muted">{education.years}</p>
      </div>
    </div>
  );
};

export default EducationCard;
