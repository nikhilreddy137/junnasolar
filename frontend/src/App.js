import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Homes from "@/pages/Homes";
import Businesses from "@/pages/Businesses";
import Societies from "@/pages/Societies";
import CaseStudies from "@/pages/CaseStudies";
import TrustCertificates from "@/pages/TrustCertificates";
import Contact from "@/pages/Contact";
import Products from "@/pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/residential" element={<Homes />} />
            <Route path="/commercial" element={<Businesses />} />
            <Route path="/communities" element={<Societies />} />
            <Route path="/homes" element={<Homes />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/trust" element={<TrustCertificates />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/solar-module" element={<Products />} />
            <Route path="/product/solar-cell" element={<Products />} />
            <Route path="/product/mounting-structure" element={<Products />} />
            {/* Legacy .php redirects */}
            <Route path="/index.php" element={<Navigate to="/" replace />} />
            <Route path="/home.php" element={<Navigate to="/homes" replace />} />
            <Route path="/business.php" element={<Navigate to="/businesses" replace />} />
            <Route path="/society.php" element={<Navigate to="/societies" replace />} />
            <Route path="/contact.php" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
