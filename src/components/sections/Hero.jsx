import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import './Hero.css';
import { textReveal, fadeIn, softBounce } from '../../utils/animation';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'SOFTWARE DEVELOPER';
  
  // Typing effect for the subtitle
  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    const type = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(type, 100);
      } else {
        // When typing is done, blink the cursor
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        return () => clearInterval(cursorInterval);
      }
    };
    
    // Start typing after the title animation
    const startTypingTimeout = setTimeout(() => {
      type();
    }, 1000);
    
    return () => {
      clearTimeout(startTypingTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  // Text animation for the title
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.05
      }
    }
  };
  
  const letter = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const titleText = "I'M CAMILLE";

  return (
    <section className="hero">
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1 
          className="hero-title"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {titleText.split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.h2 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          A {typedText}
          {showCursor && <span className="typed-cursor"></span>}
        </motion.h2>
        
        <motion.p 
          className="hero-description"
          variants={textReveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          Creating beautiful, functional, and user-friendly digital experiences that help businesses grow and succeed in the digital world.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          variants={softBounce}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.2 }}
        >
          <Button to="/projects" variant="primary" icon={<i className="fas fa-eye"></i>}>
            View My Work
          </Button>
          <Button to="/contact" variant="outline" icon={<i className="fas fa-paper-plane"></i>}>
            Contact Me
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 2.4,
          type: "spring",
          stiffness: 50
        }}
      >
        <motion.div 
          className="profile-container"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.img 
            src="/profile2.png" 
            alt="Developer Profile" 
            className="profile-image"
            initial={{ filter: "blur(8px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 2.6 }}
          />
          <motion.div
            className="profile-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          ></motion.div>
        </motion.div>
      </motion.div>
      
      {/* Animated background elements */}
      <motion.div 
        className="background-shape shape-1"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="background-shape shape-2"
        animate={{
          x: [0, -20, 0],
          y: [0, -15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
    </section>
  );
};

export default Hero;