import { experiences } from '../../data/portfolioData';
import ExperienceItem from './ExperienceItem';
import '../../styles/ExperienceSection.css';

const ExperienceSection = () => (
  <section id="experience">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>Experience</h2>
          <div className="experience-list mt-5">
            {experiences.map((exp, i) => (
              <ExperienceItem key={i} experience={exp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
