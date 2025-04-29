// src/utils/animation.js

// Helper function to determine if animation should be immediate or on-scroll
export const shouldAnimate = (isPage = false) => {
  return isPage ? { initial: "hidden", animate: "visible" } : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.05 } };
};

// Fade in animation for standard elements
export const fadeIn = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

// Slide up and fade in animation for elements
export const slideUp = {
  hidden: { 
    y: 50, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

// Slide in from left animation
export const slideInLeft = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

// Slide in from right animation
export const slideInRight = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

// Scale up animation
export const scaleUp = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Soft bounce animation
export const softBounce = {
  hidden: { 
    y: 50, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

// Elegant rotate in animation
export const rotateIn = {
  hidden: { 
    rotate: -5, 
    scale: 0.9, 
    opacity: 0 
  },
  visible: { 
    rotate: 0, 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

// Hover animation for cards
export const cardHover = {
  initial: { 
    y: 0, 
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
  },
  hover: { 
    y: -10, 
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  }
};

// Text reveal animation for hero section
export const textReveal = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Button animation
export const buttonAnimation = {
  initial: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: { 
    scale: 0.95 
  }
};

// Scroll animation variants
export const scrollReveal = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Skills bar animation
export const skillsBar = {
  hidden: {
    width: 0
  },
  visible: width => ({
    width: width,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 0.3
    }
  })
};

// Timeline item animation (for experience section)
export const timelineItem = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Gallery image animation
export const galleryImage = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// List animation with staggering
export const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// List item
export const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// For page transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};