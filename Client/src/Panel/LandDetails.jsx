
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


import LandCoverBanner from "./LandDetails/LandCoverBanner";
import LandVideo from "./LandDetails/LandVideo";
import LandAbout from "./LandDetails/LandAbout";
import LandMasterPlan from "./LandDetails/LandMasterPlan";
import LandElevation from "./LandDetails/LandElevation";
import LandFloorPlans from "./LandDetails/LandFloorPlans";
import LandAmenities from "./LandDetails/LandAmenities";
import LandNearby from "./LandDetails/LandNearby";
import dummyLandData from "./LandDetails/dummyLandData";


const LandDetails = () => {
  const property = dummyLandData;
  const [sidebarActive, setSidebarActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

       const [enquiry, setEnquiry] = useState({
      customerName: '',
      email: '',
      country: '+91',
      isdCode: '91',
      contactNumber: '',
      message: '',
      propertyId: 0,
      propertyName: 'Land 510earth'
    });

     const handleMobileBlur = async () => {
    const { isdCode, contactNumber } = enquiry;
    if (!contactNumber) return alert('Please Enter Mobile Number.');

    if (isdCode === '91') {
      if (contactNumber.length !== 10) {
        return alert('The phone number is the wrong length. \nPlease enter 10 digit mobile no.');
      }
      if (!['6', '7', '8', '9'].includes(contactNumber.charAt(0))) {
        return alert('Mobile No. should start with 9, 8, 7 or 6');
      }
      if (isNaN(contactNumber) || contactNumber.includes(' ')) {
        return alert('Invalid Mobile No.');
      }
    }

    try {
      const res = await axios.post('/api/home/lead-mobile-check', { contactNumber });
      if (!res.data.success) {
        alert('Contact Number already exists');
        setEnquiry(prev => ({ ...prev, contactNumber: '' }));
      }
    } catch (err) {
      console.error('Error verifying phone number:', err);
    }
  };

   const sendEnquiry = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true);

    try {
      await axios.post('/api/home/enquiry', enquiry);
      alert('Enquiry submitted successfully!');
      setEnquiry({
        customerName: '',
        email: '',
        country: '+91',
        isdCode: '91',
        contactNumber: '',
        message: '',
        propertyId: 0,
        propertyName: 'Land 510earth'
      });
      setSidebarActive(false);
    } catch (err) {
      alert('Submission failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

    <div className={`sidebar-contact ${sidebarActive ? 'active' : ''}`}>
            <div className={`toggle ${sidebarActive ? 'active' : ''}`} onClick={() => setSidebarActive(!sidebarActive)}>
              <span>ENQUIRE NOW </span>
            </div>
            <h4>Interested in enquiring about Lands?</h4>
            <div className="scroll">
              <form onSubmit={sendEnquiry}>
                <label>Name <span>*</span></label>
                <input 
                  className="form-control mb-2" 
                  type="text" 
                  placeholder="Full name"
                  value={enquiry.customerName}
                  onChange={(e) => setEnquiry({...enquiry, customerName: e.target.value})}
                  required 
                />

                <label>Email Address</label>
                <input 
                  className="form-control mb-2" 
                  type="email" 
                  placeholder="Email Id"
                  value={enquiry.email}
                  onChange={(e) => setEnquiry({...enquiry, email: e.target.value})}
                />

                <label>Country</label>
                <input className="form-control mb-2" type="tel" value={enquiry.country} readOnly style={{ cursor: 'default' }} />

                <label>Phone No <span>*</span></label>
                <div className="input-group mb-2">
                  <input className="form-control col-3" type="text" value={enquiry.country} readOnly />
                  <input 
                    className="form-control" 
                    type="text" 
                    maxLength="10" 
                    placeholder="Phone No"
                    value={enquiry.contactNumber}
                    onChange={(e) => setEnquiry({...enquiry, contactNumber: e.target.value})}
                    onBlur={handleMobileBlur}
                    required 
                  />
                </div>

                <label>Message <span>*</span></label>
                <textarea 
                  className="form-control mb-3" 
                  rows="2" 
                  placeholder="Message..."
                  value={enquiry.message}
                  onChange={(e) => setEnquiry({...enquiry, message: e.target.value})}
                  required
                ></textarea>

                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>
      {/* Land Cover Banner */}
      <LandCoverBanner
        LandcvrimgBnr={property.LandcvrimgBnr}
      />
        {/* Land Video Section */}
        <LandVideo
          VideoThumbnailImage={property.VideoThumbnailImage}
          YouTubeLink={property.YouTubeLink}
          LandVTImgAltTxt={property.LandVTImgAltTxt}
          LandVTImgTitle={property.LandVTImgTitle}
          LPVDTempModel={property.LPVDTempModel}
        />

        {/* Land About Section */}
        <LandAbout
          Aboutlst={property.Aboutlst}
          LpABTempModel={property.LpABTempModel}
          LandAPImgAltTxt={property.LandAPImgAltTxt}
          LandAPImgTitle={property.LandAPImgTitle}
        />

        <LandMasterPlan
        MasterPlanImage={property.MasterPlanImage}
        LandMPImgAltTxt={property.LandMPImgAltTxt}
        LandMPImgTitle={property.LandMPImgTitle}
        LpMSTempModel={property.LpMSTempModel}
      />

      <LandElevation
        LOETempModel={property.LOETempModel}
        LpABTempModel={property.LpABTempModel}
      />

      <LandFloorPlans
        LfpTempModel={property.LfpTempModel}
        LpABTempModel={property.LpABTempModel}
      />
      <LandAmenities
        amineties={property.amineties}
      />
        <LandNearby
        nearbies={property.nearbies}
        mapimageTitle={property.mapimageTitle}
      />

    </>
  );
};

export default LandDetails;