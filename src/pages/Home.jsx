import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, Leaf, Refrigerator, Sparkles } from "lucide-react";
import LocationFinder from "../components/LocationFinder";
import VoiceShopping from "../components/VoiceShopping";
import SmartFridge from "../components/SmartFridge";

export default function Home() {
  const moods = [
    "🥗 Healthy",
    "💪 Gym",
    "😴 Lazy Cooking",
    "💸 Budget Meals",
    "😋 Cravings",
  ];
  const categories = [
  "🍎 Fruits",
  "🥦 Vegetables",
  "🥛 Dairy",
  "🍞 Bakery",
  "🍚 Grains",
  "🍫 Snacks",
  "🥤 Beverages",
  "🧴 Personal Care",
  "🧹 Cleaning",
  "🐶 Pet Care",
];
const deals = [
  {
    name: "Milk",
    price: "₹45",
    oldPrice: "₹55",
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    tag: "18% OFF",
  },
  {
    name: "Rice",
    price: "₹75",
    oldPrice: "₹95",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    tag: "20% OFF",
  },
  {
    name: "Cooking Oil",
    price: "₹160",
    oldPrice: "₹190",
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    tag: "15% OFF",
  },
  {
    name: "Bread",
    price: "₹40",
    oldPrice: "₹50",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    tag: "10% OFF",
  },
];
const bestSellers = [
  {
    name: "Fresh Apples",
    sold: "2.4k bought",
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
  },
  {
    name: "Bananas",
    sold: "3.1k bought",
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
  },
  {
    name: "Tomatoes",
    sold: "1.8k bought",
    img: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400",
  },
  {
    name: "Potatoes",
    sold: "2.9k bought",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
  },
];
  const moodProducts = {
  "🥗 Healthy": "Try: Apples, Broccoli, Carrot, Milk",
  "💪 Gym": "Try: Milk, Banana, Eggs, Oats",
  "😴 Lazy Cooking": "Try: Bread, Milk, Oats, Fruits",
  "💸 Budget Meals": "Try: Rice, Bread, Carrot, Milk",
  "😋 Cravings": "Try: Grapes, Juice, Chocolate, Snacks",
};
  const groceries = [
  { item: "🍎", top: "18%", left: "8%" },
  { item: "🥦", top: "28%", left: "82%" },
  { item: "🍌", top: "45%", left: "12%" },
  { item: "🥕", top: "60%", left: "88%" },
  { item: "🍇", top: "70%", left: "18%" },
  { item: "🥛", top: "35%", left: "65%" },
  { item: "🍞", top: "75%", left: "72%" },
  { item: "🍅", top: "20%", left: "55%" },
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

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 px-6 text-center">

        {/* Floating Blobs */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-52 h-52 bg-orange-300/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
   

        {/* Floating Emojis */}
        {groceries.map((grocery, index) => (
  <motion.div
    key={index}
    className="absolute text-4xl md:text-6xl select-none"
    style={{
      top: grocery.top,
      left: grocery.left,
    }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 8, -8, 0],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: 3 + index,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {grocery.item}
  </motion.div>
))}

        {/* Main Content */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Groceries that <br />
          understand your lifestyle
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-green-800 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          FreshGo combines AI and smart shopping to deliver groceries
          faster, healthier, and smarter.
        </motion.p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
  <Link to="/products">
    <button className="bg-green-700 hover:bg-green-800 transition px-6 py-3 rounded-2xl text-white shadow-lg">
      Shop Now
    </button>
  </Link>

  <button
    onClick={() => alert("AI Assistant feature coming soon!")}
    className="bg-white/60 backdrop-blur-lg border border-white/40 hover:bg-white/80 transition px-6 py-3 rounded-2xl shadow-lg"
  >
    Try AI Assistant
  </button>
</div>
      </section>

      {/* MOOD SHOPPING */}
      {/* MOOD SHOPPING */}
<section className="px-6 py-16">
  <h2 className="text-3xl font-bold text-center mb-10">
    How are you feeling today?
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
    {moods.map((mood, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => alert(moodProducts[mood])}
        className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 text-center shadow-lg cursor-pointer"
      >
        <p className="font-semibold">{mood}</p>
      </motion.div>
    ))}
  </div>
</section>
{/* SHOP BY CATEGORY */}
<section className="px-6 py-16">
  <h2 className="text-3xl font-bold text-center mb-10">
    Shop by Category
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
    {categories.map((category, index) => {
      const categoryName = category.split(" ").slice(1).join(" ");

      return (
        <Link key={index} to={`/products?category=${categoryName}`}>
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-6 text-center shadow-lg cursor-pointer"
          >
            <p className="font-semibold">{category}</p>
          </motion.div>
        </Link>
      );
    })}
  </div>
</section>
{/* TODAY'S DEALS */}
<section className="px-6 py-16">
  <h2 className="text-3xl font-bold text-center mb-3">
    Today’s Deals ⚡
  </h2>

  <p className="text-center text-green-700 mb-10">
    Fresh savings on daily essentials
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {deals.map((deal, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -8, scale: 1.03 }}
        className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl text-center"
      >
        <img
  src={deal.img}
  alt={deal.name}
  className="w-full h-40 object-cover rounded-2xl mb-4"
/>

        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
          {deal.tag}
        </span>

        <h3 className="text-xl font-bold mt-4">{deal.name}</h3>

        <div className="mt-2">
          <span className="text-green-700 font-bold text-xl">
            {deal.price}
          </span>

          <span className="text-gray-500 line-through ml-2">
            {deal.oldPrice}
          </span>
        </div>

        <Link to="/products">
          <button className="mt-5 bg-green-700 text-white px-5 py-2 rounded-xl">
            Shop Deal
          </button>
        </Link>
      </motion.div>
    ))}
  </div>
</section>
{/* BEST SELLERS */}
<h2 className="text-3xl font-bold text-center mb-3">
    Best Sellers 🛒
  </h2>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {bestSellers.map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ y: -8, scale: 1.03 }}
      className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-xl overflow-hidden"
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-40 object-cover rounded-2xl"
      />

      <h3 className="text-xl font-bold mt-4">
        {item.name}
      </h3>

      <p className="text-green-700 mt-2">
        {item.sold}
      </p>

      <Link to="/products">
        <button className="mt-5 w-full bg-green-700 text-white py-2 rounded-xl">
          View Product
        </button>
      </Link>
    </motion.div>
  ))}
</div>
{/* RECOMMENDED FOR YOU */}
<section className="px-6 py-16">
  <h2 className="text-3xl font-bold text-center mb-3">
    Recommended For You 🎯
  </h2>

  <p className="text-center text-green-700 mb-10">
    Smart picks based on your grocery lifestyle
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {recommended.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -8, scale: 1.03 }}
        className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-xl overflow-hidden"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-40 object-cover rounded-2xl"
        />

        <h3 className="text-xl font-bold mt-4">{item.name}</h3>

        <p className="text-green-700 mt-2">{item.reason}</p>

        <Link to="/products">
          <button className="mt-5 w-full bg-green-700 text-white py-2 rounded-xl">
            Add from Products
          </button>
        </Link>
      </motion.div>
    ))}
  </div>
</section>
      {/* SMART FEATURES */}
      <section className="px-6 py-10 grid md:grid-cols-3 gap-6">
        

        {/* Voice Shopping */}
       
        

        {/* Smart Fridge */}
      <SmartFridge />

        {/* Eco Tracker */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40"
        >
          <Leaf className="text-green-700 mb-4" size={36} />
          <h3 className="text-xl font-bold mb-2">Eco Tracker</h3>
          <p className="text-green-800">
            You saved 4kg CO₂ this month 🌱
          </p>
        </motion.div>
        <LocationFinder />
        <VoiceShopping />
      </section>

      {/* AI SECTION */}
      <section className="px-6 py-20 text-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 to-green-500 rounded-[40px] p-10 text-white shadow-2xl"
        >
          <Sparkles size={40} className="mx-auto mb-5" />

          <h2 className="text-4xl font-bold mb-4">
            AI Meal Planner
          </h2>

          <p className="text-lg text-green-100 mb-8">
            Personalized grocery recommendations based on your mood,
            health goals, and cravings.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            {["Healthy", "Fitness", "Budget", "Quick Meals"].map((item) => (
              <span
                key={item}
                className="bg-white/20 px-5 py-2 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}