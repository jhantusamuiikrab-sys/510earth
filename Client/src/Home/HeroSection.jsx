import React, { useState } from 'react';
import '../assets/Font/NewHome/style.css'; 

const HeroSection = () => {
  // Tab Management State
  const [activeTab, setActiveTab] = useState('Residential');

  // Dropdown Visibility States
  const [showResBudget, setShowResBudget] = useState(false);

  // Form Field States
  const [residentialForm, setResidentialForm] = useState({
    location: '', projectType: '0', status: '', rooms: '', minPrice: '', maxPrice: ''
  });
  const [commercialForm, setCommercialForm] = useState({
    location: '', projectType: '0', status: '', minSqft: '', maxSqft: '', minPrice: '', maxPrice: ''
  });
  const [landForm, setLandForm] = useState({ location: '' });

  const handleSearchSubmit = (e, tabType) => {
    e.preventDefault();
    if (tabType === 'Residential') console.log('Residential Query:', residentialForm);
    if (tabType === 'Commercial') console.log('Commercial Query:', commercialForm);
    if (tabType === 'Land') console.log('Land Query:', landForm);
  };

  // Helper function to return colors based on active tab matching screenshot
  const getTabBgColor = (tab) => {
    if (activeTab !== tab) return 'transparent';
    return tab === 'Residential' ? '#007bff' : '#8cc63f';
  };

  return (
    /* CHANGE 1: Changed 'align-items-center' to 'align-items-end' to align content to the bottom */
    <section className="banner_area d-flex align-items-end justify-content-center" style={{ paddingBottom: '0px' }}>
      <div className="container">
        <div className="row justify-content-center">
          {/* CHANGE 2: Adjusted column widths (col-xl-10 col-lg-11) to perfectly align with the content in the original design layout */}
          <div className="col-xl-10 col-lg-11 position-relative" style={{ zIndex: 10, bottom: '50px' }}>
            
            {/* CHANGE 3: Removed 'maxWidth' and 'margin: 0 auto' to let the container expand to its natural grid bounds */}
            <div className="bg-white rounded-3 shadow border overflow-hidden">
              
              {/* Navigation Tabs Header - Zero padding matching screenshot layout */}
              <div className="d-flex border-bottom bg-light">
                {['Residential', 'Commercial', 'Land'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className="btn fw-bold text-uppercase border-0 transition-all text-center"
                    style={{
                      backgroundColor: getTabBgColor(tab),
                      color: activeTab === tab ? '#fff' : '#495057',
                      fontSize: '14px',
                      padding: '14px 30px',
                      borderRadius: '0px',
                      cursor: 'pointer'
                    }}
                  >
                    {tab === 'Land' ? 'Land / Plot' : tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Form Content Wrapper */}
              <div className="p-4 bg-white">
                <div className="tab-content" id="myTabContent">
                  
                  {/* RESIDENTIAL TAB */}
                  {activeTab === 'Residential' && (
                    <form onSubmit={(e) => handleSearchSubmit(e, 'Residential')}>
                      {/* Top Row: Search input field + Search Action Button */}
                      <div className="row g-2 mb-3">
                        <div className="col-md-9">
                          <input 
                            type="text" 
                            className="form-control form-control-lg border" 
                            style={{ fontSize: '15px', borderRadius: '4px', height: '50px' }}
                            placeholder="Enter an Property Name, City / Location, Neighborhood, Address or Pincode"
                            value={residentialForm.location}
                            onChange={(e) => setResidentialForm({...residentialForm, location: e.target.value})}
                          />
                        </div>
                        <div className="col-md-3">
                          <button 
                            type="submit" 
                            className="btn btn-primary btn-lg w-100 fw-bold border-0"
                            style={{ backgroundColor: '#007bff', height: '50px', borderRadius: '4px', fontSize: '16px' }}
                          >
                            Search
                          </button>
                        </div>
                      </div>

                      {/* Bottom Row: Secondary Dropdowns Filter Matrix */}
                      <div className="row g-2">
                        <div className="col-md-3">
                          <select 
                            className="form-select form-select-lg"
                            style={{ height: '45px', fontSize: '14px', color: '#495057' }}
                            value={residentialForm.projectType}
                            onChange={(e) => setResidentialForm({...residentialForm, projectType: e.target.value})}
                          >
                            <option value="0">Select Project Type</option>
                            <option value="1">Apartment</option>
                            <option value="2">Independent House / Villa</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <select 
                            className="form-select form-select-lg"
                            style={{ height: '45px', fontSize: '14px', color: '#495057' }}
                            value={residentialForm.status}
                            onChange={(e) => setResidentialForm({...residentialForm, status: e.target.value})}
                          >
                            <option value="">Select Project Status</option>
                            <option value="1">Under Construction</option>
                            <option value="2">Ready to move</option>
                            <option value="3">Resale</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <select 
                            className="form-select form-select-lg"
                            style={{ height: '45px', fontSize: '14px', color: '#495057' }}
                            value={residentialForm.rooms}
                            onChange={(e) => setResidentialForm({...residentialForm, rooms: e.target.value})}
                          >
                            <option value="">Select BHK</option>
                            <option value="1">1BHK</option>
                            <option value="2">2BHK</option>
                            <option value="3">3BHK</option>
                            <option value="4">4BHK</option>
                          </select>
                        </div>

                        {/* Budget Multi-Selection Custom Popover Dropdown */}
                        <div className="col-md-3 position-relative">
                          <div 
                            className="form-select form-select-lg bg-white text-muted cursor-pointer text-truncate d-flex align-items-center"
                            style={{ cursor: 'pointer', height: '45px', fontSize: '14px' }}
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
                                </div>
                                <div className="col-6">
                                  <input 
                                    type="text" placeholder="Max Price" className="form-control form-control-sm mb-2"
                                    value={residentialForm.maxPrice}
                                    onChange={(e) => setResidentialForm({...residentialForm, maxPrice: e.target.value})}
                                  />
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
                      <div className="row g-2 mb-3">
                        <div className="col-md-9">
                          <input 
                            type="text" className="form-control form-control-lg border" style={{ height: '50px', fontSize: '15px' }} placeholder="Enter City/Location"
                            value={commercialForm.location}
                            onChange={(e) => setCommercialForm({...commercialForm, location: e.target.value})}
                          />
                        </div>
                        <div className="col-md-3">
                          <button type="submit" className="btn btn-lg w-100 fw-bold text-white border-0" style={{ backgroundColor: '#8cc63f', height: '50px' }}>Search</button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* LAND / PLOT TAB */}
                  {activeTab === 'Land' && (
                    <form onSubmit={(e) => handleSearchSubmit(e, 'Land')}>
                      <div className="row g-2 mb-3">
                        <div className="col-md-9">
                          <input 
                            type="text" className="form-control form-control-lg border" style={{ height: '50px', fontSize: '15px' }} placeholder="Enter City/Location"
                            value={landForm.location}
                            onChange={(e) => setLandForm({ location: e.target.value })}
                          />
                        </div>
                        <div className="col-md-3">
                          <button type="submit" className="btn btn-lg w-100 fw-bold text-white border-0" style={{ backgroundColor: '#8cc63f', height: '50px' }}>Search</button>
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