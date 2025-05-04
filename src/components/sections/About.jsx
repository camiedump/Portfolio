import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import './About.css';
import { fadeIn, slideUp, slideInLeft, slideInRight, skillsBar, shouldAnimate } from '../../utils/animation';

const About = ({ isPage = true }) => {
  const skills = [
    { name: 'HTML/CSS', level: 45, icon: 'fab fa-html5' },
    { name: 'JavaScript', level: 40, icon: 'fab fa-js' },
    { name: 'React', level: 30, icon: 'fab fa-react' },
    { name: 'Figma', level: 25, icon: 'fab fa-figma' },
    { name: 'UI/UX Design', level: 50, icon: 'fas fa-pencil-ruler' },
    { name: 'Canva', level: 50, icon: 'fab fa-circle' },
  ];
  
  // Custom animation for text paragraphs with staggering
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <motion.section 
      className="about-section"
      {...shouldAnimate(isPage)}
      variants={fadeIn}
    >
      <div className="about-container">
        <motion.div 
          className="about-content"
          variants={slideInLeft}
          {...shouldAnimate(isPage)}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          ></motion.div>
          
          <div className="about-text">
            <motion.p
              custom={0}
              variants={textAnimation}
              initial="hidden"
              animate="visible"
            >
              A passionate UI/UX Designer with strong foundations in frontend technologies.
            </motion.p>
            
            <motion.p
              custom={1}
              variants={textAnimation}
              initial="hidden"
              animate="visible"
            >
              I am a passionate UI/UX Designer with a strong foundation in web technologies and a dedication to creating efficient, <motion.strong 
                initial={{ color: "var(--text-color)" }}
                animate={{ color: "var(--primary-color)" }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >user-friendly applications</motion.strong>. My journey in tech began during my studies at Western Mindanao State University, where I discovered my love for creating designs.
            </motion.p>
            
            <motion.p
              custom={2}
              variants={textAnimation}
              initial="hidden"
              animate="visible"
            >
              With experience in both frontend and backend development, I enjoy working on <motion.strong 
                initial={{ color: "var(--text-color)" }}
                animate={{ color: "var(--primary-color)" }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >Frontend</motion.strong> to bring projects from concept to completion. I'm particularly interested in creating intuitive user interfaces and optimizing.
            </motion.p>
            
            <motion.p
              custom={3}
              variants={textAnimation}
              initial="hidden"
              animate="visible"
            >
              Outside of coding, I enjoy <motion.strong 
                initial={{ color: "var(--text-color)" }}
                animate={{ color: "var(--primary-color)" }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >listening and learning from people with more experience than I am</motion.strong>, with the help of online courses and documentation, I get to expand my knowledge and imagination interms of layouting and designing.
            </motion.p>
          </div>
          
          <motion.div 
            className="about-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button 
                href="https://drive.google.com/file/d/1W7W-G0B1Fnjc06c89pZcyQQ7CNos-iKD/view?usp=sharing" 
                variant="primary" 
                icon={<i className="fas fa-download"></i>}
                className="cv-button"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="skills-container"
          variants={slideInRight}
          {...shouldAnimate(isPage)}
          whileHover={{ 
            y: -10,
            boxShadow: "var(--shadow-lg)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h3 
            className="skills-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Technical Skills
          </motion.h3>
          
          <motion.p 
            className="skills-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            My expertise across various technologies and tools
          </motion.p>
          
          <div className="skills-list">
            {skills.map((skill, index) => (
              <motion.div 
                className="skill-item" 
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + (index * 0.1)
                }}
              >
                <div className="skill-info">
                  <motion.span 
                    className="skill-name"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.i 
                      className={`skill-icon ${skill.icon}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        delay: 0.6 + (index * 0.1)
                      }}
                      whileHover={{ 
                        rotate: 360,
                        color: "var(--primary-color-dark)",
                        transition: { duration: 0.5 }
                      }}
                    ></motion.i>
                    {skill.name}
                  </motion.span>
                  <motion.span 
                    className="skill-percentage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress" 
                    style={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.9 + (index * 0.1) }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="skills-decoration"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
        </motion.div>
      </div>
      
      {/* Decorative animated shape */}
      <motion.div 
        className="about-shape"
        animate={{
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1]
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

export default About;