import React, {
  useCallback,
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
  FiFilter,
  FiMap,
  FiMapPin,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiX,
  FiPower,
  FiLayers,
} from "react-icons/fi";

import {
  createZone,
  deleteZone,
  getZones,
  toggleZoneStatus,
  updateZone,
} from "../services/zoneApi";

import "../assets/Content/ZoneManagement.css";

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

const INITIAL_FORM = {
  ZoneName: "",
  ZoneArea: "",
  Category: "",
  IsActive: true,
};

// =====================================================
// COMPONENT
// =====================================================

const ZoneManagement = () => {
  // =====================================================
  // STATE
  // =====================================================

  const [zones, setZones] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  const [showModal, setShowModal] =
    useState(false);

  const [editingZone, setEditingZone] =
    useState(null);

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // FETCH ZONES
  // =====================================================

  const fetchZones = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getZones({
        search,
        status: statusFilter,
        category: categoryFilter,
      });

      setZones(response?.data || []);
    } catch (err) {
      console.error("fetchZones:", err);

      setError(
        err?.response?.data?.message ||
        "Unable to load zones"
      );
    } finally {
      setLoading(false);
    }
  }, [
    search,
    statusFilter,
    categoryFilter,
  ]);

  // =====================================================
  // AUTO FETCH
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchZones();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchZones]);

  // =====================================================
  // STATS
  // =====================================================

  const stats = useMemo(() => {
    const active = zones.filter(
      (zone) => zone.IsActive
    ).length;

    const inactive = zones.filter(
      (zone) => !zone.IsActive
    ).length;

    const categoryCount = new Set(
      zones
        .map((zone) => zone.Category)
        .filter(Boolean)
    ).size;

    return {
      total: zones.length,
      active,
      inactive,
      categories: categoryCount,
    };
  }, [zones]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      zones.length / itemsPerPage
    )
  );

  const paginatedZones = useMemo(() => {
    const start =
      (currentPage - 1) *
      itemsPerPage;

    return zones.slice(
      start,
      start + itemsPerPage
    );
  }, [
    zones,
    currentPage,
    itemsPerPage,
  ]);

  // =====================================================
  // FIX PAGE
  // =====================================================

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE MODAL
  // =====================================================

  const openCreateModal = () => {
    setEditingZone(null);

    setForm({
      ...INITIAL_FORM,
    });

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const openEditModal = (zone) => {
    setEditingZone(zone);

    setForm({
      ZoneName:
        zone.ZoneName || "",

      ZoneArea:
        zone.ZoneArea || "",

      Category:
        zone.Category || "",

      IsActive:
        typeof zone.IsActive ===
          "boolean"
          ? zone.IsActive
          : true,
    });

    setError("");

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setEditingZone(null);

    setForm({
      ...INITIAL_FORM,
    });

    setError("");
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // -----------------------------------------
    // Zone validation
    // -----------------------------------------

    if (!form.ZoneName.trim()) {
      setError(
        "Zone name is required"
      );

      return;
    }

    // -----------------------------------------
    // Category validation
    // -----------------------------------------

    if (!form.Category) {
      setError(
        "Category is required"
      );

      return;
    }

    if (
      !CATEGORY_ENUM.includes(
        form.Category
      )
    ) {
      setError(
        "Please select a valid category"
      );

      return;
    }

    try {
      setSaving(true);

      const payload = {
        ZoneName:
          form.ZoneName.trim(),

        ZoneArea:
          form.ZoneArea?.trim() ||
          null,

        Category:
          form.Category,

        IsActive:
          Boolean(form.IsActive),
      };

      // -----------------------------------------
      // UPDATE
      // -----------------------------------------

      if (editingZone) {
        await updateZone(
          editingZone._id,
          payload
        );

        setSuccess(
          "Zone updated successfully"
        );
      }

      // -----------------------------------------
      // CREATE
      // -----------------------------------------

      else {
        await createZone(
          payload
        );

        setSuccess(
          "Zone created successfully"
        );
      }

      // -----------------------------------------
      // Close modal
      // -----------------------------------------

      setShowModal(false);

      setEditingZone(null);

      setForm({
        ...INITIAL_FORM,
      });

      // -----------------------------------------
      // Refresh
      // -----------------------------------------

      await fetchZones();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "handleSubmit:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggle = async (
    zone
  ) => {
    try {
      setError("");

      await toggleZoneStatus(
        zone._id
      );

      setSuccess(
        zone.IsActive
          ? "Zone deactivated successfully"
          : "Zone activated successfully"
      );

      await fetchZones();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "handleToggle:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to change zone status"
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    zone
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${zone.ZoneName}"?`
      );

    if (!confirmed) return;

    try {
      setError("");

      await deleteZone(
        zone._id
      );

      setSuccess(
        "Zone deleted successfully"
      );

      await fetchZones();

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error(
        "handleDelete:",
        err
      );

      setError(
        err?.response?.data?.message ||
        "Unable to delete zone"
      );
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSearch("");

    setStatusFilter("all");

    setCategoryFilter("all");

    setCurrentPage(1);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="zone-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="zone-header">

        <div className="zone-header-left">

          <div className="zone-header-icon">
            <FiMap />
          </div>

          <div>

            <div className="zone-breadcrumb">
              Master Data

              <span>/</span>

              Zone Management
            </div>

            <h1 className="zone-title">
              Zone Management
            </h1>

            <p className="zone-subtitle">
              Create, manage and control
              property zones, categories
              and coverage areas.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="zone-primary-btn"
          onClick={
            openCreateModal
          }
        >
          <FiPlus />

          <span>
            Add Zone
          </span>
        </button>

      </div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="zone-alert zone-alert-success">

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
          ERROR
      ================================================= */}

      {error && !showModal && (
        <div className="zone-alert zone-alert-error">
          <FiX />
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

      {/* =================================================
          STATS
      ================================================= */}

      <div className="zone-stats-grid">
        {/* TOTAL */}
        <div className="zone-stat-card">
          <div className="zone-stat-icon">
            <FiLayers />
          </div>
          <div className="zone-stat-content">
            <span>
              Total Zones
            </span>
            <strong>
              {stats.total}
            </strong>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="zone-stat-card">

          <div className="zone-stat-icon zone-stat-active">
            <FiCheckCircle />
          </div>

          <div className="zone-stat-content">

            <span>
              Active Zones
            </span>

            <strong>
              {stats.active}
            </strong>

          </div>

        </div>

        {/* INACTIVE */}

        <div className="zone-stat-card">

          <div className="zone-stat-icon zone-stat-inactive">
            <FiPower />
          </div>

          <div className="zone-stat-content">

            <span>
              Inactive Zones
            </span>

            <strong>
              {stats.inactive}
            </strong>

          </div>

        </div>

        {/* CATEGORIES */}

        <div className="zone-stat-card">

          <div className="zone-stat-icon zone-stat-location">
            <FiLayers />
          </div>

          <div className="zone-stat-content">

            <span>
              Categories
            </span>

            <strong>
              {stats.categories}
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div className="zone-card">

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="zone-toolbar">

          {/* SEARCH */}

          <div className="zone-search">

            <FiSearch />

            <input
              type="text"
              placeholder="Search zone, category or area..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setCurrentPage(1);
              }}
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");

                  setCurrentPage(1);
                }}
              >
                <FiX />
              </button>
            )}

          </div>

          <div className="zone-toolbar-actions">

            {/* =================================================
                CATEGORY FILTER
            ================================================= */}

            <div className="zone-filter">

              <FiLayers />

              <select
                value={
                  categoryFilter
                }
                onChange={(e) => {
                  setCategoryFilter(
                    e.target.value
                  );

                  setCurrentPage(1);
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
            {/* =================================================
                STATUS FILTER
            ================================================= */}

            <div className="zone-filter">
              <FiFilter />
              <select
                value={
                  statusFilter
                }
                onChange={(e) => {
                  setStatusFilter(
                    e.target.value
                  );

                  setCurrentPage(1);
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
              className="zone-refresh-btn"
              onClick={
                fetchZones
              }
              disabled={
                loading
              }
              title="Refresh"
            >

              <FiRefreshCw
                className={
                  loading
                    ? "zone-spin"
                    : ""
                }
              />

            </button>

            {/* RESET */}

            <button
              type="button"
              className="zone-reset-btn"
              onClick={
                handleReset
              }
            >
              Reset
            </button>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="zone-table-wrapper">
          <table className="zone-table">

            <thead>

              <tr>

                <th>
                  #
                </th>

                <th>
                  Zone
                </th>

                <th>
                  Category
                </th>

                <th>
                  Coverage Area
                </th>

                <th>
                  Status
                </th>

                <th>
                  Created
                </th>

                <th className="zone-action-header">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    className="zone-empty"
                  >

                    <div className="zone-loader">

                      <FiRefreshCw className="zone-spin" />

                      <span>
                        Loading zones...
                      </span>

                    </div>

                  </td>

                </tr>

              ) : paginatedZones.length === 0 ? (

                /* =================================================
                    EMPTY
                ================================================= */

                <tr>

                  <td
                    colSpan="7"
                    className="zone-empty"
                  >

                    <div className="zone-empty-icon">
                      <FiMap />
                    </div>

                    <strong>
                      No zones found
                    </strong>

                    <span>
                      Try another search,
                      category or create
                      a new zone.
                    </span>

                    <button
                      type="button"
                      onClick={
                        openCreateModal
                      }
                    >
                      <FiPlus />

                      Add First Zone
                    </button>

                  </td>

                </tr>

              ) : (

                /* =================================================
                    DATA
                ================================================= */

                paginatedZones.map(
                  (
                    zone,
                    index
                  ) => {

                    const serial =
                      (currentPage - 1) *
                      itemsPerPage +
                      index +
                      1;

                    return (
                      <tr
                        key={
                          zone._id
                        }
                      >

                        {/* SERIAL */}

                        <td>

                          <span className="zone-number">
                            {serial}
                          </span>

                        </td>

                        {/* ZONE */}

                        <td>

                          <div className="zone-name-cell">

                            <div className="zone-row-icon">
                              <FiMapPin />
                            </div>

                            <div>

                              <strong>
                                {
                                  zone.ZoneName
                                }
                              </strong>

                              <small>
                                Zone ID:{" "}
                                {zone._id
                                  ?.slice(
                                    -8
                                  )
                                  .toUpperCase()}
                              </small>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td>

                          {zone.catagory ? (

                            <span className="zone-category">

                              <FiLayers />

                              {
                                zone.catagory
                              }

                            </span>

                          ) : (

                            <span className="zone-muted">
                              Not specified
                            </span>

                          )}

                        </td>

                        {/* AREA */}

                        <td>

                          {zone.ZoneArea ? (

                            <div className="zone-area-cell">

                              <FiActivity />

                              <span>
                                {
                                  zone.ZoneArea
                                }
                              </span>

                            </div>

                          ) : (

                            <span className="zone-muted">
                              Not specified
                            </span>

                          )}

                        </td>

                        {/* STATUS */}

                        <td>

                          <button
                            type="button"
                            className={`zone-status ${zone.IsActive
                                ? "zone-status-active"
                                : "zone-status-inactive"
                              }`}
                            onClick={() =>
                              handleToggle(
                                zone
                              )
                            }
                          >

                            <span className="zone-status-dot" />

                            {zone.IsActive
                              ? "Active"
                              : "Inactive"}

                          </button>

                        </td>

                        {/* CREATED */}

                        <td>

                          <span className="zone-date">

                            {zone.createdAt
                              ? new Date(
                                zone.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                              : "-"}

                          </span>

                        </td>

                        {/* ACTIONS */}

                        <td>

                          <div className="zone-actions">

                            {/* EDIT */}

                            <button
                              type="button"
                              className="zone-action edit"
                              onClick={() =>
                                openEditModal(
                                  zone
                                )
                              }
                              title="Edit"
                            >
                              <FiEdit3 />
                            </button>

                            {/* TOGGLE */}

                            <button
                              type="button"
                              className="zone-action toggle"
                              onClick={() =>
                                handleToggle(
                                  zone
                                )
                              }
                              title={
                                zone.IsActive
                                  ? "Deactivate"
                                  : "Activate"
                              }
                            >
                              <FiPower />
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="zone-action delete"
                              onClick={() =>
                                handleDelete(
                                  zone
                                )
                              }
                              title="Delete"
                            >
                              <FiTrash2 />
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="zone-pagination">

          <div className="zone-pagination-info">

            Showing{" "}

            <strong>
              {zones.length === 0
                ? 0
                : (currentPage - 1) *
                itemsPerPage +
                1}
            </strong>

            {" "}to{" "}

            <strong>
              {Math.min(
                currentPage *
                itemsPerPage,
                zones.length
              )}
            </strong>

            {" "}of{" "}

            <strong>
              {zones.length}
            </strong>

          </div>

          <div className="zone-pagination-right">

            <select
              value={
                itemsPerPage
              }
              onChange={(e) => {
                setItemsPerPage(
                  Number(
                    e.target.value
                  )
                );

                setCurrentPage(1);
              }}
            >

              <option value="5">
                5 / page
              </option>

              <option value="10">
                10 / page
              </option>

              <option value="20">
                20 / page
              </option>

              <option value="50">
                50 / page
              </option>

            </select>

            <div className="zone-page-buttons">

              <button
                type="button"
                disabled={
                  currentPage <= 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      page - 1
                  )
                }
              >
                <FiChevronLeft />
              </button>

              <span>
                {currentPage} /{" "}
                {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  currentPage >=
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      page + 1
                  )
                }
              >
                <FiChevronRight />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (

        <div
          className="zone-modal-overlay"
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }

          }}
        >

          <div className="zone-modal">

            {/* MODAL HEADER */}

            <div className="zone-modal-header">

              <div className="zone-modal-title">

                <div className="zone-modal-icon">

                  {editingZone ? (
                    <FiEdit3 />
                  ) : (
                    <FiPlus />
                  )}

                </div>

                <div>

                  <h2>
                    {editingZone
                      ? "Edit Zone"
                      : "Create Zone"}
                  </h2>

                  <p>
                    {editingZone
                      ? "Update zone information"
                      : "Add a new property zone"}
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="zone-modal-close"
                onClick={
                  closeModal
                }
                disabled={
                  saving
                }
              >
                <FiX />
              </button>

            </div>

            {/* FORM */}

            <form
              className="zone-form"
              onSubmit={
                handleSubmit
              }
            >

              {/* ERROR */}

              {error && (
                <div className="zone-form-error">
                  <FiX />
                  <span>
                    {error}
                  </span>
                </div>
              )}

              {/* =================================================
                  ZONE NAME
              ================================================= */}

              <div className="zone-form-group">
                <label>
                  Zone Name
                  <span>*</span>
                </label>
                <div className="zone-input-wrapper">
                  <FiMap />
                  <input
                    type="text"
                    name="ZoneName"
                    value={
                      form.ZoneName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter zone name"
                    maxLength={100}
                    autoFocus
                  />
                </div>
              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="zone-form-group">

                <label>
                  Category
                  <span>*</span>
                </label>

                <div className="zone-input-wrapper zone-select-wrapper">

                  <FiLayers />

                  <select
                    name="Category"
                    value={form.Category}
                    onChange={handleChange}
                    className={!form.Category ? "zone-select-placeholder" : ""}
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    {CATEGORY_ENUM.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                </div>

                <small>
                  Select the property category applicable to this zone.
                </small>

              </div>

              {/* =================================================
                  ZONE AREA
              ================================================= */}

              <div className="zone-form-group">

                <label>
                  Zone Area
                </label>

                <div className="zone-input-wrapper">

                  <FiMapPin />

                  <textarea
                    name="ZoneArea"
                    value={
                      form.ZoneArea
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter coverage area, locations or description"
                    rows="4"
                    maxLength={500}
                  />

                </div>

                <small>
                  Example: North Kolkata,
                  Salt Lake, New Town
                </small>

              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div className="zone-active-control">

                <div>

                  <strong>
                    Zone Status
                  </strong>

                  <span>
                    Control whether this
                    zone is available
                    for use.
                  </span>

                </div>

                <button
                  type="button"
                  className={`zone-switch ${form.IsActive
                      ? "active"
                      : ""
                    }`}
                  onClick={() =>
                    setForm(
                      (prev) => ({
                        ...prev,
                        IsActive:
                          !prev.IsActive,
                      })
                    )
                  }
                >

                  <span />

                </button>

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div className="zone-form-footer">

                <button
                  type="button"
                  className="zone-cancel-btn"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="zone-save-btn"
                  disabled={
                    saving
                  }
                >

                  {saving ? (

                    <>
                      <FiRefreshCw className="zone-spin" />

                      Saving...
                    </>

                  ) : (

                    <>
                      <FiCheckCircle />

                      {editingZone
                        ? "Update Zone"
                        : "Create Zone"}
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

export default ZoneManagement;