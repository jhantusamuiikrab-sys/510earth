import React, { useState } from "react";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import ViewProperty from "./ViewProperty";
import FlatApartmentList from "./FlatApartmentList";
import UploadNewProperty from "./UploadNewProperty";
import FlatApartmentBasicDetails from "./FlatApartmentBasicDetails";
import FlatApartmentKeyFeatures from "./FlatApartmentKeyFeatures";
import FlatApartmentPropertyDetails from "./FlatApartmentPropertyDetails";
import FlatApartmentOtherInfo from "./FlatApartmentOtherInfo";

function DashboardMain() {
  // Navigation steps:
  // Step 1: Main Dashboard Selection
  // Step 2: Sub-options (View options or Upload options)
  // Step 3: View List Table OR Upload Step 1 (Basic Details)
  // Step 4: Upload Step 2 (Key Features)
  // Step 5: Upload Step 3 (Property Details)
  // Step 6: Upload Step 4 (Other Information / Final Submit)
  const [currentStep, setCurrentStep] = useState(1);

  // Consolidated state
  const [formData, setFormData] = useState({
    mainIntent: "view", // 'view' | 'upload' | 'leads'
    propertyType: "", // 'flat-apartment' | 'commercial' | etc.
    uploadSelection: null, // Data from UploadNewProperty
    basicDetails: null, // Data from FlatApartmentBasicDetails
    keyFeatures: null, // Data from FlatApartmentKeyFeatures
    propertyDetails: null, // Data from FlatApartmentPropertyDetails
    otherInfo: null, // Data from FlatApartmentOtherInfo
  });

//   const [formData, setFormData] = useState({
//   mainIntent: "upload", // Must be 'upload' to pass step guard checks
//   propertyType: "flat-apartment",
//   uploadSelection: { subCategory: "flat" },
//   basicDetails: { title: "Sample Flat", price: "5000000" },
//   keyFeatures: { bedrooms: 3, bathrooms: 2 },
//   propertyDetails: { area: "1200 sqft" },
//   otherInfo: null,
// });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Step 1 -> Next Click
  const handleStep1Next = () => {
    if (formData.mainIntent === "view" || formData.mainIntent === "upload") {
      setCurrentStep(2);
    }
  };

  // Step 2 (View Property) -> Go Click
  const handleStep2Go = () => {
    if (!formData.propertyType) {
      alert("Please select a property type.");
      return;
    }

    if (formData.propertyType === "flat-apartment") {
      setCurrentStep(3);
    }
  };

  // Step 2 (Upload Property) -> Next Click
  const handleUploadNext = (uploadPayload) => {
    updateFormData("uploadSelection", uploadPayload);

    // If Flat/Apartment is selected, advance to the 4-step wizard
    if (uploadPayload.subCategory === "flat") {
      setCurrentStep(3);
    }
  };

  // Step 3 (Flat/Apartment Basic Details) -> Next Click
  const handleBasicDetailsNext = (detailsPayload) => {
    updateFormData("basicDetails", detailsPayload);
    setCurrentStep(4);
  };

  // Step 4 (Key Features) -> Next Click
  const handleKeyFeaturesNext = (featuresPayload) => {
    updateFormData("keyFeatures", featuresPayload);
    setCurrentStep(5);
  };

  // Step 5 (Property Details) -> Next Click
  const handlePropertyDetailsNext = (propertyPayload) => {
    updateFormData("propertyDetails", propertyPayload);
    setCurrentStep(6);
  };

  // Step 6 (Other Information) -> Final Submit Click
  const handleFinalSubmit = async (otherInfoPayload) => {
    // Merge all collected state into a final object
    const finalSubmissionData = {
      ...formData,
      otherInfo: otherInfoPayload,
    };

    console.log("Final Property Submission Data:", finalSubmissionData);

    try {
      // API call placeholder for sending form data & images
      // await axios.post('/api/properties', finalSubmissionData);

      alert("Property uploaded successfully!");

      // Reset application state back to step 1
      setCurrentStep(1);
      setFormData({
        mainIntent: "view",
        propertyType: "",
        uploadSelection: null,
        basicDetails: null,
        keyFeatures: null,
        propertyDetails: null,
        otherInfo: null,
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="dashboard-main-layout">
      <Header />

      {/* STEP 1: Main Intent */}
      {currentStep === 1 && (
        <DashboardContent
          selectedOption={formData.mainIntent}
          onOptionChange={(val) => updateFormData("mainIntent", val)}
          onNext={handleStep1Next}
        />
      )}

      {/* STEP 2: View Property Options */}
      {currentStep === 2 && formData.mainIntent === "view" && (
        <ViewProperty
          selectedProperty={formData.propertyType}
          onPropertyChange={(val) => updateFormData("propertyType", val)}
          onGo={handleStep2Go}
        />
      )}

      {/* STEP 2: Upload New Property Flow */}
      {currentStep === 2 && formData.mainIntent === "upload" && (
        <UploadNewProperty onNext={handleUploadNext} />
      )}

      {/* STEP 3: View Table (View Intent) */}
      {currentStep === 3 && formData.mainIntent === "view" && (
        <FlatApartmentList />
      )}

      {/* STEP 3: Flat/Apartment Basic Details Form (Upload Intent) */}
      {currentStep === 3 && formData.mainIntent === "upload" && (
        <FlatApartmentBasicDetails onNextStep={handleBasicDetailsNext} />
      )}

      {/* STEP 4: Key Features Form */}
      {currentStep === 4 && formData.mainIntent === "upload" && (
        <FlatApartmentKeyFeatures
          onNextStep={handleKeyFeaturesNext}
          onPrevStep={() => setCurrentStep(3)}
        />
      )}

      {/* STEP 5: Property Details Form */}
      {currentStep === 5 && formData.mainIntent === "upload" && (
        <FlatApartmentPropertyDetails
          onNextStep={handlePropertyDetailsNext}
          onPrevStep={() => setCurrentStep(4)}
        />
      )}

      {/* STEP 6: Other Information Form (Final Step) */}
      {currentStep === 6 && formData.mainIntent === "upload" && (
        <FlatApartmentOtherInfo
          onSubmitForm={handleFinalSubmit}
          onPrevStep={() => setCurrentStep(5)}
        />
      )}
    </div>
  );
}

export default DashboardMain;