import React from 'react';
// 1. Import the HeroSection component from the same directory

import HeroSection from './Home/HeroSection'; 
import ReraSection from './Home/ReraSection';
import LeadingSection from './Home/LeadingSection';
import ChooseSection from './Home/ChooseSection';

const Home = () => {
  return (
    <div className="home-page-wrapper">

      {/* 2. Render the HeroSection component */}
      <HeroSection />     
      <ReraSection />
      <LeadingSection />
      <ChooseSection />s
      {/* <Footer /> */}
    </div>
  );
};

export default Home;