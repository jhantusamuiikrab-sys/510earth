import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Public Components
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";
import OurServices from "./pages/OurServices";
import PropertyManagement from "./pages/PropertyManagement";
import LandListing from "./pages/LandListing";
import ResidentialDetails from "./Panel/ResidentialDetails";
import LandDetails from "./Panel/LandDetails";
import { PropertyListingsPage } from "./Panel/ResidentialDetails/PropertyListingsPage";
import Login from "./Panel/PostProperty/Login";
import PostProperty from "./Panel/PostProperty";

// Admin Routes
import AdminRoutes from "./admin/routes/adminroutes";

// User Dashboard Components
import DashboardMain from "./Panel/PostProperty/Dashboard/DashboardMain";
import DashboardContent from "./Panel/PostProperty/Dashboard/DashboardContent";
import ViewProperty from "./Panel/PostProperty/Dashboard/ViewProperty";
import ChangePassword from "./Panel/PostProperty/Dashboard/ChangePassword";
import UploadContextLayout from "./Panel/PostProperty/Dashboard/UploadContextLayout";
import UploadNewProperty from "./Panel/PostProperty/Dashboard/UploadNewProperty";
import FlatApartmentList from "./Panel/PostProperty/Dashboard/management/FlatApartmentList";
import IndependentHouseVila from "./Panel/PostProperty/Dashboard/management/IndependentHouseVila";
import CommercialPropertyList from "./Panel/PostProperty/Dashboard/management/CommercialPropertyList";
import EditFlatApartment from "./Panel/PostProperty/Dashboard/edit/EditFlatApartment";
import IndpHVEditProperty from "./Panel/PostProperty/Dashboard/edit/IndpHVEditProperty";
import CommercialEditProperty from "./Panel/PostProperty/Dashboard/edit/CommercialEditProperty";

// Step Components
import FlatApartmentBasicDetails from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentBasicDetails";
import FlatApartmentKeyFeatures from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentKeyFeatures";
import FlatApartmentPropertyDetails from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentPropertyDetails";
import FlatApartmentOtherInfo from "./Panel/PostProperty/Dashboard/steps/flat/FlatApartmentOtherInfo";

function MainContent() {
  const location = useLocation();

  // Hide Navbar & Footer for both /dashboard and /admin routes
  const isDashboardOrAdmin =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isDashboardOrAdmin && <Navbar />}

      <Routes>
        {/* PUBLIC SECTION */}
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

        {/* ADMIN SECTION */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* USER DASHBOARD SECTION */}
        <Route path="/dashboard" element={<DashboardMain />}>
          <Route index element={<DashboardContent />} />
          <Route path="view-property" element={<ViewProperty />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="flat-apartment-list" element={<FlatApartmentList />} />
          <Route path="independent-house/vila-list" element={<IndependentHouseVila />} />
          <Route path="commercial-property-list" element={<CommercialPropertyList />} />
          <Route path="edit-flat-apartment/:id" element={<EditFlatApartment />} />
          <Route path="edit-independent-house-vila/:id" element={<IndpHVEditProperty />} />
          <Route path="edit-commercial-property/:id" element={<CommercialEditProperty />} />

          <Route path="upload" element={<UploadContextLayout />}>
            <Route index element={<UploadNewProperty />} />
            <Route path="sell/residential/flat-apartment">
              <Route index element={<Navigate to="basic-details" replace />} />
              <Route path="basic-details" element={<FlatApartmentBasicDetails />} />
              <Route path="key-features" element={<FlatApartmentKeyFeatures />} />
              <Route path="property-details" element={<FlatApartmentPropertyDetails />} />
              <Route path="other-information" element={<FlatApartmentOtherInfo />} />
            </Route>
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

      {!isDashboardOrAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}