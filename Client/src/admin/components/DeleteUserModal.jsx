import React, { useState } from "react";
import {
  FiAlertTriangle,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { deleteAdminUser } from "../../services/adminUserApi";

const DeleteUserModal = ({
  user,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteAdminUser(user._id);

      onSuccess(
        "User deleted successfully."
      );

      onClose();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Unable to delete user."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="custom-modal delete-modal">
        <div className="custom-modal-header">
          <div />

          <button
            className="modal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        <div className="delete-modal-content">
          <div className="delete-icon">
            <FiTrash2 />
          </div>

          <h4>Delete User?</h4>

          <p>
            Are you sure you want to delete{" "}
            <strong>{user.name}</strong>?
          </p>

          <span>
            This account will be deactivated and
            removed from the active user list.
          </span>

          <div className="modal-actions justify-content-center">
            <button
              className="btn-secondary-modern"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn-danger-modern"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 />
                  Delete User
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;