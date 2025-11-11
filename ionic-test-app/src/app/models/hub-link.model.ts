export interface HubLinkConfig {
  config: Config;
  categories: Category[];
  links: Link[];
}

export interface Config {
  adminEnabled: boolean;
  companyName: string;
  companyTagline: string;
  welcomeMessage?: string;
  logo?: string;
  theme: Theme;
}

export interface Theme {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  categories: string[];
}
