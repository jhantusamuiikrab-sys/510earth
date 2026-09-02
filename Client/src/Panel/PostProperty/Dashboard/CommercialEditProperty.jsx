import React, { useState } from 'react';

const CommercialEditProperty = () => {
  const [formData, setFormData] = useState({
    subPropertyType: 'Industry',
    state: 'WEST BENGAL',
    city: 'Uttarpara',
    googleMapLocation: 'Intellia Business Park, Gobra Road, Seal Lane, Tangra, Kolkata, West Bengal, India',
    propertyName: 'Intellia The Central Business Park',
    projectStatus: 'Ready to Move',
    ticketSize: '168',
    negotiable: false,
    superBuiltUpArea: '12',
    builtUpArea: '45',
    carpetArea: '35',
    pricePerSqFt: '14',
    totalPrice: '168',
    totalNoOfFloors: 'Total No of Floors',
    block: '12',
    entranceWidth: '14',
    ceilingHeight: '45',
    flooringType: 'Marble',
    parkingType: {
      open: true,
      covered: false,
      mechanical: false,
    },
    openParkingCount: '0',
    caption: '',
    overview: 'Enter Property Overview',
    amenities: {
      lift: true,
      firefighting: true,
      gymnasium: false,
      gatedAccess: true,
      pedestrianFriendly: false,
      powerBackup: true,
      multipurposeCourts: false,
      park: false,
      vaastuCompliant: false,
      maintenanceStaff: true,
      healthClub: false,
      noOfLift: true,
      picnicLawn: false,
      theatre: false,
      organicFarm: false,
      solarWaterPanel: false,
      temple: false,
      miniTheatre: false,
      fishingPond: false,
      amphitheatre: false,
      waterSupply: true,
      childrenPlayArea: false,
      intercom: true,
      swimmingPool: false,
      gameRoom: false,
      multipurposeHall: false,
      security: true,
      visitorParking: true,
      aerobicsRoom: false,
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
      clubHouse: false,
      petFriendly: false,
      privateSpa: false,
      cyclingTrack: false,
      flowerGardens: false,
      rainWaterHarvesting: true,
      earthquakeResistance: true,
      golfCourse: false,
      wifiCommonArea: true,
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
      airport: 'NETAJI SUBHASH CHANDRA BOSE INTERNATIONAL AIRPOR',
      bank: 'FEDERAL BANK : 2.3KM',
      busStop: 'LADIES PARK : 0.10KM',
      college: 'LORETO ST.MARY\'S SCHOOL & TRAINING COLLEGE : 2.5KM',
      hospital: 'CHAMPAMONI HOSPITAL : 1.3KM',
      kindergarten: 'LITTLE ANGEL SCHOOL : 1KM',
      landMark: 'LADIES PARK : 0.10KM',
      mall: 'QUEST MALL : 1.8KM',
      market: 'GOBRA MUNICIPAL MARKET : 0.70KM',
      metro: 'SEALDAH METRO : 2.7KM',
      nearByCircle: 'BISWA BANGLA GATE : 15.1KM',
      publicPark: 'CHRISTOPHER PARK : 1KM',
      railwayStation: 'SEALDAH RAILWAY STATION : 3KM',
      school: 'KRISHMONT SCHOOL : 0.85KM',
      techPark: 'P.S SRIJAN : 11.2KM',
      temple: 'LOKENATH BABA TEMPLE : 1.3KM',
      university: 'UNIVERSITY OF NORTH BENGAL : 2KM',
    },
    address: '',
    numberOfTowers: '',
    openSpace: '',
    projectSize: '',
    propertyAge: '',
    propertyFacing: 'East',
    washRoomType: '',
    washRoomCount: '0',
    noOfMeetingRoom: '0',
    conferenceRoom: '',
    receptionArea: '',
    noOfCabin: '0',
    minNoOfSeat: '0',
    maxNoOfSeat: '0',
    pantryType: '',
    furnishedType: '',
    totalFloorOfBuilding: '',
    yourFloor: '',
    ownership: 'Leasehold',
    fullAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleParkingChange = (field) => {
    setFormData((prev) => ({
      ...prev,
      parkingType: {
        ...prev.parkingType,
        [field]: !prev.parkingType[field],
      },
    }));
  };

  const handleAmenityChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: !prev.amenities[key],
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
    console.log('Saved Commercial Property Data:', formData);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '25px', color: '#333' }}>
        Edit Your Commercial Property
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Core Property Setup */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Commercial Sub Property Type</label>
          <select name="subPropertyType" value={formData.subPropertyType} onChange={handleInputChange} style={inputStyle}>
            <option value="Industry">Industry</option>
            <option value="Office Space">Office Space</option>
            <option value="Shop/Showroom">Shop/Showroom</option>
          </select>

          <label>Select State</label>
          <select name="state" value={formData.state} onChange={handleInputChange} style={inputStyle}>
            <option value="WEST BENGAL">WEST BENGAL</option>
          </select>

          <label>Select City</label>
          <select name="city" value={formData.city} onChange={handleInputChange} style={inputStyle}>
            <option value="Uttarpara">Uttarpara</option>
            <option value="Kolkata">Kolkata</option>
          </select>

          <label>Google Map Location</label>
          <input type="text" name="googleMapLocation" value={formData.googleMapLocation} onChange={handleInputChange} style={inputStyle} />

          <label>Property Name</label>
          <input type="text" name="propertyName" value={formData.propertyName} onChange={handleInputChange} style={inputStyle} />

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

        {/* 2-Column Grid Area Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 180px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Super Built Up Area:</label>
          <input type="text" name="superBuiltUpArea" value={formData.superBuiltUpArea} onChange={handleInputChange} style={inputStyle} />

          <label>Built Up Area:</label>
          <input type="text" name="builtUpArea" value={formData.builtUpArea} onChange={handleInputChange} style={inputStyle} />

          <label>Carpet Area:</label>
          <input type="text" name="carpetArea" value={formData.carpetArea} onChange={handleInputChange} style={inputStyle} />

          <label>Price Per Sq ft:</label>
          <input type="text" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleInputChange} style={inputStyle} />

          <label>Total Price:</label>
          <input type="text" name="totalPrice" value={formData.totalPrice} onChange={handleInputChange} style={inputStyle} readOnly />

          <label>Total No of Floors:</label>
          <input type="text" name="totalNoOfFloors" value={formData.totalNoOfFloors} onChange={handleInputChange} style={inputStyle} />

          <label>Block:</label>
          <input type="text" name="block" value={formData.block} onChange={handleInputChange} style={inputStyle} />

          <label>Entrance Width:</label>
          <input type="text" name="entranceWidth" value={formData.entranceWidth} onChange={handleInputChange} style={inputStyle} />

          <label>Ceiling Height:</label>
          <input type="text" name="ceilingHeight" value={formData.ceilingHeight} onChange={handleInputChange} style={inputStyle} />

          <label>Type Of Flooring:</label>
          <select name="flooringType" value={formData.flooringType} onChange={handleInputChange} style={inputStyle}>
            <option value="Marble">Marble</option>
            <option value="Tiles">Tiles</option>
            <option value="Concrete">Concrete</option>
          </select>
        </div>

        {/* Parking */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Select Parking</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label><input type="checkbox" checked={formData.parkingType.open} onChange={() => handleParkingChange('open')} /> Open Parking</label>
            <label><input type="checkbox" checked={formData.parkingType.covered} onChange={() => handleParkingChange('covered')} /> Covered Parking</label>
            <label><input type="checkbox" checked={formData.parkingType.mechanical} onChange={() => handleParkingChange('mechanical')} /> Mechanical Parking</label>
          </div>
        </div>

        <div style={{ marginLeft: '235px', marginBottom: '15px' }}>
          <input type="text" name="openParkingCount" value={formData.openParkingCount} onChange={handleInputChange} style={{ ...inputStyle, width: '200px' }} />
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
          <textarea name="overview" value={formData.overview} onChange={handleInputChange} rows={6} style={{ ...inputStyle, width: '100%' }} />
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
                  onChange={() => handleAmenityChange(key)}
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

        {/* Detailed Specifications */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '15px', alignItems: 'center', marginTop: '25px' }}>
          <label>Address</label>
          <input type="text" name="address" placeholder="Enter Property Address" value={formData.address} onChange={handleInputChange} style={inputStyle} />

          <label>Number of Towers</label>
          <input type="text" name="numberOfTowers" placeholder="Enter Number of Towers" value={formData.numberOfTowers} onChange={handleInputChange} style={inputStyle} />

          <label>Open Space</label>
          <input type="text" name="openSpace" placeholder="Enter Open Space" value={formData.openSpace} onChange={handleInputChange} style={inputStyle} />

          <label>Project Size</label>
          <input type="text" name="projectSize" placeholder="Enter Project Size" value={formData.projectSize} onChange={handleInputChange} style={inputStyle} />

          <label>Select Property Age</label>
          <select name="propertyAge" value={formData.propertyAge} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Property Age--</option>
            <option value="0 - 1 Year">0 - 1 Year</option>
            <option value="1 - 5 Year">1 - 5 Year</option>
          </select>

          <label>Select Property Facing</label>
          <select name="propertyFacing" value={formData.propertyFacing} onChange={handleInputChange} style={inputStyle}>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>

          <label>Select Wash Room Type</label>
          <select name="washRoomType" value={formData.washRoomType} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Wash Room Type--</option>
            <option value="Private">Private</option>
            <option value="Shared">Shared</option>
          </select>

          <label>Select Wash Room</label>
          <select name="washRoomCount" value={formData.washRoomCount} onChange={handleInputChange} style={inputStyle}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          <label>No Of Meeting Room</label>
          <select name="noOfMeetingRoom" value={formData.noOfMeetingRoom} onChange={handleInputChange} style={inputStyle}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>

          <label>Conference Room</label>
          <select name="conferenceRoom" value={formData.conferenceRoom} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Conference Room--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Reception Area</label>
          <select name="receptionArea" value={formData.receptionArea} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Reception Area--</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>No Of Cabin</label>
          <select name="noOfCabin" value={formData.noOfCabin} onChange={handleInputChange} style={inputStyle}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>

          <label>Min No Of Seat</label>
          <input type="text" name="minNoOfSeat" value={formData.minNoOfSeat} onChange={handleInputChange} style={inputStyle} />

          <label>Max No Of Seat</label>
          <input type="text" name="maxNoOfSeat" value={formData.maxNoOfSeat} onChange={handleInputChange} style={inputStyle} />

          <label>Select Pantry Type</label>
          <select name="pantryType" value={formData.pantryType} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Pantry Type--</option>
            <option value="Dry">Dry</option>
            <option value="Wet">Wet</option>
          </select>

          <label>Select Furnished</label>
          <select name="furnishedType" value={formData.furnishedType} onChange={handleInputChange} style={inputStyle}>
            <option value="">--Select Furnished Type--</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi Furnished">Semi Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

          <label>Total Floor Of Building</label>
          <input type="text" name="totalFloorOfBuilding" placeholder="Enter Total Floor Of Building(In number)" value={formData.totalFloorOfBuilding} onChange={handleInputChange} style={inputStyle} />

          <label>Your Floor</label>
          <input type="text" name="yourFloor" placeholder="Enter Your Floor No" value={formData.yourFloor} onChange={handleInputChange} style={inputStyle} />

          <label>Select Ownership</label>
          <select name="ownership" value={formData.ownership} onChange={handleInputChange} style={inputStyle}>
            <option value="Leasehold">Leasehold</option>
            <option value="Freehold">Freehold</option>
          </select>

          <label>Full Address</label>
          <input type="text" name="fullAddress" placeholder="Enter Full Address" value={formData.fullAddress} onChange={handleInputChange} style={inputStyle} />
        </div>

        {/* Save Button */}
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

export default CommercialEditProperty;