import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { blogposts } from '../../data/blogposts';
import './BlogList.css';
import { staggerContainer, cardHover, fadeIn, listItem, shouldAnimate } from '../../utils/animation';

const BlogList = ({ isPage = true }) => {
  const [filter, setFilter] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [loading, setLoading] = useState(true);
  
  // Get unique categories
  const categories = ['All', ...new Set(blogposts.map(post => post.category))];
  
  // Filter posts based on category
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      if (filter === 'All') {
        setFilteredPosts(blogposts);
      } else {
        setFilteredPosts(blogposts.filter(post => post.category === filter));
      }
      setLoading(false);
    }, 300);
  }, [filter]);
  
  // Reset visible posts count when filter changes
  useEffect(() => {
    setVisiblePosts(3);
  }, [filter]);
  
  // Load more posts handler
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <motion.section 
      className="blogs-section"
      {...shouldAnimate(isPage)}
      variants={fadeIn}
    >
      <div className="blogs-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles
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
          Sharing my thoughts, experiences, and insights on software development and technology.
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
            className="loading-blogs"
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
              {filteredPosts.length > 0 ? (
                <>
                  <motion.div 
                    className="blogs-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredPosts.slice(0, visiblePosts).map((post, index) => (
                      <motion.div
                        key={post.id}
                        variants={listItem}
                        custom={index}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                        className="blog-card-container"
                      >
                        <motion.div 
                          className="blog-card"
                          variants={cardHover}
                        >
                          <div className="blog-image">
                            <motion.img 
                              src={post.image} 
                              alt={post.title}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            />
                            <motion.div 
                              className="blog-category"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.2 + (index * 0.1) 
                              }}
                            >
                              {post.category}
                            </motion.div>
                          </div>
                          
                          <div className="blog-content">
                            <motion.div 
                              className="blog-meta"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.3 + (index * 0.1) 
                              }}
                            >
                              <span className="blog-date">
                                <i className="far fa-calendar-alt"></i> {formatDate(post.date)}
                              </span>
                              <span className="blog-author">
                                <i className="far fa-user"></i> {post.author}
                              </span>
                            </motion.div>
                            
                            <motion.h3 
                              className="blog-title"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.4 + (index * 0.1) 
                              }}
                            >
                              {post.title}
                            </motion.h3>
                            
                            <motion.p 
                              className="blog-summary"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.5 + (index * 0.1) 
                              }}
                            >
                              {post.summary}
                            </motion.p>
                            
                            <motion.div 
                              className="blog-tags"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.6 + (index * 0.1) 
                              }}
                            >
                              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <motion.span 
                                  key={tagIndex} 
                                  className="blog-tag"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.6 + (index * 0.1) + (tagIndex * 0.05) 
                                  }}
                                  whileHover={{ 
                                    backgroundColor: "var(--primary-color-lightest)",
                                    color: "var(--primary-color-dark)"
                                  }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                              {post.tags.length > 3 && (
                                <motion.span 
                                  className="blog-tag"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: 0.6 + (index * 0.1) + 0.15
                                  }}
                                >
                                  +{post.tags.length - 3}
                                </motion.span>
                              )}
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 0.7 + (index * 0.1) 
                              }}
                            >
                              <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                <Link to={`/blogs/${post.id}`} className="read-more">
                                  Read More <i className="fas fa-arrow-right"></i>
                                </Link>
                              </motion.div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {filteredPosts.length > visiblePosts && (
                    <motion.div 
                      className="show-more-container"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Button 
                          variant="outline" 
                          onClick={handleLoadMore}
                          icon={<i className="fas fa-chevron-down"></i>}
                        >
                          Load More Articles
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  className="no-blogs"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <motion.i 
                    className="far fa-newspaper"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  ></motion.i>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    No articles found
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    There are no articles in this category yet. Please check back later or choose another category.
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

export default BlogList;