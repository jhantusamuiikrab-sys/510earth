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

  return (
    <div className="residential-details">

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