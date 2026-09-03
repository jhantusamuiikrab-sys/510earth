import React, { useState, useEffect, useCallback } from "react";
import styles from "../assets/Content/BookedLeadFormView.module.css";
import { API_URL } from "./utils/api";

const API_BASE = `${API_URL}/booked-leads`;

// Pagination range generator
const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }
};

const BookedLeadFormView = () => {
  const [leadDate, setLeadDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch leads with explicit targetPage support to prevent async state race condition
  const fetchLeads = useCallback(
    async (targetPage = currentPage) => {
      setLoading(true);
      try {
        // Construct clean search query params
        const queryParams = new URLSearchParams({
          page: targetPage.toString(),
          limit: "10",
        });

        if (leadDate) queryParams.append("leadDate", leadDate);
        if (bookingDate) queryParams.append("bookingDate", bookingDate);

        const response = await fetch(`${API_BASE}/get?${queryParams.toString()}`);
        const result = await response.json();

        if (response.ok && result.success) {
          setLeads(result.data || []);
          setTotalPages(result.totalPages || 1);
        } else {
          setLeads([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
        setLeads([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, leadDate, bookingDate]
  );

  // Initial load and page change handler
  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage, fetchLeads]);

  // Search trigger: Resets page state AND explicitly passes page 1 to API call
  const handleSearch = () => {
    setCurrentPage(1);
    fetchLeads(1);
  };

  // Reset filter trigger
  const handleReset = () => {
    setLeadDate("");
    setBookingDate("");
    setCurrentPage(1);
  };

  // Toggle approval state directly
  const handleApprovalToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === true ? false : true;
    try {
      const response = await fetch(`${API_BASE}/approval`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApprove: nextStatus }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isBookingApproved: nextStatus } : item
          )
        );
      } else {
        const result = await response.json();
        alert(result.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Approval API error:", error);
    }
  };

  // Delete lead
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead record?"))
      return;

    try {
      const response = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLeads((prev) => prev.filter((item) => item._id !== id));
      } else {
        const result = await response.json();
        alert(result.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Title */}
      <div className={styles.header}>
        <span className={styles.subtext}>LEADS MANAGEMENT</span>
        <h1 className={styles.title}>Booked Lead App Form</h1>
      </div>

      {/* Filter Section */}
      <div className={styles.filterCard}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>LEAD DATE RANGE</label>
          <input
            type="date"
            value={leadDate}
            onChange={(e) => setLeadDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>BOOKING DATE RANGE</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>
    
        <div className={styles.filterActions}>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
          {(leadDate || bookingDate) && (
            <button className={styles.resetBtn} onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Data Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>BK ID</th>
                <th>LEAD DATE</th>
                <th>BOOKING DATE</th>
                <th>PROJECT NAME</th>
                <th>CUSTOMER NAME</th>
                <th>PHONE NUMBER</th>
                <th style={{ textAlign: "center" }}>STATUS</th>
                <th style={{ textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className={styles.stateCell}>
                    Loading leads data...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.stateCell}>
                    No booked lead records found.
                  </td>
                </tr>
              ) : (
                leads.map((row) => (
                  <tr key={row._id}>
                    <td className={styles.idCell}>#{row.bkLdId || "—"}</td>
                    <td>
                      {row.leadDate
                        ? row.leadDate
                        : row.createdOn?.$date
                        ? new Date(row.createdOn.$date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{row.bookingDate || "N/A"}</td>
                    <td className={styles.boldText}>
                      {row.nameOfTheProject || row.projectName || "N/A"}
                    </td>
                    <td>
                      {row.nameOfTheFirstApplicant || row.customerName || "N/A"}
                    </td>
                    <td>{row.mobileNo || row.phoneNumber || "N/A"}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className={`${styles.statusBadge} ${
                          row.isBookingApproved === true
                            ? styles.statusApproved
                            : row.isBookingApproved === false
                            ? styles.statusDisapproved
                            : styles.statusPending
                        }`}
                        onClick={() =>
                          handleApprovalToggle(row._id, row.isBookingApproved)
                        }
                        title="Click to toggle status"
                      >
                        {row.isBookingApproved === true
                          ? "Approved"
                          : row.isBookingApproved === false
                          ? "Disapproved"
                          : "Pending"}
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.iconBtn} title="View Details">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          className={styles.iconBtn}
                          title="Download Report"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.deleteIconBtn}`}
                          onClick={() => handleDelete(row._id)}
                          title="Delete Lead"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationFooter}>
            <button
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>

            <div className={styles.pageNumbers}>
              {getPaginationRange(currentPage, totalPages)?.map(
                (page, index) => {
                  if (page === "...") {
                    return (
                      <span key={`dots-${index}`} className={styles.pageDots}>
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      className={`${styles.pageBtn} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                }
              )}
            </div>

            <button
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedLeadFormView;