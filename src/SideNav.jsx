import React from 'react'
import './SideNav.scss';
import SideNavItems from './constants/HealthVerse.constants.js';
const SideNav = ({ onItemClick }) => {

  const onClickSideNavItem = (item) => {
    onItemClick(item);
  }

  return (
    <div>
      <div className='side-nav-container'>
        {SideNavItems.map((item) => (
          <div
            className='side-nav-item roboto-font'
            onClick={() => onClickSideNavItem(item)}
          >
            {item.title}
          </div>))}
      </div>
    </div>
  )
}

export default SideNav
