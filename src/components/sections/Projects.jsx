import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { projects } from '../../data/projects';
import './Projects.css';
import { staggerContainer, cardHover, fadeIn, slideUp, shouldAnimate } from '../../utils/animation';

const Projects = ({ isPage = true }) => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [loading, setLoading] = useState(true);
  
  // Get unique categories from projects
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  // Filter projects based on selected category
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      if (filter === 'All') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === filter));
      }
      setLoading(false);
    }, 300);
  }, [filter]);
  
  // Reset visible projects count when filter changes
  useEffect(() => {
    setVisibleProjects(4);
  }, [filter]);
  
  // Load more projects handler
  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 4);
  };
  
  return (
    <motion.section 
      className="projects-section"
      {...shouldAnimate(isPage)}
      variants={fadeIn}
    >
      <div className="projects-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recent Projects
        </motion.h2>
        
        <motion.div 
          className="title-underline"
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        ></motion.div>
        
        <motion.p 
          className="section-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Here are some of my recent projects. Each project is unique and showcases different skills and technologies.
        </motion.p>
        
        <motion.div 
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`filter-button ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              aria-label={`Filter by ${category}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {loading ? (
          <motion.div 
            className="loading-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProjects.length > 0 ? (
                <>
                  <motion.div 
                    className="projects-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                      <motion.div
                        key={project.id}
                        variants={slideUp}
                        custom={index}
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        initial="initial"
                        animate="visible"
                        className="project-card-container"
                      >
                        <motion.div 
                          className="project-card"
                          variants={cardHover}
                        >
                          <div className="project-image">
                            <motion.img 
                              src={project.image} 
                              alt={project.title}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            />
                            <motion.div 
                              className="project-overlay"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="project-links">
                                <motion.a 
                                  href={project.liveLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="project-link"
                                  aria-label="View live project"
                                  initial={{ opacity: 0, y: 20 }}
                                  whileHover={{ 
                                    scale: 1.1, 
                                    backgroundColor: "var(--primary-color)", 
                                    color: "#fff" 
                                  }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  <i className="fas fa-external-link-alt"></i>
                                </motion.a>
                                <motion.a 
                                  href={project.githubLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="project-link"
                                  aria-label="View source code on GitHub"
                                  initial={{ opacity: 0, y: 20 }}
                                  whileHover={{ 
                                    scale: 1.1, 
                                    backgroundColor: "var(--primary-color)", 
                                    color: "#fff" 
                                  }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  <i className="fab fa-github"></i>
                                </motion.a>
                              </div>
                            </motion.div>
                          </div>
                          
                          <div className="project-content">
                            <motion.div 
                              className="project-category"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              {project.category}
                            </motion.div>
                            <motion.h3 
                              className="project-title"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.p 
                              className="project-description"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                              {project.description}
                            </motion.p>
                            
                            <motion.div 
                              className="project-tech"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
                              {project.technologies.map((tech, index) => (
                                <motion.span 
                                  key={index} 
                                  className="tech-tag"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.4 + (index * 0.1) 
                                  }}
                                  whileHover={{ 
                                    scale: 1.05, 
                                    backgroundColor: "var(--primary-color-lightest)",
                                    color: "var(--primary-color-dark)"
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {filteredProjects.length > visibleProjects && (
                    <motion.div 
                      className="show-more-container"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={handleLoadMore}
                        icon={<i className="fas fa-chevron-down"></i>}
                      >
                        Load More Projects
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="no-projects"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    No projects found in this category. Please check back later!
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      
      {/* Animated background shapes */}
      <motion.div 
        className="bg-shape shape-1"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
      
      <motion.div 
        className="bg-shape shape-2"
        animate={{
          x: [0, -20, 0],
          y: [0, -20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      ></motion.div>
    </motion.section>
  );
};

export default Projects;