import { forwardRef } from 'react';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ProductsSection from './ProductsSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';

interface HomeProps {
  onBooking: () => void;
}

const Home = forwardRef<HTMLElement, HomeProps>(({ onBooking }, ref) => (
  <>
    <Hero ref={ref} />
    <ExperienceSection />
    <ProductsSection />
    <EducationSection />
    <SkillsSection />
    <ContactSection onBooking={onBooking} />
  </>
));

Home.displayName = 'Home';

export default Home;
