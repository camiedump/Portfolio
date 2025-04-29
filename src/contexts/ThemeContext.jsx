import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has set a preference in their OS
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Return saved theme if it exists, otherwise use OS preference
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });
  
  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Update body class
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
