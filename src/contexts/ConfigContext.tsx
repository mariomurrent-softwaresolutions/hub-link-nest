import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";

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
  refetch: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType>({ 
  configData: null, 
  isLoading: true,
  refetch: async () => {},
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadConfig = useCallback(async () => {
    try {
      const response = await fetch('/config.json');
      const jsonConfig = await response.json();

      if (!jsonConfig.config.adminEnabled) {
        setConfigData(jsonConfig);
        setIsLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setConfigData(jsonConfig);
        setIsLoading(false);
        return;
      }

      const { data: siteConfig } = await supabase
        .from("site_config")
        .select("*")
        .maybeSingle();

      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");

      const { data: linksData } = await supabase
        .from("links")
        .select(`
          *,
          link_categories(category_id)
        `);

      if (siteConfig && categoriesData && linksData) {
        setConfigData({
          config: {
            adminEnabled: true,
            companyName: siteConfig.company_name,
            companyTagline: siteConfig.company_tagline,
            welcomeMessage: siteConfig.welcome_message,
            logo: siteConfig.logo,
            theme: siteConfig.theme as any,
          },
          categories: categoriesData.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
          })),
          links: linksData.map(link => ({
            id: link.id,
            title: link.title,
            description: link.description,
            url: link.url,
            image: link.image,
            categories: (link as any).link_categories?.map((lc: any) => lc.category_id) || [],
          })),
        });
      } else {
        setConfigData(jsonConfig);
      }
    } catch (error) {
      console.error('Failed to load config:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <ConfigContext.Provider value={{ configData, isLoading, refetch: loadConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
