import { useEffect } from 'react';
import { useConfig } from '@/contexts/ConfigContext';

export const useTheme = () => {
  const { configData } = useConfig();
  
  useEffect(() => {
    if (!configData) return;
    
    const { theme } = configData.config;
    const root = document.documentElement;

    // Apply theme colors from JSON to CSS variables
    Object.entries(theme).forEach(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVarName}`, value);
    });

    // Update gradient based on primary and accent colors
    root.style.setProperty(
      '--gradient-primary',
      `linear-gradient(135deg, hsl(${theme.primary}) 0%, hsl(${theme.accent}) 100%)`
    );
  }, [configData]);
};
