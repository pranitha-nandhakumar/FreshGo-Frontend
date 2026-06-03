import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import IntroScreen from "./components/IntroScreen";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import ResetPassword from "./pages/ResetPassword";  
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import EditProfile from "./pages/EditProfile";
 
import Addresses from "./pages/Addresses";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Reviews from "./pages/Reviews";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} />}

      <div className="min-h-screen bg-[#FFF8E7]">
        <Navbar />

        <main className="pt-28 px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        


     <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;