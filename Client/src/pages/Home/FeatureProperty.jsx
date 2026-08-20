import React, { useEffect, useRef, useState } from "react";
import "../../../src/style/FeatureProperty.css";
// Mock data representing the real-life properties array
const featuredProperties = [
  {
    Id: 1,
    PropertyTypeId: 1, // Residential
    PropertyName: "Skyline Premium Apartments",
    City: "1", // Maps to Kolkata
    urlMap: "skyline premium apartments",
    ListingImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Luxury 3BHK Apartment in Kolkata",
    LstImageAltText: "Skyline Premium Apartments Exterior",
    Display_Location: "Salt Lake Sector V",
    ProjectStatus: 1, // Ready to Move
    Price: "85 Lakh",
    AreaRange: "1200 - 1650 sqft",
    RoomName: '["3 BHK", "4 BHK"]',
  },
  {
    Id: 2,
    PropertyTypeId: 2, // Commercial
    PropertyName: "Infinity Business Hub",
    City: "1",
    urlMap: "infinity business hub",
    ListingImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Commercial Office Space in Sector V",
    LstImageAltText: "Infinity Business Hub Office Building",
    Display_Location: "Sector V",
    ProjectStatus: 2, // Under Construction
    Price: "1.2 Cr",
    Negotiable: true,
    BuildupArea: "2500",
    SubProperty: "Office Space",
  },
  {
    Id: 3,
    PropertyTypeId: 3, // Land
    PropertyName: "Greenfield Residential Plots",
    City: "1",
    urlMap: "greenfield residential plots",
    ListingImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Plots for sale in New Town",
    LstImageAltText: "Greenfield Plots Landscape",
    Display_Location: "New Town",
    ProjectStatus: 3, // Resale
    Price: "45 Lakh",
    Negotiable: false,
    PlotSize: "3000",
    PlotArea: 1, // Maps to "Katha" or "Sq. Ft."
  },
  {
    Id: 4,
    PropertyTypeId: 1, // Residential
    PropertyName: "The Grand Orchard Residency",
    City: "1",
    urlMap: "the grand orchard residency",
    ListingImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Modern Residential Complex in Rajarhat",
    LstImageAltText: "The Grand Orchard Residency Complex Front",
    Display_Location: "Rajarhat",
    ProjectStatus: 2, // Under Construction
    Price: "62 Lakh",
    AreaRange: "950 - 1420 sqft",
    RoomName: '["2 BHK", "3 BHK"]',
  },
  {
    Id: 5,
    PropertyTypeId: 2, // Commercial
    PropertyName: "Pinnacle Tech Towers",
    City: "1",
    urlMap: "pinnacle tech towers",
    ListingImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Corporate Workspace Space near EM Bypass",
    LstImageAltText: "Pinnacle Tech Towers Glass Facade",
    Display_Location: "EM Bypass",
    ProjectStatus: 1, // Ready to Move
    Price: "2.4 Cr",
    Negotiable: false,
    BuildupArea: "4200",
    SubProperty: "Corporate IT Office",
  },
  {
    Id: 6,
    PropertyTypeId: 3, // Land
    PropertyName: "Ballygunge Premium Enclave Plots",
    City: "1",
    urlMap: "ballygunge premium enclave plots",
    ListingImage:
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80",
    LstImageTitle: "Premium Residential Land Plots in Ballygunge",
    LstImageAltText: "Ballygunge Enclave Plot Ground Area",
    Display_Location: "Ballygunge",
    ProjectStatus: 3, // Resale
    Price: "3.1 Cr",
    Negotiable: true,
    PlotSize: "4",
    PlotArea: 2, // Maps to "Katha"
  },
];

// Helper dictionaries mimicking your backend collections
const cityMap = { 1: "Kolkata" };
const statusMap = { 1: "Ready to Move", 2: "Under Construction", 3: "Resale" };
const plotAreaMap = { 1: "Sq. Ft.", 2: "Katha" };

const whyChooseData = [
  {
    title: "Integrity & trust",
    icon: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=80&q=80", // Real-world meeting/trust icon placeholder
    desc: "Trust is the most important factor. Therefore, we strive to understand our client’s needs, demands and preferences. We deliver our services to all our customers consistently and transparently at each stage. We believe in being loyal to our customers and following the same throughout the process. We take no hidden costs, offer timely deliveries, and promise quality construction on any project. Integrity and trust building helped us build long-lasting relationships.",
  },
  {
    title: "Knowledge & Expertise",
    icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=80&q=80",
    desc: "Buying a property, whether residential or commercial, is the largest investment most people make in their lifetime. We understand it, and therefore as experienced agents, offer our clients with tools required during the most complicated and stressful endeavor. Being a prominent local real estate consultant, we know about the neighborhood's local development and the ins and outs. We understand and respect our client's requirements and never force them to invest unnecessarily.",
  },
  {
    title: "Shortlisted Projects over a Wide Coverage",
    icon: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=80&q=80",
    desc: "Our experts interact with our customers to understand their requirements, taste, and preferences. We shortlist the properties keeping our customers in mind, and discuss the pros and cons of each property in detail with them. We cover the entire region of Kolkata. With a network of developers in East, West, South, and Central Kolkata, we help our customers with a wide variety of options from which you can choose a property that suits your financial and personal requirements.",
  },
  {
    title: "Commitment & Compassion",
    icon: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=80&q=80",
    desc: "Clients experience several doubts and queries about buying and selling properties. As one of India's leading real estate companies, our team works hard with complete dedication to addressing the needs of our clients. We commit to hearing our clients' doubts and queries and supporting them at every stage. Our commitment helped our clients gain confidence in us, helping us develop a rich and satisfied client base.",
  },
];

export default function RealEstatePanel() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // --- FIX 1: Instant check for elements already on screen ---
    const rect = currentElement.getBoundingClientRect();
    const isInitiallyOnScreen =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isInitiallyOnScreen) {
      setIsVisible(true);
      return; // No need to observe if it's already visible on load
    }

    // --- FIX 2: Standard Observer for everything else down the page ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentElement) observer.unobserve(currentElement);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px", // Slight buffer so scroll feels deliberate
        threshold: 0.05,
      },
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) observer.disconnect();
    };
  }, []);

  const formatUrlParam = (str) =>
    str ? str.toLowerCase().replace(/\s+/g, "-") : "";

  const renderProjectStatus = (statusId) => {
    const statusName = statusMap[statusId];
    let className = "featured_box_txt_blue"; // Default

    if (statusName === "Ready to Move") className = "featured_box_txt_green";
    if (statusName === "Resale") className = "featured_box_txt_orange";

    return (
      <div className={className}>
        <h6>{statusName}</h6>
      </div>
    );
  };
  
  return (
    <>
      {/* FEATURED PANEL SECTION */}
      <section className="featured_panel">
        <div className="featured_bg">
          <div className="container">
            <h2>
              Listing of <span>Featured</span> Properties
            </h2>
            <br />
            <div className="row">
              {featuredProperties.map((item) => {
                const cityName = cityMap[item.City] || "Kolkata";
                const cityParam = formatUrlParam(cityName);

                // Format logic for Indian Rupee sign string manipulation from original code
                let displayPrice = item.Price;
                if (!displayPrice.includes("₹")) {
                  displayPrice = "₹" + displayPrice;
                }

                return (
                  <div
                    key={item.Id}
                    ref={elementRef}
                    className={` col-md-4 wow flipInX scroll-flip-element ${isVisible ? "is-visible" : ""}`}
                  >
                    {/* RESIDENTIAL PROPERTY (TypeId == 1) */}
                    {item.PropertyTypeId === 1 && (
                      <a
                        href={`/Home/residentialDetails?City=${cityParam}&Name=${formatUrlParam(item.urlMap)}`}
                        className="pxp-prop-card-1 pxp-prop-card rounded-lg"
                      >
                        <div className="pxp-prop-card-1-fig pxp-cover">
                          <picture>
                            <source
                              type="image/jpeg"
                              srcSet={item.ListingImage}
                            />
                            <img
                              src={item.ListingImage}
                              title={item.LstImageTitle}
                              alt={item.LstImageAltText}
                            />
                          </picture>
                        </div>
                        <div className="pxp-prop-card-1-gradient pxp-animate"></div>
                        <div className="pxp-prop-card-1-details">
                          <div className="pxp-prop-card-1-details-price text-capitalize">
                            {item.PropertyName}
                          </div>
                          <div className="pxp-prop-card-1-details-cta text-uppercase">
                            <i
                              className="fas fa-map-marker-alt text-danger"
                              aria-hidden="true"
                            ></i>
                            <span>
                              {" "}
                              {item.Display_Location} , {cityName}{" "}
                            </span>
                          </div>
                        </div>
                      </a>
                    )}

                    {/* COMMERCIAL PROPERTY (TypeId == 2) */}
                    {item.PropertyTypeId === 2 && (
                      <a
                        href={`/Home/commercialDetails?City=${cityParam}&Name=${formatUrlParam(item.PropertyName)}`}
                        className="pxp-prop-card-1 rounded-lg"
                      >
                        <div className="pxp-prop-card-1-fig pxp-cover">
                          <picture>
                            <source
                              type="image/jpeg"
                              srcSet={item.ListingImage}
                            />
                            <img
                              src={item.ListingImage}
                              title={item.LstImageTitle}
                              alt={item.LstImageAltText}
                            />
                          </picture>
                        </div>
                        <div className="pxp-prop-card-1-gradient pxp-animate"></div>
                        <div className="pxp-prop-card-1-details">
                          <div className="pxp-prop-card-1-details-price text-capitalize">
                            {item.PropertyName}
                          </div>
                          <div className="pxp-prop-card-1-details-cta text-uppercase">
                            <i
                              className="fas fa-map-marker-alt"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.Display_Location} , {cityName}
                          </div>
                        </div>
                      </a>
                    )}

                    {/* LAND PROPERTY (TypeId == 3) */}
                    {item.PropertyTypeId === 3 && (
                      <a
                        href={`/Home/landDetails?City=${cityParam}&Name=${formatUrlParam(item.PropertyName)}`}
                        className="pxp-prop-card-1 rounded-lg"
                      >
                        <div className="pxp-prop-card-1-fig pxp-cover">
                          <picture>
                            <source
                              type="image/jpeg"
                              srcSet={item.ListingImage}
                            />
                            <img
                              src={item.ListingImage}
                              title={item.LstImageTitle}
                              alt={item.LstImageAltText}
                            />
                          </picture>
                        </div>
                        <div className="pxp-prop-card-1-gradient pxp-animate"></div>
                        <div className="pxp-prop-card-1-details">
                          <div className="pxp-prop-card-1-details-price text-capitalize">
                            {item.PropertyName}
                          </div>
                          <div className="pxp-prop-card-1-details-cta text-uppercase">
                            <i
                              className="fas fa-map-marker-alt"
                              aria-hidden="true"
                            ></i>{" "}
                            {item.Display_Location}, {cityName}
                          </div>
                        </div>
                      </a>
                    )}

                    {/* BOTTOM DETAILS BODY */}
                    <div className="featured_txt">
                      <div>{renderProjectStatus(item.ProjectStatus)}</div>

                      <div className="ftr_panel">
                        <div className="row">
                          <div className="col-md-7">
                            <h5>
                              <i className="fas fa-rupee-sign"></i>{" "}
                              {displayPrice} onwards {item.Negotiable && "*"}
                            </h5>
                          </div>

                          {item.PropertyTypeId === 1 && (
                            <>
                              <div className="col-md-5 no-pad-left">
                                <p className="area-unit">{item.AreaRange}</p>
                              </div>
                              <div className="col-md-6">
                                <p className="bhk_block">
                                  {item.RoomName
                                    ? item.RoomName.replace(/"/g, " ").replace(
                                        /[\[\]]/g,
                                        "",
                                      )
                                    : ""}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <div className="viewall m_top_10">
                                  <a
                                    href={`/Home/residentialDetails?City=${cityParam}&Name=${formatUrlParam(item.urlMap)}`}
                                  >
                                    View Details
                                  </a>
                                </div>
                              </div>
                            </>
                          )}

                          {item.PropertyTypeId === 2 && (
                            <>
                              <div className="col-md-4">
                                <h5>
                                  {" "}
                                  {item.BuildupArea}
                                  <i>/ sqft</i>{" "}
                                </h5>
                              </div>
                              <div className="col-md-6">
                                <h5> {item.SubProperty} </h5>
                              </div>
                              <div className="col-md-6">
                                <div className="viewall">
                                  <p className="bhk_block">
                                    <a
                                      href={`/Home/commercialDetails?City=${cityParam}&Name=${formatUrlParam(item.PropertyName)}`}
                                    >
                                      View Details
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {item.PropertyTypeId === 3 && (
                            <>
                              <div className="col-md-4"></div>
                              <div className="col-md-6">
                                <h5>
                                  {item.PlotSize}{" "}
                                  <i>{plotAreaMap[item.PlotArea] || ""}</i>
                                </h5>
                              </div>
                              <div className="col-md-6">
                                <div className="viewall">
                                  <p className="bhk_block">
                                    <a
                                      href={`/Home/landDetails?City=${cityParam}&Name=${formatUrlParam(item.PropertyName)}`}
                                    >
                                      View Details
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
