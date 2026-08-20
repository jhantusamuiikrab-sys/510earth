import React from "react";
// 1. Import the HeroSection component from the same directory

//import HeroSection from "../Home/HeroSection";
import HeroSection from "./Home/HeroSection"; // Adjusted import path for consistency
import ReraSection from "./Home/ReraSection";
import LeadingSection from "./Home/LeadingSection";
import ChooseSection from "./Home/ChooseSection";
import ServiceSection from "./Home/ServiceSection";
import PropertyTypeSection from "./Home/PropertyTypeSection";
import BenefitSection from "./Home/BenefitSection";
import FeatureProperty from "./Home/FeatureProperty";

const Home = () => {
  return (
    <div className="home-page-wrapper">
      {/* 2. Render the HeroSection component */}
      <HeroSection />
      <FeatureProperty />
      <ReraSection />
      <LeadingSection />
      <ChooseSection />
      <ServiceSection />
      <PropertyTypeSection />
      <BenefitSection />

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
