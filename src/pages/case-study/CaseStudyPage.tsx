import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import useJsonLd from '../../hooks/useJsonLd';
import { caseStudies } from '../../data/caseStudies';
import AlexaDiagram from '../../components/diagrams/AlexaDiagram';
import VoiceAssistantDiagram from '../../components/diagrams/VoiceAssistantDiagram';
import CopilotDiagram from '../../components/diagrams/CopilotDiagram';
import '../../styles/CaseStudy.css';
import '../../styles/Diagram.css';

const readingTime = (sections: { body: string }[]) => {
  const words = sections.reduce((n, s) => n + s.body.split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 230));
};

const BLOG_BASE = 'https://anindya.dev/blog/post';

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((cs) => cs.slug === slug);
  const currentIdx = caseStudies.findIndex((cs) => cs.slug === slug);
  const nextStudy = caseStudies[(currentIdx + 1) % caseStudies.length];

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (study && slug) {
      window.umami?.track('case-study-view', { slug });
    }
  }, [study, slug]);

  useEffect(() => {
    if (!study) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [study, slug]);

  if (!study) {
    return (
      <div className="cs-not-found">
        <h1>Case study not found</h1>
        <Link to="/" className="cs-back-link">← Back to home</Link>
      </div>
    );
  }

  const diagramMap: Record<string, React.ReactNode> = {
    'alexa-hands-free': <AlexaDiagram />,
    'voice-assistant-outlook': <VoiceAssistantDiagram />,
    'm365-copilot': <CopilotDiagram />,
  };

  const minutes = readingTime(study.sections);

  const articleJsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.subtitle,
    image: `https://anindya.dev${study.image}`,
    author: {
      '@type': 'Person',
      name: 'Anindya Dutta',
      url: 'https://anindya.dev',
      jobTitle: 'Principal SWE Manager',
      worksFor: { '@type': 'Organization', name: 'Microsoft' },
    },
    publisher: { '@type': 'Person', name: 'Anindya Dutta', url: 'https://anindya.dev' },
    mainEntityOfPage: `https://anindya.dev/case-study/${study.slug}`,
    about: {
      '@type': 'Organization',
      name: study.company,
    },
    url: `https://anindya.dev/case-study/${study.slug}`,
    timeRequired: `PT${minutes}M`,
  }), [study, minutes]);

  useJsonLd(articleJsonLd);

  return (
    <article className="cs">
      {/* Full-width hero */}
      <div className="cs-hero">
        <div className="cs-hero-overlay" />
        <img src={study.image} alt="" className="cs-hero-bg" />
        <div className="container cs-hero-content">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <Link to="/#products" className="cs-back-link cs-back-link--hero">
                ← Back to projects
              </Link>
              <div className="cs-hero-meta">
                <span className="cs-pill">{study.company}</span>
                <span className="cs-hero-year">{study.year}</span>
                <span className="cs-hero-dot">·</span>
                <span className="cs-hero-read">{minutes} min read</span>
              </div>
              <h1 className="cs-hero-title">{study.title}</h1>
              <p className="cs-hero-subtitle">{study.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="cs-stats-bar">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cs-stats">
                <div className="cs-stat">
                  <span className="cs-stat-label">Role</span>
                  <span className="cs-stat-value">{study.role}</span>
                </div>
                <div className="cs-stat-divider" />
                <div className="cs-stat">
                  <span className="cs-stat-label">Timeline</span>
                  <span className="cs-stat-value">{study.year}</span>
                </div>
                <div className="cs-stat-divider" />
                <div className="cs-stat">
                  <span className="cs-stat-label">Impact</span>
                  <span className="cs-stat-value">{study.impact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="cs-body-wrap">
        <div className="container">
          <div className="row">
            {/* Table of contents - sticky sidebar */}
            <div className="col-lg-3 offset-lg-1 cs-toc-col">
              <nav className="cs-toc" aria-label="Table of contents">
                <span className="cs-toc-label">Contents</span>
                <ol className="cs-toc-list" role="list">
                  {study.sections.map((section, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className={`cs-toc-link${activeSection === i ? ' cs-toc-link--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Main content */}
            <div className="col-lg-7 cs-content-col">
              <div className="cs-content">
                {diagramMap[study.slug] && (
                  <div className="cs-diagram">{diagramMap[study.slug]}</div>
                )}
                {study.sections.map((section, i) => (
                  <section
                    className="cs-section"
                    key={i}
                    id={`section-${i}`}
                    ref={(el) => { sectionRefs.current[i] = el; }}
                    aria-labelledby={`section-heading-${i}`}
                  >
                    <div className="cs-section-num">{String(i + 1).padStart(2, '0')}</div>
                    <h2 className="cs-section-heading" id={`section-heading-${i}`}>{section.heading}</h2>
                    {section.body.split('\n\n').map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </section>
                ))}
              </div>

              {/* From the blog */}
              {study.relatedBlogPosts && study.relatedBlogPosts.length > 0 && (
                <div className="cs-blog">
                  <span className="cs-blog-label">From the blog</span>
                  <div className="cs-blog-posts">
                    {study.relatedBlogPosts.map((post) => (
                      <a
                        key={post.slug}
                        className="cs-blog-link"
                        href={`${BLOG_BASE}/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="cs-blog-title">{post.title}</span>
                        <span className="visually-hidden"> (opens in new tab)</span>
                        <span className="cs-blog-arrow" aria-hidden="true">&#8594;</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Next case study */}
              {nextStudy && nextStudy.slug !== study.slug && (
                <div className="cs-next">
                  <span className="cs-next-label">Next case study</span>
                  <Link to={`/case-study/${nextStudy.slug}`} className="cs-next-link">
                    <span className="cs-next-title">{nextStudy.title}</span>
                    <span className="cs-next-arrow">→</span>
                  </Link>
                </div>
              )}

              {/* Footer */}
              <footer className="cs-footer">
                <Link to="/#products" className="cs-back-link">← All projects</Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CaseStudyPage;
