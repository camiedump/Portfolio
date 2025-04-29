import { useEffect } from 'react';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'DevPortfolio | About';
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Me</h1>
        <div className="title-underline"></div>
      </div>
      
      <About />
      <Experience />
    </div>
  );
};

export default AboutPage;