
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LocationFinder from "../components/LocationFinder";
import VoiceShopping from "../components/VoiceShopping";
import SmartFridge from "../components/SmartFridge";
import heroFreshgo from "../assets/hero-freshgo-new.png";
import RecipeSuggestions from "../components/RecipeSuggestions";

import {
  Search,
  SlidersHorizontal,
  MapPin,
  Bell,
  Leaf,
  Truck,
  BadgePercent,
  Heart,
  Star,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Vegetables",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500",
    },
    {
      name: "Fruits",
      img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500",
    },
    {
      name: "Dairy",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",
    },
    {
      name: "Bakery",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
    },
    {
      name: "Beverages",
      img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500",
    },
  ];

  

  const imageBanners = [
    {
      title: "Organic Fresh Picks",
      text: "Handpicked fruits and vegetables for your everyday meals.",
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700",
    },
    {
      title: "Daily Essentials",
      text: "Milk, bread, rice, oil and more delivered quickly.",
      img: "https://images.unsplash.com/photo-1543168256-418811576931?w=700",
    },
    {
      title: "Healthy Lifestyle",
      text: "Smart grocery picks based on your mood and lifestyle.",
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=700",
    },
  ];

  const featured = [
    {
      name: "Fresh Strawberry",
      price: 120,
      oldPrice: 150,
      img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500",
      offer: "15% OFF",
    },
    {
      name: "Orange",
      price: 90,
      oldPrice: 110,
      img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500",
      offer: "20% OFF",
    },
    {
      name: "Broccoli",
      price: 80,
      oldPrice: 100,
      img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500",
      offer: "10% OFF",
    },
    {
      name: "Fresh Apples",
      price: 120,
      oldPrice: 140,
      img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
      offer: "12% OFF",
    },
  ];

  const recommended = [
    {
      name: "Milk",
      reason: "Daily essential",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    },
    {
      name: "Bread",
      reason: "Perfect with breakfast",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    },
    {
      name: "Chocolate",
      reason: "Popular craving pick",
      img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400",
    },
    {
      name: "Shampoo",
      reason: "Monthly personal care",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    },
  ];
  const flashDeals = [
  {
    name: "Milk",
    price: 35,
    oldPrice: 45,
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500",
    offer: "22% OFF",
  },
  {
    name: "Bread",
    price: 29,
    oldPrice: 40,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500",
    offer: "27% OFF",
  },
  {
    name: "Fresh Apples",
    price: 99,
    oldPrice: 120,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    offer: "18% OFF",
  },
  {
    name: "Chocolate",
    price: 69,
    oldPrice: 90,
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500",
    offer: "23% OFF",
  },
];
  const [selectedLocation, setSelectedLocation] = useState("Chennai,India");

const locations = [
  "Chennai, India",
  "Coimbatore, India",
  "Erode, India",
  "Salem, India",
  "Tiruchengode, India",
  "Bangalore, India",
];

  return (
    <div className="min-h-screen bg-[#080312] text-[#FFF7ED] overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-8 pb-20">
        <div className="max-w-7xl mx-auto mb-10">
  <div className="bg-[#1E1433]/80 border border-white/10 rounded-[30px] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-purple-950/30">
    
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-2xl bg-[#E9FF70]/15 flex items-center justify-center text-[#E9FF70]">
        <MapPin size={22} />
      </div>

      <div>
        <p className="text-sm text-[#C9B8E8]">Delivering to</p>
        <select
  value={selectedLocation}
  onChange={(e) => setSelectedLocation(e.target.value)}
  className="bg-[#12091F] text-[#E9FF70] font-bold px-2 py-1 rounded-lg outline-none cursor-pointer border border-[#E9FF70]/20"
>
  {locations.map((loc) => (
    <option key={loc} value={loc} className="bg-[#12091F] text-white">
      {loc}
    </option>
  ))}
</select>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm">
        🚚 10–20 min delivery
      </span>

      <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm">
        🥦 Fresh daily stock
      </span>

      <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm">
        🤖 AI smart picks
      </span>
    </div>

    <Link to="/products">
      <button className="bg-[#E9FF70] text-[#12091F] px-6 py-3 rounded-full font-bold">
        Start Shopping
      </button>
    </Link>
  </div>
</div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E9FF70]/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/25 blur-[120px] rounded-full" />

        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative bg-[#1E1433]/80 border border-white/10 rounded-[45px] p-8 shadow-2xl shadow-purple-950/40 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#E9FF70_0%,transparent_38%)] opacity-20" />

              <div className="relative z-10 rounded-[35px] overflow-hidden bg-[#12091F]">
                <img
  src={heroFreshgo}
  alt="Fresh grocery shopping"
  className="w-full h-[520px] object-cover rounded-[35px]"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#12091F] via-transparent to-transparent" />
              </div>

              <motion.div
                className="absolute top-14 right-14 bg-[#080312]/80 border border-[#E9FF70]/30 rounded-full w-24 h-24 flex items-center justify-center text-center text-xs font-bold text-[#E9FF70] shadow-[0_0_30px_rgba(233,255,112,0.25)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                SHOP SMART
                <br />
                EAT FRESH
              </motion.div>

              <div className="relative z-20 grid grid-cols-3 gap-4 -mt-24">
                {[
                  {
                    icon: <Leaf />,
                    title: "Farm Fresh",
                    text: "Top-grade produce",
                  },
                  {
                    icon: <Truck />,
                    title: "Fast Delivery",
                    text: "10–20 mins",
                  },
                  {
                    icon: <BadgePercent />,
                    title: "Best Price",
                    text: "Fresh offers",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="bg-[#24163D]/90 border border-white/10 rounded-3xl p-4 text-center backdrop-blur-xl"
                  >
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#E9FF70]/15 flex items-center justify-center text-[#E9FF70] mb-3">
                      {item.icon}
                    </div>

                    <h3 className="font-bold text-sm">{item.title}</h3>
                    <p className="text-xs text-[#C9B8E8] mt-1">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-[#C9B8E8] text-sm">Location</p>

                <div className="flex items-center gap-2 text-[#E9FF70] font-semibold">
                  <MapPin size={18} />
                  {selectedLocation}
                </div>
              </div>

              <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <Bell size={20} />
              </button>
            </div>

            <p className="text-[#FFB86B] font-semibold mb-4">
              FreshGo Smart Grocery
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Find{" "}
              <span className="text-[#E9FF70] italic">
                fresh groceries
              </span>
              <br />
              anytime, anywhere easy
            </h1>

            <p className="text-[#C9B8E8] mt-6 max-w-xl text-lg">
              Get fresh groceries and essentials delivered quickly with
              AI-powered smart shopping, mood picks, and fresh recommendations.
            </p>

            <div className="mt-8 flex gap-3 bg-[#1E1433]/90 border border-white/10 rounded-3xl p-3 max-w-xl">
              <Search className="text-[#C9B8E8] mt-3 ml-2" />

              <input
                placeholder="Search Products..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-[#C9B8E8]"
              />

              <Link to="/products">
                <button className="bg-[#E9FF70] text-[#12091F] p-4 rounded-2xl">
                  <SlidersHorizontal />
                </button>
              </Link>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link to="/products">
                <button className="bg-[#E9FF70] text-[#12091F] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#dfff45] transition">
                  Shop Now
                </button>
              </Link>

              <Link to="/wishlist">
                <button className="bg-white/10 border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition">
                  Wishlist ❤️
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BANNERS */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {imageBanners.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -8 }}
              className="relative h-72 rounded-[35px] overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/30"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080312] via-[#080312]/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-[#C9B8E8] mt-2">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto bg-[#1E1433]/80 border border-white/10 rounded-[35px] p-8 grid md:grid-cols-2 gap-8 items-center shadow-2xl shadow-purple-950/30">
          <div>
            <span className="bg-white/10 text-[#E9FF70] px-4 py-2 rounded-full text-sm">
              Exclusive Offer
            </span>

            <h2 className="text-4xl font-bold mt-6">
              Get{" "}
              <span className="text-[#E9FF70] italic">
                Special Offers
              </span>
            </h2>

            <p className="text-[#C9B8E8] mt-3">
              Up to 30% off on fresh vegetables, fruits, dairy and daily
              essentials.
            </p>

            <Link to="/products">
              <button className="mt-6 bg-[#E9FF70] text-[#12091F] px-6 py-3 rounded-full font-bold">
                Shop Offer
              </button>
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=700"
            alt="Offer"
            className="w-full h-64 object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <Link to="/products" className="text-[#E9FF70]">
              See All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.map((cat) => (
              <Link key={cat.name} to={`/products?category=${cat.name}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-44 rounded-[30px] overflow-hidden border border-white/10 shadow-xl shadow-purple-950/30 group"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080312] via-[#080312]/40 to-transparent" />

                  <h3 className="absolute bottom-5 left-5 text-xl font-bold">
                    {cat.name}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* FLASH DEALS */}
<section className="px-6 py-10">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-bold">⚡ Flash Deals</h2>
        <p className="text-[#C9B8E8] mt-2">
          Limited-time FreshGo offers ending soon.
        </p>
      </div>

      <div className="bg-[#1E1433]/80 border border-[#E9FF70]/20 text-[#E9FF70] px-5 py-3 rounded-2xl font-bold">
        Ends in 03:45:22
      </div>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {flashDeals.map((deal) => (
        <motion.div
          key={deal.name}
          whileHover={{ y: -8 }}
          className="bg-[#1E1433]/80 border border-white/10 rounded-[30px] p-5 shadow-xl shadow-purple-950/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#E9FF70] text-[#12091F] px-4 py-2 rounded-bl-2xl text-sm font-black">
            {deal.offer}
          </div>

          <img
            src={deal.img}
            alt={deal.name}
            className="w-full h-40 object-cover rounded-3xl mt-6"
          />

          <h3 className="text-xl font-bold mt-4">{deal.name}</h3>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-2xl font-extrabold text-[#E9FF70]">
              ₹{deal.price}
            </span>

            <span className="text-[#C9B8E8]/60 line-through">
              ₹{deal.oldPrice}
            </span>
          </div>

          <Link to="/products">
            <button className="mt-5 w-full bg-[#E9FF70] text-[#12091F] font-bold py-3 rounded-2xl">
              Shop Deal
            </button>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* FEATURED PRODUCTS */}
      <section className="px-6 py-10 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-[#E9FF70]">
              See All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -8 }}
                className="bg-[#1E1433]/80 border border-white/10 rounded-[30px] p-5 shadow-xl shadow-purple-950/30"
              >
                <div className="relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-44 object-cover rounded-3xl"
                  />

                  <span className="absolute top-3 left-3 bg-[#E9FF70] text-[#12091F] px-3 py-1 rounded-full text-sm font-bold">
                    {item.offer}
                  </span>

                  <button className="absolute top-3 right-3 bg-black/50 p-2 rounded-full text-red-400">
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>

                <p className="text-[#E9FF70] mt-4 text-sm">Fresh Pick</p>
                <h3 className="text-xl font-bold mt-1">{item.name}</h3>

                <div className="flex items-center gap-1 text-yellow-400 mt-2">
                  <Star size={16} fill="currentColor" />
                  <span>4.9</span>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <div>
                    <span className="text-2xl font-bold">₹{item.price}</span>
                    <span className="text-[#C9B8E8]/60 line-through ml-2">
                      ₹{item.oldPrice}
                    </span>
                  </div>

                  <Link to="/products">
                    <button className="bg-[#E9FF70] text-[#12091F] p-3 rounded-full">
                      <ShoppingCart size={18} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED FOR YOU */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Recommended For You 🎯</h2>
            <Link to="/products" className="text-[#E9FF70]">
              See All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -8 }}
                className="bg-[#1E1433]/80 border border-white/10 rounded-[30px] p-5 shadow-xl shadow-purple-950/30"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-3xl"
                />

                <h3 className="text-xl font-bold mt-4">{item.name}</h3>
                <p className="text-[#C9B8E8] mt-2">{item.reason}</p>

                <Link to="/products">
                  <button className="mt-5 w-full bg-[#E9FF70] text-[#12091F] font-bold py-2 rounded-xl">
                    Add from Products
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART FEATURES */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  <SmartFridge />
  <LocationFinder />
  <VoiceShopping />
  <RecipeSuggestions />
</div>
      </section>

      {/* AI STRIP */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#E9FF70] to-[#FFB86B] text-[#12091F] rounded-[35px] p-8 text-center shadow-2xl">
          <Sparkles className="mx-auto mb-3" size={36} />

          <h2 className="text-4xl font-extrabold">AI Smart Shopping</h2>

          <p className="mt-3 max-w-2xl mx-auto">
            FreshGo recommends groceries based on your lifestyle, mood, cart,
            wishlist and shopping habits.
          </p>
        </div>
      </section>
    </div>
  );
}