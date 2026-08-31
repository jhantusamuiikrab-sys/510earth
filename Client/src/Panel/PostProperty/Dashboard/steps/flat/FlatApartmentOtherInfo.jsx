import React, { useState } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import styles from "../../../../../assets/paneldesign/css/FlatApartmentOtherInfo.module.css";

const FlatApartmentOtherInfo = ({ onSubmitForm }) => {
  const navigate = useNavigate();
  // Access global multi-step context
  const {
    formData: globalFormData,
    updateFormData,
    resetFormData,
  } = useOutletContext();

  const [otherInfoText, setOtherInfoText] = useState(
    globalFormData?.otherInfo?.otherInfoText || "",
  );
  const [ownershipType, setOwnershipType] = useState(
    globalFormData?.otherInfo?.ownershipType || "Co-operative Society",
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePrev = () => {
    // Save current step data before navigating back
    updateFormData("otherInfo", { otherInfoText, ownershipType });
    navigate("/dashboard/upload/flat-apartment/property-details");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);

    // Save final step into context structure
    const updatedOtherInfo = { otherInfoText, ownershipType };
    updateFormData("otherInfo", updatedOtherInfo);

    // Construct full aggregated payload across all steps
    const finalPayload = {
      ...globalFormData,
      otherInfo: updatedOtherInfo,
    };

    // Trigger external callback if provided
    if (onSubmitForm) {
      await onSubmitForm(finalPayload);
    }

    // Clear multi-step store state
    resetFormData();

    // Redirect to listings dashboard
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      {/* 4-Step Progress Indicator */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepLine}></div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>1</div>
          <span className={styles.stepLabel}>Basic Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>2</div>
          <span className={styles.stepLabel}>Key Features</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>3</div>
          <span className={styles.stepLabel}>Property Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>4</div>
          <span className={styles.stepLabel}>Other Information</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className={styles.card}>
        <div className={styles.titleHeader}>
          <h2 className={styles.mainTitle}>FLAT / APARTMENT</h2>
          <p className={styles.subTitle}>Other Information</p>
        </div>

        <form onSubmit={handleSubmitClick} className={styles.formSection}>
          <input
            type="text"
            placeholder="Enter additional details..."
            value={otherInfoText}
            onChange={(e) => setOtherInfoText(e.target.value)}
            className={styles.underlinedInput}
          />

          <select
            value={ownershipType}
            onChange={(e) => setOwnershipType(e.target.value)}
            className={styles.underlinedSelect}
          >
            <option value="">--Select Ownership Type--</option>
            <option value="Freehold">Freehold</option>
            <option value="Leasehold">Leasehold</option>
            <option value="Co-operative Society">Co-operative Society</option>
            <option value="Power of Attorney">Power of Attorney</option>
          </select>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={handlePrev}
              className={styles.prevBtn}
            >
              Previous
            </button>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to submit all property details?</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleConfirmSubmit}
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlatApartmentOtherInfo;
