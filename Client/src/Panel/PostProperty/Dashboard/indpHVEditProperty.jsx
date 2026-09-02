import React, { useState } from 'react';

const IndpHVEditProperty = () => {
  const [formData, setFormData] = useState({
    state: 'WEST BENGAL',
    city: 'Behala',
    googleLocation: 'Emami Aastha',
    propertyName: 'Emami Aastha',
    projectStatus: 'Ready to Move',
    ticketSize: '40000000',
    negotiable: true,
    plotArea: '10',
    areaUnit: 'Katha',
    totalPrice: '40000000',
    builtUpArea: '30',
    carpetArea: '15',
    bedRooms: '4',
    bathRooms: '2',
    balcony: '2',
    furnishedType: 'Furnished',
    totalFloors: '11',
    flooringType: 'Marble',
    otherRooms: {
      servantRoom: false,
      pujaRoom: false,
      studyRoom: false,
      storeRoom: false,
    },
    parkingType: {
      open: false,
      covered: true,
      mechanical: false,
    },
    coveredParkingCount: '1',
    caption: '',
    overview: '',
    amenities: {
      lift: false,
      firefighting: true,
      gymnasium: true,
      gatedAccess: true,
      pedestrianFriendly: false,
      powerBackup: true,
      multipurposeCourts: true,
      park: true,
      vaastuCompliant: false,
      maintenanceStaff: true,
      healthClub: true,
      noOfLift: false,
      picnicLawn: false,
      theatre: false,
      organicFarm: false,
      solarWaterPanel: false,
      temple: false,
      miniTheatre: false,
      fishingPond: false,
      amphitheatre: false,
      waterSupply: true,
      childrenPlayArea: true,
      intercom: true,
      swimmingPool: true,
      gameRoom: true,
      multipurposeHall: true,
      security: true,
      visitorParking: true,
      aerobicsRoom: true,
      cctvCamera: true,
      coffeeLounge: true,
      forestTrails: false,
      seniorCitizenZone: false,
      hangingPool: false,
      meditationLawn: false,
      solarHotWater: false,
      coveredFountain: false,
      library: false,
      commercialZone: false,
      carParking: true,
      patioBalcony: true,
      clubHouse: true,
      petFriendly: false,
      privateSpa: true,
      cyclingTrack: true,
      flowerGardens: true,
      rainWaterHarvesting: true,
      earthquakeResistance: true,
      golfCourse: false,
      wifiCommonArea: false,
      indoorBadminton: false,
      tennisCourts: false,
      basketBall: false,
      cricketPitch: false,
      fitnessActivityWall: false,
      badminton: false,
      squashCourt: false,
      meetingEventZone: false,
    },
    nearby: {
      airport: 'NETAJI SUBHAS CHANDRA BOSE INTERNATIONAL AIRPORT',
      bank: 'STATE BANK ATM : 1.4KM',
      busStop: 'SHREE SWAMI NARAYAN MANDIR : 2KM',
      college: 'ASUTOSH COLLEGE SECOND CAMPUS : 2.4KM',
      hospital: 'SAMALI HOSPITAL : 3.3KM',
      kindergarten: 'HELLO KIDZ ALPHABETS : 8.7KM',
      landMark: 'SHREE SWAMI NARAYAN MANDIR : 2KM',
      mall: 'ENVISION MALL : 12.2KM',
      market: 'KHORIBERIA MARKET : 2.5KM',
      metro: 'JOKA METRO : 6.6KM',
      nearByCircle: 'BISWA BANGLA GATE : 34.6KM',
      publicPark: 'MOON CITY : 3.7KM',
      railwayStation: 'MAJERHAT STATION : 14.5KM',
      school: 'UTTAR KAJIR HAT PRIMARY SCHOOL : 1.4KM',
      techPark: 'P.S SRIJAN : 31.6KM',
      temple: 'SHIV TEMPLE : 1.4KM',
      university: 'TECHNO INDIA UNIVERSITY (JOKA CAMPUS) : 5.3KM',
    },
    address: '',
    propertyAge: '16 - 17 Year',
    propertyFacing: 'South',
    ownership: 'Co-operative Society',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (category, field) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field],
      },
    }));
  };

  const handleNearbyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      nearby: {
        ...prev.nearby,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saved Independent House / Villa Data:', formData);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '25px', color: '#333' }}>
        Edit Your Independent House / Villa Property
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Core Property Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Select State</label>
          <select name="state" value={formData.state} onChange={handleInputChange} style={inputStyle}>
            <option value="WEST BENGAL">WEST BENGAL</option>
          </select>

          <label>Select City</label>
          <select name="city" value={formData.city} onChange={handleInputChange} style={inputStyle}>
            <option value="Behala">Behala</option>
            <option value="Kolkata">Kolkata</option>
          </select>

          <label>Google_Location</label>
          <input type="text" name="googleLocation" value={formData.googleLocation} onChange={handleInputChange} style={inputStyle} />

          <label>Property Name</label>
          <select name="propertyName" value={formData.propertyName} onChange={handleInputChange} style={inputStyle}>
            <option value="Emami Aastha">Emami Aastha</option>
          </select>

          <label>Listing Image</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>✕</button>
            <input type="file" />
            <span style={{ color: 'red', fontSize: '12px' }}>Listing Image is required</span>
          </div>

          <label>Select Project Status</label>
          <select name="projectStatus" value={formData.projectStatus} onChange={handleInputChange} style={inputStyle}>
            <option value="Ready to Move">Ready to Move</option>
          </select>

          <label>Ticket Size(Price(in INR))</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input type="text" name="ticketSize" value={formData.ticketSize} onChange={handleInputChange} style={{ ...inputStyle, flex: 1 }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              Negotiable <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleInputChange} />
            </label>
          </div>
        </div>

        {/* 2-Column Grid Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 180px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Plot Area :</label>
          <input type="text" name="plotArea" value={formData.plotArea} onChange={handleInputChange} style={inputStyle} />

          <label>Select Area Unit :</label>
          <select name="areaUnit" value={formData.areaUnit} onChange={handleInputChange} style={inputStyle}>
            <option value="Katha">Katha</option>
            <option value="sq.ft">sq.ft</option>
          </select>

          <label>Total Price :</label>
          <input type="text" name="totalPrice" value={formData.totalPrice} onChange={handleInputChange} style={inputStyle} />

          <label>Built Up Area :</label>
          <input type="text" name="builtUpArea" value={formData.builtUpArea} onChange={handleInputChange} style={inputStyle} />

          <label>Carpet Area :</label>
          <input type="text" name="carpetArea" value={formData.carpetArea} onChange={handleInputChange} style={inputStyle} />

          <label>Select No Of Bed Room :</label>
          <select name="bedRooms" value={formData.bedRooms} onChange={handleInputChange} style={inputStyle}>
            <option value="4">4</option>
          </select>

          <label>Select No Of Bath Room :</label>
          <select name="bathRooms" value={formData.bathRooms} onChange={handleInputChange} style={inputStyle}>
            <option value="2">2</option>
          </select>

          <label>Select No Of Balcony :</label>
          <select name="balcony" value={formData.balcony} onChange={handleInputChange} style={inputStyle}>
            <option value="2">2</option>
          </select>

          <label>Select Furnished Type :</label>
          <select name="furnishedType" value={formData.furnishedType} onChange={handleInputChange} style={inputStyle}>
            <option value="Furnished">Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
          </select>

          <label>Select Total Number Of Floor :</label>
          <select name="totalFloors" value={formData.totalFloors} onChange={handleInputChange} style={inputStyle}>
            <option value="11">11</option>
          </select>

          <label>Select Type Of Flooring :</label>
          <select name="flooringType" value={formData.flooringType} onChange={handleInputChange} style={inputStyle}>
            <option value="Marble">Marble</option>
            <option value="Tiles">Tiles</option>
          </select>

          <label>Other Rooms :</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['servantRoom', 'pujaRoom', 'studyRoom', 'storeRoom'].map((room) => (
              <label key={room} style={{ fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={formData.otherRooms[room]}
                  onChange={() => handleNestedChange('otherRooms', room)}
                />{' '}
                {room.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Select Parking</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label><input type="checkbox" checked={formData.parkingType.open} onChange={() => handleNestedChange('parkingType', 'open')} /> Open Parking</label>
            <label><input type="checkbox" checked={formData.parkingType.covered} onChange={() => handleNestedChange('parkingType', 'covered')} /> Covered Parking</label>
            <label><input type="checkbox" checked={formData.parkingType.mechanical} onChange={() => handleNestedChange('parkingType', 'mechanical')} /> Mechanical Parking</label>
          </div>
        </div>

        <div style={{ marginLeft: '235px', marginBottom: '15px' }}>
          <input type="text" name="coveredParkingCount" value={formData.coveredParkingCount} onChange={handleInputChange} style={{ ...inputStyle, width: '200px' }} />
        </div>

        {/* Cover Image & Descriptions */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Cover Image</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button type="button" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>✕</button>
            <input type="file" />
            <span style={{ color: 'red', fontSize: '12px' }}>Cover Image is required</span>
          </div>

          <label>Caption</label>
          <input type="text" name="caption" placeholder="Enter Caption" value={formData.caption} onChange={handleInputChange} style={inputStyle} />

          <label>OverView</label>
          <textarea name="overview" placeholder="Enter Property Overview" value={formData.overview} onChange={handleInputChange} rows={6} style={{ ...inputStyle, width: '100%' }} />
        </div>

        {/* Amenities Section */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {Object.keys(formData.amenities).map((key) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={formData.amenities[key]}
                  onChange={() => handleNestedChange('amenities', key)}
                />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        {/* Property Images Upload */}
        <div style={{ marginTop: '25px' }}>
          <label style={{ fontWeight: 'bold' }}>Property Images</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
            <input type="file" multiple />
            <button type="button" style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
            <span style={{ color: 'red', fontSize: '12px' }}>Upload images : Min - 4, Max-16</span>
          </div>
        </div>

        {/* Nearby Distances */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Nearby</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {Object.keys(formData.nearby).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={formData.nearby[key]}
                onChange={handleNearbyChange}
                placeholder={`Enter Distance of ${key}`}
                style={inputStyle}
              />
            ))}
          </div>
        </div>

        {/* Footer Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginTop: '25px' }}>
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter Property Address" value={formData.address} onChange={handleInputChange} style={inputStyle} />

          <label>Select Property Age</label>
          <select name="propertyAge" value={formData.propertyAge} onChange={handleInputChange} style={inputStyle}>
            <option value="16 - 17 Year">16 - 17 Year</option>
          </select>

          <label>Select Property Facing</label>
          <select name="propertyFacing" value={formData.propertyFacing} onChange={handleInputChange} style={inputStyle}>
            <option value="South">South</option>
          </select>

          <label>Select Ownership</label>
          <select name="ownership" value={formData.ownership} onChange={handleInputChange} style={inputStyle}>
            <option value="Co-operative Society">Co-operative Society</option>
          </select>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '25px' }}>
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 30px', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export default IndpHVEditProperty;