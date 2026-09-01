import React, { useState } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { changeAdminPassword } from "../../services/adminUserApi";

const ChangePassword = () => {
  const [formData, setFormData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
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
    setSuccess("");

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError(
        "Please fill all password fields."
      );
      return;
    }

    if (formData.newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "New passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await changeAdminPassword({
          currentPassword:
            formData.currentPassword,
          newPassword:
            formData.newPassword,
        });

      setSuccess(
        result.message ||
          "Password changed successfully."
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-heading">
        <Link
          to="/admin/dashboard"
          className="back-link"
        >
          <FiArrowLeft />
          Back to Dashboard
        </Link>

        <span className="page-kicker mt-3">
          ACCOUNT SECURITY
        </span>

        <h1>Change Password</h1>

        <p>
          Keep your administrator account secure by
          regularly updating your password.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8 col-xl-6">
          <div className="content-card form-card">
            <div className="security-header">
              <div className="security-icon">
                <FiLock />
              </div>

              <div>
                <h5>Update Password</h5>
                <p>
                  Enter your current password and
                  choose a new one.
                </p>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <FiCheck className="me-2" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group-modern">
                <label>
                  Current Password
                </label>

                <div className="input-icon-wrapper">
                  <FiLock />

                  <input
                    type={
                      showCurrent
                        ? "text"
                        : "password"
                    }
                    name="currentPassword"
                    value={
                      formData.currentPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                  >
                    {showCurrent ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group-modern">
                <label>New Password</label>

                <div className="input-icon-wrapper">
                  <FiLock />

                  <input
                    type={
                      showNew
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    value={
                      formData.newPassword
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowNew(
                        !showNew
                      )
                    }
                  >
                    {showNew ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group-modern">
                <label>
                  Confirm New Password
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
                    placeholder="Repeat new password"
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

              <button
                type="submit"
                className="btn-primary-modern w-100 justify-content-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiLock />
                    Change Password
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="security-tips">
            <strong>Password security tips</strong>

            <ul>
              <li>
                Use at least 6 characters.
              </li>

              <li>
                Avoid using easily guessed
                information.
              </li>

              <li>
                Never share your password with
                anyone.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;