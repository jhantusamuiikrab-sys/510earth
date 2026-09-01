import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const AMENITIES_LIST = [
  "Lift",
  "24/7 Water Supply",
  "Car Parking/Reserved Parking",
  "Firefighting Systems",
  "Children's Play Area",
  "Patio or Balcony",
  "Gymnasium",
  "Intercom",
  "Club House",
  "Gated Access",
  "Swimming Pool",
  "Pet Friendly",
  "Pedestrian-Friendly /Walk-Score",
  "Game Room & Lounge",
  "Private Spa",
  "Power Backup",
  "Multipurpose Hall",
  "Cycling & Jogging Track",
  "Multipurpose Courts",
  "Security",
  "Flower Gardens",
  "Park",
  "Visitor Parking",
  "Rain Water Harvesting",
  "Vaastu Compliant",
  "Aerobics Room",
  "Earthquake Resistance",
  "Maintenance Staff",
  "CCTV Camera",
  "Golf Course",
  "Health Club With Steam /Jaccuzi",
  "Coffee Lounge & Restaurants",
  "WiFi in Common Area",
  "No. of Lift",
  "Forest Trails",
  "Indoor Badminton Courts",
  "Picnic Lawn",
  "Senior Citizen Zone",
  "Tennis Courts",
  "Theatre",
  "Hanging Pool",
  "Basket Ball",
  "Organic Farm",
  "Meditation Lawn",
  "Cricket Pitch",
  "Solar Water Panel",
  "Solar Hot Water",
  "Fitness Activity wall",
  "Temple",
  "Covered Fountain",
  "Badminton",
  "Mini Theatre",
  "Library",
  "Squash Court",
  "Fishing Pond",
  "Commercial Zone",
  "Meeting & Event Zone",
  "Amphitheatre",
];

const NEARBY_LOCATIONS = [
  { label: "Airport", key: "airport" },
  { label: "Bank", key: "bank" },
  { label: "Bus Stop", key: "busStop" },
  { label: "College", key: "college" },
  { label: "Hospital", key: "hospital" },
  { label: "Kindergarten", key: "kindergarten" },
  { label: "Land Mark", key: "landMark" },
  { label: "Mall", key: "mall" },
  { label: "Market", key: "market" },
  { label: "Metro", key: "metro" },
  { label: "Near By Circle", key: "nearByCircle" },
  { label: "Public Park", key: "publicPark" },
  { label: "Railway Station", key: "railwayStation" },
  { label: "School", key: "school" },
  { label: "Tech Park", key: "techPark" },
  { label: "Temple", key: "temple" },
  { label: "University", key: "university" },
];

export default function CommercialPropertyDetails() {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [nearbyDistances, setNearbyDistances] = useState({});

  // Pre-fill local state if context contains saved propertyDetails data
  useEffect(() => {
    if (contextData?.propertyDetails) {
      const {
        amenities,
        images: savedImages,
        nearby,
      } = contextData.propertyDetails;
      if (amenities) setSelectedAmenities(amenities);
      if (savedImages) setImages(savedImages);
      if (nearby) setNearbyDistances(nearby);
    }
  }, [contextData]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImages = () => {
    setImages([]);
  };

  const handleDistanceChange = (key, value) => {
    setNearbyDistances((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePrevious = () => {
    const intent = contextData?.lookingTo || "sell";
    navigate(`/dashboard/upload/${intent}/commercial/key-features`);
  };

  const handleNext = () => {
    // 1. Save step state into context
    updateFormData("propertyDetails", {
      amenities: selectedAmenities,
      images,
      nearby: nearbyDistances,
    });

    // 2. Navigate to Step 4 (Other Information)
    const intent = contextData?.lookingTo || "sell";
    navigate(`/dashboard/upload/${intent}/commercial/other-information`);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h3
        style={{ textAlign: "center", color: "#1a5b8c", marginBottom: "4px" }}
      >
        COMMERCIAL PROPERTY
      </h3>
      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginTop: "0",
          fontSize: "14px",
        }}
      >
        Property Details
      </p>

      {/* Amenities Section */}
      <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "#444", marginBottom: "15px" }}>Amenities</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
          }}
        >
          {AMENITIES_LIST.map((amenity, idx) => (
            <label
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#444",
              }}
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Property Images Section */}
      <div style={{ marginTop: "30px" }}>
        <h4 style={{ color: "#444", marginBottom: "10px" }}>Property Images</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <input type="file" multiple onChange={handleImageUpload} />
          {images.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveImages}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          )}
        </div>
        <p style={{ color: "#dc3545", fontSize: "12px", marginTop: "8px" }}>
          Please upload min 4 files for image.
          <br />
          Upload images : Min - 4, Max-16
        </p>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #eee",
          margin: "20px 0",
        }}
      />

      {/* Nearby Distances Section */}
      <div>
        <h4 style={{ color: "#444", marginBottom: "15px" }}>Nearby</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px 15px",
          }}
        >
          {NEARBY_LOCATIONS.map((item) => (
            <div key={item.key}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "5px",
                }}
              >
                {item.label}
              </label>
              <input
                type="text"
                placeholder={`Enter Distance of ${item.label}`}
                value={nearbyDistances[item.key] || ""}
                onChange={(e) => handleDistanceChange(item.key, e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  padding: "6px 0",
                  outline: "none",
                  fontSize: "13px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stepper Controls */}
      <div style={{ display: "flex", gap: "15px", marginTop: "40px" }}>
        <button
          type="button"
          onClick={handlePrevious}
          style={{
            backgroundColor: "#8cc63f",
            color: "#fff",
            border: "none",
            padding: "10px 30px",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          style={{
            backgroundColor: "#8cc63f",
            color: "#fff",
            border: "none",
            padding: "10px 30px",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
