import React, { useEffect, useMemo, useState } from "react";

import {
    FiActivity,
    FiCheckCircle,
    FiChevronLeft,
    FiChevronRight,
    FiEdit3,
    FiImage,
    FiMapPin,
    FiPlus,
    FiRefreshCw,
    FiSearch,
    FiTrash2,
    FiUploadCloud,
    FiX,
} from "react-icons/fi";

import {
    createNearby,
    deleteNearby,
    getNearbys,
    toggleNearbyStatus,
    updateNearby,
} from "../../services/nearbyApi";

import "../../assets/Content/NearbyManagement.css";

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

const initialForm = {
    name: "",
    faIconClass: "fa-solid fa-location-dot",
    catagory: "",
    isActive: true,
    image: null,
};

const NearbyManagement = () => {
    const [nearbyList, setNearbyList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [catagory, setCatagory] = useState("all");

    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
    });

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(initialForm);

    const [preview, setPreview] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =====================================================
    // FETCH
    // =====================================================

    const fetchNearbys = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getNearbys({
                search,
                status,
                catagory,
                page,
                limit,
            });

            setNearbyList(response.data || []);

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
                "Failed to load nearby records."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNearbys();
    }, [page, status, catagory]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (page !== 1) {
                setPage(1);
            } else {
                fetchNearbys();
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    // =====================================================
    // STATS
    // =====================================================

    const stats = useMemo(() => {
        const total = pagination.total || 0;

        const active = nearbyList.filter(
            (item) => item.isActive
        ).length;

        const inactive = nearbyList.filter(
            (item) => !item.isActive
        ).length;

        return {
            total,
            active,
            inactive,
        };
    }, [nearbyList, pagination.total]);

    // =====================================================
    // FORM
    // =====================================================

    const openCreate = () => {
        setEditingId(null);
        setForm(initialForm);
        setPreview(null);
        setError("");
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditingId(item._id);

        setForm({
            name: item.name || "",
            faIconClass:
                item.faIconClass ||
                "fa-solid fa-location-dot",
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

    const closeModal = () => {
        if (saving) return;

        setShowModal(false);
        setEditingId(null);
        setForm(initialForm);
        setPreview(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target;

        setForm((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Please select JPG, PNG, WEBP or SVG image."
            );

            return;
        }

        if (file.size > 5 * 1024 * 1024) {
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

        setPreview(URL.createObjectURL(file));
    };

    // =====================================================
    // SAVE
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            setError("Nearby name is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append(
                "name",
                form.name.trim()
            );

            formData.append("catagory", form.catagory);

            formData.append(
                "faIconClass",
                form.faIconClass.trim()
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

            if (editingId) {
                await updateNearby(
                    editingId,
                    formData
                );

                setSuccess(
                    "Nearby updated successfully."
                );
            } else {
                await createNearby(formData);

                setSuccess(
                    "Nearby created successfully."
                );
            }

            closeModal();

            await fetchNearbys();

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

    const handleToggle = async (item) => {
        try {
            setError("");

            await toggleNearbyStatus(item._id);

            setSuccess(
                item.isActive
                    ? "Nearby deactivated."
                    : "Nearby activated."
            );

            await fetchNearbys();

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

    const handleDelete = async (item) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.name}"?`
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteNearby(item._id);

            setSuccess(
                "Nearby deleted successfully."
            );

            if (
                nearbyList.length === 1 &&
                page > 1
            ) {
                setPage((previous) => previous - 1);
            } else {
                await fetchNearbys();
            }

            setTimeout(() => {
                setSuccess("");
            }, 2500);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Failed to delete nearby."
            );
        }
    };

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="nearby-page">
            <div className="container-fluid px-0">

                {/* HEADER */}
                <div className="nearby-header">
                    <div>
                        <div className="nearby-title-row">
                            <div className="nearby-title-icon">
                                <FiMapPin />
                            </div>

                            <div>
                                <h1>Nearby Places</h1>

                                <p>
                                    Manage airports, hospitals,
                                    schools, malls and other nearby
                                    locations.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn nearby-add-btn"
                        onClick={openCreate}
                    >
                        <FiPlus />
                        <span>Add Nearby</span>
                    </button>
                </div>

                {/* ALERTS */}
                {error && (
                    <div className="nearby-alert nearby-alert-danger">
                        <span>{error}</span>

                        <button
                            onClick={() => setError("")}
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {success && (
                    <div className="nearby-alert nearby-alert-success">
                        <FiCheckCircle />
                        <span>{success}</span>

                        <button
                            onClick={() => setSuccess("")}
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {/* STATS */}
                <div className="row g-3 mb-4">

                    <div className="col-12 col-sm-6 col-xl-4">
                        <div className="nearby-stat-card">
                            <div className="nearby-stat-icon">
                                <FiMapPin />
                            </div>

                            <div>
                                <small>Total Nearby</small>
                                <strong>{stats.total}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-4">
                        <div className="nearby-stat-card">
                            <div className="nearby-stat-icon active">
                                <FiActivity />
                            </div>

                            <div>
                                <small>Active</small>
                                <strong>{stats.active}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-xl-4">
                        <div className="nearby-stat-card">
                            <div className="nearby-stat-icon inactive">
                                <FiActivity />
                            </div>

                            <div>
                                <small>Inactive</small>
                                <strong>{stats.inactive}</strong>
                            </div>
                        </div>
                    </div>

                </div>

                {/* FILTER BAR */}
                <div className="nearby-toolbar">

                    <div className="nearby-search">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search nearby..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (
                            <button
                                onClick={() => setSearch("")}
                            >
                                <FiX />
                            </button>
                        )}
                    </div>

                    <div className="nearby-filter">
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
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
                    <div className="nearby-filter">

                        <select
                            value={catagory}
                            onChange={(e) => {
                                setCatagory(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="all">
                                All Categories
                            </option>

                            <option value="Flat Apartment">
                                Flat Apartment
                            </option>

                            <option value="Independent House Villa">
                                Independent House Villa
                            </option>

                            <option value="Commercial">
                                Commercial
                            </option>

                            <option value="Land">
                                Land
                            </option>
                        </select>

                    </div>

                    <button
                        className="nearby-refresh-btn"
                        onClick={fetchNearbys}
                        disabled={loading}
                    >
                        <FiRefreshCw
                            className={
                                loading
                                    ? "nearby-spin"
                                    : ""
                            }
                        />

                        <span>Refresh</span>
                    </button>

                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="nearby-loading">
                        <div
                            className="spinner-border"
                            role="status"
                        />

                        <p>Loading nearby places...</p>
                    </div>
                ) : nearbyList.length === 0 ? (
                    <div className="nearby-empty">

                        <div className="nearby-empty-icon">
                            <FiMapPin />
                        </div>

                        <h3>No nearby places found</h3>

                        <p>
                            Add your first nearby place to
                            get started.
                        </p>

                        <button
                            className="btn nearby-add-btn"
                            onClick={openCreate}
                        >
                            <FiPlus />
                            Add Nearby
                        </button>

                    </div>
                ) : (
                    <>
                        {/* CARDS */}
                        <div className="row g-4">

                            {nearbyList.map((item) => (
                                <div
                                    className="col-12 col-sm-6 col-lg-4 col-xxl-3"
                                    key={item._id}
                                >
                                    <div className="nearby-card">

                                        {/* IMAGE */}
                                        <div className="nearby-card-image">

                                            {item.image ? (
                                                <img
                                                    src={getImageUrl(
                                                        item.image
                                                    )}
                                                    alt={item.name}
                                                />
                                            ) : (
                                                <div className="nearby-no-image">
                                                    <FiImage />
                                                </div>
                                            )}

                                            <div
                                                className={`nearby-status ${item.isActive
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
                                        <div className="nearby-card-body">

                                            <div className="nearby-card-title">

                                                <div className="nearby-place-icon">
                                                    <FiMapPin />
                                                </div>

                                                <div>
                                                    <h3>
                                                        {item.name}
                                                    </h3>

                                                    <p>
                                                        {item.catagory || "No category"}
                                                    </p>
                                                    <small className="nearby-card-icon-class">
                                                        {item.faIconClass || "No icon class"}
                                                    </small>
                                                </div>

                                            </div>

                                            {/* ACTIONS */}
                                            <div className="nearby-actions">


                                                <button
                                                    type="button"
                                                    className={`nearby-toggle ${item.isActive ? "active" : ""
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

                                                <div className="nearby-action-buttons">

                                                    <button
                                                        className="edit"
                                                        title="Edit"
                                                        onClick={() =>
                                                            openEdit(item)
                                                        }
                                                    >
                                                        <FiEdit3 />
                                                    </button>

                                                    <button
                                                        className="delete"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                    >
                                                        <FiTrash2 />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* PAGINATION */}
                        {pagination.totalPages > 1 && (
                            <div className="nearby-pagination">

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
                                        disabled={page <= 1}
                                        onClick={() =>
                                            setPage(
                                                (previous) =>
                                                    previous - 1
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
                                                (previous) =>
                                                    previous + 1
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
                    className="nearby-modal-backdrop"
                    onMouseDown={(e) => {
                        if (
                            e.target === e.currentTarget
                        ) {
                            closeModal();
                        }
                    }}
                >
                    <div className="nearby-modal">

                        {/* MODAL HEADER */}
                        <div className="nearby-modal-header">

                            <div>
                                <div className="nearby-modal-icon">
                                    {editingId ? (
                                        <FiEdit3 />
                                    ) : (
                                        <FiPlus />
                                    )}
                                </div>

                                <div>
                                    <h2>
                                        {editingId
                                            ? "Edit Nearby"
                                            : "Add Nearby"}
                                    </h2>

                                    <p>
                                        {editingId
                                            ? "Update nearby location information."
                                            : "Add a new nearby location."}
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

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="nearby-form"
                        >

                            {/* IMAGE */}
                            <div className="nearby-form-group">

                                <label>
                                    Nearby Image
                                </label>

                                <label className="nearby-upload">

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="nearby-upload-empty">
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

                            {/* NAME */}
                            <div className="nearby-form-group">

                                <label htmlFor="name">
                                    Nearby Name
                                    <span>*</span>
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Airport"
                                    maxLength={150}
                                />

                            </div>

                            {/* CATEGORY */}
                            <div className="nearby-form-group">

                                <label htmlFor="catagory">
                                    Property Category
                                    <span>*</span>
                                </label>

                                <select
                                    id="catagory"
                                    name="catagory"
                                    value={form.catagory}
                                    onChange={handleChange}
                                    className="nearby-category-select"
                                    required
                                >
                                    <option value="">
                                        Select property category
                                    </option>

                                    <option value="Flat Apartment">
                                        Flat Apartment
                                    </option>

                                    <option value="Independent House Villa">
                                        Independent House Villa
                                    </option>

                                    <option value="Commercial">
                                        Commercial
                                    </option>

                                    <option value="Land">
                                        Land
                                    </option>
                                </select>

                                <small>
                                    Select the property type where this nearby
                                    location should be displayed.
                                </small>

                            </div>

                            {/* ICON CLASS */}
                            <div className="nearby-form-group">

                                <label htmlFor="faIconClass">
                                    Font Awesome Icon Class
                                </label>

                                <div className="nearby-icon-input">

                                    <div>
                                        <FiMapPin />
                                    </div>

                                    <input
                                        id="faIconClass"
                                        type="text"
                                        name="faIconClass"
                                        value={form.faIconClass}
                                        onChange={handleChange}
                                        placeholder="fa-solid fa-plane"
                                    />

                                </div>

                                <small>
                                    Example: fa-solid fa-plane
                                </small>

                            </div>

                            {/* ACTIVE */}
                            <div className="nearby-active-box">

                                <div>
                                    <strong>
                                        Active Status
                                    </strong>

                                    <span>
                                        Show this nearby location
                                        on the website.
                                    </span>
                                </div>

                                <label className="nearby-switch">

                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={form.isActive}
                                        onChange={handleChange}
                                    />

                                    <span />

                                </label>

                            </div>

                            {/* FOOTER */}
                            <div className="nearby-modal-footer">

                                <button
                                    type="button"
                                    className="nearby-cancel-btn"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="nearby-save-btn"
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
                                                ? "Update Nearby"
                                                : "Create Nearby"}
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

export default NearbyManagement;