import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

// ScrollToTop component to ensure page starts at top when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// FIXED: Animation for route transitions - dramatically simplified for reliability
const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // FIXED: Simplified page transition variants - opacity only, no y movement
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.15 // FIXED: Very quick fade for immediate visibility
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1 // FIXED: Very quick exit
      }
    }
  };

  return (
    // FIXED: Set initial={false} to prevent animation on first render
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="page-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // FIXED: Reduced loading time for better user experience
    const totalLoadTime = 1000; // Reduced from 2000ms to 1000ms (1 second)
    const interval = 50; // update every 50ms
    const steps = totalLoadTime / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.floor((currentStep / steps) * 100));
      setLoadingProgress(progress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  // Loading screen animation variants
  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 } // FIXED: Faster exit
    }
  };
  
  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  };
  
  const loadingBarVariants = {
    hidden: { width: 0 },
    visible: progress => ({ 
      width: `${progress}%`,
      transition: { duration: 0.5, ease: "easeInOut" }
    })
  };

  if (isLoading) {
    return (
      <motion.div 
        className="loader"
        variants={loaderVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="loader-content">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            CAM.EXE
          </motion.h1>
          
          <div className="loading-bar-container">
            <motion.div 
              className="loading-bar-progress"
              variants={loadingBarVariants}
              initial="hidden"
              animate="visible"
              custom={loadingProgress}
            ></motion.div>
          </div>
          
          <motion.div 
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading
            <motion.span 
              className="loading-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1.4, 
                  repeat: Infinity, 
                  repeatDelay: 0 
                }}
              >.</motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1.4, 
                  repeat: Infinity, 
                  repeatDelay: 0,
                  delay: 0.2
                }}
              >.</motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1.4, 
                  repeat: Infinity, 
                  repeatDelay: 0,
                  delay: 0.4
                }}
              >.</motion.span>
            </motion.span>
            <span className="sr-only">{loadingProgress}%</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <ScrollToTop />
          <main className="main-content">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:id" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                {/* FIXED: Added 404 route for missing pages */}
                <Route path="*" element={
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    flexDirection: 'column',
                    padding: '20px',
                    textAlign: 'center'
                  }}>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                  </div>
                } />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;