import { useEffect } from 'react';
import linksData from '@/data/links.json';

export const useTheme = () => {
  useEffect(() => {
    const { theme } = linksData.config;
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
  }, []);
};
