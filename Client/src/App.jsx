import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

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

// Dashboard Components
import DashboardMain from "./Panel/PostProperty/Dashboard/DashboardMain";
import DashboardContent from "./Panel/PostProperty/Dashboard/DashboardContent";
import ViewProperty from "./Panel/PostProperty/Dashboard/ViewProperty";
import ChangePassword from "./Panel/PostProperty/Dashboard/ChangePassword";
import UploadContextLayout from "./Panel/PostProperty/Dashboard/UploadContextLayout";
import UploadNewProperty from "./Panel/PostProperty/Dashboard/UploadNewProperty";

// Management Components
import FlatApartmentList from "./Panel/PostProperty/Dashboard/management/FlatApartmentList";
import IndependentHouseVila from "./Panel/PostProperty/Dashboard/management/IndependentHouseVila";
import CommercialPropertyList from "./Panel/PostProperty/Dashboard/management/CommercialPropertyList";

// Edit Components
import EditFlatApartment from "./Panel/PostProperty/Dashboard/edit/EditFlatApartment";
import IndpHVEditProperty from "./Panel/PostProperty/Dashboard/edit/IndpHVEditProperty";
import CommercialEditProperty from "./Panel/PostProperty/Dashboard/edit/CommercialEditProperty";

// Step Components
import FlatApartmentBasicDetails from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentBasicDetails";
import FlatApartmentKeyFeatures from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentKeyFeatures";
import FlatApartmentPropertyDetails from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentPropertyDetails";
import FlatApartmentOtherInfo from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentOtherInfo";

function MainLayout() {
  const location = useLocation();

  // Hide Navbar/Footer on all dashboard routes
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}

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
        <Route path="/residential" element={<PropertyListingsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-property" element={<PostProperty />} />

        {/* NESTED DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardMain />}>
          <Route index element={<DashboardContent />} />
          <Route path="view-property" element={<ViewProperty />} />
          <Route path="change-password" element={<ChangePassword />} />
          
          {/* Property Management */}
          <Route path="flat-apartment-list" element={<FlatApartmentList />} />
          <Route path="independent-house/vila-list" element={<IndependentHouseVila />} />
          <Route path="commercial-property-list" element={<CommercialPropertyList />} />
          
          {/* Edit Routes */}
          <Route path="edit-flat-apartment/:id" element={<EditFlatApartment />} />
          <Route path="edit-independent-house-vila/:id" element={<IndpHVEditProperty />} />
          <Route path="edit-commercial-property/:id" element={<CommercialEditProperty />} />

          {/* Upload Flow with Context */}
          <Route path="upload" element={<UploadContextLayout />}>
            <Route index element={<UploadNewProperty />} />
            
            {/* 1. SELL (New) Residential Flat/Apartment Flow */}
            <Route path="sell/residential/flat-apartment">
              <Route index element={<Navigate to="basic-details" replace />} />
              <Route path="basic-details" element={<FlatApartmentBasicDetails />} />
              <Route path="key-features" element={<FlatApartmentKeyFeatures />} />
              <Route path="property-details" element={<FlatApartmentPropertyDetails />} />
              <Route path="other-information" element={<FlatApartmentOtherInfo />} />
            </Route>

            {/* 2. RESELL Residential Flat/Apartment Flow */}
            <Route path="resell/residential/flat-apartment">
              <Route index element={<Navigate to="basic-details" replace />} />
              <Route path="basic-details" element={<FlatApartmentBasicDetails />} />
              <Route path="key-features" element={<FlatApartmentKeyFeatures />} />
              <Route path="property-details" element={<FlatApartmentPropertyDetails />} />
              <Route path="other-information" element={<FlatApartmentOtherInfo />} />
            </Route>
          </Route>
        </Route>
      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}