import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import BlogItem from './BlogItem';
import BlogPage from './BlogPage';
import FindRecipe from './FindRecipe';
import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';
import SideNav from './SideNav';

function AppContent() {
  const DEFAULT_NAV_ITEM = {
    id: 1,
    title: "ALL ARTICLES",
  };

  const [clickedSideNavItem, setClickedSideNavItem] = useState(DEFAULT_NAV_ITEM);
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname === '/blog') {
      setClickedSideNavItem(DEFAULT_NAV_ITEM);
    }
  }, [location.pathname]);

  const handleSideNavClick = (item) => {
    setClickedSideNavItem({ ...item });
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/blog"
          element={
            <>
              <HomePage />
              <div className='d-flex main-wrapper'>
                <div className='side-nav-component'>
                  <SideNav onItemClick={handleSideNavClick} />
                </div>
                <div className='blog-page-component'>
                  <BlogPage clickedSideNavItem={clickedSideNavItem} key={clickedSideNavItem.id} />
                </div>
              </div>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/blog" />} />
        <Route path="/blog/:id" element={<BlogItem />} />
        <Route path="/findRecipe" element={<FindRecipe />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> 
    </Router>
  );
}

export default App;
