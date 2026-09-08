import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../src/style/Navbar.module.css";
import { FiChevronRight, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navbarRef = useRef(null);

  useEffect(() => {
    // 1. Outside click handler
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavCollapsed(true);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    // 2. Intersection Observer for Logo Flip
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [1.0], rootMargin: "-1px 0px 0px 0px" },
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLinkClick = () => {
    setIsNavCollapsed(true);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const toggleDropdown = (menuName) => {
    if (window.innerWidth <= 991) {
      setActiveDropdown(activeDropdown === menuName ? null : menuName);
      setActiveSubDropdown(null);
    }
  };

  const toggleSubDropdown = (e, menuName) => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      e.stopPropagation();
      setActiveSubDropdown(activeSubDropdown === menuName ? null : menuName);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className={`navbar sticky-top navbar-expand-lg navbar-dark ${styles.mainHeader}`}
    >
      <div className="container-fluid">
        <Link
          className={`navbar-brand ${styles.logoContainer} ${isScrolled ? styles.flipped : ""}`}
          to="/"
          onClick={handleLinkClick}
        >
          <img
            src="/images/510earth.webp"
            alt="510earth"
            className={`img-fluid ${styles.logoImg}`}
          />
        </Link>

        <button
          className={`navbar-toggler d-lg-none d-flex align-items-center justify-content-center ${styles.navbarToggler}`}
          type="button"
          onClick={handleNavCollapse}
          aria-label="Toggle navigation"
          style={{ border: "none", outline: "none" }}
        >
          {isNavCollapsed ? (
            <FiMenu size={26} color="#fff" />
          ) : (
            <FiX size={26} color="#fff" />
          )}
        </button>

        <div
          className={`${styles.customNavbarCollapse} ${!isNavCollapsed ? styles.open : ""}`}
        >
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${styles.navItem}`}>
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            {/* Properties Dropdown */}
            <li
              className={`nav-item ${styles.navItem} ${styles.dropdown} ${activeDropdown === "properties" ? styles.show : ""}`}
              onMouseEnter={() =>
                window.innerWidth > 991 && setActiveDropdown("properties")
              }
              onMouseLeave={() => {
                if (window.innerWidth > 991) {
                  setActiveDropdown(null);
                  setActiveSubDropdown(null);
                }
              }}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("properties");
                }}
              >
                Properties
              </a>
              <ul
                className={`dropdown-menu ${styles.dropdownMenu} ${activeDropdown === "properties" ? styles.show : ""}`}
              >
                <li
                  className={`${styles.dropend} ${activeSubDropdown === "residential" ? styles.show : ""}`}
                  onMouseEnter={() =>
                    window.innerWidth > 991 &&
                    setActiveSubDropdown("residential")
                  }
                  onMouseLeave={() =>
                    window.innerWidth > 991 && setActiveSubDropdown(null)
                  }
                >
                  <a
                    href="#"
                    className={`dropdown-item ${styles.dropdownItem} d-flex align-items-center justify-content-between`}
                    onClick={(e) => toggleSubDropdown(e, "residential")}
                  >
                    <strong>Residential</strong>
                    <FiChevronRight />
                  </a>
                  <ul
                    className={`dropdown-menu ${styles.subMenu} ${activeSubDropdown === "residential" ? styles.show : ""}`}
                  >
                    <li>
                      <Link
                        to="/residential/apartment"
                        className={`dropdown-item ${styles.dropdownItem}`}
                        onClick={handleLinkClick}
                      >
                        Apartment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/residential/villa"
                        className={`dropdown-item ${styles.dropdownItem}`}
                        onClick={handleLinkClick}
                      >
                        Independent House / Villa
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    to="/commercial"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Commercial</strong>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/land"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Land / Plot</strong>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Services Dropdown */}
            <li
              className={`nav-item ${styles.navItem} ${styles.dropdown} ${activeDropdown === "services" ? styles.show : ""}`}
              onMouseEnter={() =>
                window.innerWidth > 991 && setActiveDropdown("services")
              }
              onMouseLeave={() =>
                window.innerWidth > 991 && setActiveDropdown(null)
              }
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("services");
                }}
              >
                Services
              </a>
              <ul
                className={`dropdown-menu ${styles.dropdownMenu} ${activeDropdown === "services" ? styles.show : ""}`}
              >
                <li>
                  <Link
                    to="/services"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Our Services</strong>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/property-management"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Property Management</strong>
                  </Link>
                </li>
              </ul>
            </li>

            <li className={`nav-item ${styles.navItem}`}>
              <Link className="nav-link" to="/about" onClick={handleLinkClick}>
                About Us
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className="nav-link"
                to="/partner"
                onClick={handleLinkClick}
              >
                Partner
              </Link>
            </li>
            <li className={`nav-item ${styles.navItem}`}>
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </li>

            {/* Post Property Dropdown */}
            <li
              className={`nav-item ${styles.navItem} ${styles.dropdown} ${activeDropdown === "postProperty" ? styles.show : ""}`}
              onMouseEnter={() =>
                window.innerWidth > 991 && setActiveDropdown("postProperty")
              }
              onMouseLeave={() =>
                window.innerWidth > 991 && setActiveDropdown(null)
              }
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown("postProperty");
                }}
              >
                Post Property
              </a>
              <ul
                className={`dropdown-menu ${styles.dropdownMenu} ${activeDropdown === "postProperty" ? styles.show : ""}`}
              >
                <li>
                  <Link
                    to="/post-property"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Post Your Property</strong>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={`dropdown-item ${styles.dropdownItem}`}
                    onClick={handleLinkClick}
                  >
                    <strong>Login</strong>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
