import { principles, principlesData } from '../../data/portfolioData';
import '../../styles/ApproachSection.css';

const BLOG_BASE = 'https://anindya.dev/blog';

const ApproachSection = () => (
  <section id="approach">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>{principlesData.heading}</h2>
          <p className="approach-subheading">{principlesData.subheading}</p>
          <ol className="approach-list">
            {principles.map((principle, i) => (
              <li className="approach-item" key={principle.postSlug}>
                <span className="approach-number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="approach-body">
                  <h3 className="approach-belief">{principle.belief}</h3>
                  <p className="approach-detail">{principle.detail}</p>
                  <a
                    className="approach-source"
                    href={`${BLOG_BASE}/post/${principle.postSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {principle.postTitle}
                    <span className="visually-hidden"> (opens in new tab)</span>
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </section>
);

export default ApproachSection;
