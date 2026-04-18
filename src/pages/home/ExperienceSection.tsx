import { experiences } from '../../data/portfolioData';
import ExperienceItem from './ExperienceItem';
import '../../styles/ExperienceSection.css';

const ExperienceSection = () => (
  <section id="experience">
    <div className="container">
      <h2>Experience</h2>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2">
          {experiences.map((exp, i) => (
            <ExperienceItem key={i} experience={exp} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
