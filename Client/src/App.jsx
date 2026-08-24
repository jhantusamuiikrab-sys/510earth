// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./pages/Footer";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";
import OurServices from "./pages/OurServices";
import PropertyManagement from "./pages/PropertyManagement";
import Home from "./pages/Home";
import LandListing from "./pages/LandListing";
import Navbar from "./pages/Navbar";
import ResidentialDetails from "./Panel/ResidentialDetails"; 
import LandDetails from "./Panel/LandDetails";


function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/land" element={<LandListing />} />
        <Route path="/residential-details" element={<ResidentialDetails />} />
        <Route path="/land-details" element={<LandDetails />} />
      </Routes>
 
      {/* Footer stays at the bottom of all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
