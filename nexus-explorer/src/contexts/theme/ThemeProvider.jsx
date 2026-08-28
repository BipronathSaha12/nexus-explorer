import React, { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus-theme') || 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    // [REQ-1] useRef to touch the DOM: set an attribute
    // Note: actually we use document.documentElement here directly as per REQ-1
    // The requirement says "toggle a CSS class" or "set an attribute".
    // We set data-theme attribute on <html>
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
