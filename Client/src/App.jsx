// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import About from "./About";
import Partner from "./Partner";
import Navbar from "./Navbar";
import Contact from "./Contact";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer stays at the bottom of all pages */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
