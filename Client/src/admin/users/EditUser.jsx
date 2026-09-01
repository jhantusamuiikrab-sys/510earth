import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiAtSign,
  FiBriefcase,
  FiCheck,
  FiEdit2,
  FiMail,
  FiPhone,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

import {
  getAdminUserById,
  updateAdminUser,
} from "../../services/adminUserApi";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phoneno: "",
    role: "staff",
    designation: "",
    status: true,
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getAdminUserById(id);

        const user = result.user || result;

        setForm({
          name: user.name || "",
          username: user.username || "",
          email: user.email || "",
          phoneno: user.phoneno || "",
          role: user.role || "staff",
          designation: user.designation || "",
          status: user.status ?? true,
          isEmailVerified:
            user.isEmailVerified ?? false,
          isPhoneVerified:
            user.isPhoneVerified ?? false,
        });
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!form.name.trim()) {
        setError("Name is required.");
        return;
      }

      if (!form.username.trim()) {
        setError("Username is required.");
        return;
      }

      if (!form.email.trim()) {
        setError("Email is required.");
        return;
      }

      const payload = {
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phoneno: form.phoneno.trim() || null,
        role: form.role,
        designation: form.designation.trim() || null,
        status: form.status,
        isEmailVerified: form.isEmailVerified,
        isPhoneVerified: form.isPhoneVerified,
      };

      await updateAdminUser(id, payload);

      setSuccess("User updated successfully.");

      setTimeout(() => {
        navigate(`/admin/users/${id}`);
      }, 800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update user."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-user-page">
        <div className="edit-loading">
          Loading user information...
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .edit-user-page {
          width: 100%;
          min-height: 100%;
          padding: 24px;
          background: #f7f9fc;
        }

        .edit-user-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .edit-header-left {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .edit-back {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid #e4e8ef;
          background: #fff;
          color: #1b2e4e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
          flex-shrink: 0;
        }

        .edit-back:hover {
          background: #1b2e4e;
          color: #fff;
        }

        .edit-kicker {
          display: block;
          color: #cfa866;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }

        .edit-title {
          margin: 0;
          color: #172033;
          font-size: 28px;
          font-weight: 800;
        }

        .edit-subtitle {
          margin: 5px 0 0;
          color: #7f8898;
          font-size: 14px;
        }

        .edit-layout {
          max-width: 1100px;
          margin: 0 auto;
        }

        .edit-card {
          background: #fff;
          border: 1px solid #e9edf3;
          border-radius: 18px;
          box-shadow: 0 5px 25px rgba(20, 35, 60, 0.045);
          overflow: hidden;
        }

        .edit-card-header {
          padding: 22px 24px;
          border-bottom: 1px solid #edf0f4;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .edit-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #eef3fa;
          color: #1b2e4e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .edit-card-header h3 {
          margin: 0;
          color: #202b3d;
          font-size: 17px;
          font-weight: 800;
        }

        .edit-card-header p {
          margin: 3px 0 0;
          color: #8a93a2;
          font-size: 12px;
        }

        .edit-form {
          padding: 25px;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .form-section:last-child {
          margin-bottom: 0;
        }

        .form-section-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 16px;
          color: #1b2e4e;
          font-size: 14px;
          font-weight: 800;
        }

        .form-section-title::after {
          content: "";
          height: 1px;
          flex: 1;
          background: #edf0f4;
          margin-left: 5px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 17px;
        }

        .form-group {
          min-width: 0;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        .form-label {
          display: block;
          margin-bottom: 7px;
          color: #465166;
          font-size: 12px;
          font-weight: 700;
        }

        .required {
          color: #dc3545;
          margin-left: 2px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper > svg {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: #929aaa;
          pointer-events: none;
        }

        .modern-input,
        .modern-select {
          width: 100%;
          min-height: 45px;
          border: 1px solid #dfe4eb;
          border-radius: 11px;
          background: #fff;
          color: #202b3d;
          padding: 0 13px;
          font-size: 13px;
          outline: none;
          transition: 0.2s;
        }

        .input-wrapper .modern-input {
          padding-left: 40px;
        }

        .modern-input:focus,
        .modern-select:focus {
          border-color: #1b2e4e;
          box-shadow: 0 0 0 3px rgba(27, 46, 78, 0.08);
        }

        .modern-input::placeholder {
          color: #a3aab6;
        }

        .modern-select {
          cursor: pointer;
        }

        .field-help {
          margin-top: 5px;
          color: #929aaa;
          font-size: 11px;
        }

        .toggle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
        }

        .toggle-card {
          border: 1px solid #e7ebf1;
          border-radius: 13px;
          padding: 14px;
          background: #fbfcfe;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          transition: 0.2s;
        }

        .toggle-card:hover {
          border-color: #cfd6e0;
        }

        .toggle-info strong {
          display: block;
          color: #293449;
          font-size: 12px;
        }

        .toggle-info span {
          display: block;
          margin-top: 3px;
          color: #9099a8;
          font-size: 10px;
        }

        .toggle-switch {
          width: 42px;
          height: 23px;
          border-radius: 20px;
          background: #d9dee6;
          padding: 3px;
          transition: 0.2s;
          flex-shrink: 0;
        }

        .toggle-switch::after {
          content: "";
          display: block;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #fff;
          transition: 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,.15);
        }

        .toggle-switch.on {
          background: #1b2e4e;
        }

        .toggle-switch.on::after {
          transform: translateX(19px);
        }

        .alert-box {
          padding: 13px 15px;
          border-radius: 11px;
          font-size: 13px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .alert-error {
          color: #a61b1b;
          background: #fff0f0;
          border: 1px solid #ffd2d2;
        }

        .alert-success {
          color: #13733f;
          background: #ecfaf2;
          border: 1px solid #c8efd9;
        }

        .edit-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #edf0f4;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .edit-button {
          min-height: 44px;
          padding: 0 18px;
          border-radius: 11px;
          border: 1px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s;
        }

        .edit-button.cancel {
          color: #39445a;
          background: #fff;
          border-color: #dfe4eb;
        }

        .edit-button.cancel:hover {
          border-color: #aeb7c5;
        }

        .edit-button.save {
          background: #1b2e4e;
          color: #fff;
        }

        .edit-button.save:hover {
          background: #13223a;
        }

        .edit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .edit-loading {
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7d8797;
          font-size: 14px;
        }

        @media (max-width: 991px) {
          .edit-user-page {
            padding: 18px;
          }

          .toggle-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .edit-user-page {
            padding: 14px;
          }

          .edit-user-header {
            align-items: flex-start;
          }

          .edit-title {
            font-size: 22px;
          }

          .edit-subtitle {
            font-size: 12px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: auto;
          }

          .edit-card-header {
            padding: 18px;
          }

          .edit-form {
            padding: 18px;
          }

          .edit-footer {
            flex-direction: column-reverse;
          }

          .edit-button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .edit-title {
            font-size: 20px;
          }

          .edit-back {
            width: 38px;
            height: 38px;
          }

          .edit-card-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <div className="edit-user-page">
        {/* HEADER */}
        <div className="edit-user-header">
          <div className="edit-header-left">
            <button
              className="edit-back"
              onClick={() =>
                navigate(`/admin/users/${id}`)
              }
              title="Back"
            >
              <FiArrowLeft />
            </button>

            <div>
              <span className="edit-kicker">
                USER MANAGEMENT
              </span>

              <h1 className="edit-title">
                Edit User
              </h1>

              <p className="edit-subtitle">
                Update account information and access settings.
              </p>
            </div>
          </div>
        </div>

        <div className="edit-layout">
          <div className="edit-card">
            <div className="edit-card-header">
              <div className="edit-card-icon">
                <FiEdit2 />
              </div>

              <div>
                <h3>User Information</h3>
                <p>
                  Update the user's profile and account settings.
                </p>
              </div>
            </div>

            <form
              className="edit-form"
              onSubmit={handleSubmit}
            >
              {error && (
                <div className="alert-box alert-error">
                  <FiX />
                  {error}
                </div>
              )}

              {success && (
                <div className="alert-box alert-success">
                  <FiCheck />
                  {success}
                </div>
              )}

              {/* BASIC INFORMATION */}
              <div className="form-section">
                <div className="form-section-title">
                  <FiUser />
                  Basic Information
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name
                      <span className="required">*</span>
                    </label>

                    <div className="input-wrapper">
                      <FiUser />

                      <input
                        type="text"
                        name="name"
                        className="modern-input"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handleChange}
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Username
                      <span className="required">*</span>
                    </label>

                    <div className="input-wrapper">
                      <FiAtSign />

                      <input
                        type="text"
                        name="username"
                        className="modern-input"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={50}
                        required
                      />
                    </div>

                    <div className="field-help">
                      Username will be stored in lowercase.
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address
                      <span className="required">*</span>
                    </label>

                    <div className="input-wrapper">
                      <FiMail />

                      <input
                        type="email"
                        name="email"
                        className="modern-input"
                        placeholder="Enter email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number
                    </label>

                    <div className="input-wrapper">
                      <FiPhone />

                      <input
                        type="tel"
                        name="phoneno"
                        className="modern-input"
                        placeholder="Enter phone number"
                        value={form.phoneno}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Designation
                    </label>

                    <div className="input-wrapper">
                      <FiBriefcase />

                      <input
                        type="text"
                        name="designation"
                        className="modern-input"
                        placeholder="e.g. Sales Executive"
                        value={form.designation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCESS */}
              <div className="form-section">
                <div className="form-section-title">
                  <FiShield />
                  Role & Access
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      User Role
                      <span className="required">*</span>
                    </label>

                    <select
                      name="role"
                      className="modern-select"
                      value={form.role}
                      onChange={handleChange}
                      required
                    >                     

                      <option value="agent">
                        Agent
                      </option>

                      <option value="staff">
                        Staff
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Account Status
                    </label>

                    <div
                      className="toggle-card"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          status: !prev.status,
                        }))
                      }
                    >
                      <div className="toggle-info">
                        <strong>
                          {form.status
                            ? "Active Account"
                            : "Inactive Account"}
                        </strong>

                        <span>
                          {form.status
                            ? "User can login to the system."
                            : "User cannot login to the system."}
                        </span>
                      </div>

                      <div
                        className={`toggle-switch ${
                          form.status ? "on" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* VERIFICATION */}
              <div className="form-section">
                <div className="form-section-title">
                  <FiCheck />
                  Verification
                </div>

                <div className="toggle-grid">
                  <div
                    className="toggle-card"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        isEmailVerified:
                          !prev.isEmailVerified,
                      }))
                    }
                  >
                    <div className="toggle-info">
                      <strong>Email Verified</strong>

                      <span>
                        Mark email as verified.
                      </span>
                    </div>

                    <div
                      className={`toggle-switch ${
                        form.isEmailVerified
                          ? "on"
                          : ""
                      }`}
                    />
                  </div>

                  <div
                    className="toggle-card"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        isPhoneVerified:
                          !prev.isPhoneVerified,
                      }))
                    }
                  >
                    <div className="toggle-info">
                      <strong>Phone Verified</strong>

                      <span>
                        Mark phone as verified.
                      </span>
                    </div>

                    <div
                      className={`toggle-switch ${
                        form.isPhoneVerified
                          ? "on"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="edit-footer">
                <button
                  type="button"
                  className="edit-button cancel"
                  onClick={() =>
                    navigate(`/admin/users/${id}`)
                  }
                  disabled={saving}
                >
                  <FiX />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="edit-button save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;