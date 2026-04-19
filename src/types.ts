export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  field: string;
  school: string;
  years: string;
}

export interface Product {
  image: string;
  alt: string;
  title: string;
  scale: string;
  slug: string;
  description: string;
}

export interface SocialLink {
  href: string;
  icon: string;
  title: string;
  external: boolean;
}

export interface WritingPost {
  title: string;
  href: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  role: string;
  company: string;
  year: string;
  impact: string;
  sections: CaseStudySection[];
}
