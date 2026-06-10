import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../src/style/Navbar.css"; 
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
      { threshold: [1.0], rootMargin: "-1px 0px 0px 0px" }
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    // SINGLE clean up function for everything  
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
    <nav ref={navbarRef} className="navbar sticky-top navbar-expand-lg navbar-dark main_header">
      <div className="container-fluid">
        <Link className={`navbar-brand logo-container ${isScrolled ? "flipped" : ""}`} to="/" onClick={handleLinkClick}>
          {/* ADDED 'logo-img' class below so the CSS target rule matches perfectly */}
          <img
            src="/images/510earth.webp"
            alt="510earth"
            className="img-fluid logo-img" 
          />
        </Link>

        <button
          className="navbar-toggler d-lg-none d-flex align-items-center justify-content-center"
          type="button"
          onClick={handleNavCollapse}
          aria-label="Toggle navigation"
          style={{ border: "none", outline: "none" }}
        >
          {isNavCollapsed ? <FiMenu size={26} color="#fff" /> : <FiX size={26} color="#fff" />}
        </button>

        <div className={`custom-navbar-collapse ${!isNavCollapsed ? "open" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>Home</Link>
            </li>

            {/* Properties Dropdown */}
            <li
              className={`nav-item dropdown ${activeDropdown === "properties" ? "show" : ""}`}
              onMouseEnter={() => window.innerWidth > 991 && setActiveDropdown("properties")}
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
                onClick={(e) => { e.preventDefault(); toggleDropdown("properties"); }}
              >
                Properties
              </a>
              <ul className={`dropdown-menu ${activeDropdown === "properties" ? "show" : ""}`}>
                <li
                  className={`dropend ${activeSubDropdown === "residential" ? "show" : ""}`}
                  onMouseEnter={() => window.innerWidth > 991 && setActiveSubDropdown("residential")}
                  onMouseLeave={() => window.innerWidth > 991 && setActiveSubDropdown(null)}
                >
                  <a
                    href="#"
                    className="dropdown-item submenu-toggle d-flex align-items-center justify-content-between"
                    onClick={(e) => toggleSubDropdown(e, "residential")}
                  >
                    <strong>Residential</strong>
                    <FiChevronRight className="submenu-icon" />
                  </a>
                  <ul className={`dropdown-menu sub_menu ${activeSubDropdown === "residential" ? "show" : ""}`}>
                    <li><Link to="/residential/apartment" className="dropdown-item" onClick={handleLinkClick}>Apartment</Link></li>
                    <li><Link to="/residential/villa" className="dropdown-item" onClick={handleLinkClick}>Independent House / Villa</Link></li>
                  </ul>
                </li>
                <li><Link to="/commercial" className="dropdown-item" onClick={handleLinkClick}><strong>Commercial</strong></Link></li>
                <li><Link to="/land" className="dropdown-item" onClick={handleLinkClick}><strong>Land / Plot</strong></Link></li>
              </ul>
            </li>

            {/* Services Dropdown */}
            <li
              className={`nav-item dropdown ${activeDropdown === "services" ? "show" : ""}`}
              onMouseEnter={() => window.innerWidth > 991 && setActiveDropdown("services")}
              onMouseLeave={() => window.innerWidth > 991 && setActiveDropdown(null)}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => { e.preventDefault(); toggleDropdown("services"); }}
              >
                Services
              </a>
              <ul className={`dropdown-menu ${activeDropdown === "services" ? "show" : ""}`}>
                <li><Link to="/services" className="dropdown-item" onClick={handleLinkClick}><strong>Our Services</strong></Link></li>
                <li><Link to="/property-management" className="dropdown-item" onClick={handleLinkClick}><strong>Property Management</strong></Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link" to="/about" onClick={handleLinkClick}>About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/partner" onClick={handleLinkClick}>Partner</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact" onClick={handleLinkClick}>Contact Us</Link></li>

            {/* Post Property Dropdown */}
            <li
              className={`nav-item dropdown ${activeDropdown === "postProperty" ? "show" : ""}`}
              onMouseEnter={() => window.innerWidth > 991 && setActiveDropdown("postProperty")}
              onMouseLeave={() => window.innerWidth > 991 && setActiveDropdown(null)}
            >
              <a
                href="#"
                className="nav-link dropdown-toggle"
                onClick={(e) => { e.preventDefault(); toggleDropdown("postProperty"); }}
              >
                Post Property
              </a>
              <ul className={`dropdown-menu ${activeDropdown === "postProperty" ? "show" : ""}`}>
                <li><Link to="/post-property" className="dropdown-item" onClick={handleLinkClick}><strong>Post Your Property</strong></Link></li>
                <li><Link to="/login" className="dropdown-item" onClick={handleLinkClick}><strong>Login</strong></Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;