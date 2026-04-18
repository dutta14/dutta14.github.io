import { educations } from '../../data/portfolioData';
import EducationCard from './EducationCard';
import '../../styles/EducationSection.css';

const EducationSection = () => (
  <section id="education">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>Education</h2>
          <div className="education-list mt-4">
            {educations.map((edu, i) => (
              <EducationCard key={i} education={edu} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
