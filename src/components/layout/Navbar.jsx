import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation links data for easier maintenance
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ];

  // Social links data
  const socialLinks = [
    { url: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { url: 'https://instagram.com', icon: 'fab fa-instagram', label: 'Instagram' },
    { url: 'https://github.com', icon: 'fab fa-github', label: 'GitHub' }
  ];

  // Hover animation for nav links
  const linkHoverVariants = {
    initial: { width: 0 },
    hover: { 
      width: '100%',
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  // Staggered mobile menu animation
  const menuVariants = {
    closed: {
      right: '-100%',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      right: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Mobile menu item animation
  const menuItemVariants = {
    closed: { 
      opacity: 0,
      x: 20
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <>
      <motion.header 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20, 
          duration: 0.7 
        }}
      >
        <div className="navbar-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="logo">DEVPORTFOLIO</Link>
          </motion.div>
          
          <motion.div 
            className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}
            variants={menuVariants}
            initial="closed"
            animate={isMobileMenuOpen ? "open" : "closed"}
          >
            <motion.nav className="nav-links">
              {navLinks.map((link, index) => (
                <motion.div 
                  key={link.path}
                  className="nav-link-container"
                  variants={menuItemVariants}
                  custom={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <Link 
                    to={link.path} 
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.label}
                    <motion.div 
                      className="link-hover-indicator"
                      variants={linkHoverVariants}
                      initial="initial"
                      whileHover="hover"
                      animate={location.pathname === link.path ? "hover" : "initial"}
                    ></motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            
            <motion.div 
              className="navbar-social"
              variants={menuItemVariants}
              initial={{ opacity: 1 }}  // Ensure full opacity
              animate={{ opacity: 1 }}  // Maintain full opacity
            >
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.url}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.label}
                  whileHover={{ 
                    y: -3, 
                    backgroundColor: "var(--primary-color)",
                    color: "white"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 1, scale: 1 }}  // Ensure full visibility
                  animate={{ opacity: 1, scale: 1 }}  // Maintain full visibility
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <i className={link.icon}></i>
                </motion.a>
              ))}
              <ThemeToggle />
            </motion.div>
          </motion.div>
          
          <motion.button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                translateY: isMobileMenuOpen ? 7 : 0
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1,
                width: isMobileMenuOpen ? 0 : "100%"
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                translateY: isMobileMenuOpen ? -7 : 0
              }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Overlay to close menu when clicking outside */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMobileMenu}
            aria-hidden="true"
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;