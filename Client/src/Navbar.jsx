import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../src/style/Navbar.css";
import { FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
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
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark main_header">
      {" "}
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/510earth.webp"
            alt="510earth"
            className="img-fluid"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li
              className={`nav-item dropdown ${
                activeDropdown === "properties" ? "show" : ""
              }`}
              onMouseEnter={() =>
                window.innerWidth > 991 && setActiveDropdown("properties")
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
                  toggleDropdown("properties");
                }}
              >
                Properties
              </a>

              <ul
                className={`dropdown-menu ${
                  activeDropdown === "properties" ? "show" : ""
                }`}
              >
                <li
                  className={`dropend ${
                    activeSubDropdown === "residential" ? "show" : ""
                  }`}
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
                    className="dropdown-item submenu-toggle"
                    onClick={(e) => toggleSubDropdown(e, "residential")}
                  >
                    <strong>Residential</strong>
                    <FiChevronRight className="submenu-icon" />
                  </a>

                  <ul
                    className={`dropdown-menu sub_menu ${
                      activeSubDropdown === "residential" ? "show" : ""
                    }`}
                  >
                    <li>
                      <Link
                        to="/residential/apartment"
                        className="dropdown-item"
                      >
                        Apartment
                      </Link>
                    </li>

                    <li>
                      <Link to="/residential/villa" className="dropdown-item">
                        Independent House / Villa
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link to="/commercial" className="dropdown-item">
                    <strong>Commercial</strong>
                  </Link>
                </li>

                <li>
                  <Link to="/land" className="dropdown-item">
                    <strong>Land / Plot</strong>
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={`nav-item dropdown ${
                activeDropdown === "services" ? "show" : ""
              }`}
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
                className={`dropdown-menu ${
                  activeDropdown === "services" ? "show" : ""
                }`}
              >
                <li>
                  <Link to="/services" className="dropdown-item">
                    <strong>Our Services</strong>
                  </Link>
                </li>

                <li>
                  <Link to="/property-management" className="dropdown-item">
                    <strong> Property Management</strong>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/partner">
                Partner
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>

            <li
              className={`nav-item dropdown ${
                activeDropdown === "postProperty" ? "show" : ""
              }`}
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
                className={`dropdown-menu ${
                  activeDropdown === "postProperty" ? "show" : ""
                }`}
              >
                <li>
                  <Link to="/post-property" className="dropdown-item">
                    <strong>Post Your Property</strong>
                  </Link>
                </li>

                <li>
                  <Link to="/login" className="dropdown-item">
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
