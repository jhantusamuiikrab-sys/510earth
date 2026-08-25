import React from "react";

const NEARBY_FIELDS = [
  { id: "airport", label: "Airport", icon: "✈️", placeholder: "Enter Distance of Airport" },
  { id: "bank", label: "Bank", icon: "🏦", placeholder: "Enter Distance of Bank" },
  { id: "busStop", label: "Bus Stop", icon: "🚌", placeholder: "Enter Distance of Bus Stop" },
  { id: "college", label: "College", icon: "🎓", placeholder: "Enter Distance of College" },
  { id: "hospital", label: "Hospital", icon: "🏥", placeholder: "Enter Distance of Hospital" },
  { id: "kindergarten", label: "Kindergarten", icon: "🏫", placeholder: "Enter Distance of Kindergarten" },
  { id: "landMark", label: "Land Mark", icon: "📍", placeholder: "Enter Distance of Land Mark" },
  { id: "mall", label: "Mall", icon: "🏬", placeholder: "Enter Distance of Mall" },
  { id: "market", label: "Market", icon: "🏪", placeholder: "Enter Distance of Market" },
  { id: "metro", label: "Metro", icon: "🚇", placeholder: "Enter Distance of Metro" },
  { id: "nearByCircle", label: "Near By Circle", icon: "🧭", placeholder: "Enter Distance of Near By Circle" },
  { id: "publicPark", label: "Public Park", icon: "🌳", placeholder: "Enter Distance of Public Park" },
  { id: "railwayStation", label: "Railway Station", icon: "🚂", placeholder: "Enter Distance of Railway Station" },
  { id: "school", label: "School", icon: "🏫", placeholder: "Enter Distance of School" },
  { id: "techPark", label: "Tech Park", icon: "🏢", placeholder: "Enter Distance of Tech Park" },
  { id: "temple", label: "Temple", icon: "🛕", placeholder: "Enter Distance of Temple" },
  { id: "university", label: "University", icon: "🏛️", placeholder: "Enter Distance of University" },
];

const StepNearBy = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nearby: {
        ...(prev.nearby || {}),
        [name]: value,
      },
    }));
  };

  return (
    <div className="nearby_card">
      {/* Header Banner */}
      <div className="blue_header_banner" style={{ textAlign: "center" }}>
        <h2>Near By</h2>
      </div>

      <div className="nearby_body" style={{ padding: "20px" }}>
        {/* 3-Column Grid for Nearby Locations */}
        <div
          className="nearby_grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {NEARBY_FIELDS.map((item) => (
            <div key={item.id} className="nearby_item">
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "6px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                {item.label}
              </label>

              <div
                className="input_with_icon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #cce3f0",
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                }}
              >
                {/* Left Blue Icon Container */}
                <div
                  style={{
                    backgroundColor: "#0d47a1",
                    color: "#fff",
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "40px",
                  }}
                >
                  {item.icon}
                </div>

                <input
                  type="text"
                  name={item.id}
                  placeholder={item.placeholder}
                  value={formData.nearby?.[item.id] || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "10px",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="action_buttons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <button type="button" className="btn_prev_green" onClick={onPrev}>
            &larr; Previous
          </button>
          <button type="button" className="btn_next_blue" onClick={onNext}>
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepNearBy;