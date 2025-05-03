import { useEffect } from 'react';
import BlogList from '../components/sections/BlogList';

const BlogListPage = () => {
  useEffect(() => {
    document.title = 'Cam.exe | Blogs';
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Blog</h1>
        <div className="title-underline"></div>
      </div>
      
      <BlogList />
    </div>
  );
};

export default BlogListPage;