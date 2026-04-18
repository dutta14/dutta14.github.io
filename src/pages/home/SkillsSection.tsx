import { skills } from '../../data/portfolioData';
import '../../styles/SkillsSection.css';

const SkillsSection = () => (
  <section id="skills">
    <div className="container">
      <h2>Skills &amp; Expertise</h2>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2 text-center">
          {skills.map((skill) => (
            <span className="skill-badge" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
