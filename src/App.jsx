import './App.css'
import Header from './Header'
import SideNav from './SideNav'
import HomePage from './HomePage'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BlogPage from './BlogPage';
import React, { useState } from 'react';
import Footer from './Footer';
import BlogItem from './BlogItem';
import FindRecipe from './FindRecipe';

function App() {

  const [clickedSideNavItem, setClickedSideNavItem] = useState( {
    id: 1,
    title: "ALL ARTICLES",
  });

  const handleSideNavClick=(item)=>{
    setClickedSideNavItem({...item});
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/blog"
            element={
              <>
                <HomePage />
                <div className='d-flex main-wrapper'>
                  <div className='side-nav-component'>
                    <SideNav onItemClick={handleSideNavClick}/>
                  </div>
                  <div className='blog-page-component'>
                    <BlogPage clickedSideNavItem={clickedSideNavItem} key={clickedSideNavItem.id}/>
                  </div>
                </div>
              </>
            }
          />
          <Route path="*" element={<Navigate to="/blog" />} />
          <Route path="/blog/:id" element={<BlogItem />} />
          <Route path="/findRecipe" element={<FindRecipe />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
