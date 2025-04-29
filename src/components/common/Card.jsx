import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ 
  children, 
  className, 
  elevation = 'sm',
  hover = true,
  animate = true,
  ...props 
}) => {
  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: hover ? { 
      y: -10,
      boxShadow: elevation === 'lg' 
        ? 'var(--shadow-xl)' 
        : elevation === 'md' 
          ? 'var(--shadow-lg)' 
          : 'var(--shadow-md)',
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    } : {}
  };

  return (
    <motion.div
      className={`card card-${elevation} ${className || ''}`}
      variants={cardVariants}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      whileHover={hover ? "hover" : undefined}
      viewport={{ once: true, amount: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevation: PropTypes.oneOf(['sm', 'md', 'lg']),
  hover: PropTypes.bool,
  animate: PropTypes.bool
};

export default Card;