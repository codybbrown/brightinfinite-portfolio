export interface Bio {
  id: string;
  name: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
  skills: string[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
}
