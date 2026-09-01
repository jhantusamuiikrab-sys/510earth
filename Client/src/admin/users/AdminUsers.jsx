import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiEye,
  FiFilter,
  FiMoreVertical,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTrash2,
  FiUserCheck,
  FiUserX,
  FiKey,
  FiUsers,
  FiLogIn,
} from "react-icons/fi";

import {
  getAdminUsers,
  toggleAdminUserStatus,
} from "../../services/adminUserApi";

import ResetPasswordModal from "../components/ResetPasswordModal";
import DeleteUserModal from "../components/DeleteUserModal";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState({
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
    });

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [resetModal, setResetModal] =
    useState(false);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [toast, setToast] =
    useState("");

  const fetchUsers = useCallback(
    async (showLoader = true) => {
      try {
        if (showLoader) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }

        setError("");

        const result =
          await getAdminUsers({
            search,
            role,
            status,
            page,
            limit: 20,
          });
          
        setUsers(result.users || []);

        setPagination(
          result.pagination || {
            total: 0,
            page: 1,
            limit: 20,
            totalPages: 1,
          }
        );
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            "Unable to load users."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [search, role, status, page]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleLoginAsUser = (user) => {
  sessionStorage.setItem(
    "adminLoginAsUser",
    JSON.stringify({
      phoneno: user.phoneno,
      password: user.Decriptedpassword,
    })
  );

  navigate("/admin/login");
};

  const handleToggleStatus = async (user) => {
    try {
      await toggleAdminUserStatus(
        user._id
      );

      showToast(
        user.status
          ? "User deactivated successfully."
          : "User activated successfully."
      );

      fetchUsers(false);
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          "Unable to update user status."
      );
    }
  };

  const openResetModal = (user) => {
    setSelectedUser(user);
    setResetModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const activeCount = useMemo(
    () =>
      users.filter((user) => user.status)
        .length,
    [users]
  );

  const inactiveCount = useMemo(
    () =>
      users.filter((user) => !user.status)
        .length,
    [users]
  );

  const agentCount = useMemo(
    () =>
      users.filter(
        (user) => user.role === "agent"
      ).length,
    [users]
  );

  return (
    <div>
      {toast && (
        <div className="admin-toast">
          <FiShield />
          {toast}
        </div>
      )}

      {/* PAGE HEADER */}

      <div className="page-heading page-heading-row">
        <div>
          <span className="page-kicker">
            USER MANAGEMENT
          </span>

          <h1>Users</h1>

          <p>
            Manage agents and staff accounts,
            access and security.
          </p>
        </div>

        <Link
          to="/admin/users/create"
          className="btn-primary-modern"
        >
          <FiPlus />
          Add User
        </Link>
      </div>

      {/* STATS */}

      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon">
              <FiUsers />
            </div>

            <div>
              <span>Total Users</span>
              <strong>
                {pagination.total}
              </strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon success">
              <FiUserCheck />
            </div>

            <div>
              <span>Active</span>
              <strong>{activeCount}</strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon warning">
              <FiUserX />
            </div>

            <div>
              <span>Inactive</span>
              <strong>{inactiveCount}</strong>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="mini-stat-card">
            <div className="mini-stat-icon purple">
              <FiShield />
            </div>

            <div>
              <span>Agents</span>
              <strong>{agentCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}

      <div className="content-card">
        {/* FILTER */}

        <div className="users-toolbar">
          <div className="users-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search by name, username, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="toolbar-controls">
            <div className="select-modern">
              <FiFilter />

              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">
                  All Roles
                </option>

                <option value="agent">
                  Agents
                </option>

                <option value="staff">
                  Staff
                </option>
              </select>
            </div>

            <div className="select-modern">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">
                  All Status
                </option>

                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>
              </select>
            </div>

            <button
              className="refresh-button"
              onClick={() =>
                fetchUsers(false)
              }
              disabled={refreshing}
            >
              <FiRefreshCw
                className={
                  refreshing
                    ? "spin"
                    : ""
                }
              />
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="alert alert-danger m-4">
            {error}
          </div>
        )}

        {/* DESKTOP TABLE */}

        <div className="users-table-wrapper d-none d-lg-block">
          <table className="users-table">
            <thead>
              <tr>
                <th>USER</th>
                <th>CONTACT</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>LAST LOGIN</th>
                <th className="text-end">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map(
                  (_, index) => (
                    <tr key={index}>
                      <td colSpan="6">
                        <div className="table-skeleton" />
                      </td>
                    </tr>
                  )
                )
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-table"
                  >
                    <FiUsers />
                    <strong>
                      No users found
                    </strong>
                    <span>
                      Try changing your search
                      or filters.
                    </span>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-table-info">
                        <div className="user-avatar">
                          {user.name
                            ?.split(" ")
                            .map(
                              (x) => x[0]
                            )
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {user.name}
                          </strong>
                          <span>
                            #{user.Decriptedpassword}
                          </span>
                          <span>
                            @{user.username}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="contact-info">
                        <span>
                          {user.email}
                        </span>

                        <small>
                          {user.phoneno ||
                            "No phone"}
                        </small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`role-badge ${user.role}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          user.status
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        <i />
                        {user.status
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <span className="date-text">
                        {user.lastLoginAt
                          ? new Date(
                              user.lastLoginAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Never"}
                      </span>
                    </td>

                    <td>
                      <div className="table-actions">
                        <button
                          title="View"
                          onClick={() =>
                            navigate(
                              `/admin/users/${user._id}`
                            )
                          }
                        >
                          <FiEye />
                        </button>

                        <button
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/admin/users/${user._id}/edit`
                            )
                          }
                        >
                          <FiEdit2 />
                        </button>
                        <button
  title="Login"
  onClick={() => handleLoginAsUser(user)}
>
  <FiLogIn />
</button>

                        <button
                          title="Reset password"
                          onClick={() =>
                            openResetModal(user)
                          }
                        >
                          <FiKey />
                        </button>

                        <button
                          title={
                            user.status
                              ? "Deactivate"
                              : "Activate"
                          }
                          onClick={() =>
                            handleToggleStatus(
                              user
                            )
                          }
                        >
                          {user.status ? (
                            <FiUserX />
                          ) : (
                            <FiUserCheck />
                          )}
                        </button>

                        <button
                          className="danger"
                          title="Delete"
                          onClick={() =>
                            openDeleteModal(
                              user
                            )
                          }
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="mobile-user-list d-lg-none">
          {loading ? (
            Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  className="mobile-user-skeleton"
                  key={index}
                />
              )
            )
          ) : users.length === 0 ? (
            <div className="mobile-empty">
              <FiUsers />
              <strong>
                No users found
              </strong>
              <span>
                Try changing your filters.
              </span>
            </div>
          ) : (
            users.map((user) => (
              <div
                className="mobile-user-card"
                key={user._id}
              >
                <div className="mobile-user-top">
                  <div className="user-table-info">
                    <div className="user-avatar">
                      {user.name
                        ?.split(" ")
                        .map(
                          (x) => x[0]
                        )
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {user.name}
                      </strong>

                      <span>
                        @{user.username}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`status-badge ${
                      user.status
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    <i />
                    {user.status
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="mobile-user-details">
                  <div>
                    <span>Email</span>
                    <strong>
                      {user.email}
                    </strong>
                  </div>

                  <div>
                    <span>Role</span>
                    <strong>
                      <span
                        className={`role-badge ${user.role}`}
                      >
                        {user.role}
                      </span>
                    </strong>
                  </div>
                </div>

                <div className="mobile-user-actions">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/users/${user._id}`
                      )
                    }
                  >
                    <FiEye />
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/users/${user._id}/edit`
                      )
                    }
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      openResetModal(user)
                    }
                  >
                    <FiKey />
                    Reset
                  </button>

                  <button
                    onClick={() =>
                      handleToggleStatus(
                        user
                      )
                    }
                  >
                    {user.status ? (
                      <FiUserX />
                    ) : (
                      <FiUserCheck />
                    )}
                    {user.status
                      ? "Disable"
                      : "Enable"}
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      openDeleteModal(user)
                    }
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}

        {!loading &&
          users.length > 0 && (
            <div className="pagination-wrapper">
              <span>
                Showing{" "}
                {(pagination.page - 1) *
                  pagination.limit +
                  1}{" "}
                to{" "}
                {Math.min(
                  pagination.page *
                    pagination.limit,
                  pagination.total
                )}{" "}
                of {pagination.total} users
              </span>

              <div className="pagination-buttons">
                <button
                  disabled={
                    pagination.page <= 1
                  }
                  onClick={() =>
                    setPage(
                      pagination.page - 1
                    )
                  }
                >
                  <FiChevronLeft />
                </button>

                <span>
                  {pagination.page} /{" "}
                  {pagination.totalPages}
                </span>

                <button
                  disabled={
                    pagination.page >=
                    pagination.totalPages
                  }
                  onClick={() =>
                    setPage(
                      pagination.page + 1
                    )
                  }
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
      </div>

      {/* MODALS */}

      {resetModal &&
        selectedUser && (
          <ResetPasswordModal
            user={selectedUser}
            onClose={() => {
              setResetModal(false);
              setSelectedUser(null);
            }}
            onSuccess={showToast}
          />
        )}

      {deleteModal &&
        selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => {
              setDeleteModal(false);
              setSelectedUser(null);
            }}
            onSuccess={(message) => {
              showToast(message);
              fetchUsers(false);
            }}
          />
        )}
    </div>
  );
};

export default AdminUsers;