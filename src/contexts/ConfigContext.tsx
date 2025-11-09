import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Config {
  adminEnabled?: boolean;
  companyName: string;
  companyTagline: string;
  welcomeMessage: string;
  logo: string;
  theme: {
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
  };
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  categories: string[];
}

interface ConfigData {
  config: Config;
  categories: Category[];
  links: Link[];
}

interface ConfigContextType {
  configData: ConfigData | null;
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType>({ configData: null, isLoading: true });

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/config.json')
      .then((response) => response.json())
      .then((data) => {
        setConfigData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load config:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <ConfigContext.Provider value={{ configData, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};
