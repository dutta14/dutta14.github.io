import { Experience, Education, Product, SocialLink, WritingPost } from '../types';

export const experiences: Experience[] = [
  {
    title: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    duration: 'January 2025 - Present',
    description:
      'Leading the M365 Copilot experiences team. My team owns how Copilot shows up in Outlook, Teams, and Office. I set the product direction, shape the technical architecture, and work across orgs to ship AI features that enterprise customers actually use.',
  },
  {
    title: 'Staff Software Engineer',
    company: 'Meta',
    duration: 'January 2024 - December 2024',
    description:
      'Led the Mixed Reality Device Access Platform team at Meta Reality Labs. Built the authentication layer that lets people safely connect across virtual spaces. Harder than it sounds when there is no keyboard.',
  },
  {
    title: 'Principal Software Engineering Manager',
    company: 'Microsoft',
    duration: 'March 2020 - January 2024',
    description:
      'Led the M365 Copilot mobile experiences team during the earliest phase of Microsoft\'s AI push. Built and grew the team that shipped the first Copilot features on Outlook and Teams mobile, before most people had heard the word Copilot.',
  },
  {
    title: 'Software Engineer 2',
    company: 'Amazon',
    duration: 'June 2018 - March 2020',
    description:
      'Technical lead for Alexa Hands-Free on Android. Redesigned the wake-word pipeline, coordinated hardware partner integrations, and shipped the first hands-free Alexa experience in India. It reached 5M+ customers in under a year.',
  },
  {
    title: 'Software Engineer',
    company: 'Samsung R&D',
    duration: 'June 2014 - June 2016',
    description:
      'Built Smart Notifications, an on-device Android system that learned which notifications to surface, when, and at what priority based on how you actually used your phone. The work earned a U.S. patent (A1) for adaptive notification delivery.',
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
    scale: '5M+ users',
    slug: 'alexa-hands-free',
    description:
      'The first hands-free Alexa experience on Android in India. Built from scratch, shipped in under a year, reached 5M+ customers. Getting there meant redesigning the wake-word pipeline, coordinating hardware partners, and making voice activation work reliably across patchy mobile networks.',
  },
  {
    image: '/img/semantic-machines.png',
    alt: 'Semantic Machines Voice Assistant',
    title: 'Voice Assistant in Outlook',
    scale: 'First LLM feature in M365',
    slug: 'voice-assistant-outlook',
    description:
      'One of the first production LLM features inside a Microsoft 365 app. A voice assistant built into Outlook that let people dictate emails, search their calendar, and navigate their inbox by talking. It became the foundation for what is now M365 Copilot.',
  },
  {
    image: '/img/m365-copilot.png',
    alt: 'Microsoft 365 Copilot Chat',
    title: 'Microsoft 365 Copilot',
    scale: 'Enterprise · 400M+ seat platform',
    slug: 'm365-copilot',
    description:
      'The AI built into Outlook, Teams, and Office. It drafts emails, summarizes meetings, and answers questions using your actual work data. I ship the Copilot chat experiences and in-app AI features that enterprise customers use every day.',
  },
];

export const skills: string[] = [
  'Engineering Management (IC to GM track)',
  'AI products shipped at scale',
  'U.S. Patent holder (Android systems)',
  'Built for 5M+ users (Alexa Android)',
  'Conversational AI and LLM products',
  'Mobile platform architecture (Android and iOS)',
  'Mixed Reality authentication systems',
  '0-to-1 product launches',
  'Cross-functional team leadership',
  'M365 Copilot experiences',
  'SDK and developer platform design',
  'Technical recruiting and org scaling',
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
  bio: 'I build AI products that real people use every day. At Microsoft, I lead the team that ships M365 Copilot in Outlook, Teams, and Office. Before that: Alexa Hands-Free for 5M+ Android users in India, mixed reality auth at Meta, and a patented notification system at Samsung.',
  image: '/img/me.png',
};

export const heroStats: { value: string; label: string; href?: string }[] = [
  { value: '10+', label: 'Years in industry' },
  { value: '4', label: 'Companies' },
  { value: '5M+', label: 'Users shipped' },
  { value: '1', label: 'U.S. Patent', href: 'https://patents.google.com/patent/US20180188935A1' },
];

export const nowData = {
  work: 'Building M365 Copilot chat experiences: navigation pane improvements, session retrieval, and session search.',
  reading: {
    title: 'The Burnout Epidemic',
    author: 'Jennifer Moss',
    cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1621369315l/58090428._SX318_.jpg',
    goodreadsUrl: 'https://www.goodreads.com/book/show/58090428-the-burnout-epidemic',
    profileUrl: 'https://www.goodreads.com/user/show/48507088-anindya',
  },
};

export const ctaData = {
  heading: "Let's Talk",
  description:
    "Thinking through a career move, working on an AI product, or trying to build a team that ships? I'm happy to talk. 30 minutes, no agenda, real opinions.",
  buttonText: 'Book 30 Minutes',
  buttonHref: 'https://calendar.app.google/UeHBbGhSZYHaBGMC9',
};

export const writingData: { heading: string; subheading: string; posts: WritingPost[] } = {
  heading: 'Writing',
  subheading:
    'Occasional thoughts on engineering leadership, AI product development, and building teams that ship.',
  posts: [
    {
      title: 'Samsung, Amazon, Microsoft, Meta, Microsoft again',
      href: 'https://dutta14.github.io/blog/post/samsung-amazon-microsoft-meta-microsoft-again',
    },
    {
      title: 'The first Copilot feature nobody saw',
      href: 'https://dutta14.github.io/blog/post/the-first-copilot-feature-nobody-saw',
    },
    {
      title: 'What it felt like to ship to five million people',
      href: 'https://dutta14.github.io/blog/post/what-it-felt-like-to-ship-to-five-million-people',
    },
  ],
};
