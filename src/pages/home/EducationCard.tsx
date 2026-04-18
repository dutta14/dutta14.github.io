import { Education } from '../../types';

const schoolLogos: Record<string, string> = {
  'University of Southern California': '/logos/usc.svg',
  'Manipal University': '/logos/manipal.svg',
};

function extractStartYear(years: string): string {
  const match = years.match(/\d{4}/);
  return match ? match[0] : '';
}

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const logoSrc = schoolLogos[education.school];
  return (
    <div className="education-card">
      <div className="education-year">{extractStartYear(education.years)}</div>
      <div className="education-content">
        <h3>{education.degree}</h3>
        <p className="fw-bold">{education.field}</p>
        <p className="school-name company-logo">
          {logoSrc && (
            <img
              src={logoSrc}
              alt={`${education.school} logo`}
              className="logo-icon"
            />
          )}
          {education.school}
        </p>
        <p className="text-muted">{education.years}</p>
      </div>
    </div>
  );
};

export default EducationCard;
