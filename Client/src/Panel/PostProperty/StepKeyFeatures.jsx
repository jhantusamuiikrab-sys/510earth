import React, { useState, useEffect } from "react";

const StepKeyFeatures = ({ formData, setFormData, onNext, onPrev }) => {
  const [images, setImages] = useState(formData.images || []);
  const [listingImageIndex, setListingImageIndex] = useState(
    formData.listingImageIndex !== undefined ? formData.listingImageIndex : null
  );
  const [coverImageIndex, setCoverImageIndex] = useState(
    formData.coverImageIndex !== undefined ? formData.coverImageIndex : null
  );
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState("");

  // Generate object URLs for image previews whenever images change
  useEffect(() => {
    const urls = images.map((file) =>
      typeof file === "string" ? file : URL.createObjectURL(file)
    );
    setPreviewUrls(urls);

    // Clean up memory leaks when component unmounts or images change
    return () => {
      urls.forEach((url) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

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
    setListingImageIndex(null);
    setCoverImageIndex(null);
    setFormData((prev) => ({
      ...prev,
      images: [],
      listingImageIndex: null,
      coverImageIndex: null,
    }));
  };

  // Toggle selection for Listing Image
  const handleListingSelect = (index) => {
    const newIndex = listingImageIndex === index ? null : index;
    setListingImageIndex(newIndex);
    setFormData((prev) => ({ ...prev, listingImageIndex: newIndex }));
  };

  // Toggle selection for Cover Image
  const handleCoverSelect = (index) => {
    const newIndex = coverImageIndex === index ? null : index;
    setCoverImageIndex(newIndex);
    setFormData((prev) => ({ ...prev, coverImageIndex: newIndex }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 4) {
      setError("Please upload at least 4 images (Min-4, Max-16).");
      return;
    }
    if (listingImageIndex === null) {
      setError("Please select any one image as your Listing Image.");
      return;
    }
    if (coverImageIndex === null) {
      setError("Please select any one image as your Cover Image.");
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

          {/* Dynamic Image Selections */}
          {previewUrls.length > 0 && (
            <div style={{ marginTop: "30px" }}>
              {/* Listing Image Section */}
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
                  Select Any One As Listing Image
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {previewUrls.map((url, index) => (
                    <div
                      key={`listing-${index}`}
                      onClick={() => handleListingSelect(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: listingImageIndex === index ? "#d1e7dd" : "#eee",
                        border: listingImageIndex === index ? "2px solid #0f5132" : "2px solid transparent",
                        padding: "8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <input
                        type="radio"
                        name="listingImage"
                        checked={listingImageIndex === index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListingSelect(index);
                        }}
                        onChange={() => {}}
                        style={{ marginTop: "10px", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Image Section */}
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>
                  Select Any One As Cover Image
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {previewUrls.map((url, index) => (
                    <div
                      key={`cover-${index}`}
                      onClick={() => handleCoverSelect(index)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: coverImageIndex === index ? "#d1e7dd" : "#eee",
                        border: coverImageIndex === index ? "2px solid #0f5132" : "2px solid transparent",
                        padding: "8px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <input
                        type="radio"
                        name="coverImage"
                        checked={coverImageIndex === index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCoverSelect(index);
                        }}
                        onChange={() => {}}
                        style={{ marginTop: "10px", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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