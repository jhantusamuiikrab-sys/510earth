import React, { useState } from "react";

const StepKeyFeatures = ({ formData, setFormData, onNext, onPrev }) => {
  const [images, setImages] = useState(formData.images || []);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];

    if (newImages.length > 16) {
      setError("Maximum 16 images allowed.");
      return;
    }

    setError("");
    setImages(newImages);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleRemoveImage = () => {
    setImages([]);
    setFormData((prev) => ({ ...prev, images: [] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 4) {
      setError("Please upload at least 4 images (Min-4, Max-16).");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="key_features_card">
      {/* Header 1 */}
      <div className="blue_header_banner" style={{ textAlign: "center" }}>
        <h2>Key Features</h2>
      </div>

      <div className="card_body" style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          {/* Enter Caption */}
          <div className="form_group" style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Enter Caption
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
              <div
                style={{
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                💬
              </div>
              <input
                type="text"
                name="caption"
                placeholder="Enter Caption"
                value={formData.caption || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "10px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Enter Property Overview */}
          <div className="form_group" style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Enter Property Overview
            </label>
            <div
              className="input_with_icon"
              style={{
                display: "flex",
                alignItems: "stretch",
                border: "1px solid #cce3f0",
                borderRadius: "6px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                ☰
              </div>
              <textarea
                name="propertyOverview"
                placeholder="Enter Property Overview"
                rows="4"
                value={formData.propertyOverview || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  padding: "10px",
                  fontSize: "14px",
                  resize: "vertical",
                  minHeight: "100px",
                }}
              ></textarea>
            </div>
          </div>

          {/* Header 2 */}
          <div className="blue_header_banner" style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2>Property Images Upload</h2>
          </div>

          {/* Image Upload Box */}
          <div
            className="upload_box_wrapper"
            style={{
              border: "1px solid #cce3f0",
              borderRadius: "8px",
              padding: "30px",
              marginBottom: "20px",
              backgroundColor: "#f9fdff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>

              <label
                htmlFor="image_upload"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "24px", color: "#0d47a1" }}>📤</span>
                <div>
                  <div>Upload images :</div>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>Min-4, Max-16</div>
                </div>
              </label>
              <input
                type="file"
                id="image_upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>

            {images.length > 0 && (
              <p style={{ textAlign: "center", marginTop: "12px", color: "#28a745", fontWeight: "bold" }}>
                {images.length} image(s) selected
              </p>
            )}
          </div>

          {error && (
            <div style={{ color: "red", textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="action_buttons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <button type="button" className="btn_prev_green" onClick={onPrev}>
              &larr; Previous
            </button>
            <button type="submit" className="btn_next_blue">
              Next &rarr;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepKeyFeatures;