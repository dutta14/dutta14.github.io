import { Experience } from '../../types';

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => (
  <div className="experience-item">
    <h3>{experience.title}</h3>
    <div className="company">{experience.company}</div>
    <div className="duration">{experience.duration}</div>
    <p>{experience.description}</p>
  </div>
);

export default ExperienceItem;
