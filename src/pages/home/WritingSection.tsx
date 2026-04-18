import { writingData } from '../../data/portfolioData';
import '../../styles/WritingSection.css';

// TODO: unhide when blog content is ready
const WritingSection = () => (
  <section id="writing" className="writing-section writing-section--hidden">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2>{writingData.heading}</h2>
          <p className="writing-subheading">{writingData.subheading}</p>
          <div className="writing-posts mt-4">
            {writingData.posts.map((post) => (
              <a
                key={post.title}
                className="writing-post-card"
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="writing-post-title">{post.title}</span>
                <span className="writing-post-arrow" aria-hidden="true">&#8594;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WritingSection;
