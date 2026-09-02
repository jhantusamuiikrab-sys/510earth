import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../assets/Content/ReqMismatchDetails.css';

const ReqMismatchDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Retrieve lead data from navigation state
  const leadData = location.state?.leadData || {};

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
  };

  return (
    <div className="details-page-wrapper">
      {/* Top Header Bar */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to List
        </button>
        <div className="header-title">
          <h1>Requirement Mismatch Details</h1>
          <span className="lead-tag">ID: #{id || leadData._id || '1389'}</span>
        </div>
      </div>

      <div className="details-content">
        {/* Customer Information */}
        <section className="detail-card">
          <h2>Customer Information</h2>
          <div className="grid-layout">
            <div className="field-group">
              <label>Lead Date</label>
              <div className="field-value">{formatDate(leadData.createdAt || leadData.createdOn)}</div>
            </div>
            <div className="field-group">
              <label>Agent Name</label>
              <div className="field-value">{leadData.agentName || 'Abhisek TestDevlp'}</div>
            </div>
            <div className="field-group">
              <label>Customer Name</label>
              <div className="field-value font-bold">{leadData.customerName || leadData.name || '-'}</div>
            </div>
            <div className="field-group">
              <label>Phone Number</label>
              <div className="field-value">{leadData.phoneNumber || leadData.phoneNo || '-'}</div>
            </div>
            <div className="field-group">
              <label>Alternate Phone Number</label>
              <div className="field-value">{leadData.alternatePhoneNumber || '-'}</div>
            </div>
            <div className="field-group">
              <label>Customer City</label>
              <div className="field-value">{leadData.countryName || '-'}</div>
            </div>
            <div className="field-group">
              <label>Birth Date</label>
              <div className="field-value">{leadData.custDOB || '-'}</div>
            </div>
            <div className="field-group">
              <label>Anniversary Date</label>
              <div className="field-value">{leadData.custAnniversaryDate || '-'}</div>
            </div>
          </div>
        </section>

        {/* Property Specs */}
        <section className="detail-card">
          <h2>Property Specifications</h2>
          <div className="grid-layout">
            <div className="field-group">
              <label>Property Type</label>
              <div className="badge-group">
                <span className="badge badge-primary">{leadData.type || leadData.propertyType || 'Land'}</span>
                {/* <span className="badge badge-secondary">Residential</span> */}
              </div>
            </div>
            <div className="field-group">
              <label>SQ ft Range</label>
              <div className="field-value">{leadData.sqFtFrom || ''} - {leadData.sqFtTo || ''}</div>
            </div>
            <div className="field-group">
              <label>Budget Range</label>
              <div className="field-value">{leadData.budgetFrom || ''} - {leadData.budgetTo || ''}</div>
            </div>
            <div className="field-group">
              <label>Construction Status</label>
              <div className="badge-group">
                <span className="badge badge-outline">{leadData.constructionStatus || ''}</span>
              </div>
            </div>
            <div className="field-group">
              <label>Target Date</label>
              <div className="field-value">{leadData.ucPossessionDate || ''}</div>
            </div>
            <div className="field-group">
              <label>Purpose to Buy</label>
              <div className="field-value">{leadData.rPurposeToBuyName || ''}</div>
            </div>
            <div className="field-group">
              <label>Land Authority</label>
              <div className="field-value">{leadData.rLandAuthName || ''}</div>
            </div>
            {/* <div className="field-group">
              <label>Land Type</label>
              <div className="field-value">{leadData.landType || ''}</div>
            </div> */}
          </div>
        </section>

        {/* Preferences & Site Visits */}
        <section className="detail-card">
          <h2>Preferences & Site Visits</h2>
          <div className="grid-layout full">
            <div className="field-group">
              <label>Is Vastu Preferred</label>
              <div className="field-value">{leadData.isVastuPrefrence ? 'Yes' : 'No'}</div>
            </div>
            <div className="field-group">
              <label>Specific Amenities</label>
              <div className="badge-group">
                <span className="badge badge-accent">{leadData.amenities || ''}</span>
              </div>
            </div>
            <div className="field-group">
              <label>Special Requirement</label>
              <div className="field-value">{leadData.specialReq || 'Road side'}</div>
            </div>
            <div className="field-group">
              <label>Preferred Locations</label>
              <div className="field-value box">{leadData.preferredLocation || ''}</div>
            </div>
            <div className="field-group">
              <label>Why this Location / Purpose?</label>
              <div className="field-value box">{leadData.preferredLocationPurpose || ''}</div>
            </div>
            <div className="field-group">
              <label>Purpose To Buy</label>
              <div className="field-value box">{leadData.purposeToBuy || ''}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReqMismatchDetailsPage;