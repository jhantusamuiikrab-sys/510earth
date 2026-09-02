import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiClipboard,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUsers,
  FiUserPlus,
  FiX,
  FiMapPin,
  FiGrid,
  FiBriefcase,
  FiMap,
} from "react-icons/fi";

const AdminSidebar = ({
  mobileOpen,
  setMobileOpen,
  onLogout,
}) => {
  const [propertiesOpen, setPropertiesOpen] =
    useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/admin/dashboard",
    },

    {
      title: "Users",
      icon: <FiUsers />,
      path: "/admin/users",
    },

    // =====================================================
    // PROPERTIES WITH SUB MENU
    // =====================================================

    {
      title: "Properties",
      icon: <FiHome />,
      hasSubMenu: true,

      subMenu: [
        {
          title: "Flat / Apartment",
          path: "/admin/Flat-Apartment",
        },
        {
          title: "Independent House / Villa",
          path: "/admin/Independent-House-Villa",
        },
        {
          title: "Commercial",
          path: "/admin/Commercial",
        },
        {
          title: "Land",
          path: "/admin/Land",
        },
      ],
    },

    {
      title: "Nearby operation",
      icon: <FiMapPin />,
      path: "/admin/nearby",
    },

    {
      title: "Amenities operation",
      icon: <FiGrid />,
      path: "/admin/amenities",
    },

    {
      title: "Zone operation",
      icon: <FiMap />,
      path: "/admin/zones",
    },


    {
      title: "Suitable business",
      icon: <FiBriefcase />,
      path: "/admin/suitablebusiness",
    },

    {
      title: "Leads",
      icon: <FiUserPlus />,
      path: "/admin/leads",
    },

    {
      title: "Customers",
      icon: <FiUsers />,
      path: "/admin/customers",
    },

    {
      title: "Reports",
      icon: <FiBarChart2 />,
      path: "/admin/reports",
    },

     {
      title: "Requirement Mismatch Form",
      icon: <FiBarChart2 />,
      path: "/admin/req-mismatch",
    },

     {
      title: "Requirement Mismatch Form Dashboard",
      icon: <FiBarChart2 />,
      path: "/admin/req-mismatchApp",
    },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* =====================================================
            BRAND
        ===================================================== */}

        <div className="sidebar-brand">
          <div className="brand-logo">
            <img
              src="/images/earth.webp"
              alt="51oearth"
            />
          </div>

          <div className="brand-text">
            <strong>RealEstate</strong>
            <span>ADMIN PANEL</span>
          </div>

          <button
            className="sidebar-mobile-close"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* =====================================================
            MAIN MENU
        ===================================================== */}

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            // =================================================
            // NORMAL MENU ITEM
            // =================================================

            if (!item.hasSubMenu) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${
                      isActive ? "active" : ""
                    }`
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <span className="sidebar-icon">
                    {item.icon}
                  </span>

                  <span>{item.title}</span>
                </NavLink>
              );
            }

            // =================================================
            // PROPERTY MENU WITH SUB MENU
            // =================================================

            return (
              <div
                key={item.title}
                className="sidebar-menu-group"
              >
                <button
                  type="button"
                  className={`sidebar-link sidebar-parent-link ${
                    propertiesOpen
                      ? "expanded"
                      : ""
                  }`}
                  onClick={() =>
                    setPropertiesOpen(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  <span className="sidebar-icon">
                    {item.icon}
                  </span>

                  <span className="sidebar-parent-title">
                    {item.title}
                  </span>

                  <span className="sidebar-chevron">
                    {propertiesOpen ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </span>
                </button>

                {/* =================================================
                    SUB MENU
                ================================================= */}

                {propertiesOpen && (
                  <div className="sidebar-submenu">
                    {item.subMenu.map(
                      (subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({
                            isActive,
                          }) =>
                            `sidebar-submenu-link ${
                              isActive
                                ? "active"
                                : ""
                            }`
                          }
                          onClick={() =>
                            setMobileOpen(
                              false
                            )
                          }
                        >
                          <span className="submenu-dot" />

                          <span>
                            {
                              subItem.title
                            }
                          </span>
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* =====================================================
            SYSTEM
        ===================================================== */}

        <div className="sidebar-section-title mt-4">
          SYSTEM
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin/change-password"
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <span className="sidebar-icon">
              <FiSettings />
            </span>

            <span>Change Password</span>
          </NavLink>
        </nav>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="sidebar-bottom">
          <button
            className="sidebar-logout"
            onClick={onLogout}
          >
            <span>
              <FiLogOut />
            </span>

            Logout
          </button>

          <div className="sidebar-version">
            RealEstate Admin v1.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;