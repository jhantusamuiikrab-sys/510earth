import React, { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import styles from '../assets/Content/RequirementMismatchDownload.module.css';

const RequirementMismatchDownload = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  // Fallback data if page refreshed without state
  const data = location.state?.leadData || {};

  // Check if property type is commercial
  const isCommercial = (data.propertyType || '').toLowerCase() === 'commercial';

  // Helper check for boolean / string 'Yes' values for brokerage
  const isBrokerageApplicable = data.isBrokerage === true || data.isBrokerage === 'Yes' || data.brokerage === 'Yes';

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `Requirement_Mismatch_${id || 'Form'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className={styles.downloadPageContainer}>
      <div className={styles.navigationWrapper}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      <div className={styles.cardPanel}>
        <div className={styles.panelHeader}>
          Form Download
        </div>

        {/* Printable Section */}
        <div ref={printRef} className={styles.printableSection}>
          <h2 className={styles.formTitle}>
            Requirement Mismatch Application Form
          </h2>

          <table className={styles.mismatchDetailTable}>
            <tbody>
              {/* COMMON HEADERS */}
              <tr>
                <td className={styles.tableLabel}>Date</td>
                <td>{formatDate(data.createdAt || data.createdOn)}</td>
                <td className={styles.tableLabel}>Agent Name</td>
                <td>{data.agentName || '-'}</td>
              </tr>
              <tr>
                <td className={styles.tableLabel}>Customer Name</td>
                <td>{data.customerName || '-'}</td>
                <td className={styles.tableLabel}>Phone</td>
                <td>{data.phoneNumber || '-'}</td>
              </tr>
              <tr>
                <td className={styles.tableLabel}>Customer City</td>
                <td>{data.customerCityName || '-'}</td>
                <td className={styles.tableLabel}>Property Type</td>
                <td>{data.propertyType || '-'}</td>
              </tr>

              {/* CONDITIONAL RENDER: COMMERCIAL VS RESIDENTIAL */}
              {isCommercial ? (
                <>
                  {/* --- COMMERCIAL FIELDS --- */}
                  <tr>
                    <td className={styles.tableLabel}>Sub Property Type</td>
                    <td>{data.subPropertyType || '-'}</td>
                    <td className={styles.tableLabel}>Flooring Type</td>
                    <td>{data.floorType || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>SQ ft Range</td>
                    <td>{data.sqFtFrom || '-'} - {data.sqFtTo || '-'}</td>
                    <td className={styles.tableLabel}>Budget</td>
                    <td>{data.budgetFrom || '-'} - {data.budgetTo || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Construction Status</td>
                    <td>{data.constructionStatus || '-'}</td>
                    <td className={styles.tableLabel}>in Case UC</td>
                    <td>{data.ucPossessionDate || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Business Type</td>
                    <td>{data.businessType || '-'}</td>
                    <td className={styles.tableLabel}>Vastu Pref*</td>
                    <td>{data.vastuPref || 'No'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Amenities*</td>
                    <td>{data.amenities || '-'}</td>
                    <td className={styles.tableLabel}>Special Requirement</td>
                    <td>{data.specialRequirement || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Celling Height</td>
                    <td>{data.cellingHeight || '-'}</td>
                    <td className={styles.tableLabel}>Entrance Width</td>
                    <td>{data.entranceWidth || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>No Of Seats</td>
                    <td>{data.noOfSeats || '-'}</td>
                    <td className={styles.tableLabel}>Covered Parking</td>
                    <td>{data.coveredParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Open Parking</td>
                    <td colSpan="3">{data.openParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Property Offered</td>
                    <td>{data.propertyOffered || '-'}</td>
                    <td className={styles.tableLabel}>Property Visited (510earth)</td>
                    <td>{data.propertyVisited || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Property Visited (Ownself)</td>
                    <td colSpan="3">{data.pvDoneOwnself || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Loading Unloading</td>
                    <td>{data.loadingUnloading || '-'}</td>
                    <td className={styles.tableLabel}>Pref Location, 3-4 Location</td>
                    <td>{data.preferredLocation || '-'}</td>
                  </tr>
                </>
              ) : (
                <>
                  {/* --- RESIDENTIAL FIELDS --- */}
                  <tr>
                    <td className={styles.tableLabel}>Preferred BHK</td>
                    <td>{data.preferredBhk || data.bhk || '-'}</td>
                    <td className={styles.tableLabel}>Preferred Floor</td>
                    <td>{data.preferredFloor || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>SQ ft Range</td>
                    <td>{data.sqFtFrom || '-'} - {data.sqFtTo || '-'}</td>
                    <td className={styles.tableLabel}>Budget</td>
                    <td>{data.budgetFrom || '-'} - {data.budgetTo || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Construction Status</td>
                    <td>{data.constructionStatus || '-'}</td>
                    <td className={styles.tableLabel}>in Case UC</td>
                    <td>{data.ucPossessionDate || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Building Type</td>
                    <td>{data.buildingType || '-'}</td>
                    <td className={styles.tableLabel}>Vastu Pref*</td>
                    <td>{data.vastuPref || 'No'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Amenities*</td>
                    <td>{data.amenities || '-'}</td>
                    <td className={styles.tableLabel}>Covered Parking</td>
                    <td>{data.coveredParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Open Parking</td>
                    <td colSpan="3">{data.openParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Property Offered</td>
                    <td>{data.propertyOffered || '-'}</td>
                    <td className={styles.tableLabel}>Property Visited (510earth)</td>
                    <td>{data.propertyVisited || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Property Visited (Ownself)</td>
                    <td colSpan="3">{data.pvDoneOwnself || '-'}</td>
                  </tr>
                  <tr>
                    <td className={styles.tableLabel}>Pref Location, 3-4 Location</td>
                    <td colSpan="3">{data.preferredLocation || '-'}</td>
                  </tr>
                </>
              )}

              {/* COMMON FOOTERS */}
              <tr>
                <td className={styles.tableLabel}>Why this Location/ Purpose?</td>
                <td colSpan={isBrokerageApplicable ? 1 : 3}>{data.locationPurpose || '-'}</td>
              </tr>

              <tr>
                <td className={styles.tableLabel}>Brokerage</td>
                <td colSpan={isBrokerageApplicable ? 1 : 3}>
                  {isBrokerageApplicable ? 'Yes' : 'No'}
                </td>
                {isBrokerageApplicable && (
                  <>
                    <td className={styles.tableLabel}>Brokerage (%)</td>
                    <td>{data.brokeragePercentage ? `${data.brokeragePercentage}%` : '-'}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Action Button */}
        <div className={styles.actionWrapper}>
          <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequirementMismatchDownload;