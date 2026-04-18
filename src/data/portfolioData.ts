import { Experience, Education, Product, SocialLink } from '../types';

export const experiences: Experience[] = [
  {
    title: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    duration: 'January 2025 - Present',
    description:
      'Leading the M365 Copilot experiences team. Building client experiences on Outlook, Teams, and Office that interact with AI systems using M365 Copilot.',
  },
  {
    title: 'Staff Software Engineer',
    company: 'Meta',
    duration: 'January 2024 - December 2024',
    description:
      'Led the Mixed Reality Device Access Platform team. Built world-class authentication systems empowering users to safely and securely connect in virtual spaces.',
  },
  {
    title: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    duration: 'March 2020 - January 2024',
    description:
      'Led the M365 Copilot mobile experiences team. Managed cross-functional team to deliver AI-integrated experiences on M365 applications.',
  },
  {
    title: 'Software Engineer 2',
    company: 'Amazon',
    duration: 'June 2018 - March 2020',
    description:
      'Technical lead for Alexa Hands-Free on Android. Introduced hands-free experience in India, scaling to 5 million+ customers.',
  },
  {
    title: 'Software Engineer',
    company: 'Samsung R&D',
    duration: 'June 2014 - June 2016',
    description:
      'Developed Smart Notifications (A1 patent). Intelligent Android notification system that analyzes user preferences to optimize notification delivery.',
  },
];

export const educations: Education[] = [
  {
    degree: 'Master of Science',
    field: 'Computer Science',
    school: 'University of Southern California',
    years: '2016 - 2018',
  },
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science and Engineering',
    school: 'Manipal University',
    years: '2010 - 2014',
  },
];

export const products: Product[] = [
  {
    image: '/img/alexa-handsfree.png',
    alt: 'Alexa Hands-Free',
    title: 'Alexa Hands-Free',
    description:
      'Introduced hands-free experience in India, scaling to 5M+ customers on Android.',
  },
  {
    image: '/img/semantic-machines.png',
    alt: 'Semantic Machines Voice Assistant',
    title: 'Voice Assistant in Outlook',
    description:
      'Intelligent voice-enabled assistant integrated into Outlook for seamless communication.',
  },
  {
    image: '/img/m365-copilot.png',
    alt: 'Microsoft 365 Copilot Chat',
    title: 'Microsoft 365 Copilot',
    description:
      'AI-integrated chat and experiences across Outlook, Teams, and Office applications.',
  },
];

export const skills: string[] = [
  'Leadership',
  'Product Strategy',
  'Software Design',
  'AI Product Engineering',
  'Conversational AI Architecture',
  'AI Platform Scalability',
  'Human-Centered AI UX',
  'Engineering Leadership',
  'Technical Strategy & Execution',
  'Cross-Org Technical Alignment',
  'Zero-to-One Product Development',
  'High-Performance Team Building',
];

export const socialLinks: SocialLink[] = [
  {
    href: 'http://linkedin.com/in/dutta14',
    icon: 'fab fa-linkedin',
    title: 'LinkedIn',
    external: true,
  },
  {
    href: 'http://github.com/dutta14',
    icon: 'fab fa-github',
    title: 'GitHub',
    external: true,
  },
  {
    href: 'mailto:hello@anindya.dev',
    icon: 'fas fa-envelope',
    title: 'Email',
    external: false,
  },
  {
    href: 'https://stackoverflow.com/users/3993371/anindya-dutta',
    icon: 'fab fa-stack-overflow',
    title: 'Stack Overflow',
    external: true,
  },
];

export const heroData = {
  name: 'Anindya Dutta',
  subtitle: 'Principal Software Engineering Manager',
  bio: 'Experienced engineering leader at Microsoft, specializing in building world-class teams and delivering high-impact solutions. Passionate about driving innovation across mobile, cloud, and AI platforms.',
  image: '/img/me.png',
};

export const ctaData = {
  heading: 'Get In Touch',
  description:
    "Interested in discussing leadership, engineering strategy, or exploring career growth? I'd love to chat.",
  buttonText: 'Book an Appointment',
  buttonHref: 'https://calendar.app.google/UeHBbGhSZYHaBGMC9',
};
