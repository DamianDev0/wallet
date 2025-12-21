import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '@theme/index';
import type { Theme, ColorScheme } from '@theme/types';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@wallet_theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setColorScheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (scheme: ColorScheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setTheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    saveTheme(scheme);
  };

  const toggleTheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setTheme(newScheme);
  };

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const isDark = colorScheme === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        isDark,
        toggleTheme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
