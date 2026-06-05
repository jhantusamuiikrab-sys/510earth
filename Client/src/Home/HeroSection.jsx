import React, { useState } from 'react';
// Import your style sheet safely here
import '../assets/Font/NewHome/style.css'; 

const HeroSection = () => {
  // Tab Management State
  const [activeTab, setActiveTab] = useState('Residential');

  // Dropdown Visibility States
  const [showResBudget, setShowResBudget] = useState(false);
  const [showCmrSqft, setShowCmrSqft] = useState(false);
  const [showCmrBudget, setShowCmrBudget] = useState(false);

  // Form Field States
  const [residentialForm, setResidentialForm] = useState({
    location: '', projectType: '0', status: [], rooms: [], minPrice: '', maxPrice: ''
  });
  const [commercialForm, setCommercialForm] = useState({
    location: '', projectType: '0', status: [], minSqft: '', maxSqft: '', minPrice: '', maxPrice: ''
  });
  const [landForm, setLandForm] = useState({ location: '' });

  const handleSearchSubmit = (e, tabType) => {
    e.preventDefault();
    if (tabType === 'Residential') console.log('Residential Query:', residentialForm);
    if (tabType === 'Commercial') console.log('Commercial Query:', commercialForm);
    if (tabType === 'Land') console.log('Land Query:', landForm);
  };

  return (
    /* 1. Added inline background styling wrapper to structure the banner image.
         Replace 'YOUR_BANNER_IMAGE_URL' with your real asset path if your style.css doesn't handle it.
    */
    <section 
      className="main_banner_section position-relative d-flex align-items-center justify-content-center"
      style={{
        minHeight: '550px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '80px 0'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 position-relative" style={{ zIndex: 10 }}>
            
            {/* Search Box Wrapper matched to your exact screenshot styling */}
            <div className="bg-white p-0 rounded-3 shadow bnnr_frm_box overflow-hidden border">
              
              {/* Navigation Tabs Header */}
              <div className="p-3 bg-light border-bottom">
                <ul className="nav nav-pills gap-2" id="myTab" role="tablist">
                  {['Residential', 'Commercial', 'Land'].map((tab) => (
                    <li key={tab} className="nav-item" role="presentation">
                      <button
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`btn px-4 py-2 fw-bold text-uppercase border-0 rounded-1 transition-all ${
                          activeTab === tab 
                            ? 'btn-primary text-white' 
                            : 'btn-outline-secondary text-dark bg-white'
                        }`}
                        style={{
                          backgroundColor: activeTab === tab ? '#007bff' : '#fff',
                          color: activeTab === tab ? '#fff' : '#000',
                          fontSize: '14px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {tab === 'Land' ? 'Land / Plot' : tab}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dynamic Form Padding */}
              <div className="p-4 bg-white">
                <div className="tab-content" id="myTabContent">
                  
                  {/* RESIDENTIAL TAB */}
                  {activeTab === 'Residential' && (
                    <form onSubmit={(e) => handleSearchSubmit(e, 'Residential')}>
                      <div className="row g-3 align-items-center">
                        <div className="col-lg-9 form-group">
                          <input 
                            type="text" 
                            className="form-control form-control-lg border-2" 
                            style={{ fontSize: '15px' }}
                            placeholder="Enter an Property Name, City / Location, Neighborhood, Address or Pincode"
                            value={residentialForm.location}
                            onChange={(e) => setResidentialForm({...residentialForm, location: e.target.value})}
                          />
                        </div>
                        <div className="col-lg-3 form-group">
                          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">Search</button>
                        </div>

                        <div className="col-lg-3 form-group mt-3">
                          <select 
                            className="form-select"
                            value={residentialForm.projectType}
                            onChange={(e) => setResidentialForm({...residentialForm, projectType: e.target.value})}
                          >
                            <option value="0">Select Project Type</option>
                            <option value="1">Apartment</option>
                            <option value="2">Independent House / Villa</option>
                          </select>
                        </div>

                        <div className="col-lg-3 form-group mt-3">
                          <select className="form-select" onChange={(e) => setResidentialForm({...residentialForm, status: [e.target.value]})}>
                            <option value="">Select Project Status</option>
                            <option value="1">Under Construction</option>
                            <option value="2">Ready to move</option>
                            <option value="3">Resale</option>
                          </select>
                        </div>

                        <div className="col-lg-3 form-group mt-3">
                          <select className="form-select" onChange={(e) => setResidentialForm({...residentialForm, rooms: [e.target.value]})}>
                            <option value="">Select BHK</option>
                            <option value="1">1BHK</option>
                            <option value="2">2BHK</option>
                            <option value="3">3BHK</option>
                            <option value="4">4BHK</option>
                          </select>
                        </div>

                        {/* Budget Dropdown Dropdown context */}
                        <div className="col-lg-3 form-group mt-3 position-relative">
                          <div 
                            className="form-select bg-white text-muted cursor-pointer text-truncate"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowResBudget(!showResBudget)}
                          >
                            {residentialForm.minPrice || residentialForm.maxPrice 
                              ? `₹${residentialForm.minPrice || '0'} - ₹${residentialForm.maxPrice || 'Max'}`
                              : "Budget"}
                          </div>
                          
                          {showResBudget && (
                            <div className="position-absolute bg-white border rounded shadow p-3 w-100 mt-1" style={{ zIndex: 1050, left: 0 }}>
                              <div className="row g-2">
                                <div className="col-6">
                                  <input 
                                    type="text" placeholder="Min Price" className="form-control form-control-sm mb-2"
                                    value={residentialForm.minPrice}
                                    onChange={(e) => setResidentialForm({...residentialForm, minPrice: e.target.value})}
                                  />
                                  <div className="overflow-auto" style={{ maxHeight: '120px', fontSize: '12px' }}>
                                    <div className="p-1 btn-light text-start" style={{ cursor: 'pointer' }} onClick={() => setResidentialForm({...residentialForm, minPrice: '500000'})}>₹5 Lac</div>
                                    <div className="p-1 btn-light text-start" style={{ cursor: 'pointer' }} onClick={() => setResidentialForm({...residentialForm, minPrice: '1000000'})}>₹10 Lac</div>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <input 
                                    type="text" placeholder="Max Price" className="form-control form-control-sm mb-2"
                                    value={residentialForm.maxPrice}
                                    onChange={(e) => setResidentialForm({...residentialForm, maxPrice: e.target.value})}
                                  />
                                  <div className="overflow-auto" style={{ maxHeight: '120px', fontSize: '12px' }}>
                                    <div className="p-1 btn-light text-start" style={{ cursor: 'pointer' }} onClick={() => setResidentialForm({...residentialForm, maxPrice: '500000'})}>₹5 Lac</div>
                                    <div className="p-1 btn-light text-start" style={{ cursor: 'pointer' }} onClick={() => { setResidentialForm({...residentialForm, maxPrice: '1000000'}); setShowResBudget(false); }}>₹10 Lac</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  )}

                  {/* COMMERCIAL TAB */}
                  {activeTab === 'Commercial' && (
                    <form onSubmit={(e) => handleSearchSubmit(e, 'Commercial')}>
                      <div className="row g-3 align-items-center">
                        <div className="col-lg-9 form-group">
                          <input 
                            type="text" className="form-control form-control-lg border-2" placeholder="Enter City/Location"
                            value={commercialForm.location}
                            onChange={(e) => setCommercialForm({...commercialForm, location: e.target.value})}
                          />
                        </div>
                        <div className="col-lg-3 form-group">
                          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Search</button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* LAND / PLOT TAB */}
                  {activeTab === 'Land' && (
                    <form onSubmit={(e) => handleSearchSubmit(e, 'Land')}>
                      <div className="row g-3 align-items-center">
                        <div className="col-lg-9 form-group">
                          <input 
                            type="text" className="form-control form-control-lg border-2" placeholder="Enter City/Location"
                            value={landForm.location}
                            onChange={(e) => setLandForm({ location: e.target.value })}
                          />
                        </div>
                        <div className="col-lg-3 form-group">
                          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold">Search</button>
                        </div>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;