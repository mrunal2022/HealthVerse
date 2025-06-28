import { useState } from 'react';
import './SideNav.scss';
import SideNavItems from './constants/HealthVerse.constants.js';

const SideNav = ({ onItemClick }) => {
  const [sideNavItems, setSideNavItems] = useState(
    SideNavItems.map((item, index) => ({ ...item, selected: index === 0 }))
  );

  const onClickSideNavItem = (item) => {
    onItemClick(item);

    const updatedItem = sideNavItems.map((navItem) => ({
      ...navItem,
      selected: navItem.id === item.id,
    }));
    setSideNavItems(updatedItem);
  }

  return (
    <div>
      <div className='side-nav-container'>
        {sideNavItems.map((item) => (
          <div
            key={item.id}
            className={`side-nav-item roboto-font ${item.selected ? 'selected-nav-item' : ''}`}
            onClick={() => onClickSideNavItem(item)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideNav
