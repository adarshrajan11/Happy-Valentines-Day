import React from 'react';

import logo from '../assets/icons/Layer 1.svg';

const Header = () => {
    return (
        <div className="header-container">
            <img src={logo} alt="logo" />
            <h1>HAPPY VALENTINE'S DAY</h1>
        </div>
    );
};

export default Header;
