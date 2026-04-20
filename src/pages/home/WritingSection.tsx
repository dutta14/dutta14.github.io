import { useState, useEffect } from 'react';
import { writingData } from '../../data/portfolioData';
import type { BlogPost } from '../../types';
import '../../styles/WritingSection.css';

const BLOG_BASE = 'https://anindya.dev/blog';
const FETCH_TIMEOUT_MS = 3000;
const MAX_POSTS = 3;
const EXCERPT_MAX_LENGTH = 120;
const HIDDEN_SLUGS = new Set(['letting-someone-go']);
function truncateExcerpt(text: string): string {
  if (text.length <= EXCERPT_MAX_LENGTH) return text;
  const truncated = text.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');
  const cutoff = lastSpace > EXCERPT_MAX_LENGTH * 0.75 ? lastSpace : EXCERPT_MAX_LENGTH;
  return truncated.slice(0, cutoff) + '\u2026';
}

function toISODate(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? dateStr : d.toISOString().split('T')[0];
}

const WritingSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    fetch(`${BLOG_BASE}/posts.json`, { signal: controller.signal })
      .then(r => r.json())
      .then((data: BlogPost[]) => setPosts(data.filter(p => !HIDDEN_SLUGS.has(p.slug)).slice(0, MAX_POSTS)))
      .catch(() => setPosts([]))
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  const useFetched = posts.length > 0;

  return (
    <section id="writing" className="writing-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h2>{writingData.heading}</h2>
            <p className="writing-subheading">{writingData.subheading}</p>
            <ol className="writing-posts mt-4" role="list">
              {useFetched
                ? posts.map((post) => (
                    <li key={post.slug} className="writing-post-item">
                      <a
                        className="writing-post-link"
                        href={`${BLOG_BASE}/post/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => window.umami?.track('writing-post-click', { title: post.title })}
                      >
                        <div className="writing-post-content">
                          {post.date && (
                            <time className="writing-post-date" dateTime={toISODate(post.date)}>
                              {post.date}
                            </time>
                          )}
                          <h3 className="writing-post-title">{post.title}</h3>
                          {post.excerpt && (
                            <p className="writing-post-excerpt">
                              {truncateExcerpt(post.excerpt)}
                            </p>
                          )}
                        </div>
                        <span className="writing-post-arrow" aria-hidden="true">&#8594;</span>
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </a>
                    </li>
                  ))
                : writingData.posts.map((post) => (
                    <li key={post.title} className="writing-post-item">
                      <a
                        className="writing-post-link"
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => window.umami?.track('writing-post-click', { title: post.title })}
                      >
                        <div className="writing-post-content">
                          <h3 className="writing-post-title">{post.title}</h3>
                        </div>
                        <span className="writing-post-arrow" aria-hidden="true">&#8594;</span>
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </a>
                    </li>
                  ))}
            </ol>
            <div className="writing-links">
              <a href={BLOG_BASE} className="writing-see-all" target="_blank" rel="noopener noreferrer">
                All posts →<span className="visually-hidden"> (opens in new tab)</span>
              </a>
              <a
                href="https://anindya.dev/blog/subscribe"
                className="writing-subscribe-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.umami?.track('newsletter-subscribe', { location: 'portfolio-writing' })}
              >
                Subscribe to new essays<span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
