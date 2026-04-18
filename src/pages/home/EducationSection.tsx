import { educations } from '../../data/portfolioData';
import EducationCard from './EducationCard';
import '../../styles/EducationSection.css';

const EducationSection = () => (
  <section id="education">
    <div className="container">
      <h2>Education</h2>
      <div className="row mt-4">
        <div className="col-lg-8 offset-lg-2">
          {educations.map((edu, i) => (
            <EducationCard key={i} education={edu} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
