import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LandListing = () => {
  // -----------------------------------------
  // 1. STATE INITIALIZATION
  // -----------------------------------------
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

  const [searchLocation, setSearchLocation] = useState('');
  const [mapData, setMapData] = useState({ city: '', lat: '', lon: '' });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const autocompleteRef = useRef(null);

  // -----------------------------------------
  // 2. EFFECTS & LIFECYCLE
  // -----------------------------------------
  useEffect(() => {
    fetchInitialProperties();
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { componentRestrictions: { country: 'in' } }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const baseLocation = autocompleteRef.current.value.split(',')[0];
        setSearchLocation(baseLocation);

        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const comps = results[0].address_components;
            const city = comps[comps.length - 4]?.long_name || '';
            setMapData({ city, lat: latitude, lon: longitude });
          }
        });
      });
    }

    const handlePaste = (e) => e.preventDefault();
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => input.addEventListener('paste', handlePaste));

    return () => {
      inputs.forEach(input => input.removeEventListener('paste', handlePaste));
    };
  }, []);

  // -----------------------------------------
  // 3. API & LOGIC HANDLERS
  // -----------------------------------------
  const fetchInitialProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/home/filtered-city-list', {});
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error('Error fetching initial properties:', err);
      // Fallback matching your exact layout data if API fails to load locally
      setProperties([
        {
          _id: '1',
          propertyName: 'Paradise',
          locationName: 'NEWTOWN ACTION AREA 3',
          minPrice: 2850000,
          maxPrice: 3800000,
          sizeOptions: ['1.5 Kottah', '2 Kottah'],
          propertyType: 'Residential',
          imageUrl: '' 
        },
        {
          _id: '2',
          propertyName: 'New Royal Enclave',
          locationName: 'NEWTOWN ACTION AREA III',
          minPrice: 2500000,
          maxPrice: null,
          sizeOptions: ['500 sq.ft'],
          propertyType: 'Residential',
          imageUrl: ''
        },
        
      ]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearch = async () => {
    if (!searchLocation) return;
    try {
      setLoading(true);
      const res = await axios.post('/api/home/filtered-city-list', {
        city: searchLocation,
        mapCity: mapData.city,
        latitude: mapData.lat,
        longitude: mapData.lon
      });
      setProperties(res.data.properties || []);
      setHasSearched(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Search execution failed');
    } finally {
      setLoading(false);
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

  // -----------------------------------------
  // 4. UI RENDER EXPRESSION
  // -----------------------------------------
  return (
    <section className="featured_panel mrgn_tp" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="land_bg">
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Main Display Heading */}
          <h1 className="mb-4 text-center mt-5" style={{ fontWeight: '400', fontSize: '2.5rem', color: '#555', fontFamily: 'sans-serif' }}>
            Listing of <span style={{ color: '#555' }}>Land and Plot Properties</span>
          </h1>

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

          {/* Global Search Core Bar */}
          <div className="row justify-content-center mb-5 mt-4">
            <div className="col-md-7">
              <div className="p-1 bg-white rounded-0 border d-flex align-items-center" style={{ boxShadow: '0px 2px 5px rgba(0,0,0,0.05)' }}>
                <input 
                  ref={autocompleteRef}
                  type="text" 
                  className="form-control border-0 rounded-0 flex-grow-1" 
                  placeholder="Enter City / Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  style={{ boxShadow: 'none', fontSize: '0.95rem', height: '42px' }}
                />
                <button type="button" onClick={handleSearch} className="btn btn-primary rounded-0 px-4 font-weight-normal" style={{ height: '42px', backgroundColor: '#007bff', border: 'none', fontSize: '0.95rem' }}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Feed Heading Result Meta Counter */}
          {hasSearched && (
            <div className="row mb-4">
              <div className="col-12">
                <h3 className="text-secondary" style={{ fontSize: '1.2rem' }}>
                  <span>{properties.length}</span> Properties Found | Land Property
                </h3>
              </div>
            </div>
          )}

          {/* Three-Column Portrait Grid matching image_d25a41.jpg */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status"></div>
              <h4 className="mt-3 text-muted" style={{ fontWeight: '300' }}>Loading properties...</h4>
            </div>
          ) : (
            <div className="row justify-content-start" id="divPartial">
              {properties.map((prop) => (
                <div key={prop._id} className="col-lg-4 col-md-6 mb-5">
                  <div className="d-flex flex-column h-100 style-card-wrapper" style={{ boxShadow: '0px 15px 30px rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden', background: '#fff' }}>
                    
                    {/* 1. Tall Portrait Image Container Frame */}
                    <div className="position-relative" style={{ height: '410px', backgroundColor: '#f5f5f5' }}>
                      <img 
                        src={prop.imageUrl || "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80"} 
                        alt={prop.propertyName} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover' }}
                      />
                      {/* Dark gradient overlay bottom matching reference photo */}
                      <div className="position-absolute w-100 p-3 text-white d-flex flex-column justify-content-end" style={{ bottom: 0, left: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
                        <h3 className="mb-2 text-white" style={{ fontSize: '1.4rem', fontWeight: '400', letterSpacing: '0.5px' }}>
                          {prop.propertyName}
                        </h3>
                        <p className="small mb-1 text-truncate font-weight-normal text-white d-flex align-items-center" style={{ opacity: 0.9, fontSize: '0.82rem', letterSpacing: '0.5px' }}>
                          <i className="fas fa-map-marker-alt mr-2" style={{ color: '#ff3b30' }}></i> 
                          {prop.locationName || prop.city || 'LOCATION NOT SPECIFIED'}
                        </p>
                      </div>
                    </div>

                    {/* 2. Flat Meta Info Box Frame */}
                    <div className="p-3 bg-white d-flex flex-column justify-content-between flex-grow-1" style={{ minHeight: '120px' }}>
                      <div className="d-flex justify-content-between align-items-start w-100">
                        
                        {/* Left Side: Prices & Property Category Type */}
                        <div>
                          <div className="text-success font-weight-normal mb-1" style={{ fontSize: '1.05rem', color: '#4caf50' }}>
                            ₹ {prop.minPrice ? prop.minPrice.toLocaleString('en-IN') : 'N/A'}
                          </div>
                          {prop.maxPrice && (
                            <div className="text-success font-weight-normal mb-1" style={{ fontSize: '1.05rem', color: '#4caf50' }}>
                              ₹ {prop.maxPrice.toLocaleString('en-IN')}
                            </div>
                          )}
                          <div className="text-success font-weight-normal mt-2" style={{ fontSize: '0.9rem', color: '#4caf50' }}>
                            {prop.propertyType || 'Residential'}
                          </div>
                        </div>

                        {/* Right Side: Configuration Options & View Details Button */}
                        <div className="text-right d-flex flex-column align-items-end justify-content-between h-100" style={{ minHeight: '85px' }}>
                          <div className="mb-2">
                            {prop.sizeOptions && prop.sizeOptions.map((size, idx) => (
                              <div key={idx} className="text-success font-weight-normal mb-1" style={{ fontSize: '0.9rem', color: '#4caf50' }}>
                                {size}
                              </div>
                            ))}
                          </div>
                          
                          <button className="btn btn-primary rounded-0 font-weight-normal text-center px-3" style={{ fontSize: '0.8rem', backgroundColor: '#007bff', borderColor: '#007bff', padding: '6px 12px', height: '34px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                            View Details
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default LandListing;