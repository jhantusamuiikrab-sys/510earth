import React from 'react';
import "../../../assets/paneldesign/css/PanelDashboardHeader.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="/images/510earth.webp" alt="510 Earth Logo" className="logo-img" />
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#dashboard" className="nav-link active">
            DASHBOARD
          </a>
          <a href="#change-password" className="nav-link">
            CHANGE PASSWORD
          </a>
          
          {/* Sign Out Button with Mirror Flash Effect */}
          <button className="signout-btn">
            SIGN OUT
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;