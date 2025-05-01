import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import './Contact.css';
import { fadeIn, slideInLeft, slideInRight, softBounce, shouldAnimate } from '../../utils/animation';
import emailjs from '@emailjs/browser';

const Contact = ({ isPage = true }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  
  // Initialize EmailJS with your User ID (should ideally be stored in environment variables)
  useEffect(() => {
    emailjs.init("zwkiBiS8MpN791ZVO"); // Replace with your actual EmailJS public key
  }, []);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      subject: formState.subject,
      message: formState.message
    };
    
    try {
      // Send email using EmailJS
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
      await emailjs.send(
        'service_9px6f31', 
        'template_fao9umg',
        templateParams
      );
      
      // Handle success
      setLoading(false);
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Scroll form into view to show success message
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
      
    } catch (error) {
      // Handle error
      console.error('Email sending failed:', error);
      setLoading(false);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Failed to send your message. Please try again later or contact me directly via email.'
      });
    }
  };
  
  // Contact information data
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      content: 'Zamboanga City, Philippines',
      link: null
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'labialrosacamille@gmail.com',
      link: 'mailto:labialrosacamille@gmail.com'
    },
    {
      icon: 'fas fa-phone-alt',
      title: 'Phone',
      content: '+63 906 206 3969',
      link: 'tel:+639062063969'
    }
  ];
  
  // Social media links
  const socialLinks = [
    { platform: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/camiedump' },
    { platform: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/rosacamillelabial/' },
    { platform: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com' },
    { platform: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' }
  ];
  
  // Input field animation variants
  const inputVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(211, 85, 54, 0.2)",
      borderColor: "var(--primary-color)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    error: {
      scale: 1,
      boxShadow: "0 0 0 3px rgba(231, 76, 60, 0.2)",
      borderColor: "var(--error-color)",
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        x: { duration: 0.4 }
      }
    }
  };
  
  return (
    <motion.section 
      className="contact-section"
      {...shouldAnimate(isPage)}
      variants={fadeIn}
    >
      <div className="contact-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
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
          Feel free to reach out if you're looking to collaborate, have questions, or just want to connect!
        </motion.p>
        
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="contact-info"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                className="contact-card" 
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "var(--shadow-md)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="contact-icon"
                  whileHover={{ 
                    rotate: 360,
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    transition: { duration: 0.5 }
                  }}
                >
                  <i className={item.icon}></i>
                </motion.div>
                <div className="contact-details">
                  <motion.h3
                    whileHover={{ color: "var(--primary-color)" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  {item.link ? (
                    <motion.p
                      whileHover={{ color: "var(--primary-color)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href={item.link}>{item.content}</a>
                    </motion.p>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="social-links"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "var(--shadow-md)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Connect With Me
              </motion.h3>
              <motion.div 
                className="social-icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                    whileHover={{ 
                      y: -3,
                      color: "white",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.h3 
              className="form-title"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Send Me a Message
            </motion.h3>
            
            <motion.p 
              className="form-subtitle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Have a project in mind or want to know more about my services? Let's talk!
            </motion.p>
            
            <motion.form 
              className="contact-form" 
              onSubmit={handleSubmit} 
              ref={formRef}
              variants={softBounce}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {formStatus.submitted && (
                  <motion.div 
                    className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.i 
                      className={formStatus.success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                        delay: 0.1
                      }}
                    ></motion.i>
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="form-row">
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="name">Your Name</label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="John Doe"
                    variants={inputVariants}
                    whileFocus="focused"
                    animate={errors.name ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email">Your Email</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="john@example.com"
                    variants={inputVariants}
                    whileFocus="focused"
                    animate={errors.email ? "error" : ""}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div 
                        className="error-message"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="subject">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="What is this regarding?"
                  variants={inputVariants}
                  whileFocus="focused"
                  animate={errors.subject ? "error" : ""}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.subject}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="message">Your Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="How can I help you?"
                  variants={inputVariants}
                  whileFocus="focused"
                  animate={errors.message ? "error" : ""}
                ></motion.textarea>
                <AnimatePresence>
                  {errors.message && (
                    <motion.div 
                      className="error-message"
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className="fas fa-exclamation-circle"></i>
                      {errors.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                  size="large"
                  icon={loading ? null : <i className="fas fa-paper-plane"></i>}
                >
                  {loading ? (
                    <>
                      <motion.span 
                        className="spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      ></motion.span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated background shapes */}
      <motion.div 
        className="bg-shape shape-1"
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
          rotate: [0, 10, 0]
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
          x: [0, -20, 0],
          y: [0, -15, 0],
          rotate: [0, -10, 0]
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

export default Contact;