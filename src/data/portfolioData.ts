import { Experience, Education, Product, SocialLink, WritingPost, SkillPillar, TalkTopic, SpeakerBio } from '../types';

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

export const skillPillars: SkillPillar[] = [
  {
    title: 'AI Product Engineering',
    evidence: 'M365 Copilot, Alexa Hands-Free, Voice Assistant in Outlook, Patent US20180188935A1',
  },
  {
    title: 'Zero-to-One Builds',
    evidence: 'Alexa Hands-Free India launch (0 → 5M users), Outlook voice assistant, Copilot mobile experiences',
  },
  {
    title: 'Engineering Leadership',
    evidence: 'Teams of 15-20 across 5 companies, cross-org alignment at Microsoft, mixed reality platform at Meta',
  },
  {
    title: 'Writing and Thinking',
    evidence: '40 essays on engineering leadership, Amazon six-pager discipline, Microsoft growth mindset culture',
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: 'https://linkedin.com/in/dutta14',
    icon: 'fab fa-linkedin',
    title: 'LinkedIn',
    external: true,
  },
  {
    href: 'https://github.com/dutta14',
    icon: 'fab fa-github',
    title: 'GitHub',
    external: true,
  },
  {
    href: 'https://anindya.dev/blog/feed.xml',
    icon: 'fas fa-rss',
    title: 'RSS',
    external: true,
  },
];

export const heroData = {
  name: 'Anindya Dutta',
  subtitle: 'Engineering leader. AI product builder.',
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
  subheading:
    "I'm currently open to speaking engagements, mentorship conversations, and interesting problems in AI product engineering.",
  channels: [
    {
      id: 'book',
      icon: 'fas fa-calendar',
      title: 'Book a conversation',
      description: 'Career moves, AI products, team building. 30 minutes, no agenda, real opinions.',
      action: { label: 'Book 30 Minutes', href: 'https://calendar.app.google/UeHBbGhSZYHaBGMC9' },
    },
    {
      id: 'email',
      icon: 'fas fa-envelope',
      title: 'Professional inquiries',
      description: 'Speaking, advisory, podcasts, or press.',
      action: { label: 'hello@anindya.dev', href: 'mailto:hello@anindya.dev' },
    },
    {
      id: 'blog',
      icon: 'fas fa-pen-nib',
      title: 'Read the blog',
      description: '40+ essays on engineering leadership and building AI products.',
      action: { label: 'Read essays', href: 'https://anindya.dev/blog' },
    },
  ],
  responseTime: 'I typically respond within 48 hours.',
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

export const speakingIntro =
  "I've built AI products used by hundreds of millions of people and led teams that shipped to unfamiliar markets on tight timelines. I talk about what I've actually seen work: scaling enterprise AI, entering new markets from zero, and the real mechanics of engineering leadership. I prefer specific stories over frameworks.";

export const talkTopics: TalkTopic[] = [
  {
    title: 'What 400M Seats Teaches You About AI Products',
    description:
      'Building AI features for M365 Copilot means every design choice hits hundreds of millions of users. I cover what changes when you ship AI at enterprise scale: the tradeoffs that don\u2019t exist in demos, and the decisions that only matter at volume.',
    audience: 'Product leaders, engineering teams',
  },
  {
    title: '5 Million Users in a Market You Don\u2019t Know',
    description:
      'I led the Alexa Hands-Free launch in India and grew it to 5M+ users in under a year. This talk covers how to ship in a market where your assumptions are wrong, your playbook doesn\u2019t apply, and speed matters more than polish.',
    audience: 'Product managers, growth teams',
  },
  {
    title: 'The Things Nobody Tells You About Managing Engineers',
    description:
      'I\u2019ve been an IC at four companies and a manager at two. The transition is harder than people admit and different than the books describe. I talk about what actually changes, what you lose, what you gain, and when to switch back.',
    audience: 'Senior engineers, new managers',
  },
  {
    title: 'Why Enterprise Software Is Harder Than You Think',
    description:
      'Consumer products get the glamour. Enterprise platforms carry the complexity. After years on M365, I share what makes enterprise software genuinely difficult: the coordination costs, the backwards compatibility constraints, the politics of platform teams, and what it takes to ship anyway.',
    audience: 'Engineering leaders, platform teams',
  },
];

export const speakerBios: SpeakerBio[] = [
  {
    label: '50 words',
    wordCount: 50,
    text: 'Anindya Dutta is a Principal SWE Manager at Microsoft, where he works on M365 Copilot. Previously, he led the Alexa Hands-Free team at Amazon (5M+ users in India) and worked at Meta Reality Labs and Samsung. He writes about engineering leadership, AI products, and career decisions.',
  },
  {
    label: '150 words',
    wordCount: 150,
    text: 'Anindya Dutta is a Principal Software Engineering Manager at Microsoft, working on M365 Copilot, the AI assistant built into a platform with 400M+ seats. He leads teams building AI product experiences at enterprise scale.\n\nBefore Microsoft, Anindya was a tech lead at Amazon, where he led the Alexa Hands-Free launch in India and grew it to 5M+ users in under a year. He also worked as a Staff Software Engineer at Meta Reality Labs and started his career at Samsung.\n\nAcross five companies and 10+ years in the industry, he has shipped products at every stage: from zero-to-one launches to features serving hundreds of millions. He holds a U.S. patent (US20180188935A1) for adaptive notification delivery.\n\nAnindya writes regularly on his blog, where he has published 40+ essays on engineering leadership, building AI products, and the career decisions that don\u2019t have obvious answers.',
  },
  {
    label: '300 words',
    wordCount: 300,
    text: 'Anindya Dutta is a Principal Software Engineering Manager at Microsoft, working on M365 Copilot. His team builds AI product experiences on top of a platform that reaches 400M+ seats. It\u2019s the kind of scale where small decisions have large consequences, and he thinks a lot about how to make the right ones.\n\nBefore his current role, Anindya was at Meta, working as a Staff Software Engineer on Reality Labs. Before that, he was a tech lead at Amazon, where he led the launch of Alexa Hands-Free in India. That product went from zero to 5M+ users in under a year, in a market the team was learning as they shipped. He started his career at Samsung, building mobile experiences early enough to see the entire smartphone platform era take shape.\n\nAcross five companies and over a decade in the industry, Anindya has done both: the individual contributor work of writing code and designing systems, and the management work of building teams, setting direction, and making tradeoffs. He has shipped consumer products and enterprise platforms, worked in the U.S. and on products built for international markets, and navigated organizations that range from startup-speed teams to 100,000+ person companies. He holds a U.S. patent (US20180188935A1) for adaptive notification delivery.\n\nAnindya writes regularly on his blog, where he has published 40+ essays on engineering leadership, AI products, and career decisions. His writing is direct and specific. He writes about what he has actually experienced, not what sounds good in a conference abstract. Topics include the real mechanics of managing engineers, what changes when AI products hit enterprise scale, and the career tradeoffs that nobody warns you about.\n\nHe is available for speaking engagements, podcast appearances, and panel discussions.',
  },
];

export const speakingCtaData = {
  heading: 'Interested in having me speak?',
  description:
    'I\u2019m available for conferences, podcasts, panels, and internal engineering talks.',
  buttonText: 'Book a speaking engagement',
};
