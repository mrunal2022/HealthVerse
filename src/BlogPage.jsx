import { useEffect, useRef, useState } from 'react';
import BlogCard from './BlogCard';
import './BlogPage.scss';

const BlogPage = ({ clickedSideNavItem }) => {
  const [blogCardItems, setBlogCardItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadingRef = useRef(false);
  const basePath = import.meta.env.VITE_API_BASE_PATH;

  const fetchBlogs = async (categoryId, cursorParam = null) => {
    if (loadingRef.current || !hasMore) return;

    setLoading(true);
    loadingRef.current = true;

    try {
      let url = `${basePath}/getBlogs?categoryId=${categoryId}`;
      if (cursorParam) url += `&cursor=${cursorParam}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');

      const data = await res.json();

      setBlogCardItems(prev => cursorParam ? [...prev, ...data] : data);

      if (data.length > 0) {
        setCursor(data[data.length - 1].id);
        if (data.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  // On category change
  useEffect(() => {
    setBlogCardItems([]);
    setCursor(null);
    setHasMore(true);
    fetchBlogs(clickedSideNavItem.id);
  }, [clickedSideNavItem.id]);

  // Scroll listener with debounce
  useEffect(() => {
    let debounceTimer;

    const handleScroll = () => {
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
          !loadingRef.current &&
          cursor &&
          hasMore
        ) {
          fetchBlogs(clickedSideNavItem.id, cursor);
        }
      }, 500); // Debounce delay
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cursor, hasMore, clickedSideNavItem.id]);

  return (
    <div className="blog-page-wrapper">
      {blogCardItems.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
      {loading && <div className="loader"><img src="public/assets/blog-loader.webp" alt="loader" /></div>}
    </div>
  );
};

export default BlogPage;
