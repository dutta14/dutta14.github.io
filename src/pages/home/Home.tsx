import { forwardRef } from 'react';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ProductsSection from './ProductsSection';
import EducationSection from './EducationSection';
import WritingSection from './WritingSection';
import NowSection from './NowSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

interface HomeProps {
  onBooking: () => void;
}

const Home = forwardRef<HTMLElement, HomeProps>(({ onBooking }, ref) => (
  <>
    <Hero ref={ref} />
    <ProductsSection />
    <ExperienceSection />
    <EducationSection />
    <NowSection />
    <WritingSection />
    <SkillsSection />
    <ContactSection onBooking={onBooking} />
  </>
));

Home.displayName = 'Home';

export default Home;
