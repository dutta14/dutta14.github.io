import { useState, useEffect } from 'react';
import {
  speakingIntro,
  talkTopics,
  speakerBios,
  speakingCtaData,
} from '../../data/portfolioData';
import '../../styles/Speaking.css';
import type { BookingContext } from '../../components/BookingModal';

interface SpeakingPageProps {
  onBooking: (context?: BookingContext) => void;
}

const SpeakingPage = ({ onBooking }: SpeakingPageProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.umami?.track('speaking-page-view');
  }, []);

  useEffect(() => {
    document.title = 'Speaking & Availability | Anindya Dutta';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'Anindya Dutta speaks on AI products at enterprise scale, engineering leadership, and building in unfamiliar markets. Principal SWE Manager at Microsoft, M365 Copilot. Book a speaking engagement.',
      );
    }
    return () => {
      document.title = 'Anindya Dutta - Software Engineering Leader';
      if (meta) {
        meta.setAttribute(
          'content',
          'Anindya Dutta — Principal SWE Manager at Microsoft. Shipped M365 Copilot, Alexa Hands-Free (5M+ users). Engineering leadership, AI products, patents.',
        );
      }
    };
  }, []);

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      const bioLengths = ['50', '150', '300'] as const;
      window.umami?.track('speaker-bio-copy', { length: bioLengths[idx] ?? String(idx) });
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      /* clipboard unavailable — silent fail */
    }
  };

  return (
    <div className="speaking-page">
      {/* Section 1: Speaker Intro */}
      <section className="speaking-intro">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="speaking-heading">Speaking &amp; Availability</h1>
              <p className="speaking-intro-text">{speakingIntro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Talk Topics */}
      <section className="speaking-topics">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h2 className="speaking-topics-label">Talk topics</h2>
              <div className="speaking-topics-grid">
                {talkTopics.map((topic) => (
                  <div className="speaking-topic-card" key={topic.title}>
                    <h2 className="speaking-topic-title">{topic.title}</h2>
                    <p className="speaking-topic-desc">{topic.description}</p>
                    <p className="speaking-topic-audience">{topic.audience}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Bio Kit */}
      <section className="speaking-bios">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h2 className="speaking-bios-label">Speaker bio</h2>
              {speakerBios.map((bio, i) => (
                <div className="speaking-bio-card" key={bio.label}>
                  <div className="speaking-bio-header">
                    <span className="speaking-bio-label">{bio.label}</span>
                    <button
                      className={`speaking-bio-copy${copiedIdx === i ? ' speaking-bio-copy--copied' : ''}`}
                      onClick={() => handleCopy(bio.text, i)}
                      aria-label={`Copy ${bio.label} bio`}
                    >
                      <i className={copiedIdx === i ? 'fas fa-check' : 'fas fa-copy'} aria-hidden="true"></i>
                      <span aria-live="polite">{copiedIdx === i ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="speaking-bio-text">{bio.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="speaking-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h2>{speakingCtaData.heading}</h2>
              <p className="speaking-cta-desc">{speakingCtaData.description}</p>
              <button className="cta-button" onClick={() => onBooking('speaking')}>
                {speakingCtaData.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakingPage;
