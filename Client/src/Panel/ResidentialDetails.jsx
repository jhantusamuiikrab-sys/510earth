import PropertyHero from "./ResidentialDetails/PropertyHero";
import PropertyPrice from "./ResidentialDetails/PropertyPrice";
import PropertyOverview from "./ResidentialDetails/PropertyOverview";
import Amenities from "./ResidentialDetails/Amenities";
import PropertyGallery from "./ResidentialDetails/PropertyGallery";

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

    </div>
  );
};

export default ResidentialDetails;