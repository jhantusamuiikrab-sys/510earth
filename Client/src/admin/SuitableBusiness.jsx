import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiActivity,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiImage,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import {
  createSuitableBusiness,
  deleteSuitableBusiness,
  getSuitableBusinesses,
  updateSuitableBusiness,
  toggleSuitableBusinessStatus,
} from "../services/suitableBusinessApi";

import "../assets/Content/suitablebusiness.css";

// =====================================================
// SERVER URL
// =====================================================

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:3000";

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${SERVER_URL}${image}`;
};

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  Name: "",
  IsActive: true,
  image: null,
};

// =====================================================
// COMPONENT
// =====================================================

const SuitableBusiness = () => {
  // ===================================================
  // DATA
  // ===================================================

  const [businessList, setBusinessList] =
    useState([]);

  // ===================================================
  // LOADING
  // ===================================================

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  // ===================================================
  // FILTERS
  // ===================================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  // ===================================================
  // PAGINATION
  // ===================================================

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(12);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    });

  // ===================================================
  // MODAL
  // ===================================================

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  // ===================================================
  // FORM
  // ===================================================

  const [form, setForm] =
    useState({
      ...initialForm,
    });

  // ===================================================
  // IMAGE PREVIEW
  // ===================================================

  const [preview, setPreview] =
    useState(null);

  // ===================================================
  // ALERTS
  // ===================================================

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // FETCH SUITABLE BUSINESSES
  // =====================================================

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getSuitableBusinesses({
          search,
          status,
          page,
          limit,
        });

      setBusinessList(
        response?.data || []
      );

      setPagination(
        response?.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      console.error(
        "Fetch suitable businesses:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load suitable businesses."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH ON FILTER / PAGE
  // =====================================================

  useEffect(() => {
    fetchBusinesses();
  }, [page, status]);

  // =====================================================
  // SEARCH DEBOUNCE
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      } else {
        fetchBusinesses();
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const stats = useMemo(() => {
    const total =
      pagination.total || 0;

    const active =
      businessList.filter(
        (item) => item.IsActive
      ).length;

    const inactive =
      businessList.filter(
        (item) => !item.IsActive
      ).length;

    return {
      total,
      active,
      inactive,
    };
  }, [
    businessList,
    pagination.total,
  ]);

  // =====================================================
  // OPEN CREATE
  // =====================================================

  const openCreate = () => {
    setEditingId(null);

    setForm({
      ...initialForm,
    });

    setPreview(null);

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (business) => {
    setEditingId(
      business._id
    );

    setForm({
      Name:
        business.Name || "",

      IsActive:
        business.IsActive !== false,

      image: null,
    });

    setPreview(
      business.Image
        ? getImageUrl(
            business.Image
          )
        : null
    );

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingId(null);

    setForm({
      ...initialForm,
    });

    setPreview(null);

    setError("");
  };

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    // -------------------------------------------------
    // ALLOWED TYPES
    // -------------------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Please select JPG, PNG, WEBP or SVG image."
      );

      return;
    }

    // -------------------------------------------------
    // MAX SIZE 5MB
    // -------------------------------------------------

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5MB."
      );

      return;
    }

    setError("");

    setForm((previous) => ({
      ...previous,
      image: file,
    }));

    // -------------------------------------------------
    // PREVIEW
    // -------------------------------------------------

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------------------------------------
    // VALIDATE NAME
    // -------------------------------------------------

    if (!form.Name.trim()) {
      setError(
        "Suitable business name is required."
      );

      return;
    }

    try {
      setSaving(true);

      setError("");

      setSuccess("");

      // -------------------------------------------------
      // FORM DATA
      // -------------------------------------------------

      const formData =
        new FormData();

      formData.append(
        "Name",
        form.Name.trim()
      );

      formData.append(
        "IsActive",
        String(form.IsActive)
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      // -------------------------------------------------
      // UPDATE
      // -------------------------------------------------

      if (editingId) {
        await updateSuitableBusiness(
          editingId,
          formData
        );

        setSuccess(
          "Suitable business updated successfully."
        );
      }

      // -------------------------------------------------
      // CREATE
      // -------------------------------------------------

      else {
        await createSuitableBusiness(
          formData
        );

        setSuccess(
          "Suitable business created successfully."
        );
      }

      // -------------------------------------------------
      // CLOSE MODAL
      // -------------------------------------------------

      closeModal();

      // -------------------------------------------------
      // REFRESH
      // -------------------------------------------------

      await fetchBusinesses();

      // -------------------------------------------------
      // CLEAR SUCCESS
      // -------------------------------------------------

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(
        "Save suitable business:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggle = async (
    business
  ) => {
    try {
      setError("");

      await toggleSuitableBusinessStatus(
        business._id
      );

      setSuccess(
        business.IsActive
          ? "Suitable business deactivated."
          : "Suitable business activated."
      );

      await fetchBusinesses();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "Toggle suitable business:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    business
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${business.Name}"?`
      );

    if (!confirmed) return;

    try {
      setError("");

      await deleteSuitableBusiness(
        business._id
      );

      setSuccess(
        "Suitable business deleted successfully."
      );

      // -------------------------------------------------
      // IF LAST ITEM ON PAGE
      // -------------------------------------------------

      if (
        businessList.length === 1 &&
        page > 1
      ) {
        setPage(
          (previous) =>
            previous - 1
        );
      } else {
        await fetchBusinesses();
      }

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "Delete suitable business:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to delete suitable business."
      );
    }
  };

  // =====================================================
  // CLEANUP IMAGE PREVIEW
  // =====================================================

  useEffect(() => {
    return () => {
      if (
        preview &&
        preview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="suitable-business-page">

      <div className="container-fluid px-0">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="suitable-business-header">

          <div>

            <div className="suitable-business-title-row">

              <div className="suitable-business-title-icon">
                <FiActivity />
              </div>

              <div>

                <h1>
                  Suitable Business
                </h1>

                <p>
                  Manage businesses suitable
                  for your properties.
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            className="btn suitable-business-add-btn"
            onClick={openCreate}
          >
            <FiPlus />

            <span>
              Add Suitable Business
            </span>
          </button>

        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="suitable-alert suitable-alert-danger">

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
            >
              <FiX />
            </button>

          </div>
        )}

        {success && (
          <div className="suitable-alert suitable-alert-success">

            <FiCheckCircle />

            <span>
              {success}
            </span>

            <button
              type="button"
              onClick={() =>
                setSuccess("")
              }
            >
              <FiX />
            </button>

          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="row g-3 mb-4">

          {/* TOTAL */}

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="suitable-stat-card">

              <div className="suitable-stat-icon">
                <FiActivity />
              </div>

              <div>

                <small>
                  Total Businesses
                </small>

                <strong>
                  {stats.total}
                </strong>

              </div>

            </div>

          </div>

          {/* ACTIVE */}

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="suitable-stat-card">

              <div className="suitable-stat-icon active">
                <FiCheckCircle />
              </div>

              <div>

                <small>
                  Active
                </small>

                <strong>
                  {stats.active}
                </strong>

              </div>

            </div>

          </div>

          {/* INACTIVE */}

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="suitable-stat-card">

              <div className="suitable-stat-icon inactive">
                <FiActivity />
              </div>

              <div>

                <small>
                  Inactive
                </small>

                <strong>
                  {stats.inactive}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            FILTER TOOLBAR
        ================================================= */}

        <div className="suitable-toolbar">

          {/* SEARCH */}

          <div className="suitable-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search suitable business..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <FiX />
              </button>
            )}

          </div>

          {/* STATUS */}

          <div className="suitable-filter">

            <select
              value={status}
              onChange={(e) => {
                setStatus(
                  e.target.value
                );

                setPage(1);
              }}
            >

              <option value="all">
                All Status
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

            </select>

          </div>

          {/* REFRESH */}

          <button
            type="button"
            className="suitable-refresh-btn"
            onClick={
              fetchBusinesses
            }
            disabled={loading}
          >

            <FiRefreshCw
              className={
                loading
                  ? "suitable-spin"
                  : ""
              }
            />

            <span>
              Refresh
            </span>

          </button>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        {loading ? (

          <div className="suitable-loading">

            <div
              className="spinner-border"
              role="status"
            />

            <p>
              Loading suitable businesses...
            </p>

          </div>

        ) : businessList.length ===
          0 ? (

          <div className="suitable-empty">

            <div className="suitable-empty-icon">
              <FiActivity />
            </div>

            <h3>
              No suitable businesses found
            </h3>

            <p>
              Add your first suitable
              business to get started.
            </p>

            <button
              type="button"
              className="btn suitable-business-add-btn"
              onClick={openCreate}
            >
              <FiPlus />

              Add Suitable Business
            </button>

          </div>

        ) : (

          <>

            {/* =================================================
                CARDS
            ================================================= */}

            <div className="row g-4">

              {businessList.map(
                (business) => (

                  <div
                    className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                    key={
                      business._id
                    }
                  >

                    <div className="suitable-business-card">

                      {/* =========================================
                          IMAGE
                      ========================================= */}

                      <div className="suitable-business-card-image">

                        {business.Image ? (

                          <img
                            src={getImageUrl(
                              business.Image
                            )}
                            alt={
                              business.Name
                            }
                          />

                        ) : (

                          <div className="suitable-no-image">

                            <FiImage />

                          </div>

                        )}

                        {/* STATUS */}

                        <div
                          className={`suitable-status ${
                            business.IsActive
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          <span />

                          {business.IsActive
                            ? "Active"
                            : "Inactive"}

                        </div>

                      </div>

                      {/* =========================================
                          BODY
                      ========================================= */}

                      <div className="suitable-business-card-body">

                        {/* TITLE */}

                        <div className="suitable-business-card-title">

                          <div className="suitable-business-place-icon">
                            <FiActivity />
                          </div>

                          <div>

                            <h3>
                              {
                                business.Name
                              }
                            </h3>

                            <p>
                              Suitable Business
                            </p>

                          </div>

                        </div>

                        {/* =====================================
                            ACTIONS
                        ===================================== */}

                        <div className="suitable-actions">

                          {/* TOGGLE */}

                          <button
                            type="button"
                            className={`suitable-toggle ${
                              business.IsActive
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleToggle(
                                business
                              )
                            }
                            title={
                              business.IsActive
                                ? "Click to deactivate"
                                : "Click to activate"
                            }
                          >

                            <span className="toggle-dot" />

                            {business.IsActive
                              ? "Enabled"
                              : "Disabled"}

                          </button>

                          {/* ACTION BUTTONS */}

                          <div className="suitable-action-buttons">

                            {/* EDIT */}

                            <button
                              type="button"
                              className="edit"
                              title="Edit"
                              onClick={() =>
                                openEdit(
                                  business
                                )
                              }
                            >
                              <FiEdit3 />
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="delete"
                              title="Delete"
                              onClick={() =>
                                handleDelete(
                                  business
                                )
                              }
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* =================================================
                PAGINATION
            ================================================= */}

            {pagination.totalPages >
              1 && (

              <div className="suitable-pagination">

                <span>

                  Showing page{" "}

                  <strong>
                    {pagination.page}
                  </strong>{" "}

                  of{" "}

                  <strong>
                    {
                      pagination.totalPages
                    }
                  </strong>

                </span>

                <div>

                  <button
                    type="button"
                    disabled={
                      page <= 1
                    }
                    onClick={() =>
                      setPage(
                        (
                          previous
                        ) =>
                          previous -
                          1
                      )
                    }
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >=
                      pagination.totalPages
                    }
                    onClick={() =>
                      setPage(
                        (
                          previous
                        ) =>
                          previous +
                          1
                      )
                    }
                  >
                    <FiChevronRight />
                  </button>

                </div>

              </div>

            )}

          </>

        )}

      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div
          className="suitable-modal-backdrop"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }

          }}
        >

          <div className="suitable-modal">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="suitable-modal-header">

              <div>

                <div className="suitable-modal-icon">

                  {editingId ? (
                    <FiEdit3 />
                  ) : (
                    <FiPlus />
                  )}

                </div>

                <div>

                  <h2>
                    {editingId
                      ? "Edit Suitable Business"
                      : "Add Suitable Business"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update suitable business information."
                      : "Add a new suitable business."}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
              >
                <FiX />
              </button>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={
                handleSubmit
              }
              className="suitable-form"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="suitable-form-group">

                <label>
                  Business Image
                </label>

                <label className="suitable-upload">

                  {preview ? (

                    <img
                      src={preview}
                      alt="Preview"
                    />

                  ) : (

                    <div className="suitable-upload-empty">

                      <FiUploadCloud />

                      <strong>
                        Upload image
                      </strong>

                      <span>
                        JPG, PNG, WEBP or SVG
                        · Max 5MB
                      </span>

                    </div>

                  )}

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.svg"
                    onChange={
                      handleImageChange
                    }
                  />

                </label>

              </div>

              {/* =================================================
                  NAME
              ================================================= */}

              <div className="suitable-form-group">

                <label htmlFor="suitable-business-name">

                  Business Name

                  <span>
                    *
                  </span>

                </label>

                <input
                  id="suitable-business-name"
                  type="text"
                  name="Name"
                  value={
                    form.Name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. Retail Shop"
                  maxLength={150}
                  required
                />

              </div>

              {/* =================================================
                  ACTIVE STATUS
              ================================================= */}

              <div className="suitable-active-box">

                <div>

                  <strong>
                    Active Status
                  </strong>

                  <span>
                    Show this suitable
                    business on the website.
                  </span>

                </div>

                <label className="suitable-switch">

                  <input
                    type="checkbox"
                    name="IsActive"
                    checked={
                      form.IsActive
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span />

                </label>

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="suitable-modal-footer">

                <button
                  type="button"
                  className="suitable-cancel-btn"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="suitable-save-btn"
                  disabled={saving}
                >

                  {saving ? (

                    <>

                      <span className="spinner-border spinner-border-sm" />

                      Saving...

                    </>

                  ) : (

                    <>

                      <FiCheckCircle />

                      {editingId
                        ? "Update Business"
                        : "Create Business"}

                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default SuitableBusiness;