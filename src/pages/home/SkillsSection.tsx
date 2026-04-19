import { skillPillars } from '../../data/portfolioData';
import '../../styles/SkillsSection.css';

const SkillsSection = () => (
  <section id="skills">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>What I Bring</h2>
          <div className="skill-pillars mt-5">
            {skillPillars.map((pillar) => (
              <div className="skill-pillar" key={pillar.title}>
                <h3 className="skill-pillar-title">{pillar.title}</h3>
                <p className="skill-pillar-evidence">{pillar.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
