import React, { useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiHome,
  FiPlus,
  FiTrash2,
  FiSend,
  FiSliders,
  FiLoader,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Update base URL if your backend runs on a different port/domain
const API_URL = "http://localhost:3000/api/requirement-mismatch";
// const API_URL = import.meta.env.VITE_API_URL ||"http://localhost:3000/api";

// const response = await fetch(`${API_URL}/requirement-mismatch?${queryParams.toString()}`);

const ReqMismatchForm = () => {
  const [formData, setFormData] = useState({
    leadId: "20468",
    leadDate: "2026-09-01T15:51",
    agentName: "Abhisek TestDevlp",
    customerName: "",
    emailId: "",
    phoneNumber: "",
    phoneNumberIsOnSocialMedia: "Yes",
    alternatePhoneNumber: "",
    alternatePhoneNumberIsOnSocialMedia: "No",
    custDOB: "",
    custAnniversaryDate: "",
    customerCityName: "",
    preferredLocations: [""],
    preferredLocationPurpose: "",
    propertyType: "Residential",
    subPropertyType: "Flat/Apartment",
    preferredBHK: "3 BHK",
    preferredFloor: "",
    sqFtFrom: "800",
    sqFtTo: "1400",
    budgetFrom: "70",
    budgetTo: "80",
    constructionStatus: "Under Construction",
    isUC: true,
    ucPossessionDate: "",
    buildingType: "Standalone",
    isVastuPrefrence: false,
    vastuPrefrence: "",
    amenities: "",
    coveredParking: "1",
    openParking: "0",
    propertyOffered: "",
    propertyVisited: "Sarovaar",
    pvDoneOwnself: [""],
    isBrokerage: "Yes",
    brokeragePercentage: "2%",
    specialRequirement: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Dynamic Handlers for Preferred Locations
  const handleLocationChange = (index, value) => {
    const updated = [...formData.preferredLocations];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, preferredLocations: updated }));
  };

  const addLocation = () => {
    setFormData((prev) => ({
      ...prev,
      preferredLocations: [...prev.preferredLocations, ""],
    }));
  };

  const removeLocation = (index) => {
    const updated = formData.preferredLocations.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, preferredLocations: updated }));
  };

  // Dynamic Handlers for Self Visited Properties
  const handlePvOwnselfChange = (index, value) => {
    const updated = [...formData.pvDoneOwnself];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, pvDoneOwnself: updated }));
  };

  const addPvOwnself = () => {
    setFormData((prev) => ({
      ...prev,
      pvDoneOwnself: [...prev.pvDoneOwnself, ""],
    }));
  };

  const removePvOwnself = (index) => {
    const updated = formData.pvDoneOwnself.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, pvDoneOwnself: updated }));
  };

  // Submit Handler connected to Express Backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      // Clean and format payload for backend endpoint
      const payload = {
        ...formData,
        preferredLocations: formData.preferredLocations.filter(Boolean),
        pvDoneOwnself: formData.pvDoneOwnself.filter(Boolean),
        budgetFrom: formData.budgetFrom ? `${formData.budgetFrom}-Lacs` : "",
        budgetTo: formData.budgetTo ? `${formData.budgetTo}-Lacs` : "",
        phoneNumberIsOnSocialMedia: formData.phoneNumberIsOnSocialMedia === "Yes" ? "1" : "0",
        alternatePhoneNumberIsOnSocialMedia: formData.alternatePhoneNumberIsOnSocialMedia === "Yes" ? "1" : "0",
      };

      const response = await axios.post(API_URL, payload);

      if (response.data.success) {
        setFeedback({
          type: "success",
          message: "Requirement Mismatch record saved successfully!",
        });
      }
    } catch (error) {
      console.error("API Integration Error:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to save record. Please try again.";
      setFeedback({ type: "danger", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rm-container">
      {/* Page Header */}
      <div className="page-heading mb-4">
        <div>
          <span className="page-kicker">SUPPLEMENTARY FORM</span>
          <h1 className="h3 font-weight-bold text-dark">
            Requirement Mismatch Application
          </h1>
          <p className="text-muted">
            Update missing or modified customer property preferences to align hunting criteria.
          </p>
        </div>
      </div>

      {/* Alert Banner */}
      {feedback.message && (
        <div className={`alert alert-${feedback.type} alert-dismissible fade show`} role="alert">
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* SECTION 1: Lead & Customer Details */}
        <div className="dashboard-card mb-4">
          <div className="dashboard-card-header">
            <div>
              <span className="page-kicker">CONTACT DETAILS</span>
              <h5>
                <FiUser className="me-2 text-primary" /> Customer & Lead Meta
              </h5>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Lead ID</label>
              <input
                type="text"
                className="form-control bg-light"
                value={formData.leadId}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Lead Date & Time</label>
              <input
                type="datetime-local"
                className="form-control bg-light"
                value={formData.leadDate}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Assigned Agent</label>
              <input
                type="text"
                className="form-control bg-light"
                value={formData.agentName}
                readOnly
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                className="form-control"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiMail /></span>
                <input
                  type="email"
                  name="emailId"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">City Name</label>
              <input
                type="text"
                name="customerCityName"
                className="form-control"
                placeholder="e.g. Kolkata"
                value={formData.customerCityName}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number + WhatsApp Toggle */}
            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Primary Phone Number *</label>
              <div className="input-group mb-2">
                <span className="input-group-text bg-white"><FiPhone /></span>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-control"
                  placeholder="10-digit mobile number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-check form-switch d-flex align-items-center gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="waPrimary"
                  checked={formData.phoneNumberIsOnSocialMedia === "Yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumberIsOnSocialMedia: e.target.checked ? "Yes" : "No",
                    }))
                  }
                />
                <label className="form-check-label small d-flex align-items-center gap-1 text-muted" htmlFor="waPrimary">
                  <FaWhatsapp className="text-success" /> Registered on WhatsApp
                </label>
              </div>
            </div>

            {/* Alternate Phone Number + WhatsApp Toggle */}
            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Alternate Phone Number</label>
              <div className="input-group mb-2">
                <span className="input-group-text bg-white"><FiPhone /></span>
                <input
                  type="tel"
                  name="alternatePhoneNumber"
                  className="form-control"
                  placeholder="Secondary contact"
                  value={formData.alternatePhoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-check form-switch d-flex align-items-center gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="waAlt"
                  checked={formData.alternatePhoneNumberIsOnSocialMedia === "Yes"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      alternatePhoneNumberIsOnSocialMedia: e.target.checked ? "Yes" : "No",
                    }))
                  }
                />
                <label className="form-check-label small d-flex align-items-center gap-1 text-muted" htmlFor="waAlt">
                  <FaWhatsapp className="text-success" /> Registered on WhatsApp
                </label>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Date of Birth</label>
              <input
                type="date"
                name="custDOB"
                className="form-control"
                value={formData.custDOB}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Anniversary Date</label>
              <input
                type="date"
                name="custAnniversaryDate"
                className="form-control"
                value={formData.custAnniversaryDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Property Requirements */}
        <div className="dashboard-card mb-4">
          <div className="dashboard-card-header">
            <div>
              <span className="page-kicker">PROPERTY SPECIFICATIONS</span>
              <h5>
                <FiHome className="me-2 text-primary" /> Preferred Property Criteria
              </h5>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-3">
              <label className="form-label font-weight-bold">Property Type</label>
              <select
                name="propertyType"
                className="dashboard-select w-100"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land/Plot">Land / Plot</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <label className="form-label font-weight-bold">Sub-Property Type</label>
              <select
                name="subPropertyType"
                className="dashboard-select w-100"
                value={formData.subPropertyType}
                onChange={handleChange}
              >
                <option value="Flat/Apartment">Flat / Apartment</option>
                <option value="Villa/House">Villa / Independent House</option>
                <option value="Duplex">Duplex</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <label className="form-label font-weight-bold">Preferred BHK</label>
              <select
                name="preferredBHK"
                className="dashboard-select w-100"
                value={formData.preferredBHK}
                onChange={handleChange}
              >
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <label className="form-label font-weight-bold">Preferred Floor</label>
              <input
                type="text"
                name="preferredFloor"
                className="form-control"
                placeholder="e.g. Mid Floor (4 to 8)"
                value={formData.preferredFloor}
                onChange={handleChange}
              />
            </div>

            {/* Sq. Ft. Range */}
            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Sq. Ft. Range</label>
              <div className="input-group">
                <input
                  type="number"
                  name="sqFtFrom"
                  className="form-control"
                  placeholder="Min Sq. Ft."
                  value={formData.sqFtFrom}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light">to</span>
                <input
                  type="number"
                  name="sqFtTo"
                  className="form-control"
                  placeholder="Max Sq. Ft."
                  value={formData.sqFtTo}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light">Sq. Ft.</span>
              </div>
            </div>

            {/* Budget Range */}
            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Budget Range (Lacs)</label>
              <div className="input-group">
                <span className="input-group-text bg-light">₹</span>
                <input
                  type="number"
                  name="budgetFrom"
                  className="form-control"
                  placeholder="Min Lacs"
                  value={formData.budgetFrom}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light">to</span>
                <input
                  type="number"
                  name="budgetTo"
                  className="form-control"
                  placeholder="Max Lacs"
                  value={formData.budgetTo}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light">Lacs</span>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Construction Status</label>
              <select
                name="constructionStatus"
                className="dashboard-select w-100"
                value={formData.constructionStatus}
                onChange={handleChange}
              >
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">Building Type</label>
              <select
                name="buildingType"
                className="dashboard-select w-100"
                value={formData.buildingType}
                onChange={handleChange}
              >
                <option value="Standalone">Standalone Building</option>
                <option value="Gated Community">Gated Community / Complex</option>
                <option value="Township">Township</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold">UC Possession Date</label>
              <input
                type="date"
                name="ucPossessionDate"
                className="form-control"
                value={formData.ucPossessionDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Locations & Amenities */}
        <div className="dashboard-card mb-4">
          <div className="dashboard-card-header">
            <div>
              <span className="page-kicker">LOCATIONS & AMENITIES</span>
              <h5>
                <FiMapPin className="me-2 text-primary" /> Location Preferences & Features
              </h5>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12">
              <label className="form-label font-weight-bold d-flex justify-content-between align-items-center">
                <span>Preferred Locations (Up to 3-4 Areas)</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                  onClick={addLocation}
                >
                  <FiPlus /> Add Location
                </button>
              </label>

              {formData.preferredLocations.map((loc, idx) => (
                <div className="input-group mb-2" key={idx}>
                  <span className="input-group-text bg-white">#{idx + 1}</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter locality / area name"
                    value={loc}
                    onChange={(e) => handleLocationChange(idx, e.target.value)}
                  />
                  {formData.preferredLocations.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeLocation(idx)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-12">
              <label className="form-label font-weight-bold">Purpose To Buy</label>
              <textarea
                name="purposeToBuy"
                className="form-control"
                rows="2"
                placeholder="What is the purpose of buying? (e.g., 1st home, Investment, Relocation)"
                value={formData.purposeToBuy}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12">
              <label className="form-label font-weight-bold">Location Purpose / Comments</label>
              <textarea
                name="preferredLocationPurpose"
                className="form-control"
                rows="2"
                placeholder="Why this location? (e.g., Near school, close to workplace)"
                value={formData.preferredLocationPurpose}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-md-6 border-top pt-3 mt-3">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isVastuPrefrence"
                  name="isVastuPrefrence"
                  checked={formData.isVastuPrefrence}
                  onChange={handleChange}
                />
                <label className="form-check-label font-weight-bold" htmlFor="isVastuPrefrence">
                  Vastu Compliant Required
                </label>
              </div>
              {formData.isVastuPrefrence && (
                <input
                  type="text"
                  name="vastuPrefrence"
                  className="form-control"
                  placeholder="Specify Vastu orientation (e.g. North-East Facing)"
                  value={formData.vastuPrefrence}
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="col-12 col-md-6 border-top pt-3 mt-3">
              <label className="form-label font-weight-bold">Specific Amenities Needed</label>
              <input
                type="text"
                name="amenities"
                className="form-control"
                placeholder="e.g. Swimming Pool, Gym, Power Backup"
                value={formData.amenities}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Property Activity & Brokerage */}
        <div className="dashboard-card mb-4">
          <div className="dashboard-card-header">
            <div>
              <span className="page-kicker">ACTIVITY & FINANCIALS</span>
              <h5>
                <FiSliders className="me-2 text-primary" /> Visited Properties & Brokerage
              </h5>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Property Offered</label>
              <input
                type="text"
                name="propertyOffered"
                className="form-control"
                placeholder="Name of property offered"
                value={formData.propertyOffered}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold">Property Visited (By Company)</label>
              <input
                type="text"
                name="propertyVisited"
                className="form-control"
                placeholder="Name of property visited"
                value={formData.propertyVisited}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label font-weight-bold d-flex justify-content-between align-items-center">
                <span>Property Visited (Done By Customer Himself)</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                  onClick={addPvOwnself}
                >
                  <FiPlus /> Add Visited Property
                </button>
              </label>

              {formData.pvDoneOwnself.map((p, idx) => (
                <div className="input-group mb-2" key={idx}>
                  <span className="input-group-text bg-white">#{idx + 1}</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter self-visited property name"
                    value={p}
                    onChange={(e) => handlePvOwnselfChange(idx, e.target.value)}
                  />
                  {formData.pvDoneOwnself.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removePvOwnself(idx)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="col-12 col-md-4 border-top pt-3">
              <label className="form-label font-weight-bold">Is Brokerage Applicable?</label>
              <select
                name="isBrokerage"
                className="dashboard-select w-100"
                value={formData.isBrokerage}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="col-12 col-md-4 border-top pt-3">
              <label className="form-label font-weight-bold">Brokerage Percentage</label>
              <input
                type="text"
                name="brokeragePercentage"
                className="form-control"
                placeholder="e.g. 2%"
                value={formData.brokeragePercentage}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 col-md-4 border-top pt-3">
              <label className="form-label font-weight-bold">Special / Specific Requirement</label>
              <input
                type="text"
                name="specialRequirement"
                className="form-control"
                placeholder="Any special notes"
                value={formData.specialRequirement}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="d-flex justify-content-end gap-3 mb-5">
          <button type="button" className="btn btn-light px-4" disabled={loading}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-5 d-inline-flex align-items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader className="spinner-border spinner-border-sm" /> Saving...
              </>
            ) : (
              <>
                <FiSend /> Save Requirement Mismatch
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReqMismatchForm;