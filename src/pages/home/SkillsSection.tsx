import { skills } from '../../data/portfolioData';
import '../../styles/SkillsSection.css';

const SkillsSection = () => (
  <section id="skills">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 text-center">
          <h2>Skills &amp; Expertise</h2>
          <div className="mt-5">
            {skills.map((skill) => (
              <span className="skill-badge" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
