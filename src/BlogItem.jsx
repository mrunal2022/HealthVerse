import React, { useContext } from 'react'
import { BlogContext } from './context/BlogContext'
import './BlogItem.scss'

const BlogItem = () => {
  let { selectedBlog } = useContext(BlogContext);
  const selectedBlogSession = sessionStorage.getItem('selectedBlog');
  if (!selectedBlog && selectedBlogSession) {
    selectedBlog = JSON.parse(selectedBlogSession);
  }

  console.log(selectedBlog, "********")
  return (
    <div className='blog-item-wrapper'>
      <div className='white-container'>
        <div className='blog-item-title'>{selectedBlog?.title}</div>
        <div className='blog-item-img-wrapper'>
          <img className='blog-item-img' src={selectedBlog?.image} alt="" />
        </div>
        <div
          className="blog-item-desc desc-font"
          dangerouslySetInnerHTML={{ __html: selectedBlog?.desc }}
        ></div>
      </div>
    </div>
  )
}

export default BlogItem
