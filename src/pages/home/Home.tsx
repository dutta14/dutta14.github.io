import { forwardRef } from 'react';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ProductsSection from './ProductsSection';
import CredentialsBar from './CredentialsBar';
import WritingSection from './WritingSection';
import NowSection from './NowSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import type { BookingContext } from '../../components/BookingModal';

interface HomeProps {
  onBooking: (context?: BookingContext) => void;
}

const Home = forwardRef<HTMLElement, HomeProps>(({ onBooking }, ref) => (
  <>
    <Hero ref={ref} />
    <ProductsSection />
    <ExperienceSection />
    <CredentialsBar />
    <NowSection />
    <WritingSection />
    <SkillsSection />
    <ContactSection onBooking={onBooking} />
  </>
));

Home.displayName = 'Home';

export default Home;
