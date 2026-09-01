import React from "react";
import {
  FiBell,
  FiMenu,
  FiSearch,
} from "react-icons/fi";

const AdminHeader = ({
  setMobileOpen,
}) => {
  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );

  const initials = adminUser?.name
    ? adminUser.name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(true)}
        >
          <FiMenu />
        </button>

        <div className="header-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search anything..."
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-button">
          <FiBell />
          <span className="notification-dot" />
        </button>

        <div className="header-divider" />

        <div className="header-profile">
          <div className="header-avatar">
            {initials}
          </div>

          <div className="header-user-info">
            <strong>
              {adminUser?.name || "Administrator"}
            </strong>

            <span>
              {adminUser?.role || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;