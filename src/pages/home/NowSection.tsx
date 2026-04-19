import { nowData } from '../../data/portfolioData';
import '../../styles/NowSection.css';

const NowSection = () => (
  <section id="now" className="now-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>Now</h2>
          <div className="now-grid">
            <div className="now-card">
              <div className="now-card-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <div className="now-card-content">
                <h3>Currently building</h3>
                <p>{nowData.work}</p>
              </div>
            </div>
            <div className="now-card">
              <div className="now-card-icon now-card-book-cover">
                <img
                  src={nowData.reading.cover}
                  alt={`Book cover: ${nowData.reading.title}`}
                />
              </div>
              <div className="now-card-content">
                <h3>Currently reading</h3>
                <p>
                  <a
                    href={nowData.reading.goodreadsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {nowData.reading.title}
                    <span className="visually-hidden"> (opens in new tab)</span>
                  </a>
                  {' '}by {nowData.reading.author}
                </p>
                <a
                  href={nowData.reading.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="now-goodreads-link"
                >
                  See all on Goodreads &rarr;
                  <span className="visually-hidden"> (opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default NowSection;
