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
  { label: "Profile", to: "/profile" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Reviews", to: "/reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .freshgo-nav {
          font-family: 'DM Sans', sans-serif;
        }

        .freshgo-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .glass-nav {
          background: rgba(27, 15, 45, 0.62);
          backdrop-filter: blur(26px) saturate(180%);
          -webkit-backdrop-filter: blur(26px) saturate(180%);
          border: 1px solid rgba(223, 255, 94, 0.16);
          box-shadow: 0 0 35px rgba(168, 85, 247, 0.16);
        }

        .glass-nav-scrolled {
          background: rgba(8, 3, 18, 0.88);
          backdrop-filter: blur(34px) saturate(200%);
          -webkit-backdrop-filter: blur(34px) saturate(200%);
          border: 1px solid rgba(223, 255, 94, 0.26);
          box-shadow: 0 0 40px rgba(223, 255, 94, 0.12),
                      0 8px 45px rgba(168, 85, 247, 0.2);
        }

        .nav-pill-active {
          background: rgba(223, 255, 94, 0.12);
          border: 1px solid rgba(223, 255, 94, 0.35);
          color: #DFFF5E;
          box-shadow: 0 0 18px rgba(223, 255, 94, 0.12);
        }

        .icon-btn {
          transition: all 0.25s ease;
        }

        .icon-btn:hover {
          background: rgba(223, 255, 94, 0.12);
          box-shadow: 0 0 18px rgba(223, 255, 94, 0.18);
          transform: translateY(-1px);
        }

        .login-btn {
          background: linear-gradient(135deg, #DFFF5E 0%, #B26BFF 100%);
          color: #080312;
          font-weight: 800;
          transition: all 0.25s ease;
          box-shadow: 0 0 22px rgba(223, 255, 94, 0.22);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(223, 255, 94, 0.4);
        }

        .mobile-nav-bg {
          background: rgba(12, 6, 25, 0.96);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(223, 255, 94, 0.16);
          box-shadow: 0 24px 64px rgba(0,0,0,0.55);
        }

        .mobile-link-item {
          border-bottom: 1px solid rgba(223,255,94,0.08);
          transition: all 0.2s ease;
        }

        .mobile-link-item:hover {
          background: rgba(223,255,94,0.08);
        }

        .leaf-glow {
          filter: drop-shadow(0 0 8px rgba(223,255,94,0.7));
        }

        .search-input {
          background: rgba(16, 8, 31, 0.9);
          border: 1px solid rgba(223,255,94,0.25);
          color: #ffffff;
          outline: none;
          transition: all 0.2s;
        }

        .search-input::placeholder {
          color: rgba(216, 196, 255, 0.6);
        }

        .search-input:focus {
          border-color: rgba(223,255,94,0.65);
          box-shadow: 0 0 18px rgba(223,255,94,0.2);
        }
      `}</style>

      <motion.nav
        className="freshgo-nav fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-4 pt-4 pb-2">
          <motion.div
            className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 ${
              scrolled ? "glass-nav-scrolled" : "glass-nav"
            }`}
            layout
          >
            <div className="px-5 py-3 flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -12, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#6D4AFF] to-[#B26BFF] shadow-[0_0_22px_rgba(178,107,255,0.35)]">
                    <Leaf
                      size={19}
                      className="text-lime-300 leaf-glow"
                      strokeWidth={2.5}
                    />
                  </div>

                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lime-300"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <span className="freshgo-logo-text text-2xl text-white">
                  Fresh<span className="text-lime-300">Go</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const active = location.pathname === link.to;

                  return (
                    <Link key={link.label} to={link.to}>
                      <motion.div
                        className={`relative px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition
                          ${
                            active
                              ? "nav-pill-active"
                              : "text-purple-100 hover:text-lime-300"
                          }`}
                        whileHover={{ y: -1 }}
                      >
                        {link.label}

                        {active && (
                          <motion.div
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime-300"
                            layoutId="nav-dot"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <AnimatePresence>
                    {searchActive && (
                      <motion.input
                        key="search"
                        className="search-input rounded-xl px-3 py-2 text-sm w-44"
                        placeholder="Search fresh..."
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 176, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        autoFocus
                        onBlur={() => setSearchActive(false)}
                      />
                    )}
                  </AnimatePresence>

                  <motion.button
                    className="icon-btn w-10 h-10 rounded-xl flex items-center justify-center text-purple-100 hover:text-lime-300"
                    onClick={() => setSearchActive((v) => !v)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search size={18} />
                  </motion.button>
                </div>

                <Link to="/cart">
                  <motion.button
                    className="icon-btn relative w-10 h-10 rounded-xl flex items-center justify-center text-purple-100 hover:text-lime-300"
                    whileTap={{ scale: 0.88 }}
                  >
                    <ShoppingCart size={18} />

                    {cartCount > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 min-w-[19px] min-h-[19px] rounded-full bg-lime-300 text-[#080312] text-[10px] font-black flex items-center justify-center px-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 20,
                        }}
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </motion.button>
                </Link>

                {currentUser ? (
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-purple-300">
                        Welcome back ✨
                      </div>
                      <div className="text-sm font-bold text-lime-300">
                        👤 {currentUser.name}
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="login-btn text-sm px-4 py-2 rounded-xl"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <motion.button
                      className="hidden md:flex login-btn text-sm px-4 py-2 rounded-xl items-center gap-1.5"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles size={14} />
                      Login
                    </motion.button>
                  </Link>
                )}

                <motion.button
                  className="md:hidden icon-btn w-10 h-10 rounded-xl flex items-center justify-center text-purple-100 hover:text-lime-300"
                  onClick={() => setMobileOpen((v) => !v)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? (
                      <motion.span
                        key="x"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <X size={19} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Menu size={19} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  className="md:hidden mobile-nav-bg mx-2 mb-2 rounded-2xl overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center gap-2 search-input rounded-xl px-3 py-2">
                      <Search size={14} className="text-lime-300 flex-shrink-0" />
                      <input
                        className="bg-transparent text-sm text-white placeholder-purple-300 outline-none w-full"
                        placeholder="Search fresh produce..."
                      />
                    </div>
                  </div>

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
                            <div
                              className={`mobile-link-item flex items-center justify-between px-4 py-3.5 rounded-xl mx-1 mb-0.5 ${
                                active ? "bg-lime-300/10" : ""
                              }`}
                            >
                              <span
                                className={`text-sm font-semibold ${
                                  active ? "text-lime-300" : "text-purple-100"
                                }`}
                              >
                                {link.label}
                              </span>

                              <ChevronRight
                                size={14}
                                className={
                                  active ? "text-lime-300" : "text-purple-400"
                                }
                              />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div
                    className="px-4 pb-4 pt-2"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.32 }}
                  >
                    {currentUser ? (
                      <button
                        onClick={handleLogout}
                        className="login-btn w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/login">
                        <button className="login-btn w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                          <Sparkles size={14} />
                          Sign In to FreshGo
                        </button>
                      </Link>
                    )}
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