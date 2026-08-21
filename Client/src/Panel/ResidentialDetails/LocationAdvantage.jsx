import "../../assets/paneldesign/css/LocationAdvantage.css";
import {
  Plane,
  Landmark,
  Bus,
  GraduationCap,
  Hospital,
  MapPin,
  ShoppingBag,
  Store,
  TrainTrack,
  Compass,
  Trees,
  Train,
  Building2,
  School
} from 'lucide-react';


const LOCATION_DATA = [
  {
    id: 1,
    title: 'Airport-',
    desc: 'Netaji Subhash Chandra Bose International Airport - 10 Km.',
    icon: Plane
  },
  {
    id: 2,
    title: 'Bank -',
    desc: 'Bandhan Bank - 1.00 Km.',
    icon: Landmark
  },
  {
    id: 3,
    title: 'Bus Stop-',
    desc: 'Sector V Metro - 0.50 Km.',
    icon: Bus
  },
  {
    id: 4,
    title: 'College-',
    desc: 'IEM - 1.00 Km.',
    icon: GraduationCap
  },
  {
    id: 5,
    title: 'Hospital-',
    desc: 'Anandalok - 1.00 Km.',
    icon: Hospital
  },
  {
    id: 6,
    title: 'Land Mark-',
    desc: 'Sector V Metro - 0.50 Km.',
    icon: MapPin
  },
  {
    id: 7,
    title: 'Mall-',
    desc: 'Axis Mall - 2.5 Km.',
    icon: ShoppingBag
  },
  {
    id: 8,
    title: 'Market-',
    desc: 'CK Market - 0.80 Km.',
    icon: Store
  },
  {
    id: 9,
    title: 'Metro-',
    desc: 'Sector V Metro - 0.50 Km.',
    icon: TrainTrack
  },
  {
    id: 10,
    title: 'Near By Circle-',
    desc: 'Midland Park - 0.20 Km.',
    icon: Compass
  },
  {
    id: 11,
    title: 'Public Park-',
    desc: 'Midland Park - 0.20 Km.',
    icon: Trees
  },
  {
    id: 12,
    title: 'Railway Station-',
    desc: 'Sealdah - 7.00 Km.',
    icon: Train
  },
  {
    id: 13,
    title: 'Tech Park-',
    desc: 'Srijan Tech Park - 1.00 Km.',
    icon: Building2
  },
  {
    id: 14,
    title: 'University-',
    desc: 'Techno India - 0.50 Km.',
    icon: School
  }
];

function LocationAdvantage() {
  return (
    <section className="loc-adv-wrapper">
      <div className="loc-adv-container">
        {/* Section Header */}
        <div className="loc-adv-header">
          <h2 className="loc-adv-title">LOCATION ADVANTAGE</h2>
          <div className="loc-adv-underline-wrapper">
            <span className="loc-adv-underline-line"></span>
            <span className="loc-adv-underline-bar"></span>
          </div>
        </div>

        {/* Location Grid */}
        <div className="loc-adv-grid">
          {LOCATION_DATA.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="loc-adv-card-wrapper">
                <div className="loc-adv-card">
                  <div className="loc-adv-icon-box">
                    <IconComponent className="loc-adv-icon" size={38} strokeWidth={1.6} />
                  </div>
                  <div className="loc-adv-content">
                    <h3 className="loc-adv-item-title">{item.title}</h3>
                    <p className="loc-adv-item-desc">{item.desc}</p>
                  </div>
                </div>
                {/* Curved Bottom Shadow */}
                <div className="loc-adv-card-shadow"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LocationAdvantage;