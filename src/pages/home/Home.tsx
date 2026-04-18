import { forwardRef } from 'react';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ProductsSection from './ProductsSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

const Home = forwardRef<HTMLElement>((_props, ref) => (
  <>
    <Hero ref={ref} />
    <ExperienceSection />
    <ProductsSection />
    <EducationSection />
    <SkillsSection />
    <ContactSection />
  </>
));

Home.displayName = 'Home';

export default Home;
