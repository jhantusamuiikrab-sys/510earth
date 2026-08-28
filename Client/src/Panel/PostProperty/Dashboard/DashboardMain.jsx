import React, { useState } from "react";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import ViewProperty from "./ViewProperty";
import FlatApartmentList from "./FlatApartmentList";

function DashboardMain() {
  // Navigation step tracking (1: Main intent, 2: Property type, 3: Property list table)
  const [currentStep, setCurrentStep] = useState(1);

  // Consolidated global form data state
  const [formData, setFormData] = useState({
    mainIntent: "view",        // Default: 'view' | 'upload' | 'leads'
    propertyType: "",          // 'flat-apartment' | 'independent-house-villa' | 'commercial' | 'land-plot'
  });

  // State lifting helper function to update shared state
  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Step 1 -> Next Click
  const handleStep1Next = () => {
    if (formData.mainIntent === "view") {
      setCurrentStep(2);
    } else {
      console.log("Other main option selected:", formData.mainIntent);
      // Handle 'upload' or 'leads' navigation here if needed
    }
  };

  // Step 2 -> Go Click
  const handleStep2Go = () => {
    if (!formData.propertyType) {
      alert("Please select a property type.");
      return;
    }

    if (formData.propertyType === "flat-apartment") {
      setCurrentStep(3);
    } else {
      console.log("Selected other property category:", formData.propertyType);
      // Handle navigation for other sub-options (e.g. LandDetails)
    }
  };

  return (
    <div className="dashboard-main-layout">
      <Header />

      {/* STEP 1: Main Dashboard Selection */}
      {currentStep === 1 && (
        <DashboardContent
          selectedOption={formData.mainIntent}
          onOptionChange={(val) => updateFormData("mainIntent", val)}
          onNext={handleStep1Next}
        />
      )}

      {/* STEP 2: View Property Type Selection */}
      {currentStep === 2 && (
        <ViewProperty
          selectedProperty={formData.propertyType}
          onPropertyChange={(val) => updateFormData("propertyType", val)}
          onGo={handleStep2Go}
        />
      )}

      {/* STEP 3: Flat/Apartment Table View */}
      {currentStep === 3 && (
        <FlatApartmentList />
      )}
    </div>
  );
}

export default DashboardMain;