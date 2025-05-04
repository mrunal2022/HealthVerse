import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import './BlogPage.scss';

const BlogPage = ({ clickedSideNavItem }) => {
  const [blogCardItems, setBlogCardItems] = useState(null);
  const basePath = import.meta.env.VITE_API_BASE_PATH;

  useEffect(() => {
    fetch(`${basePath}/getBlogs`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json();
      })
      .then(data => {
        setBlogCardItems(data);
      })
      .catch(error => {
        console.log("fetch error", error);
      });
  }, []);// empty dependency array to run only only the component is mounted

  let filteredBlogs;
  if (clickedSideNavItem.id === 1) {
    filteredBlogs = blogCardItems;
  } else {
    filteredBlogs = blogCardItems?.filter((item) => item.categoryId === clickedSideNavItem.id);
  }
  return (
    <div>
      <div className='blog-page-wrapper'>
        {
          filteredBlogs?.map((blog, index) => {
            return <BlogCard key={index} blog={blog} />
          })
        }
      </div>
      <div className='pagination'>
        <Pagination count={15} size='large' />
      </div>
    </div>
  )
}

export default BlogPage