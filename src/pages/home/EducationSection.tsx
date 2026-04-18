import { educations } from '../../data/portfolioData';
import EducationCard from './EducationCard';
import '../../styles/EducationSection.css';

const EducationSection = () => (
  <section className="alt-bg" id="education">
    <div className="container">
      <h2>Education</h2>
      <div className="row mt-5">
        {educations.map((edu, i) => (
          <div className="col-md-6" key={i}>
            <EducationCard education={edu} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EducationSection;
