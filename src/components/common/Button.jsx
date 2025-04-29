import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  to, 
  href, 
  icon, 
  onClick, 
  type = 'button',
  fullWidth,
  disabled,
  className,
  ...props 
}) => {
  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "var(--shadow-md)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "var(--shadow-sm)",
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 10 
      }
    },
    disabled: {
      scale: 1,
      opacity: 0.7,
      boxShadow: "none"
    }
  };
  
  // Determine content including icon
  const content = (
    <>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </>
  );
  
  // Build class names
  const buttonClasses = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? 'button-full-width' : ''} 
    ${className || ''}
  `.trim();
  
  // Create either button, internal link or external link
  if (to) {
    return (
      <motion.div
        className="button-wrapper"
        initial="initial"
        whileHover={disabled ? "disabled" : "hover"}
        whileTap={disabled ? "disabled" : "tap"}
        variants={buttonVariants}
      >
        <Link
          to={to}
          className={buttonClasses}
          {...props}
        >
          {content}
        </Link>
      </motion.div>
    );
  } else if (href) {
    return (
      <motion.div
        className="button-wrapper"
        initial="initial"
        whileHover={disabled ? "disabled" : "hover"}
        whileTap={disabled ? "disabled" : "tap"}
        variants={buttonVariants}
      >
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {content}
        </a>
      </motion.div>
    );
  } else {
    return (
      <motion.button
        type={type}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled}
        initial="initial"
        whileHover={disabled ? "disabled" : "hover"}
        whileTap={disabled ? "disabled" : "tap"}
        variants={buttonVariants}
        {...props}
      >
        {content}
        {variant === 'primary' && (
          <motion.span
            className="button-shine"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          ></motion.span>
        )}
      </motion.button>
    );
  }
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  to: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default Button;