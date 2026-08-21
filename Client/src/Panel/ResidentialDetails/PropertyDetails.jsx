import React from 'react';
import "../../assets/paneldesign/css/PropertyDetails.css";
import { 
  UserCheck, 
  Handshake, 
  UtensilsCrossed, 
  Building2, 
  Briefcase, 
  Car, 
  Users, 
  CheckSquare 
} from 'lucide-react';

const PROPERTY_DETAILS_DATA = [
  {
    id: 1,
    title: 'Ownership Details-',
    value: 'Freehold',
    icon: <UserCheck className="pd-icon" />
  },
  {
    id: 2,
    title: 'Meeting Room-',
    value: 'Not Available',
    icon: <Handshake className="pd-icon" />
  },
  {
    id: 3,
    title: 'Pantry Type-',
    value: 'Not Available',
    icon: <UtensilsCrossed className="pd-icon" />
  },
  {
    id: 4,
    title: 'Total Floor of building-',
    value: '9 Floor',
    icon: <Building2 className="pd-icon" />
  },
  {
    id: 5,
    title: 'Office Floor-',
    value: '6 Floor',
    icon: <Briefcase className="pd-icon" />
  },
  {
    id: 6,
    title: 'Parking-',
    value: 'Available',
    icon: <Car className="pd-icon" />
  },
  {
    id: 7,
    title: 'Washroom-',
    value: 'Common',
    icon: <Users className="pd-icon" />
  },
  {
    id: 8,
    title: 'Furnish-',
    value: 'No',
    icon: <CheckSquare className="pd-icon" />
  }
];

function PropertyDetails() {
  return (
    <div className="pd-main-wrapper">
      {/* Section Heading */}
      <div className="pd-title-container">
        <h2 className="pd-heading">PROPERTY DETAILS</h2>
        <div className="pd-heading-underline-group">
          <div className="pd-blue-bar"></div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="pd-grid">
        {PROPERTY_DETAILS_DATA.map((item) => (
          <div key={item.id} className="pd-card">
            <div className="pd-icon-box">
              {item.icon}
            </div>
            <div className="pd-text-box">
              <span className="pd-card-title">{item.title}</span>
              <span className="pd-card-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyDetails;