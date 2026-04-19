import { forwardRef } from 'react';
import { heroData, heroStats } from '../../data/portfolioData';
import '../../styles/Hero.css';

const Hero = forwardRef<HTMLElement>((_props, ref) => (
  <section className="hero" id="home" ref={ref}>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="hero-content">
            <div className="hero-text">
              <h1>{heroData.name}</h1>
              <p className="subtitle">{heroData.subtitle}</p>
              <p className="bio">{heroData.bio}</p>
              <div className="hero-stats">
                {heroStats.map((stat) => (
                  <div className="hero-stat" key={stat.label}>
                    <span className="hero-stat-value">
                      {stat.href ? (
                        <a href={stat.href} target="_blank" rel="noopener noreferrer" className="hero-stat-link">
                          {stat.value}
                          <span className="visually-hidden"> (opens in new tab)</span>
                        </a>
                      ) : (
                        stat.value
                      )}
                    </span>
                    <span className="hero-stat-label">
                      {stat.href ? (
                        <a href={stat.href} target="_blank" rel="noopener noreferrer" className="hero-stat-link">
                          {stat.label}
                          <span className="visually-hidden"> (opens in new tab)</span>
                        </a>
                      ) : (
                        stat.label
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-image">
              <img src={heroData.image} alt="Portrait of Anindya Dutta" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
));

Hero.displayName = 'Hero';

export default Hero;
