import { useEffect } from 'react';
import Projects from '../components/sections/Projects';

const ProjectsPage = () => {
  useEffect(() => {
    document.title = 'DevPortfolio | Projects';
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Projects</h1>
        <div className="title-underline"></div>
      </div>
      
      <Projects />
    </div>
  );
};

export default ProjectsPage;
