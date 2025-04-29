import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, education } from '../../data/experiences';
import './Experience.css';
import { fadeIn, timelineItem, shouldAnimate } from '../../utils/animation';

const Experience = ({ isPage = true }) => {
  const [activeTab, setActiveTab] = useState('work');
  const [animatedItems, setAnimatedItems] = useState([]);
  
  // Reset animations when tab changes
  useEffect(() => {
    setAnimatedItems([]);
    
    // Animate items one by one with delay
    let delay = 0;
    let itemsArray = activeTab === 'work' ? experiences : education;
    
    itemsArray.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedItems(prev => [...prev, index]);
      }, delay);
      delay += 200;
    });
  }, [activeTab]);
  
  // Icons for work and education
  const getIcon = (type, company) => {
    // Work icons based on company name (for demonstration)
    if (type === 'work') {
      if (company.toLowerCase().includes('tech')) return 'fas fa-university';
      if (company.toLowerCase().includes('university') || company.toLowerCase().includes('school')) return 'fas fa-laptop-code';
      return 'fas fa-briefcase';
    }
    
    // Education icons
    return 'fas fa-graduation-cap';
  };
  
  // Tab switching animation
  const tabVariants = {
    active: {
      color: "var(--primary-color)",
      transition: {
        duration: 0.3
      }
    },
    inactive: {
      color: "var(--text-color-light)",
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Indicator line animation
  const indicatorVariants = {
    work: {
      left: "25%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    education: {
      left: "75%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };
  
  return (
    <motion.section 
      className="experience-section"
      {...shouldAnimate(isPage)}
      variants={fadeIn}
    >
      <div className="experience-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Experience
        </motion.h2>
        
        <motion.div 
          className="title-underline"
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        ></motion.div>
        
        <div className="tabs-container">
          <div className="tabs">
            <motion.button 
              className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
              onClick={() => setActiveTab('work')}
              aria-label="Show work experience"
              variants={tabVariants}
              animate={activeTab === 'work' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-briefcase"></i> Work Experience
            </motion.button>
            
            <motion.button 
              className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
              aria-label="Show education"
              variants={tabVariants}
              animate={activeTab === 'education' ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-graduation-cap"></i> Education
            </motion.button>
            
            <motion.div 
              className="tab-indicator"
              variants={indicatorVariants}
              animate={activeTab}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            ></motion.div>
          </div>
        </div>
        
        <div className="experience-content">
          <AnimatePresence mode="wait">
            {activeTab === 'work' && (
              <motion.div 
                className="timeline"
                key="work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="timeline-line"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                ></motion.div>
                
                {experiences.length > 0 ? (
                  experiences.map((exp, index) => (
                    <motion.div 
                      key={exp.id} 
                      className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${animatedItems.includes(index) ? 'animate' : ''}`}
                      variants={timelineItem}
                      initial="hidden"
                      animate={animatedItems.includes(index) ? "visible" : "hidden"}
                      transition={{ 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        y: -10, 
                        boxShadow: "var(--shadow-lg)",
                        transition: { 
                          duration: 0.3, 
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                    >
                      <motion.div 
                        className="timeline-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.2,
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }}
                      ></motion.div>
                      
                      <motion.div 
                        className="timeline-connector"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          delay: index * 0.2 + 0.3,
                          duration: 0.3
                        }}
                      ></motion.div>
                      
                      <motion.div 
                        className="timeline-date"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.4,
                          duration: 0.5
                        }}
                      >
                        {exp.date}
                      </motion.div>
                      
                      <motion.h3 
                        className="timeline-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.5,
                          duration: 0.5
                        }}
                      >
                        {exp.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="timeline-company"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.6,
                          duration: 0.5
                        }}
                      >
                        <i className={getIcon('work', exp.company)}></i>
                        {exp.company}
                      </motion.p>
                      
                      <motion.p 
                        className="timeline-location"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.7,
                          duration: 0.5
                        }}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {exp.location}
                      </motion.p>
                      
                      <motion.p 
                        className="timeline-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.8,
                          duration: 0.5
                        }}
                      >
                        {exp.description}
                      </motion.p>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="no-experience"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <i className="fas fa-briefcase"></i>
                    <h3>No work experience yet</h3>
                    <p>Currently looking for opportunities to grow my professional career.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'education' && (
              <motion.div 
                className="timeline"
                key="education"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="timeline-line"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                ></motion.div>
                
                {education.length > 0 ? (
                  education.map((edu, index) => (
                    <motion.div 
                      key={edu.id} 
                      className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${animatedItems.includes(index) ? 'animate' : ''}`}
                      variants={timelineItem}
                      initial="hidden"
                      animate={animatedItems.includes(index) ? "visible" : "hidden"}
                      transition={{ 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        y: -10, 
                        boxShadow: "var(--shadow-lg)",
                        transition: { 
                          duration: 0.3, 
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                    >
                      <motion.div 
                        className="timeline-dot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.2,
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }}
                      ></motion.div>
                      
                      <motion.div 
                        className="timeline-connector"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          delay: index * 0.2 + 0.3,
                          duration: 0.3
                        }}
                      ></motion.div>
                      
                      <motion.div 
                        className="timeline-date"
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.4,
                          duration: 0.5
                        }}
                      >
                        {edu.date}
                      </motion.div>
                      
                      <motion.h3 
                        className="timeline-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.5,
                          duration: 0.5
                        }}
                      >
                        {edu.degree}
                      </motion.h3>
                      
                      <motion.p 
                        className="timeline-company"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.6,
                          duration: 0.5
                        }}
                      >
                        <i className="fas fa-university"></i>
                        {edu.institution}
                      </motion.p>
                      
                      <motion.p 
                        className="timeline-location"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.7,
                          duration: 0.5
                        }}
                      >
                        <i className="fas fa-map-marker-alt"></i>
                        {edu.location}
                      </motion.p>
                      
                      <motion.p 
                        className="timeline-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: index * 0.2 + 0.8,
                          duration: 0.5
                        }}
                      >
                        {edu.description}
                      </motion.p>
                      
                      <motion.i 
                        className="education-icon fas fa-graduation-cap"
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 0.3, rotate: 0 }}
                        transition={{ 
                          delay: index * 0.2 + 0.9,
                          duration: 0.5
                        }}
                        whileHover={{ 
                          rotate: 15, 
                          opacity: 0.5,
                          transition: { duration: 0.3 }
                        }}
                      ></motion.i>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="no-experience"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <i className="fas fa-graduation-cap"></i>
                    <h3>No education listed</h3>
                    <p>Education details will be added soon.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="bg-shape shape-1"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="bg-shape shape-2"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
    </motion.section>
  );
};

export default Experience;