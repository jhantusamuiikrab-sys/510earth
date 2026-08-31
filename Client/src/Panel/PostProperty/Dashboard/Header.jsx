import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../../assets/paneldesign/css/PanelDashboardHeader.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Perform sign out logic here (e.g., clear localStorage, state, tokens)
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <Link to="/">
            <img
              src="/images/510earth.webp"
              alt="510 Earth Logo"
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            style={{ textDecoration: "none" }}
          >
            DASHBOARD
          </NavLink>
          <NavLink
            to="/dashboard/change-password"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            style={{ textDecoration: "none" }}
          >
            CHANGE PASSWORD
          </NavLink>

          {/* Sign Out Button with Mirror Flash Effect */}
          <button 
            type="button" 
            className={styles.signoutBtn} 
            onClick={handleSignOut}
          >
            SIGN OUT
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;