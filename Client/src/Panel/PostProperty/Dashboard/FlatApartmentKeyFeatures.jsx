import React, { useState } from 'react';
import styles from '../../../assets/paneldesign/css/FlatApartmentKeyFeatures.module.css';
const FlatApartmentKeyFeatures = ({ onNextStep, onPrevStep }) => {
  const [caption, setCaption] = useState('');
  const [overview, setOverview] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 16) {
      setErrorMessage('Maximum 16 images allowed.');
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
    setErrorMessage('');
  };

  const handleRemoveImages = () => {
    setImages([]);
  };

  const wordCount = overview.trim() ? overview.trim().split(/\s+/).length : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 4) {
      setErrorMessage('Please upload min 4 files for image.');
      return;
    }

    const payload = {
      caption,
      overview,
      images,
    };
    if (onNextStep) onNextStep(payload);
  };

  return (
    <div className={styles.container}>
      {/* 4-Step Progress Indicator */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepLine}></div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>1</div>
          <span className={styles.stepLabel}>Basic Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>2</div>
          <span className={styles.stepLabel}>Key Features</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={styles.stepNumber}>3</div>
          <span className={styles.stepLabel}>Property Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={styles.stepNumber}>4</div>
          <span className={styles.stepLabel}>Other Information</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className={styles.card}>
        <div className={styles.titleHeader}>
          <h2 className={styles.mainTitle}>FLAT / APARTMENT</h2>
          <p className={styles.subTitle}>Key Features</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formSection}>
          {/* Caption Input */}
          <input
            type="text"
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={styles.captionInput}
          />

          {/* Rich Text Editor Component */}
          <div className={styles.editorWrapper}>
            <div className={styles.editorToolbar}>
              <button type="button" className={styles.toolbarBtn}>↺</button>
              <button type="button" className={styles.toolbarBtn}>↻</button>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <button type="button" className={styles.toolbarBtn}><b>B</b></button>
              <button type="button" className={styles.toolbarBtn}><i>I</i></button>
              <button type="button" className={styles.toolbarBtn}><u>U</u></button>
              <button type="button" className={styles.toolbarBtn}><s>S</s></button>
              <span style={{ color: '#cbd5e1' }}>|</span>
              <select className={styles.editorSelect}>
                <option>Book Antiqua</option>
                <option>Arial</option>
              </select>
              <select className={styles.editorSelect}>
                <option>14px</option>
                <option>16px</option>
              </select>
              <select className={styles.editorSelect}>
                <option>Paragraph</option>
                <option>Heading 1</option>
              </select>
            </div>

            <textarea
              placeholder="Enter Property Overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className={styles.editorTextArea}
            />

            <div className={styles.editorFooter}>
              <span>P » EM » SPAN</span>
              <span>{wordCount} WORDS POWERED BY TINY</span>
            </div>
          </div>

          {/* Property Images Section */}
          <div className={styles.imageUploadSection}>
            <label className={styles.sectionLabel}>Property Images</label>

            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>

            <div className={styles.imageValidationRow}>
              <span className={styles.warningText}>
                Please upload min 4 files for image. ({images.length} selected)
              </span>
              {images.length > 0 && (
                <button
                  type="button"
                  onClick={handleRemoveImages}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              )}
            </div>

            <span className={styles.errorText}>Upload images : Min-4, Max-16</span>
            {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
          </div>

          {/* Action Buttons */}
          <div className={styles.buttonGroup}>
            <button type="button" onClick={onPrevStep} className={styles.prevBtn}>
              Previous
            </button>
            <button type="submit" className={styles.nextBtn}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatApartmentKeyFeatures;