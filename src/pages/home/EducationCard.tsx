import { Education } from '../../types';

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => (
  <div className="education-card">
    <h3>{education.degree}</h3>
    <p className="fw-bold">{education.field}</p>
    <p className="school-name">{education.school}</p>
    <p className="text-muted">{education.years}</p>
  </div>
);

export default EducationCard;
