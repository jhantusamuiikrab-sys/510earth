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
  createAmenity,
  deleteAmenity,
  getAmenities,
  toggleAmenityStatus,
  updateAmenity,
} from "../../services/amenityApi";

import "../../assets/Content/AmenityManagement.css";

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

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
// CATEGORY ENUM
// =====================================================

const CATEGORY_ENUM = [
  "Flat Apartment",
  "Independent House Villa",
  "Commercial",
  "Land",
];

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  name: "",
  catagory: "",
  isActive: true,
  image: null,
};

const AmenityManagement = () => {
  const [amenityList, setAmenityList] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [catagory, setCatagory] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const [limit] = useState(12);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    });

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(initialForm);

  const [preview, setPreview] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // FETCH
  // =====================================================

  const fetchAmenities = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAmenities({
          search,
          status,
          catagory,
          page,
          limit,
        });

      setAmenityList(
        response.data || []
      );

      setPagination(
        response.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load amenities."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FETCH ON FILTER / PAGE
  // =====================================================

  useEffect(() => {
    fetchAmenities();
  }, [
    page,
    status,
    catagory,
  ]);

  // =====================================================
  // SEARCH DEBOUNCE
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) {
        setPage(1);
      } else {
        fetchAmenities();
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const total =
      pagination.total || 0;

    const active =
      amenityList.filter(
        (item) => item.isActive
      ).length;

    const inactive =
      amenityList.filter(
        (item) => !item.isActive
      ).length;

    return {
      total,
      active,
      inactive,
    };
  }, [
    amenityList,
    pagination.total,
  ]);

  // =====================================================
  // CREATE
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
  // EDIT
  // =====================================================

  const openEdit = (item) => {
    setEditingId(item._id);

    setForm({
      name: item.name || "",
      catagory: item.catagory || "",
      isActive: item.isActive,
      image: null,
    });

    setPreview(
      item.image
        ? getImageUrl(item.image)
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
  };

  // =====================================================
  // CHANGE
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
  // IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

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

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =================================================
    // VALIDATE NAME
    // =================================================

    if (!form.name.trim()) {
      setError(
        "Amenity name is required."
      );

      return;
    }

    // =================================================
    // VALIDATE CATEGORY
    // =================================================

    if (
      !form.catagory ||
      !CATEGORY_ENUM.includes(
        form.catagory
      )
    ) {
      setError(
        "Please select a valid property category."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData =
        new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "catagory",
        form.catagory
      );

      formData.append(
        "isActive",
        String(form.isActive)
      );

      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }

      // =================================================
      // UPDATE
      // =================================================

      if (editingId) {
        await updateAmenity(
          editingId,
          formData
        );

        setSuccess(
          "Amenity updated successfully."
        );
      }

      // =================================================
      // CREATE
      // =================================================

      else {
        await createAmenity(
          formData
        );

        setSuccess(
          "Amenity created successfully."
        );
      }

      closeModal();

      await fetchAmenities();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // TOGGLE
  // =====================================================

  const handleToggle = async (
    item
  ) => {
    try {
      setError("");

      await toggleAmenityStatus(
        item._id
      );

      setSuccess(
        item.isActive
          ? "Amenity deactivated."
          : "Amenity activated."
      );

      await fetchAmenities();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(err);

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
    item
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${item.name}"?`
      );

    if (!confirmed) return;

    try {
      setError("");

      await deleteAmenity(
        item._id
      );

      setSuccess(
        "Amenity deleted successfully."
      );

      if (
        amenityList.length === 1 &&
        page > 1
      ) {
        setPage(
          (previous) =>
            previous - 1
        );
      } else {
        await fetchAmenities();
      }

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete amenity."
      );
    }
  };

  useEffect(() => {
  return () => {
    if (
      preview &&
      preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="amenity-page">
      <div className="container-fluid px-0">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="amenity-header">

          <div>
            <div className="amenity-title-row">

              <div className="amenity-title-icon">
                <FiActivity />
              </div>

              <div>
                <h1>Amenities</h1>

                <p>
                  Manage swimming pools,
                  gyms, parking, gardens
                  and other property amenities.
                </p>
              </div>

            </div>
          </div>

          <button
            className="btn amenity-add-btn"
            onClick={openCreate}
          >
            <FiPlus />

            <span>
              Add Amenity
            </span>
          </button>

        </div>

        {/* =================================================
            ALERTS
        ================================================= */}

        {error && (
          <div className="amenity-alert amenity-alert-danger">

            <span>
              {error}
            </span>

            <button
              onClick={() =>
                setError("")
              }
            >
              <FiX />
            </button>

          </div>
        )}

        {success && (
          <div className="amenity-alert amenity-alert-success">

            <FiCheckCircle />

            <span>
              {success}
            </span>

            <button
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

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="amenity-stat-card">

              <div className="amenity-stat-icon">
                <FiActivity />
              </div>

              <div>

                <small>
                  Total Amenities
                </small>

                <strong>
                  {stats.total}
                </strong>

              </div>

            </div>

          </div>

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="amenity-stat-card">

              <div className="amenity-stat-icon active">
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

          <div className="col-12 col-sm-6 col-xl-4">

            <div className="amenity-stat-card">

              <div className="amenity-stat-icon inactive">
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

        <div className="amenity-toolbar">

          {/* SEARCH */}

          <div className="amenity-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search amenity..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                <FiX />
              </button>
            )}

          </div>

          {/* STATUS */}

          <div className="amenity-filter">

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

          {/* CATEGORY */}

          <div className="amenity-filter">

            <select
              value={catagory}
              onChange={(e) => {
                setCatagory(
                  e.target.value
                );

                setPage(1);
              }}
            >

              <option value="all">
                All Categories
              </option>

              {CATEGORY_ENUM.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>

          {/* REFRESH */}

          <button
            className="amenity-refresh-btn"
            onClick={
              fetchAmenities
            }
            disabled={loading}
          >

            <FiRefreshCw
              className={
                loading
                  ? "amenity-spin"
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

          <div className="amenity-loading">

            <div
              className="spinner-border"
              role="status"
            />

            <p>
              Loading amenities...
            </p>

          </div>

        ) : amenityList.length ===
          0 ? (

          <div className="amenity-empty">

            <div className="amenity-empty-icon">
              <FiActivity />
            </div>

            <h3>
              No amenities found
            </h3>

            <p>
              Add your first amenity
              to get started.
            </p>

            <button
              className="btn amenity-add-btn"
              onClick={openCreate}
            >
              <FiPlus />
              Add Amenity
            </button>

          </div>

        ) : (

          <>

            {/* =================================================
                CARDS
            ================================================= */}

            <div className="row g-4">

              {amenityList.map(
                (item) => (

                  <div
                    className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                    key={item._id}
                  >

                    <div className="amenity-card">

                      {/* IMAGE */}

                      <div className="amenity-card-image">

                        {item.image ? (

                          <img
                            src={getImageUrl(
                              item.image
                            )}
                            alt={item.name}
                          />

                        ) : (

                          <div className="amenity-no-image">
                            <FiImage />
                          </div>

                        )}

                        <div
                          className={`amenity-status ${
                            item.isActive
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          <span />

                          {item.isActive
                            ? "Active"
                            : "Inactive"}

                        </div>

                      </div>

                      {/* BODY */}

                      <div className="amenity-card-body">

                        <div className="amenity-card-title">

                          <div className="amenity-place-icon">
                            <FiActivity />
                          </div>

                          <div>

                            <h3>
                              {item.name}
                            </h3>

                            <p>
                              {item.catagory ||
                                "No category"}
                            </p>

                          </div>

                        </div>

                        {/* ACTIONS */}

                        <div className="amenity-actions">

                          <button
  type="button"
  className={`amenity-toggle ${
    item.isActive ? "active" : ""
  }`}
  onClick={() => handleToggle(item)}
  title={
    item.isActive
      ? "Click to deactivate"
      : "Click to activate"
  }
>
  <span className="toggle-dot" />

  {item.isActive
    ? "Enabled"
    : "Disabled"}
</button>

                          <div className="amenity-action-buttons">

                            <button
                              className="edit"
                              title="Edit"
                              onClick={() =>
                                openEdit(
                                  item
                                )
                              }
                            >
                              <FiEdit3 />
                            </button>

                            <button
                              className="delete"
                              title="Delete"
                              onClick={() =>
                                handleDelete(
                                  item
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

              <div className="amenity-pagination">

                <span>

                  Showing page{" "}

                  <strong>
                    {pagination.page}
                  </strong>{" "}

                  of{" "}

                  <strong>
                    {pagination.totalPages}
                  </strong>

                </span>

                <div>

                  <button
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

      {/* =================================================
          CREATE / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="amenity-modal-backdrop"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }

          }}
        >

          <div className="amenity-modal">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="amenity-modal-header">

              <div>

                <div className="amenity-modal-icon">

                  {editingId ? (
                    <FiEdit3 />
                  ) : (
                    <FiPlus />
                  )}

                </div>

                <div>

                  <h2>
                    {editingId
                      ? "Edit Amenity"
                      : "Add Amenity"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update amenity information."
                      : "Add a new property amenity."}
                  </p>

                </div>

              </div>

              <button
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
              className="amenity-form"
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="amenity-form-group">

                <label>
                  Amenity Image
                </label>

                <label className="amenity-upload">

                  {preview ? (

                    <img
                      src={preview}
                      alt="Preview"
                    />

                  ) : (

                    <div className="amenity-upload-empty">

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

              <div className="amenity-form-group">

                <label htmlFor="amenity-name">

                  Amenity Name

                  <span>
                    *
                  </span>

                </label>

                <input
                  id="amenity-name"
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. Swimming Pool"
                  maxLength={150}
                  required
                />

              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="amenity-form-group">

                <label htmlFor="amenity-catagory">

                  Property Category

                  <span>
                    *
                  </span>

                </label>

                <select
                  id="amenity-catagory"
                  name="catagory"
                  value={
                    form.catagory
                  }
                  onChange={
                    handleChange
                  }
                  className="amenity-category-select"
                  required
                >

                  <option value="">
                    Select property category
                  </option>

                  {CATEGORY_ENUM.map(
                    (category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>

                    )
                  )}

                </select>

                <small>
                  Select the property type
                  where this amenity should
                  be displayed.
                </small>

              </div>

              {/* =================================================
                  ACTIVE STATUS
              ================================================= */}

              <div className="amenity-active-box">

                <div>

                  <strong>
                    Active Status
                  </strong>

                  <span>
                    Show this amenity
                    on the website.
                  </span>

                </div>

                <label className="amenity-switch">

                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      form.isActive
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

              <div className="amenity-modal-footer">

                <button
                  type="button"
                  className="amenity-cancel-btn"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="amenity-save-btn"
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
                        ? "Update Amenity"
                        : "Create Amenity"}

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

export default AmenityManagement;