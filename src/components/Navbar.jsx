import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  {label:"Profile", to:"/profile"},
  {label:"Wishlist", to:"/wishlist"},

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];

    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(totalItems);
  };

  updateCartCount();

  window.addEventListener("cartUpdated", updateCartCount);

  return () => {
    window.removeEventListener("cartUpdated", updateCartCount);
  };
}, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);
  useEffect(() => {
  const updateLoginState = () => {
    const user = JSON.parse(localStorage.getItem("freshgoCurrentUser"));
    const isLoggedIn = localStorage.getItem("freshgoLoggedIn");

    if (isLoggedIn === "true" && user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  };

  updateLoginState();

  window.addEventListener("loginUpdated", updateLoginState);

  return () => {
    window.removeEventListener("loginUpdated", updateLoginState);
  };
}, []);
const handleLogout = () => {
  localStorage.removeItem("freshgoLoggedIn");
  localStorage.removeItem("freshgoCurrentUser");
  localStorage.removeItem("freshgoToken");
  localStorage.removeItem("freshgoCart");

  window.dispatchEvent(new Event("loginUpdated"));
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --green-deep: #0F172A;
          --green-mid: #1E293B;
          --green-bright: #00E5A8;
          --green-glow: rgba(74, 222, 128, 0.35);
          --cream: #0F172A;
          --cream-soft: rgba(247, 243, 233, 0.85);
          --glass-bg: rgba(247, 243, 233, 0.12);
          --glass-border: rgba(247, 243, 233, 0.22);
          --shadow-glass: 0 8px 40px rgba(26, 77, 46, 0.18);
        }

        .freshgo-nav * { box-sizing: border-box; }

        .freshgo-nav {
          font-family: 'DM Sans', sans-serif;
        }

        .freshgo-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .nav-link-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .glass-nav {
          background: var(--glass-bg);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-glass);
        }

        .glass-nav-scrolled {
          background: rgba(26, 77, 46, 0.72);
          backdrop-filter: blur(32px) saturate(200%);
          -webkit-backdrop-filter: blur(32px) saturate(200%);
          border: 1px solid rgba(74, 222, 128, 0.18);
          box-shadow: 0 8px 48px rgba(26, 77, 46, 0.38), 0 0 0 1px rgba(74,222,128,0.08);
        }

        .nav-pill-active {
          background: rgba(74, 222, 128, 0.18);
          border: 1px solid rgba(74, 222, 128, 0.35);
        }

        .icon-btn {
          transition: all 0.22s cubic-bezier(.4,0,.2,1);
        }

        .icon-btn:hover {
          background: rgba(74, 222, 128, 0.15);
          box-shadow: 0 0 16px rgba(74, 222, 128, 0.3);
          transform: translateY(-1px);
        }

        .login-btn {
          background: linear-gradient(135deg, #00E5A8 0%, #00C2FF 100%);
          border: 1px solid rgba(74, 222, 128, 0.4);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          transition: all 0.25s cubic-bezier(.4,0,.2,1);
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(74,222,128,0.2) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .login-btn:hover {
          box-shadow: 0 0 24px rgba(74, 222, 128, 0.45), 0 4px 16px rgba(26,77,46,0.4);
          transform: translateY(-2px);
          border-color: rgba(74, 222, 128, 0.7);
        }

        .login-btn:hover::before {
          opacity: 1;
        }

        .mobile-nav-bg {
          background: rgba(18, 42, 26, 0.94);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(74, 222, 128, 0.12);
          box-shadow: 0 24px 64px rgba(0,0,0,0.45);
        }

        .mobile-link-item {
          border-bottom: 1px solid rgba(74,222,128,0.07);
          transition: all 0.18s ease;
        }

        .mobile-link-item:hover {
          background: rgba(74,222,128,0.08);
        }

        .leaf-glow {
          filter: drop-shadow(0 0 8px rgba(74,222,128,0.6));
        }

        .search-input {
          background: rgba(247,243,233,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
        }

        .search-input::placeholder { color: rgba(247,243,233,0.45); }

        .search-input:focus {
          background: rgba(74,222,128,0.1);
          border-color: rgba(74,222,128,0.55);
          box-shadow: 0 0 16px rgba(74,222,128,0.2);
        }
      `}</style>

      <motion.nav
        className={`freshgo-nav fixed top-0 left-0 right-0 z-50`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Floating pill wrapper */}
        <div className="px-4 pt-4 pb-2">
          <motion.div
            className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
              scrolled ? "glass-nav-scrolled" : "glass-nav"
            }`}
            layout
          >
            <div className="px-5 py-3 flex items-center justify-between gap-4">

              {/* ── Logo ── */}
              <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -12, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#2d7a4f,#1a4d2e)" }}>
                    <Leaf size={16} className="text-green-300 leaf-glow" strokeWidth={2.5} />
                  </div>
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className={`freshgo-logo-text text-xl ${scrolled ? "text-green-100" : "text-green-900"}`}>
                  Fresh<span className="text-[#00E5A8]">Go</span>
                </span>
              </Link>

              {/* ── Desktop Nav Links ── */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;
                  return (
                    <Link key={link.label} to={link.to}>
                      <motion.div
                        className={`nav-link-label relative px-4 py-2 rounded-xl text-sm cursor-pointer
                          ${active ? "nav-pill-active" : ""}
                          ${scrolled ? "text-green-100 hover:text-white" : "text-green-900 hover:text-green-700"}`}
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.15 }}
                      >
                        {link.label}
                        {active && (
                          <motion.div
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400"
                            layoutId="nav-dot"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* ── Right Controls ── */}
              <div className="flex items-center gap-2">

                {/* Search — desktop expandable */}
                <div className="hidden md:flex items-center gap-2">
                  <AnimatePresence>
                    {searchActive && (
                      <motion.input
                        key="search"
                        className="search-input rounded-xl px-3 py-1.5 text-sm w-40"
                        placeholder="Search fresh..."
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 160, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        autoFocus
                        onBlur={() => setSearchActive(false)}
                      />
                    )}
                  </AnimatePresence>
                  <motion.button
                    className={`icon-btn w-9 h-9 rounded-xl flex items-center justify-center
                      ${scrolled ? "text-green-200" : "text-green-800"}`}
                    onClick={() => setSearchActive((v) => !v)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search size={17} strokeWidth={2} />
                  </motion.button>
                </div>

                {/* Cart */}
                {/* Cart */}
<Link to="/cart">
  <motion.button
    className={`icon-btn relative w-9 h-9 rounded-xl flex items-center justify-center
      ${scrolled ? "text-green-200" : "text-green-800"}`}
    whileTap={{ scale: 0.88 }}
  >
    <ShoppingCart size={17} strokeWidth={2} />

    {cartCount > 0 && (
      <motion.span
        className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] rounded-full
        bg-green-400 text-green-950 text-[10px] font-bold flex items-center justify-center leading-none px-0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      >
        {cartCount}
      </motion.span>
    )}
  </motion.button>
</Link>
                

                {/* Login — desktop */}
           {currentUser ? (
  <div className="hidden md:flex items-center gap-3">
    <span
      className={`text-sm font-semibold ${
        scrolled ? "text-green-100" : "text-green-900"
      }`}
    >
      👤 {currentUser.name}
    </span>

    <button
      onClick={handleLogout}
      className="login-btn text-green-100 text-sm px-4 py-2 rounded-xl"
    >
      Logout
    </button>
  </div>
) : (
  <Link to="/login">
    <motion.button
      className="hidden md:flex login-btn text-green-100 text-sm px-4 py-2 rounded-xl items-center gap-1.5"
      whileTap={{ scale: 0.95 }}
    >
      <Sparkles size={13} className="text-green-300" />
      Login
    </motion.button>
  </Link>
)}
                {/* Hamburger — mobile */}
                <motion.button
                  className={`md:hidden icon-btn w-9 h-9 rounded-xl flex items-center justify-center
                    ${scrolled ? "text-green-200" : "text-green-800"}`}
                  onClick={() => setMobileOpen((v) => !v)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? (
                      <motion.span key="x"
                        initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <X size={18} strokeWidth={2.5} />
                      </motion.span>
                    ) : (
                      <motion.span key="menu"
                        initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Menu size={18} strokeWidth={2.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  className="md:hidden mobile-nav-bg mx-2 mb-2 rounded-2xl overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Search bar mobile */}
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center gap-2 search-input rounded-xl px-3 py-2">
                      <Search size={14} className="text-green-400 flex-shrink-0" />
                      <input
                        className="bg-transparent text-sm text-green-100 placeholder-green-700 outline-none w-full"
                        placeholder="Search fresh produce..."
                      />
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="px-2 py-2">
                    {navLinks.map((link, i) => {
                      const active = location.pathname === link.to;
                      return (
                        <motion.div
                          key={link.label}
                          initial={{ x: -24, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                        >
                          <Link to={link.to}>
                            <div className={`mobile-link-item flex items-center justify-between px-4 py-3.5 rounded-xl mx-1 mb-0.5
                              ${active ? "bg-white/5/40" : ""}`}>
                              <span className={`nav-link-label text-sm ${active ? "text-green-300" : "text-green-100"}`}>
                                {link.label}
                              </span>
                              <ChevronRight size={14} className={active ? "text-green-400" : "text-green-700"} />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Login mobile */}
                  <motion.div
                    className="px-4 pb-4 pt-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.32 }}
                  >
                    <button className="login-btn w-full py-3 rounded-xl text-green-100 text-sm flex items-center justify-center gap-2">
                      <Sparkles size={14} className="text-green-300" />
                      Sign In to FreshGo
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}