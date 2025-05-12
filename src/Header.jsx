import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = () => {
        navigate('/blog');
    };

    const findYourRecipe = () => {
        const isFromHeader = true;
        navigate('/findRecipe', { state: { isFromHeader } });
    }

    return (
        <div>
            <div className="header-wrapper">
                <div className="header-logo" onClick={handleLogoClick}>
                    <img className='healthverse-title' src="/assets/healthverse-title-1.png" alt="" />
                </div>
                {location.pathname !== '/findRecipe' && (
                    <button className="btn find-your-recipe" onClick={findYourRecipe}>
                        Find Your Recipe
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header
