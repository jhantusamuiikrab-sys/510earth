import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import CommercialFloorPlan from "./ResidentialDetails/CommercialFloorPlan";
import FloorPlans from "./ResidentialDetails/FloorPlans";
import LocationAdvantage from "./ResidentialDetails/LocationAdvantage";
import LocationMap from "./ResidentialDetails/LocationMap";
import PropertyDetails from "./ResidentialDetails/PropertyDetails";
import PropertyHero from "./ResidentialDetails/PropertyHero";
import PropertyPrice from "./ResidentialDetails/PropertyPrice";
import PropertyOverview from "./ResidentialDetails/PropertyOverview";
import Amenities from "./ResidentialDetails/Amenities";
import PropertyGallery from "./ResidentialDetails/PropertyGallery";
import ResidentialProperties from "./ResidentialDetails/ResidentialProperties";
import SitePlan from "./ResidentialDetails/SitePlan";
import Video from "./ResidentialDetails/Video";

const ResidentialDetails = () => {

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
  
  const property = {
    title: "Beautiful 3 BHK Residential Apartment",
    propertyType: "Apartment",
    status: "For Sale",
    location: "New Town, Kolkata, West Bengal",
    price: 7500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    areaUnit: "sq.ft",
    image: "/images/property.jpg",
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
    <div className="residential-details">

        {/* Floating Widget - Enquire Now Form */}
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

      <PropertyHero property={property} />
      <PropertyPrice property={property} />
      <PropertyOverview property={property} />
      <Amenities property={property} />
      <PropertyGallery property={property} />
      <Video property={property} />
      <PropertyDetails/>
      <CommercialFloorPlan/>
      <FloorPlans/>
      <SitePlan/>
      <LocationMap/>
      <LocationAdvantage/>
      <ResidentialProperties/>
      
      
      

    </div>
  );
};

export default ResidentialDetails;