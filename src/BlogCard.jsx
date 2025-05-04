import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './BlogCard.scss';
import { BlogContext } from './context/BlogContext';

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const {setSelectedBlog} =useContext(BlogContext)

    const onReadMore = (blog) => {
        setSelectedBlog(blog);
        navigate(`/blog/${blog.id}`);
    }

    return (
        <div className='blog-card'>
            <div className='d-flex mb-3'>
                <div className=' blog-card-left-section'>
                    <img className='blog-card-img' src={blog.image} alt="" />
                </div>
                <div className='blog-card-right-section'>
                    <div className='blog-card-title mb-3 header-font'>
                        {blog.title}
                    </div>
                    <div className='blog-card-desc desc-font'>
                        {blog.desc}
                    </div>
                </div>
            </div>
            <div className='blog-btn-wrapper'>
                <button className="btn read-more" onClick={() => onReadMore(blog)}>Read More</button>
            </div>
        </div>
    )
}

export default BlogCard
