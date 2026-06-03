import { Link } from "react-router-dom";
import { Leaf, Sparkles, ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#080312] text-white mt-20 overflow-hidden border-t border-lime-300/20">
      <div className="absolute top-0 left-10 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#6D4AFF] to-[#B26BFF] flex items-center justify-center shadow-[0_0_22px_rgba(178,107,255,0.35)]">
              <Leaf className="text-lime-300" size={22} />
            </div>

            <h2 className="text-3xl font-black">
              Fresh<span className="text-lime-300">Go</span>
            </h2>
          </div>

          <p className="text-purple-200 leading-relaxed max-w-sm">
            Smart AI-powered grocery shopping experience with fresh picks,
            faster checkout, and a premium shopping vibe.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 bg-[#1b0f2d]/80 border border-lime-300/25 text-lime-300 px-4 py-2 rounded-full text-sm shadow-[0_0_20px_rgba(223,255,94,0.12)]">
            <Sparkles size={15} />
            Freshness delivered smartly
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-lime-300">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-purple-200">
            <Link className="hover:text-lime-300 transition" to="/">
              Home
            </Link>
            <Link className="hover:text-lime-300 transition" to="/products">
              Products
            </Link>
            <Link className="hover:text-lime-300 transition" to="/about">
              About
            </Link>
            <Link className="hover:text-lime-300 transition" to="/contact">
              Contact
            </Link>
            <Link className="hover:text-lime-300 transition" to="/wishlist">
              Wishlist
            </Link>
            <Link className="hover:text-lime-300 transition" to="/reviews">
              Reviews
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4 text-lime-300">
            Legal & Support
          </h3>

          <div className="flex flex-col gap-3 text-purple-200">
            <Link className="hover:text-lime-300 transition" to="/faq">
              FAQ
            </Link>
            <Link
              className="hover:text-lime-300 transition"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link className="hover:text-lime-300 transition" to="/terms">
              Terms & Conditions
            </Link>
            <Link className="hover:text-lime-300 transition" to="/cart">
              Cart
            </Link>
          </div>

          <div className="mt-6 bg-[#1b0f2d]/80 border border-purple-400/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-300/10 flex items-center justify-center text-lime-300">
              <ShoppingCart size={20} />
            </div>

            <p className="text-sm text-purple-200">
              Shop groceries smarter with FreshGo.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center py-5 border-t border-purple-400/20 text-purple-300 text-sm">
        © 2026 <span className="text-lime-300 font-semibold">FreshGo</span>.
        All Rights Reserved.
      </div>
    </footer>
  );
}