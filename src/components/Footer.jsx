import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold">FreshGo 🛒</h2>
          <p className="mt-3 text-green-200">
            Smart AI-powered grocery shopping experience.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Legal</h3>
          <div className="flex flex-col gap-2">
            <Link to="/faq">FAQ</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-green-700">
        © 2026 FreshGo. All Rights Reserved.
      </div>
    </footer>
  );
}