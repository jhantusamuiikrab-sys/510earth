import React, { useState } from "react";
import styles from "../assets/Content/BookedLeadForm.module.css";
import { bookedLead } from "../services/bookedLeadApi";

const initialFormState = {
  bkLdId: Date.now(),
  leadSource: "Website Generic",
  nameOfTheProject: "",
  nameOfTheProjectId: "",
  nameOfTheBuilderPromoter: "",
  nameOfTheFirstApplicant: "",
  mobileNo: "",
  alternateMobileNo: "",
  emailId: "",
  dateOfBirth: "",
  communicationAddress: "",
  locality: "",
  profession: "",
  companyName: "",
  designation: "",
  companyAddress: "",
  nameOfJointApplicant: "",
  jointApplicantMobileNo: "",
  jointApplicantAlternateMobileNo: "",
  jointApplicantEmailId: "",
  jointApplicantDateOfBirth: "",
  jointApplicantCommunicationAddress: "",
  jointApplicantLocality: "",
  jointApplicantProfession: "",
  blockOrTower: "",
  flatNumber: "",
  floorNumber: "",
  flatCost: "",
  carParking: "",
  totalConsideration: "",
  advanceAmount: "",
  probableDateForAgreement: "",
  probableDateOfRegistry: "",
  bankLoan: "",
  preferredBank: "",
  reference: "",
  yourExperienceWith510Earth: "",
  howDoYouKnowUs: "",
  bookingDate: "",
};

const initialFileState = {
  bookingImageFile: null,
  bookingFormFile: null,
  saleConfirmationDocFile: null,
};

const BookedLeadForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [files, setFiles] = useState(initialFileState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] || null }));
  };

  const handleProjectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const projectId = selectedOption.getAttribute("data-id") || "";

    setFormData((prev) => ({
      ...prev,
      nameOfTheProject: e.target.value,
      nameOfTheProjectId: projectId,
    }));

    if (errors.nameOfTheProject) {
      setErrors((prev) => ({ ...prev, nameOfTheProject: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nameOfTheProject) {
      newErrors.nameOfTheProject = "This field is required.";
    }
    if (!formData.nameOfTheBuilderPromoter) {
      newErrors.nameOfTheBuilderPromoter =
        "The Name of the Builder/Promoter field is required.";
    }
    if (!formData.emailId) newErrors.emailId = "The EmailId field is required.";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "The DateofBirth field is required.";
    if (!formData.communicationAddress)
      newErrors.communicationAddress =
        "The CommunicationAddress field is required.";
    if (!formData.locality)
      newErrors.locality = "The Locality field is required.";
    if (!formData.profession) newErrors.profession = "This field is required.";
    if (!formData.totalConsideration)
      newErrors.totalConsideration =
        "The TotalConsideration field is required.";
    if (!formData.bankLoan)
      newErrors.bankLoan = "The BankLoan field is required.";
    if (!formData.bookingDate)
      newErrors.bookingDate = "The Booking Date field is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const submissionData = new FormData();

      // Append state fields to multipart payload
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submissionData.append(key, formData[key]);
        }
      });

      // Append optional files if selected
      if (files.bookingImageFile) {
        submissionData.append("bookingImageFile", files.bookingImageFile);
      }
      if (files.bookingFormFile) {
        submissionData.append("bookingFormFile", files.bookingFormFile);
      }
      if (files.saleConfirmationDocFile) {
        submissionData.append(
          "saleConfirmationDocFile",
          files.saleConfirmationDocFile
        );
      }

      // Execute request via API service
      const response = await bookedLead(submissionData);

      setSubmitMessage({
        type: "success",
        text: response?.data?.message || "Booked lead created successfully!",
      });

      // Reset form and regenerate timestamp ID
      setFormData({ ...initialFormState, bkLdId: Date.now() });
      setFiles(initialFileState);
      setErrors({});
    } catch (error) {
      console.error("Error submitting lead:", error);
      setSubmitMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit booked lead.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Booked Lead Form</div>

      {submitMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            textAlign: "center",
            fontWeight: "bold",
            color: submitMessage.type === "success" ? "#155724" : "#721c24",
            backgroundColor: submitMessage.type === "success" ? "#d4edda" : "#f8d7da",
            border: `1px solid ${submitMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {submitMessage.text}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Lead Source */}
        <div className={styles.row}>
          <label className={styles.label}>Lead Source</label>
          <div className={styles.fieldContainer}>
            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Website Generic">Website Generic</option>
              <option value="Referral">Referral</option>
              <option value="Direct">Direct</option>
            </select>
          </div>
        </div>

        {/* Sub Property Category */}
        <div className={styles.row}>
          <label className={styles.label}>Sub Property Category</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              value='["Flat/Apartment"]'
              readOnly
              className={styles.input}
              style={{ backgroundColor: "#e9ecef" }}
            />
          </div>
        </div>

        {/* Name Of The Project */}
        <div className={styles.row}>
          <label className={styles.label}>Name Of The Project *</label>
          <div className={styles.fieldContainer}>
            <select
              name="nameOfTheProject"
              value={formData.nameOfTheProject}
              onChange={handleProjectChange}
              className={styles.select}
            >
              <option value="">Select Name Of The Project</option>
              <option value="JMC green oaks" data-id="PROJ_001">
                JMC green oaks
              </option>
              <option value="DTC Downtown" data-id="PROJ_002">
                DTC Downtown
              </option>
              <option value="JMC Hill View" data-id="PROJ_003">
                JMC Hill View
              </option>
              <option value="DTC Still Water" data-id="PROJ_004">
                DTC Still Water
              </option>
              <option value="NS Alti Level" data-id="PROJ_005">
                NS Alti Level
              </option>
            </select>
            {errors.nameOfTheProject && (
              <span className={styles.errorText}>
                {errors.nameOfTheProject}
              </span>
            )}
          </div>
        </div>

        {/* Name Of The Seller */}
        <div className={styles.row}>
          <label className={styles.label}>Name Of The Seller *</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="nameOfTheBuilderPromoter"
              value={formData.nameOfTheBuilderPromoter}
              onChange={handleChange}
              placeholder="Name Of The Seller"
              className={styles.input}
            />
            {errors.nameOfTheBuilderPromoter && (
              <span className={styles.errorText}>
                {errors.nameOfTheBuilderPromoter}
              </span>
            )}
          </div>
        </div>

        {/* Name Of The First Applicant */}
        <div className={styles.row}>
          <label className={styles.label}>Name Of The First Applicant</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="nameOfTheFirstApplicant"
              value={formData.nameOfTheFirstApplicant}
              onChange={handleChange}
              placeholder="Name Of The First Applicant"
              className={styles.input}
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className={styles.row}>
          <label className={styles.label}>Mobile Number</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={styles.input}
            />
          </div>
        </div>

        {/* Alternate Mobile Number */}
        <div className={styles.row}>
          <label className={styles.label}>Alternate Mobile Number</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="alternateMobileNo"
              value={formData.alternateMobileNo}
              onChange={handleChange}
              placeholder="Alternate Phone Number"
              className={styles.input}
            />
          </div>
        </div>

        {/* Email Id */}
        <div className={styles.row}>
          <label className={styles.label}>Email Id *</label>
          <div className={styles.fieldContainer}>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleChange}
              placeholder="Email Id"
              className={styles.input}
            />
            {errors.emailId && (
              <span className={styles.errorText}>{errors.emailId}</span>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div className={styles.row}>
          <label className={styles.label}>Date of Birth *</label>
          <div className={styles.fieldContainer}>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.dateOfBirth && (
              <span className={styles.errorText}>{errors.dateOfBirth}</span>
            )}
          </div>
        </div>

        {/* Communication Address */}
        <div className={styles.row}>
          <label className={styles.label}>Communication Address *</label>
          <div className={styles.fieldContainer}>
            <textarea
              name="communicationAddress"
              value={formData.communicationAddress}
              onChange={handleChange}
              placeholder="Communication Address"
              className={styles.textarea}
            />
            {errors.communicationAddress && (
              <span className={styles.errorText}>
                {errors.communicationAddress}
              </span>
            )}
          </div>
        </div>

        {/* Locality */}
        <div className={styles.row}>
          <label className={styles.label}>Locality *</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              placeholder="Locality"
              className={styles.input}
            />
            {errors.locality && (
              <span className={styles.errorText}>{errors.locality}</span>
            )}
          </div>
        </div>

        {/* Profession */}
        <div className={styles.row}>
          <label className={styles.label}>Profession *</label>
          <div className={styles.fieldContainer}>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select Profession</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
            </select>
            {errors.profession && (
              <span className={styles.errorText}>{errors.profession}</span>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div className={styles.row}>
          <label className={styles.label}>Company Name</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className={styles.input}
            />
          </div>
        </div>

        {/* Designation */}
        <div className={styles.row}>
          <label className={styles.label}>Designation</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className={styles.input}
            />
          </div>
        </div>

        {/* Company Address */}
        <div className={styles.row}>
          <label className={styles.label}>Company Address</label>
          <div className={styles.fieldContainer}>
            <textarea
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Company Address"
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Joint Applicant Fields */}
        <div className={styles.row}>
          <label className={styles.label}>Name of The Joint Applicant</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="nameOfJointApplicant"
              value={formData.nameOfJointApplicant}
              onChange={handleChange}
              placeholder="Name of The Joint Applicant"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Joint Applicant's Mobile No</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="jointApplicantMobileNo"
              value={formData.jointApplicantMobileNo}
              onChange={handleChange}
              placeholder="Joint Applicant's Mobile No"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>
            Joint Applicant's Alt Mobile No
          </label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="jointApplicantAlternateMobileNo"
              value={formData.jointApplicantAlternateMobileNo}
              onChange={handleChange}
              placeholder="Joint Applicant's Mobile No"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Joint Applicant's DOB</label>
          <div className={styles.fieldContainer}>
            <input
              type="date"
              name="jointApplicantDateOfBirth"
              value={formData.jointApplicantDateOfBirth}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>
            Joint Applicant's Communication Address
          </label>
          <div className={styles.fieldContainer}>
            <textarea
              name="jointApplicantCommunicationAddress"
              value={formData.jointApplicantCommunicationAddress}
              onChange={handleChange}
              placeholder="Joint Applicant's Communication Address"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Joint Applicant's Locality</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="jointApplicantLocality"
              value={formData.jointApplicantLocality}
              onChange={handleChange}
              placeholder="Joint Applicant's Locality"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Joint Applicant's Profession</label>
          <div className={styles.fieldContainer}>
            <select
              name="jointApplicantProfession"
              value={formData.jointApplicantProfession}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Select Profession</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
            </select>
          </div>
        </div>

        {/* Unit & Property Details */}
        <div className={styles.row}>
          <label className={styles.label}>Block/Tower</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="blockOrTower"
              value={formData.blockOrTower}
              onChange={handleChange}
              placeholder="Block/Tower"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Flat No</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="flatNumber"
              value={formData.flatNumber}
              onChange={handleChange}
              placeholder="Flat No"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Floor</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleChange}
              placeholder="Floor"
              className={styles.input}
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className={styles.row}>
          <label className={styles.label}>Flat Cost</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="flatCost"
              value={formData.flatCost}
              onChange={handleChange}
              placeholder="Flat Cost"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Car Parking</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="carParking"
              value={formData.carParking}
              onChange={handleChange}
              placeholder="Car Parking"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Total Consideration *</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="totalConsideration"
              value={formData.totalConsideration}
              onChange={handleChange}
              placeholder="Total Consideration"
              className={styles.input}
            />
            {errors.totalConsideration && (
              <span className={styles.errorText}>
                {errors.totalConsideration}
              </span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Advance Amount</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="advanceAmount"
              value={formData.advanceAmount}
              onChange={handleChange}
              placeholder="Advance Amount"
              className={styles.input}
            />
          </div>
        </div>

        {/* Workflow Dates */}
        <div className={styles.row}>
          <label className={styles.label}>Probable date for agreement</label>
          <div className={styles.fieldContainer}>
            <input
              type="date"
              name="probableDateForAgreement"
              value={formData.probableDateForAgreement}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Probable date of Registry</label>
          <div className={styles.fieldContainer}>
            <input
              type="date"
              name="probableDateOfRegistry"
              value={formData.probableDateOfRegistry}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        {/* Banking */}
        <div className={styles.row}>
          <label className={styles.label}>Bank Loan *</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="bankLoan"
              value={formData.bankLoan}
              onChange={handleChange}
              placeholder="Bank Loan Y/N"
              className={styles.input}
            />
            {errors.bankLoan && (
              <span className={styles.errorText}>{errors.bankLoan}</span>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Preferred Bank Name</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="preferredBank"
              value={formData.preferredBank}
              onChange={handleChange}
              placeholder="Preferred Bank Name"
              className={styles.input}
            />
          </div>
        </div>

        {/* Source & Feedback */}
        <div className={styles.row}>
          <label className={styles.label}>Reference if Any</label>
          <div className={styles.fieldContainer}>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Reference if Any"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Your Experience with 510earth</label>
          <div className={styles.fieldContainer}>
            <textarea
              name="yourExperienceWith510Earth"
              value={formData.yourExperienceWith510Earth}
              onChange={handleChange}
              placeholder="Your Experience with 510earth"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>How Do You Know Us ?</label>
          <div className={styles.fieldContainer}>
            <textarea
              name="howDoYouKnowUs"
              value={formData.howDoYouKnowUs}
              onChange={handleChange}
              placeholder="How Do You Know Us ?"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Booking Date *</label>
          <div className={styles.fieldContainer}>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.bookingDate && (
              <span className={styles.errorText}>{errors.bookingDate}</span>
            )}
          </div>
        </div>

        {/* File Attachments */}
        <div className={styles.row}>
          <label className={styles.label}>Happy Customer Photo</label>
          <div className={styles.fieldContainer}>
            <div className={styles.fileContainer}>
              <input
                type="file"
                name="bookingImageFile"
                accept="image/*"
                onChange={handleFileChange}
              />
              <span className={styles.fileInfo}>
                File format: .png, .gif, .jpeg, .webp, .jpg
              </span>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Booking Form</label>
          <div className={styles.fieldContainer}>
            <div className={styles.fileContainer}>
              <input
                type="file"
                name="bookingFormFile"
                accept=".pdf,image/*"
                onChange={handleFileChange}
              />
              <span className={styles.fileInfo}>
                File format: .png, .gif, .jpeg, .webp, .jpg, .pdf
              </span>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Sale Confirmation Doc</label>
          <div className={styles.fieldContainer}>
            <div className={styles.fileContainer}>
              <input
                type="file"
                name="saleConfirmationDocFile"
                accept=".pdf,image/*"
                onChange={handleFileChange}
              />
              <span className={styles.fileInfo}>
                File format: .png, .gif, .jpeg, .webp, .jpg, .pdf
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookedLeadForm;
