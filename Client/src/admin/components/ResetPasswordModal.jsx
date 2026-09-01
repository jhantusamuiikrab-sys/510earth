import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiX,
} from "react-icons/fi";
import { resetUserPassword } from "../../services/adminUserApi";

const ResetPasswordModal = ({
  user,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await resetUserPassword(user._id, {
        newPassword: password,
      });

      onSuccess(
        "Password reset successfully."
      );

      onClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <div>
            <span className="page-kicker">
              SECURITY
            </span>
            <h5>Reset Password</h5>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <div className="custom-modal-body">
          <div className="reset-user-info">
            <div className="user-avatar large">
              {user.name
                ?.split(" ")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group-modern">
              <label>New Password</label>

              <div className="input-icon-wrapper">
                <FiLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter new password"
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

            <div className="form-group-modern">
              <label>Confirm Password</label>

              <div className="input-icon-wrapper">
                <FiLock />

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm new password"
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

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary-modern"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary-modern"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;