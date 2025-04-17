import React from 'react'
import './BlogPage.scss';
import { BlogCardItems } from './constants/HealthVerse.constants';
import BlogCard from './BlogCard';
import Pagination from '@mui/material/Pagination';

const BlogPage = ({ clickedSideNavItem }) => {
  console.log(clickedSideNavItem);
  let filteredBlogs;
  if (clickedSideNavItem.id === 1) {
    filteredBlogs = BlogCardItems;
  } else {
    filteredBlogs = BlogCardItems.filter((item) => item.categoryId === clickedSideNavItem.id);
  }
  return (
    <div>
      <div className='blog-page-wrapper'>
        {
          filteredBlogs.map((blog, index) => {
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
