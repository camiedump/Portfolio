import { useEffect } from 'react';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'DevPortfolio | Contact';
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Contact Me</h1>
        <div className="title-underline"></div>
      </div>
      
      <Contact />
    </div>
  );
};

export default ContactPage;