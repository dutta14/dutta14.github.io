import { useState, useEffect } from 'react';
import { writingData } from '../../data/portfolioData';
import '../../styles/WritingSection.css';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

const BLOG_BASE = 'https://dutta14.github.io/blog';

const WritingSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${BLOG_BASE}/posts.json`)
      .then(r => r.json())
      .then((data: BlogPost[]) => setPosts(data.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  const displayPosts = posts.length > 0
    ? posts.map(p => ({ title: p.title, href: `${BLOG_BASE}/post/${p.slug}` }))
    : writingData.posts;

  return (
    <section id="writing" className="writing-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h2>{writingData.heading}</h2>
            <p className="writing-subheading">{writingData.subheading}</p>
            <div className="writing-posts mt-4">
              {displayPosts.map((post) => (
                <a
                  key={post.title}
                  className="writing-post-card"
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="writing-post-title">{post.title}</span>
                  <span className="visually-hidden"> (opens in new tab)</span>
                  <span className="writing-post-arrow" aria-hidden="true">&#8594;</span>
                </a>
              ))}
            </div>
            <a href={BLOG_BASE} className="writing-see-all" target="_blank" rel="noopener noreferrer">
              All posts →<span className="visually-hidden"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
