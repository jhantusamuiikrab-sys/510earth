import React, { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import '../assets/Content/RequirementMismatchDownload.css';

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
      margin:       0.5,
      filename:     `Requirement_Mismatch_${id || 'Form'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className="download-page-container" style={{ padding: '20px', background: '#f4f6f9', minHeight: '100vh' }}>
      <div style={{ marginBottom: '15px' }}>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
      </div>

      <div className="card-panel" style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden' }}>
       <div style={{ background: 'var(--accent-gold)', color: '#fff', padding: '12px 20px', fontSize: '18px', fontWeight: 'bold' }}>
          Form Download
        </div>

        {/* Printable Section */}
        <div ref={printRef} style={{ padding: '20px', background: '#fff' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Requirement Mismatch Application Form
          </h2>

          <table className="mismatch-detail-table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333' }}>
            <tbody>
              {/* COMMON HEADERS */}
              <tr>
                <td className="table-label">Date</td>
                <td>{formatDate(data.createdAt || data.createdOn)}</td>
                <td className="table-label">Agent Name</td>
                <td>{data.agentName || '-'}</td>
              </tr>
              <tr>
                <td className="table-label">Customer Name</td>
                <td>{data.customerName || '-'}</td>
                <td className="table-label">Phone</td>
                <td>{data.phoneNumber || '-'}</td>
              </tr>
              <tr>
                <td className="table-label">Customer City</td>
                <td>{data.customerCityName || '-'}</td>
                <td className="table-label">Property Type</td>
                <td>{data.propertyType || '-'}</td>
              </tr>

              {/* CONDITIONAL RENDER: COMMERCIAL VS RESIDENTIAL */}
              {isCommercial ? (
                <>
                  {/* --- COMMERCIAL FIELDS --- */}
                  <tr>
                    <td className="table-label">Sub Property Type</td>
                    <td>{data.subPropertyType || '-'}</td>
                    <td className="table-label">Flooring Type</td>
                    <td>{data.floorType || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">SQ ft Range</td>
                    <td>{data.sqFtFrom || '-'} - {data.sqFtTo || '-'}</td>
                    <td className="table-label">Budget</td>
                    <td>{data.budgetFrom || '-'} - {data.budgetTo || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Construction Status</td>
                    <td>{data.constructionStatus || '-'}</td>
                    <td className="table-label">in Case UC</td>
                    <td>{data.ucPossessionDate || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Business Type</td>
                    <td>{data.businessType || '-'}</td>
                    <td className="table-label">Vastu Pref*</td>
                    <td>{data.vastuPref || 'No'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Amenities*</td>
                    <td>{data.amenities || '-'}</td>
                    <td className="table-label">Special Requirement</td>
                    <td>{data.specialRequirement || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Celling Height</td>
                    <td>{data.cellingHeight || '-'}</td>
                    <td className="table-label">Entrance Width</td>
                    <td>{data.entranceWidth || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">No Of Seats</td>
                    <td>{data.noOfSeats || '-'}</td>
                    <td className="table-label">Covered Parking</td>
                    <td>{data.coveredParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Open Parking</td>
                    <td colSpan="3">{data.openParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Property Offered</td>
                    <td>{data.propertyOffered || '-'}</td>
                    <td className="table-label">Property Visited (510earth)</td>
                    <td>{data.propertyVisited || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Property Visited (Ownself)</td>
                    <td colSpan="3">{data.pvDoneOwnself || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Loading Unloading</td>
                    <td>{data.loadingUnloading || '-'}</td>
                    <td className="table-label">Pref Location, 3-4 Location</td>
                    <td>{data.preferredLocation || '-'}</td>
                  </tr>
                </>
              ) : (
                <>
                  {/* --- RESIDENTIAL FIELDS --- */}
                  <tr>
                    <td className="table-label">Preferred BHK</td>
                    <td>{data.preferredBhk || data.bhk || '-'}</td>
                    <td className="table-label">Preferred Floor</td>
                    <td>{data.preferredFloor || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">SQ ft Range</td>
                    <td>{data.sqFtFrom || '-'} - {data.sqFtTo || '-'}</td>
                    <td className="table-label">Budget</td>
                    <td>{data.budgetFrom || '-'} - {data.budgetTo || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Construction Status</td>
                    <td>{data.constructionStatus || '-'}</td>
                    <td className="table-label">in Case UC</td>
                    <td>{data.ucPossessionDate || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Building Type</td>
                    <td>{data.buildingType || '-'}</td>
                    <td className="table-label">Vastu Pref*</td>
                    <td>{data.vastuPref || 'No'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Amenities*</td>
                    <td>{data.amenities || '-'}</td>
                    <td className="table-label">Covered Parking</td>
                    <td>{data.coveredParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Open Parking</td>
                    <td colSpan="3">{data.openParking || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Property Offered</td>
                    <td>{data.propertyOffered || '-'}</td>
                    <td className="table-label">Property Visited (510earth)</td>
                    <td>{data.propertyVisited || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Property Visited (Ownself)</td>
                    <td colSpan="3">{data.pvDoneOwnself || '-'}</td>
                  </tr>
                  <tr>
                    <td className="table-label">Pref Location, 3-4 Location</td>
                    <td colSpan="3">{data.preferredLocation || '-'}</td>
                  </tr>
                </>
              )}

              {/* COMMON FOOTERS */}
              <tr>
                <td className="table-label">Why this Location/ Purpose?</td>
                <td colSpan={isBrokerageApplicable ? 1 : 3}>{data.locationPurpose || '-'}</td>
              </tr>

              <tr>
                <td className="table-label">Brokerage</td>
                <td colSpan={isBrokerageApplicable ? 1 : 3}>
                  {isBrokerageApplicable ? 'Yes' : 'No'}
                </td>
                {isBrokerageApplicable && (
                  <>
                    <td className="table-label">Brokerage (%)</td>
                    <td>{data.brokeragePercentage ? `${data.brokeragePercentage}%` : '-'}</td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Action Button */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <button 
            onClick={handleDownloadPDF} 
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 25px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequirementMismatchDownload;