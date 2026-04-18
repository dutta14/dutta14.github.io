import { Experience } from '../../types';

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => (
  <div className="experience-item">
    <h3>{experience.title}</h3>
    <div className="company">
      <i className="fas fa-building"></i> {experience.company}
    </div>
    <div className="duration">
      <i className="fas fa-calendar"></i> {experience.duration}
    </div>
    <p>{experience.description}</p>
  </div>
);

export default ExperienceItem;
