import React, { useState } from "react";
import styles from "../../assets/paneldesign/css/PropertyPrice.module.css";
import BrochureForm from "./BrochureForm";

const PropertyPrice = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) {
    return null;
  }

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className={styles.priceArea}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* 2 BHK */}
            <div>
              <div className={styles.pricePill}>
                2BHK : <span>65 Lakhs</span> Onwards*
              </div>
            </div>

            {/* 3 BHK */}
            <div>
              <div className={styles.pricePill}>
                3BHK : <span>75 Lakhs</span> Onwards*
              </div>
            </div>

            {/* 4 BHK */}
            <div>
              <div className={styles.pricePill}>
                4BHK : <span>1.3 Cr</span> Onwards*
              </div>
            </div>
          </div>
        </div>

        {/* Centered Overlapping Download Button */}
        <div className={styles.downloadWrapper}>
          <button className={styles.downloadBtn} onClick={handleOpenModal}>
            DOWNLOAD E-BROCHURE
            <svg
              className={styles.downloadIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && (
        <BrochureForm propertyName={property?.name} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PropertyPrice;