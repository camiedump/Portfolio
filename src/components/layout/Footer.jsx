import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Handle back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Handle newsletter form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate submission - in a real app, this would connect to a service
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };
  
  // Navigation links data
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ];
  
  // Social links data
  const socialLinks = [
    { url: 'https://github.com/camiedump/', icon: 'fab fa-github', label: 'GitHub' },
    { url: 'https://www.linkedin.com/in/rosacamillelabial/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { url: 'https://instagram.com', icon: 'fab fa-instagram', label: 'Instagram' },
    { url: 'https://twitter.com', icon: 'fab fa-twitter', label: 'Twitter' }
  ];

  // Useful links data
  const usefulLinks = [
    { url: '#', label: 'Privacy Policy' },
    { url: '#', label: 'Terms of Service' },
    { url: '#', label: 'FAQ' },
    { url: '#', label: 'Support' }
  ];
  
  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const waveVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear"
      }
    }
  };
  
  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="footer-wave-container">
        <motion.div 
          className="footer-wave"
          variants={waveVariants}
          animate="animate"
        ></motion.div>
      </div>
      
      <div className="footer-container">
        <motion.div 
          className="footer-content"
          variants={footerItemVariants}
        >
          <motion.div 
            className="footer-info"
            variants={footerItemVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link to="/" className="footer-logo">CAM.EXE</Link>
            </motion.div>
            
            <motion.p 
              className="footer-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A showcase of my journey, projects, and experiences in software development.
              I'm passionate about creating beautiful, functional websites and applications.
            </motion.p>
            
            <motion.ul 
              className="footer-contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className="fas fa-map-marker-alt footer-contact-icon"></i>
                <span>Zamboanga City, Philippines</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className="fas fa-envelope footer-contact-icon"></i>
                <span>labialrosacamille@gmail.com</span>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <i className="fas fa-phone-alt footer-contact-icon"></i>
                <span>+63 906 206 3969</span>
              </motion.li>
            </motion.ul>
            
            <motion.div 
              className="footer-social"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  whileHover={{ 
                    y: -3,
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="footer-links-group"
            variants={footerItemVariants}
          >
            <motion.h4 
              className="footer-links-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Quick Links
            </motion.h4>
            <motion.nav 
              className="footer-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Link to={link.path}>
                      <i className="fas fa-chevron-right"></i>
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
          
          <motion.div 
            className="footer-links-group"
            variants={footerItemVariants}
          >
            <motion.h4 
              className="footer-links-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Resources
            </motion.h4>
            <motion.nav 
              className="footer-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {usefulLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
                >
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-chevron-right"></i>
                      {link.label}
                    </a>
                  </motion.div>
                </motion.div>
              ))}
            </motion.nav>
            
            <motion.div 
              className="footer-newsletter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Subscribe to my newsletter for the latest updates
              </motion.p>
              <motion.form 
                className="newsletter-form" 
                onSubmit={handleNewsletterSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Your email" 
                  required 
                  aria-label="Email for newsletter"
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(211, 85, 54, 0.2)",
                    borderColor: "var(--primary-color)"
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  }}
                />
                <motion.button 
                  type="submit" 
                  className="newsletter-button"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "var(--primary-color-dark)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>&copy; {currentYear} CAMI.EXE | All rights reserved.</p>
          <p>
            Designed and developed with <span role="img" aria-label="heart">❤️</span> by{' '}
            <motion.a 
              href="https://github.com/camiedump" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ 
                color: "var(--primary-color-light)",
                scale: 1.05
              }}
            >
              Camille
            </motion.a>
          </p>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            className="back-to-top" 
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ 
              y: -5,
              backgroundColor: "var(--primary-color-dark)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;