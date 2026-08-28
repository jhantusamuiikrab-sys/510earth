import React from 'react';
import styles from '../../../assets/paneldesign/css/PanelDashboardHeader.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <img src="/images/510earth.webp" alt="510 Earth Logo" className={styles.logoImg} />
        </div>

        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="#dashboard" className={`${styles.navLink} ${styles.active}`}>
            DASHBOARD
          </a>
          <a href="#change-password" className={styles.navLink}>
            CHANGE PASSWORD
          </a>
          
          {/* Sign Out Button with Mirror Flash Effect */}
          <button className={styles.signoutBtn}>
            SIGN OUT
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;