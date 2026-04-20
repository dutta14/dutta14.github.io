import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import useJsonLd from '../../hooks/useJsonLd';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ProductsSection from './ProductsSection';
import CredentialsBar from './CredentialsBar';
import WritingSection from './WritingSection';
import NowSection from './NowSection';
import SkillsSection from './SkillsSection';
import ContactSection from './ContactSection';
import type { BookingContext } from '../../components/BookingModal';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Anindya Dutta',
  url: 'https://anindya.dev',
  jobTitle: 'Principal SWE Manager',
  worksFor: { '@type': 'Organization', name: 'Microsoft' },
  description:
    'Principal SWE Manager at Microsoft, M365 Copilot. Writes about engineering leadership, AI product development, and career decisions.',
  sameAs: [
    'https://linkedin.com/in/dutta14',
    'https://github.com/dutta14',
    'https://anindya.dev/blog',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Anindya Dutta',
  url: 'https://anindya.dev',
  description:
    'Principal SWE Manager at Microsoft, M365 Copilot. Engineering leadership, AI product development, and career decisions.',
  author: { '@type': 'Person', name: 'Anindya Dutta', url: 'https://anindya.dev' },
};

interface HomeProps {
  onBooking: (context?: BookingContext) => void;
}

const Home = forwardRef<HTMLElement, HomeProps>(({ onBooking }, ref) => {
  useJsonLd([personJsonLd, websiteJsonLd]);

  return (
    <>
      <Helmet>
        <title>Anindya Dutta — Engineering Leader &amp; AI Product Builder</title>
        <meta
          name="description"
          content="Principal SWE Manager at Microsoft, M365 Copilot. Shipped Alexa Hands-Free (5M+ users), built voice AI in Outlook, mixed reality auth at Meta."
        />
      </Helmet>
      <Hero ref={ref} />
      <ProductsSection />
      <ExperienceSection />
      <CredentialsBar />
      <NowSection />
      <WritingSection />
      <SkillsSection />
      <ContactSection onBooking={onBooking} />
    </>
  );
});

Home.displayName = 'Home';

export default Home;
