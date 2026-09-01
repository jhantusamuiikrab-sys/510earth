import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiAtSign,
  FiBriefcase,
  FiLock,
} from "react-icons/fi";

import { getAdminUserById } from "../../services/adminUserApi";

const ViewUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getAdminUserById(id);

        setUser(result.user || result);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Unable to load user information."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const getInitials = (name = "") => {
    return (
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "Never";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <div>
            <div className="skeleton skeleton-small" />
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>

        <div className="user-view-grid">
          <div className="user-profile-card skeleton-card" />
          <div className="user-details-card skeleton-card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-page">
        <div className="user-error-card">
          <FiUserX />

          <h3>Unable to load user</h3>

          <p>{error}</p>

          <button
            className="user-btn secondary"
            onClick={() => navigate("/admin/users")}
          >
            <FiArrowLeft />
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <style>{`
        .user-page {
          width: 100%;
          min-height: 100%;
          padding: 24px;
          background: #f7f9fc;
        }

        .user-page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .user-header-left {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .back-button {
          width: 42px;
          height: 42px;
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1b2e4e;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .back-button:hover {
          background: #1b2e4e;
          color: #fff;
          transform: translateX(-2px);
        }

        .user-kicker {
          display: block;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #cfa866;
          margin-bottom: 4px;
        }

        .user-page-title {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: #172033;
        }

        .user-page-subtitle {
          margin: 5px 0 0;
          color: #7b8496;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .user-btn {
          min-height: 42px;
          padding: 0 16px;
          border-radius: 11px;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-btn.primary {
          background: #1b2e4e;
          color: #fff;
        }

        .user-btn.primary:hover {
          background: #13223a;
          transform: translateY(-1px);
        }

        .user-btn.secondary {
          background: #fff;
          color: #1b2e4e;
          border-color: #e2e6ed;
        }

        .user-btn.secondary:hover {
          border-color: #1b2e4e;
        }

        .user-view-grid {
          display: grid;
          grid-template-columns: 330px minmax(0, 1fr);
          gap: 20px;
        }

        .user-profile-card,
        .user-details-card {
          background: #fff;
          border: 1px solid #e9edf3;
          border-radius: 18px;
          box-shadow: 0 5px 25px rgba(20, 35, 60, 0.045);
        }

        .user-profile-card {
          padding: 28px 22px;
          text-align: center;
          height: fit-content;
        }

        .large-user-avatar {
          width: 96px;
          height: 96px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1b2e4e, #304d79);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 800;
          box-shadow: 0 10px 25px rgba(27, 46, 78, 0.18);
        }

        .profile-name {
          margin: 0;
          color: #172033;
          font-size: 21px;
          font-weight: 800;
        }

        .profile-username {
          display: block;
          margin-top: 5px;
          color: #8a93a3;
          font-size: 13px;
        }

        .profile-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 15px;
          padding: 7px 12px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 800;
        }

        .profile-status.active {
          color: #147a45;
          background: #eaf8f0;
        }

        .profile-status.inactive {
          color: #b42318;
          background: #fff0ef;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }

        .profile-divider {
          height: 1px;
          background: #edf0f4;
          margin: 24px 0;
        }

        .profile-item {
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          margin-bottom: 18px;
        }

        .profile-item:last-child {
          margin-bottom: 0;
        }

        .profile-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f2f5f9;
          color: #1b2e4e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-item span {
          display: block;
          color: #8a93a3;
          font-size: 11px;
          margin-bottom: 2px;
        }

        .profile-item strong {
          color: #273247;
          font-size: 13px;
          font-weight: 700;
          word-break: break-word;
        }

        .user-details-card {
          padding: 24px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf0f4;
          margin-bottom: 20px;
        }

        .section-header h3 {
          margin: 0;
          color: #172033;
          font-size: 17px;
          font-weight: 800;
        }

        .section-header span {
          color: #929aaa;
          font-size: 12px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .detail-item {
          border: 1px solid #edf0f4;
          border-radius: 13px;
          padding: 15px;
          background: #fbfcfe;
          min-width: 0;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8992a2;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 7px;
        }

        .detail-label svg {
          color: #cfa866;
        }

        .detail-value {
          color: #202b3d;
          font-size: 14px;
          font-weight: 700;
          word-break: break-word;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 11px;
          border-radius: 7px;
          font-size: 11px;
          font-weight: 800;
          text-transform: capitalize;
        }

        .role-badge.admin {
          background: #f0ebff;
          color: #6841d8;
        }

        .role-badge.agent {
          background: #eaf3ff;
          color: #2463b3;
        }

        .role-badge.staff {
          background: #fff6df;
          color: #9b6c00;
        }

        .verification-section {
          margin-top: 26px;
        }

        .verification-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .verification-card {
          border: 1px solid #edf0f4;
          border-radius: 13px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .verification-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f2f5f9;
          color: #7b8494;
        }

        .verification-card.verified .verification-icon {
          background: #eaf8f0;
          color: #16834c;
        }

        .verification-card strong {
          display: block;
          font-size: 13px;
          color: #253044;
        }

        .verification-card span {
          display: block;
          margin-top: 3px;
          font-size: 11px;
          color: #8b94a3;
        }

        .security-section {
          margin-top: 26px;
        }

        .security-box {
          padding: 17px;
          border-radius: 13px;
          background: #f8fafc;
          border: 1px solid #edf0f4;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .security-box svg {
          color: #cfa866;
          margin-top: 2px;
        }

        .security-box strong {
          display: block;
          color: #263247;
          font-size: 13px;
          margin-bottom: 4px;
        }

        .security-box span {
          color: #8a93a2;
          font-size: 12px;
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #eef1f5 25%,
            #f7f8fa 50%,
            #eef1f5 75%
          );
          background-size: 200% 100%;
          animation: skeletonLoading 1.5s infinite;
          border-radius: 8px;
        }

        .skeleton-small {
          width: 120px;
          height: 11px;
          margin-bottom: 10px;
        }

        .skeleton-title {
          width: 230px;
          height: 28px;
          margin-bottom: 8px;
        }

        .skeleton-text {
          width: 300px;
          height: 13px;
        }

        .skeleton-card {
          min-height: 450px;
        }

        @keyframes skeletonLoading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .user-error-card {
          min-height: 400px;
          background: #fff;
          border: 1px solid #edf0f4;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px;
        }

        .user-error-card > svg {
          width: 50px;
          height: 50px;
          color: #dc3545;
          margin-bottom: 15px;
        }

        .user-error-card h3 {
          margin: 0 0 7px;
          color: #202a3c;
        }

        .user-error-card p {
          color: #7f8898;
          margin: 0 0 20px;
        }

        @media (max-width: 991px) {
          .user-page {
            padding: 18px;
          }

          .user-view-grid {
            grid-template-columns: 1fr;
          }

          .user-profile-card {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 18px;
            text-align: left;
            align-items: center;
          }

          .large-user-avatar {
            grid-row: span 3;
            margin: 0;
          }

          .profile-divider,
          .profile-item {
            grid-column: 1 / -1;
          }

          .profile-status {
            margin-top: 8px;
          }

          .profile-divider {
            margin: 18px 0;
          }
        }

        @media (max-width: 767px) {
          .user-page {
            padding: 14px;
          }

          .user-page-header {
            align-items: flex-start;
          }

          .user-page-title {
            font-size: 22px;
          }

          .user-page-subtitle {
            font-size: 12px;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions .user-btn {
            flex: 1;
          }

          .user-page-header {
            flex-wrap: wrap;
          }

          .user-header-left {
            width: 100%;
          }

          .detail-grid,
          .verification-grid {
            grid-template-columns: 1fr;
          }

          .user-details-card {
            padding: 17px;
          }

          .user-profile-card {
            display: block;
            text-align: center;
          }

          .large-user-avatar {
            margin: 0 auto 15px;
          }

          .profile-divider {
            margin: 20px 0;
          }

          .profile-item {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .header-actions {
            flex-direction: column;
          }

          .user-btn {
            width: 100%;
          }

          .back-button {
            width: 38px;
            height: 38px;
          }

          .user-page-title {
            font-size: 20px;
          }

          .detail-item {
            padding: 13px;
          }
        }
      `}</style>

      <div className="user-page">
        <div className="user-page-header">
          <div className="user-header-left">
            <button
              className="back-button"
              onClick={() => navigate("/admin/users")}
              title="Back"
            >
              <FiArrowLeft />
            </button>

            <div>
              <span className="user-kicker">
                USER MANAGEMENT
              </span>

              <h1 className="user-page-title">
                User Profile
              </h1>

              <p className="user-page-subtitle">
                View account information, access and security details.
              </p>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="user-btn secondary"
              onClick={() =>
                navigate(`/admin/users/${user._id}/edit`)
              }
            >
              <FiEdit2 />
              Edit User
            </button>
          </div>
        </div>

        <div className="user-view-grid">
          {/* PROFILE CARD */}
          <div className="user-profile-card">
            <div className="large-user-avatar">
              {getInitials(user.name)}
            </div>

            <h2 className="profile-name">
              {user.name}
            </h2>

            <span className="profile-username">
              @{user.username}
            </span>

            <span
              className={`profile-status ${
                user.status ? "active" : "inactive"
              }`}
            >
              <i className="status-dot" />
              {user.status ? "Active Account" : "Inactive Account"}
            </span>

            <div className="profile-divider" />

            <div className="profile-item">
              <div className="profile-icon">
                <FiMail />
              </div>

              <div>
                <span>Email</span>
                <strong>{user.email}</strong>
              </div>
            </div>

            <div className="profile-item">
              <div className="profile-icon">
                <FiPhone />
              </div>

              <div>
                <span>Phone</span>
                <strong>
                  {user.phoneno || "Not provided"}
                </strong>
              </div>
            </div>

            <div className="profile-item">
              <div className="profile-icon">
                <FiBriefcase />
              </div>

              <div>
                <span>Designation</span>
                <strong>
                  {user.designation || "Not specified"}
                </strong>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="user-details-card">
            <div className="section-header">
              <div>
                <h3>Account Information</h3>
              </div>

              <span>User ID: {user._id}</span>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <FiUser />
                  Full Name
                </div>

                <div className="detail-value">
                  {user.name}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiAtSign />
                  Username
                </div>

                <div className="detail-value">
                  @{user.username}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiMail />
                  Email Address
                </div>

                <div className="detail-value">
                  {user.email}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiPhone />
                  Phone Number
                </div>

                <div className="detail-value">
                  {user.phoneno || "Not provided"}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiShield />
                  Role
                </div>

                <div className="detail-value">
                  <span
                    className={`role-badge ${user.role}`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiBriefcase />
                  Designation
                </div>

                <div className="detail-value">
                  {user.designation || "Not specified"}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiCalendar />
                  Created On
                </div>

                <div className="detail-value">
                  {formatDate(user.createdAt)}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <FiCalendar />
                  Last Updated
                </div>

                <div className="detail-value">
                  {formatDate(user.updatedAt)}
                </div>
              </div>
            </div>

            {/* VERIFICATION */}
            <div className="verification-section">
              <div className="section-header">
                <h3>Verification</h3>
              </div>

              <div className="verification-grid">
                <div
                  className={`verification-card ${
                    user.isEmailVerified
                      ? "verified"
                      : ""
                  }`}
                >
                  <div className="verification-icon">
                    {user.isEmailVerified ? (
                      <FiCheckCircle />
                    ) : (
                      <FiMail />
                    )}
                  </div>

                  <div>
                    <strong>Email Verification</strong>

                    <span>
                      {user.isEmailVerified
                        ? "Email verified"
                        : "Email not verified"}
                    </span>
                  </div>
                </div>

                <div
                  className={`verification-card ${
                    user.isPhoneVerified
                      ? "verified"
                      : ""
                  }`}
                >
                  <div className="verification-icon">
                    {user.isPhoneVerified ? (
                      <FiCheckCircle />
                    ) : (
                      <FiPhone />
                    )}
                  </div>

                  <div>
                    <strong>Phone Verification</strong>

                    <span>
                      {user.isPhoneVerified
                        ? "Phone verified"
                        : "Phone not verified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <div className="security-section">
              <div className="section-header">
                <h3>Login & Security</h3>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <div className="detail-label">
                    <FiClock />
                    Last Login
                  </div>

                  <div className="detail-value">
                    {formatDateTime(user.lastLoginAt)}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <FiMapPin />
                    Last Login IP
                  </div>

                  <div className="detail-value">
                    {user.lastLoginIP || "Not available"}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <FiLock />
                    Login Attempts
                  </div>

                  <div className="detail-value">
                    {user.loginAttempts ?? 0}
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-label">
                    <FiCalendar />
                    Password Changed
                  </div>

                  <div className="detail-value">
                    {formatDateTime(
                      user.passwordChangedAt
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CREATED BY */}
            {user.createdBy && (
              <div className="security-section">
                <div className="section-header">
                  <h3>Account Created By</h3>
                </div>

                <div className="security-box">
                  <FiShield />

                  <div>
                    <strong>
                      {user.createdBy.name ||
                        user.createdBy.username ||
                        "Administrator"}
                    </strong>

                    <span>
                      This account was created by an authorized
                      administrator.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;