import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { blogposts } from '../../data/blogposts';
import './BlogPost.css';
import { fadeIn, slideUp, galleryImage } from '../../utils/animation';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const currentPost = blogposts.find(post => post.id === parseInt(id));
    setPost(currentPost);
    
    if (currentPost) {
      // Find related posts in the same category
      const related = blogposts
        .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);
  
  // Content animation with staggered children
  const contentContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const contentItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  if (!post) {
    return (
      <motion.div 
        className="loading-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading post...
        </motion.p>
      </motion.div>
    );
  }
  
  return (
    <motion.section 
      className="blog-post-section"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="blog-post-container">
        <motion.div 
          className="blog-post-header"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="blog-post-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="blog-post-category"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {post.category}
            </motion.span>
            <motion.span className="blog-post-date">
              <i className="far fa-calendar-alt"></i> {post.date}
            </motion.span>
            <motion.span className="blog-post-author">
              <i className="far fa-user"></i> {post.author}
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="blog-post-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            className="blog-post-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {post.tags.map((tag, index) => (
              <motion.span 
                key={index} 
                className="blog-post-tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                whileHover={{ 
                  backgroundColor: "var(--primary-color-lightest)",
                  color: "var(--primary-color)",
                  scale: 1.05
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="blog-post-featured-image"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileInView={{ boxShadow: "var(--shadow-lg)" }}
        >
          <motion.img 
            src={post.image} 
            alt={post.title} 
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="blog-post-content"
          variants={contentContainer}
          initial="hidden"
          animate="visible"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></motion.div>
        
        <motion.div 
          className="blog-post-gallery"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h3 
            className="gallery-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gallery
          </motion.h3>
          
          <motion.div 
            className="gallery-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.images.map((image, index) => (
              <motion.div 
                key={index} 
                className="gallery-item"
                variants={galleryImage}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.1 * index }}
              >
                <motion.img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`} 
                  initial={{ filter: "blur(5px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {relatedPosts.length > 0 && (
          <motion.div 
            className="related-posts"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h3 
              className="related-posts-title"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Related Posts
            </motion.h3>
            
            <motion.div 
              className="related-posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {relatedPosts.map((related, index) => (
                <motion.div 
                  key={related.id} 
                  className="related-post-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "var(--shadow-md)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <Link to={`/blogs/${related.id}`} className="related-post-image">
                    <motion.img 
                      src={related.image} 
                      alt={related.title} 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Link>
                  <div className="related-post-content">
                    <Link to={`/blogs/${related.id}`} className="related-post-title">
                      <motion.span
                        whileHover={{ color: "var(--primary-color)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {related.title}
                      </motion.span>
                    </Link>
                    <div className="related-post-date">{related.date}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        
        <motion.div 
          className="blog-post-navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button to="/blogs" variant="outline" icon={<i className="fas fa-arrow-left"></i>}>
              Back to Blogs
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogPost;