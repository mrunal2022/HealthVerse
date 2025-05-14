import React, { useContext } from 'react'
import { BlogContext } from './context/BlogContext'
import { useEffect } from 'react'
import './BlogItem.scss'
import { useNavigate } from 'react-router-dom';

const BlogItem = () => {
  const navigate = useNavigate();
  let { selectedBlog } = useContext(BlogContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const retainBlogOnReload = () => {
    const selectedBlogSession = sessionStorage.getItem('selectedBlog');
    if (!selectedBlogSession) {
      sessionStorage.setItem('selectedBlog', JSON.stringify(selectedBlog));
    }
    else if (!selectedBlog) {
      selectedBlog = JSON.parse(selectedBlogSession);
    }
  }

  retainBlogOnReload();

  const recommendedRecipes = () => {
    const isFromHeader = false;
    navigate('/findRecipe', { state: { isFromHeader } });
  }

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
        {selectedBlog?.recommendedRecipe && (
          <div className='recommended-recipe-btn-wrapper'>
            <button className="btn recommended-recipe-btn" onClick={recommendedRecipes}>
              Recommended Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogItem
