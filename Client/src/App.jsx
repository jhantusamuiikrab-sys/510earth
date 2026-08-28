import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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
import { PropertyListingsPage } from "./Panel/ResidentialDetails/PropertyListingsPage";
import Login from "./Panel/PostProperty/Login";
import PostProperty from "./Panel/PostProperty";
import DashboardMain from "./Panel/PostProperty/Dashboard/DashboardMain";

// Helper component to manage conditional layouts inside BrowserRouter context
function MainLayout() {
  const location = useLocation();

  // Define paths where the Navbar should be hidden
  const hideNavbarPaths = ["/post-property-dashboard"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

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
        <Route path="/residential" element={<PropertyListingsPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-property" element={<PostProperty />} />
        <Route path="/post-property-dashboard" element={<DashboardMain />} />
      </Routes>

      {/* Optionally hide Footer as well on dashboard if needed */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;