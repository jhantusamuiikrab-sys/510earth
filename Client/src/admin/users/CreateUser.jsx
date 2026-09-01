import React, { useState } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiSave,
  FiUser,
} from "react-icons/fi";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { createAdminUser } from "../../services/adminUserApi";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      username: "",
      email: "",
      phoneno: "",
      password: "",
      confirmPassword: "",
      role: "agent",
      designation: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await createAdminUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phoneno: formData.phoneno,
        password: formData.password,
        role: formData.role,
        designation: formData.designation,
      });

      navigate("/admin/users", {
        state: {
          success:
            "User created successfully.",
        },
      });
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to create user."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <Link
          to="/admin/users"
          className="back-link"
        >
          <FiArrowLeft />
          Back to Users
        </Link>

        <span className="page-kicker mt-3">
          USER MANAGEMENT
        </span>

        <h1>Create User</h1>

        <p>
          Create a new agent or staff account.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-xl-8">
            <div className="content-card form-card">
              <div className="form-card-heading">
                <div className="form-section-icon">
                  <FiUser />
                </div>

                <div>
                  <h5>Basic Information</h5>
                  <p>
                    Enter the user's account
                    information.
                  </p>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Full Name *
                    </label>

                    <div className="input-icon-wrapper">
                      <FiUser />

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={
                          handleChange
                        }
                        placeholder="Rahul Kumar"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Username *
                    </label>

                    <div className="input-icon-wrapper">
                      <FiUser />

                      <input
                        type="text"
                        name="username"
                        value={
                          formData.username
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="rahul"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Email *
                    </label>

                    <div className="input-icon-wrapper">
                      <FiMail />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={
                          handleChange
                        }
                        placeholder="rahul@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>Phone</label>

                    <div className="input-icon-wrapper">
                      <FiPhone />

                      <input
                        type="tel"
                        name="phoneno"
                        value={
                          formData.phoneno
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="9876543210"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>Role *</label>

                    <select
                      className="modern-select"
                      name="role"
                      value={formData.role}
                      onChange={
                        handleChange
                      }
                    >
                      <option value="agent">
                        Agent
                      </option>

                      <option value="staff">
                        Staff
                      </option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Designation
                    </label>

                    <input
                      className="modern-input"
                      type="text"
                      name="designation"
                      value={
                        formData.designation
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Property Consultant"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="content-card form-card mt-4">
              <div className="form-card-heading">
                <div className="form-section-icon">
                  <FiLock />
                </div>

                <div>
                  <h5>Login Credentials</h5>
                  <p>
                    Create a secure password for
                    this account.
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Password *
                    </label>

                    <div className="input-icon-wrapper">
                      <FiLock />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Minimum 6 characters"
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group-modern">
                    <label>
                      Confirm Password *
                    </label>

                    <div className="input-icon-wrapper">
                      <FiLock />

                      <input
                        type={
                          showConfirm
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={
                          formData.confirmPassword
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Repeat password"
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirm(
                            !showConfirm
                          )
                        }
                      >
                        {showConfirm ? (
                          <FiEyeOff />
                        ) : (
                          <FiEye />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="password-hint">
                Use at least 6 characters. A
                combination of letters, numbers and
                symbols is recommended.
              </div>
            </div>

            <div className="form-submit-row">
              <Link
                to="/admin/users"
                className="btn-secondary-modern"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn-primary-modern"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Create User
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="content-card tips-card">
              <div className="tips-icon">
                <FiUser />
              </div>

              <h5>User Roles</h5>

              <div className="role-tip">
                <span className="role-badge agent">
                  Agent
                </span>

                <p>
                  Property agents can manage their
                  assigned leads, customers and
                  properties.
                </p>
              </div>

              <div className="role-tip">
                <span className="role-badge staff">
                  Staff
                </span>

                <p>
                  Staff members can perform
                  day-to-day administrative tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;