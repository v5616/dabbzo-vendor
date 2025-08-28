'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  colors: ThemeColors;
  mode: ThemeMode;
  setThemeColor: (key: keyof ThemeColors, value: string) => void;
  resetTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const lightTheme: ThemeColors = {
  primary: '#FF5A1F',    // Orange
  secondary: '#3B82F6',  // Blue
  accent: '#10B981',     // Green
  background: '#F9FAFB', // Light gray
  text: '#1F2937',       // Dark gray
};

const darkTheme: ThemeColors = {
  primary: '#FF5A1F',    // Orange
  secondary: '#60A5FA',  // Lighter blue
  accent: '#34D399',     // Lighter green
  background: '#111827', // Dark blue-gray
  text: '#F9FAFB',       // Light gray
};

const defaultColors = lightTheme;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [mode, setMode] = useState<ThemeMode>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme on client side only
  useEffect(() => {
    const savedTheme = localStorage.getItem('dabbzoTheme');
    const savedMode = localStorage.getItem('dabbzoThemeMode') as ThemeMode;
    
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setColors(parsedTheme);
      } catch (error) {
        console.error('Failed to parse saved theme:', error);
      }
    }
    
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    // Save theme to localStorage when it changes
    localStorage.setItem('dabbzoTheme', JSON.stringify(colors));
    localStorage.setItem('dabbzoThemeMode', mode);
    
    // Apply CSS variables to :root
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors, mode, isInitialized]);

  const setThemeColor = (key: keyof ThemeColors, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetTheme = () => {
    const newColors = mode === 'dark' ? darkTheme : lightTheme;
    setColors(newColors);
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    // When switching modes, apply the corresponding theme colors
    const newColors = newMode === 'dark' ? darkTheme : lightTheme;
    setColors(newColors);
  };

  return (
    <ThemeContext.Provider value={{ colors, mode, setThemeColor, resetTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}