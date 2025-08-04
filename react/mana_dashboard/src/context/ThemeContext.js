import React, { createContext, useState, useMemo, useEffect } from 'react';
import getTheme from '../theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setMode(savedTheme);
      document.body.className = `${savedTheme}-mode`;
    } else {
      const currentHour = new Date().getHours();
      const newTheme = currentHour >= 6 && currentHour < 18 ? 'light' : 'dark';
      setMode(newTheme);
      document.body.className = `${newTheme}-mode`;
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
    document.body.className = `${newMode}-mode`;
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children(theme)}
    </ThemeContext.Provider>
  );
};
