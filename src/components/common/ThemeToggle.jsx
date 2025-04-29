import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Animation variants for the toggle button - updated colors for visibility
  const toggleVariants = {
    light: { 
      backgroundColor: '#f0f0f0',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    },
    dark: { 
      backgroundColor: '#2c3e50', // Deeper dark color for better contrast
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3 }
    }
  };
  
  // Animation variants for the sun icon - improved visibility
  const sunVariants = {
    light: { 
      rotate: 0,
      scale: 1,
      color: '#f1c40f', // Brighter, more vibrant yellow
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    dark: { 
      rotate: 45,
      scale: 0,
      color: '#f1c40f',
      opacity: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  // Animation variants for the moon icon - improved visibility
  const moonVariants = {
    light: { 
      rotate: -45,
      scale: 0,
      color: '#7f8c8d', // Soft gray
      opacity: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    dark: { 
      rotate: 0,
      scale: 1,
      color: '#ecf0f1', // Very light, almost white
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      variants={toggleVariants}
      animate={theme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={false}
    >
      <motion.div className="icon-container">
        <motion.i 
          className="fas fa-sun sun-icon"
          variants={sunVariants}
          animate={theme}
          initial={false}
        ></motion.i>
        <motion.i 
          className="fas fa-moon moon-icon"
          variants={moonVariants}
          animate={theme}
          initial={false}
        ></motion.i>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;