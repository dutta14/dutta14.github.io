import { forwardRef } from 'react';
import { heroData } from '../../data/portfolioData';
import '../../styles/Hero.css';

const Hero = forwardRef<HTMLElement>((_props, ref) => (
  <section className="hero" id="home" ref={ref}>
    <div className="container">
      <div className="hero-content">
        <div className="hero-text">
          <h1>{heroData.name}</h1>
          <p className="subtitle">{heroData.subtitle}</p>
          <p className="bio">{heroData.bio}</p>
        </div>
        <div className="hero-image">
          <img src={heroData.image} alt={heroData.name} />
        </div>
      </div>
    </div>
  </section>
));

Hero.displayName = 'Hero';

export default Hero;
