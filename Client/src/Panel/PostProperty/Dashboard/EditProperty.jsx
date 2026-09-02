import React, { useState } from 'react';

const EditProperty = () => {
  const [formData, setFormData] = useState({
    state: 'WEST BENGAL',
    city: 'Kolkata',
    googleLocation: 'Gariahat',
    propertyName: 'abcd',
    listingImage: null,
    projectStatus: 'Ready to Move',
    ticketSize: '7800000',
    negotiable: false,
    bhk: '3BHK',
    superBuiltUpArea: '4200',
    carpetArea: '3400',
    areaUnit: 'sq.ft',
    bedRooms: '3',
    bathRooms: '4',
    balcony: '2',
    furnishedType: 'Semi Furnished',
    totalFloors: '8',
    yourFloorNo: '4',
    parkingType: {
      open: false,
      covered: true,
      mechanical: false,
    },
    coveredParkingCount: '1',
    coverImage: null,
    caption: 'test',
    overview: 'test',
    amenities: {
      lift: true,
      firefighting: true,
      gymnasium: false,
      gatedAccess: true,
      pedestrianFriendly: false,
      powerBackup: true,
      multipurposeCourts: false,
      park: false,
      vaastuCompliant: true,
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
      intercom: false,
      swimmingPool: false,
      gameRoom: false,
      multipurposeHall: false,
      security: true,
      visitorParking: false,
      aerobicsRoom: false,
      cctvCamera: true,
      coffeeLounge: false,
      forestTrails: false,
      seniorCitizenZone: false,
      hangingPool: false,
      meditationLawn: false,
      solarHotWater: false,
      coveredFountain: false,
      library: false,
      commercialZone: true,
      carParking: true,
      patioBalcony: false,
      clubHouse: false,
      petFriendly: false,
      privateSpa: false,
      cyclingTrack: false,
      flowerGardens: false,
      rainWaterHarvesting: false,
      earthquakeResistance: false,
      golfCourse: false,
      wifiCommonArea: false,
      indoorBadminton: false,
      tennisCourts: false,
      basketBall: false,
      cricketPitch: false,
      fitnessActivityWall: false,
      badminton: false,
      squashCourt: false,
      meetingEventZone: true,
    },
    nearby: {
      airport: '',
      bank: '',
      busStop: '',
      college: '',
      hospital: '',
      kindergarten: '',
      landMark: '',
      mall: '',
      market: '',
      metro: '',
      nearByCircle: '',
      publicPark: '',
      railwayStation: '',
      school: '',
      techPark: '',
      temple: '',
      university: '',
    },
    address: 'gariahat',
    propertyAge: '2 - 3 Year',
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

  const handleAmenityChange = (amenityKey) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenityKey]: !prev.amenities[amenityKey],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted Data:', formData);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Edit Your Property</h2>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Select State</label>
          <select name="state" value={formData.state} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="WEST BENGAL">WEST BENGAL</option>
          </select>

          <label>Select City</label>
          <select name="city" value={formData.city} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Kolkata">Kolkata</option>
          </select>

          <label>Google_Location</label>
          <input type="text" name="googleLocation" value={formData.googleLocation} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>Property Name</label>
          <select name="propertyName" value={formData.propertyName} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="abcd">abcd</option>
          </select>

          <label>Listing Image</label>
          <div>
            <input type="file" />
          </div>

          <label>Select Project Status</label>
          <select name="projectStatus" value={formData.projectStatus} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Ready to Move">Ready to Move</option>
          </select>

          <label>Ticket Size(Price(in INR))</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="text" name="ticketSize" value={formData.ticketSize} onChange={handleInputChange} style={{ padding: '8px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }} />
            <label>
              Negotiable <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleInputChange} />
            </label>
          </div>

          <label>Select BHK</label>
          <select name="bhk" value={formData.bhk} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="3BHK">3BHK</option>
          </select>
        </div>

        {/* Areas and Room Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Super Built Up Area :</label>
          <input type="text" name="superBuiltUpArea" value={formData.superBuiltUpArea} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>Select Area Unit :</label>
          <select name="areaUnit" value={formData.areaUnit} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="sq.ft">sq.ft</option>
          </select>

          <label>Carpet Area :</label>
          <input type="text" name="carpetArea" value={formData.carpetArea} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>Select No Of Bed Room :</label>
          <select name="bedRooms" value={formData.bedRooms} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="3">3</option>
          </select>

          <label>Select No Of Bath Room :</label>
          <select name="bathRooms" value={formData.bathRooms} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="4">4</option>
          </select>

          <label>Select No Of Balcony :</label>
          <select name="balcony" value={formData.balcony} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="2">2</option>
          </select>

          <label>Select Furnished Type :</label>
          <select name="furnishedType" value={formData.furnishedType} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Semi Furnished">Semi Furnished</option>
          </select>

          <label>Select Total Number Of Floor :</label>
          <select name="totalFloors" value={formData.totalFloors} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="8">8</option>
          </select>
        </div>

        {/* Floor and Parking */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Your Floor No</label>
          <input type="text" name="yourFloorNo" value={formData.yourFloorNo} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>Select Parking</label>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <label><input type="checkbox" name="open" /> Open Parking</label>
            <label><input type="checkbox" name="covered" defaultChecked /> Covered Parking</label>
            <label><input type="checkbox" name="mechanical" /> Mechanical Parking</label>
          </div>
        </div>

        <div style={{ marginLeft: '215px', marginBottom: '15px' }}>
          <input type="text" value={formData.coveredParkingCount} style={{ width: '200px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        {/* Cover Image & Rich Text / Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <label>Cover Image</label>
          <div><input type="file" /></div>

          <label>Caption</label>
          <input type="text" name="caption" value={formData.caption} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>OverView</label>
          <textarea name="overview" value={formData.overview} onChange={handleInputChange} rows={6} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }} />
        </div>

        {/* Amenities Checklist */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {Object.keys(formData.amenities).map((key) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

        {/* Property Images Upload Display */}
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Property Images</label>
          <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <input type="file" multiple />
            <span style={{ color: '#d9534f', fontSize: '14px' }}>Upload images : Min - 4, Max-16</span>
          </div>
        </div>

        {/* Nearby Distances */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Nearby</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
            <input type="text" placeholder="Enter Distance of Airport" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Bank" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Bus Stop" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of College" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Hospital" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Kindergarten" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Land Mark" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Mall" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Market" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Metro" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Near By Circle" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Public Park" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Railway Station" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of School" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Tech Park" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of Temple" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            <input type="text" placeholder="Enter Distance of University" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Footer Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '15px', alignItems: 'center', marginTop: '30px' }}>
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />

          <label>Select Property Age</label>
          <select name="propertyAge" value={formData.propertyAge} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="2 - 3 Year">2 - 3 Year</option>
          </select>

          <label>Select Property Facing</label>
          <select name="propertyFacing" value={formData.propertyFacing} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="South">South</option>
          </select>

          <label>Select Ownership</label>
          <select name="ownership" value={formData.ownership} onChange={handleInputChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <option value="Co-operative Society">Co-operative Society</option>
          </select>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: '20px' }}>
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;