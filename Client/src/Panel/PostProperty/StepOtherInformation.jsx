import React from "react";

const StepOtherInformation = ({ formData, setFormData, onSubmit, onPrev }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      otherInfo: {
        ...(prev.otherInfo || {}),
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="other_info_card">
      {/* Header Banner */}
      <div className="blue_header_banner" style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Other Information</h2>
      </div>

      <div className="card_body" style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          
          {/* Property Address */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Property Address</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">📍</div>
              <input
                type="text"
                name="propertyAddress"
                placeholder="Property Address"
                value={formData.otherInfo?.propertyAddress || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Number of Towers */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Number of Towers</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">📍</div>
              <input
                type="text"
                name="numberOfTowers"
                placeholder="Number of Towers"
                value={formData.otherInfo?.numberOfTowers || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Open Space */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Open Space</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <input
                type="text"
                name="openSpace"
                placeholder="Open Space"
                value={formData.otherInfo?.openSpace || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Project Size */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Project Size</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <input
                type="text"
                name="projectSize"
                placeholder="Project Size"
                value={formData.otherInfo?.projectSize || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Property Age */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Property Age</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">➕</div>
              <select
                name="propertyAge"
                value={formData.otherInfo?.propertyAge || ""}
                onChange={handleChange}
              >
                <option value="">--Select Property Age--</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-5 Years">1-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
          </div>

          {/* Wash Room Type */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Wash Room Type</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="washRoomType"
                value={formData.otherInfo?.washRoomType || ""}
                onChange={handleChange}
              >
                <option value="">--Select Wash Room Type--</option>
                <option value="Private">Private</option>
                <option value="Shared">Shared</option>
              </select>
            </div>
          </div>

          {/* Wash Room */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Wash Room</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="washRoom"
                value={formData.otherInfo?.washRoom || ""}
                onChange={handleChange}
              >
                <option value="">--Select Washroom--</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>

          {/* No Of Meeting Room */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>No Of Meeting Room</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="noOfMeetingRoom"
                value={formData.otherInfo?.noOfMeetingRoom || ""}
                onChange={handleChange}
              >
                <option value="">--Select No Of Meeting Room--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>

          {/* Conference Room */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Conference Room</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="conferenceRoom"
                value={formData.otherInfo?.conferenceRoom || ""}
                onChange={handleChange}
              >
                <option value="">--Select Conference Room--</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>

          {/* Reception Area */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Reception Area</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="receptionArea"
                value={formData.otherInfo?.receptionArea || ""}
                onChange={handleChange}
              >
                <option value="">--Select Reception Area--</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>

          {/* No Of Cabin */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>No Of Cabin</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="noOfCabin"
                value={formData.otherInfo?.noOfCabin || ""}
                onChange={handleChange}
              >
                <option value="">--Select No Of Cabin--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>

          {/* Min No Of Seat */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Min No Of Seat</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <input
                type="text"
                name="minNoOfSeat"
                placeholder="Min No Of Seat"
                value={formData.otherInfo?.minNoOfSeat || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Max No Of Seat */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Max No Of Seat</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <input
                type="text"
                name="maxNoOfSeat"
                placeholder="Max No Of Seat"
                value={formData.otherInfo?.maxNoOfSeat || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Pantry Type */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Pantry Type</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="pantryType"
                value={formData.otherInfo?.pantryType || ""}
                onChange={handleChange}
              >
                <option value="">--Select Pantry Type--</option>
                <option value="Dry">Dry</option>
                <option value="Wet">Wet</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>

          {/* Furnished Type */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Furnished Type</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">♻️</div>
              <select
                name="furnishedType"
                value={formData.otherInfo?.furnishedType || ""}
                onChange={handleChange}
              >
                <option value="">--Select Furnished Type--</option>
                <option value="Furnished">Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
              </select>
            </div>
          </div>

          {/* Total No Of Floor in Building */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Total No Of Floor in Building</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <input
                type="text"
                name="totalNoOfFloor"
                placeholder="Total No Of Floor in Building"
                value={formData.otherInfo?.totalNoOfFloor || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Your Floor No */}
          <div className="form_group" style={{ marginBottom: "16px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Your Floor No</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">🏠</div>
              <input
                type="text"
                name="yourFloorNo"
                placeholder="Your Floor No"
                value={formData.otherInfo?.yourFloorNo || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Ownership */}
          <div className="form_group" style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "6px" }}>Ownership</label>
            <div className="input_with_icon_wrapper">
              <div className="input_blue_icon">👤</div>
              <select
                name="ownership"
                value={formData.otherInfo?.ownership || ""}
                onChange={handleChange}
              >
                <option value="">--Select Ownership--</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
                <option value="Co-operative society">Co-operative society</option>
                <option value="Power of Attorney">Power of Attorney</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action_buttons" style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
            <button type="button" className="btn_prev_green" onClick={onPrev}>
              &larr; Previous
            </button>
            <button type="submit" className="btn_next_blue">
              Submit
            </button>
          </div>

        </form>
      </div>

      {/* Scoped CSS styling for input with left icon */}
      <style>{`
        .input_with_icon_wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #cce3f0;
          border-radius: 6px;
          overflow: hidden;
          background-color: #fff;
        }
        .input_blue_icon {
          background-color: #0d47a1;
          color: #fff;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 42px;
        }
        .input_with_icon_wrapper input,
        .input_with_icon_wrapper select {
          width: 100%;
          border: none;
          outline: none;
          padding: 10px 12px;
          font-size: 14px;
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default StepOtherInformation;