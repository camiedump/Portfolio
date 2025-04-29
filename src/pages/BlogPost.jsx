import { useEffect } from 'react';
import BlogPost from '../components/sections/BlogPost';

const BlogPostPage = () => {
  useEffect(() => {
    // Title will be set in the BlogPost component based on the post
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <BlogPost />
    </div>
  );
};

export default BlogPostPage;