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
