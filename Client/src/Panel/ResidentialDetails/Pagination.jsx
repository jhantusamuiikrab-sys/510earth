import React from 'react';
import styles from '../../assets/paneldesign/css/Pagination.module.css';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Hide pagination if only 1 page exists

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.paginationContainer}>
      {/* Previous Button */}
      <button
        className={styles.pageBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo; Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={styles.pageBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
}