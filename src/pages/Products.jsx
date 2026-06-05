import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Search, Heart } from "lucide-react";


import { useSearchParams, Link } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();
const categoryFromUrl = searchParams.get("category");
const [quantities, setQuantities] = useState({});
  const products = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    freshness: "95%",
    category: "Fruits",
    type: "Healthy",
  },
  {
    id: 2,
    name: "Banana",
    price: 50,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    freshness: "93%",
    category: "Fruits",
    type: "Budget",
  },
  {
    id: 3,
    name: "Milk",
    price: 45,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    freshness: "88%",
    category: "Dairy",
    type: "Daily Essentials",
  },
  {
    id: 4,
    name: "Bread",
    price: 40,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    freshness: "85%",
    category: "Bakery",
    type: "Daily Essentials",
  },
  {
    id: 5,
    name: "Rice",
    price: 75,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    freshness: "90%",
    category: "Grains",
    type: "Budget",
  },
  {
    id: 6,
    name: "Cooking Oil",
    price: 160,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    freshness: "89%",
    category: "Pantry",
    type: "Daily Essentials",
  },
  {
    id: 7,
    name: "Potato",
    price: 35,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
    freshness: "92%",
    category: "Vegetables",
    type: "Budget",
  },
  {
    id: 8,
    name: "Tomato",
    price: 40,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400",
    freshness: "94%",
    category: "Vegetables",
    type: "Freshness",
  },
  {
    id: 9,
    name: "Chocolate",
    price: 90,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400",
    freshness: "87%",
    category: "Snacks",
    type: "Cravings",
  },
  {
    id: 10,
    name: "Soft Drink",
    price: 60,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400",
    freshness: "86%",
    category: "Beverages",
    type: "Cravings",
  },
  {
    id: 11,
    name: "Shampoo",
    price: 180,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    freshness: "80%",
    category: "Personal Care",
    type: "Daily Essentials",
  },
  {
    id: 12,
    name: "Detergent",
    price: 220,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
    freshness: "78%",
    category: "Cleaning",
    type: "Household",
  },
  {
    id: 13,
    name: "Dog Food",
    price: 300,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
    freshness: "82%",
    category: "Pet Care",
    type: "Premium",
  },
  {
    id: 14,
    name: "Baby Diapers",
    price: 450,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1583947581924-a31a42f792e5?w=400",
    freshness: "84%",
    category: "Baby Care",
    type: "Daily Essentials",
  },
  {
    id: 15,
    name: "Ice Cream",
    price: 150,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400",
    freshness: "91%",
    category: "Frozen Foods",
    type: "Cravings",
  },
  {
  id: 16,
  name: "Orange",
  price: 80,
  rating: 4.7,
  img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400",
  freshness: "94%",
  category: "Fruits",
  type: "Healthy",
},
{
  id: 17,
  name: "Mango",
  price: 150,
  rating: 4.9,
  img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
  freshness: "96%",
  category: "Fruits",
  type: "Premium",
},
{
  id: 18,
  name: "Onion",
  price: 45,
  rating: 4.5,
  img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400",
  freshness: "93%",
  category: "Vegetables",
  type: "Budget",
},
{
  id: 19,
  name: "Carrot",
  price: 60,
  rating: 4.4,
  img: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400",
  freshness: "95%",
  category: "Vegetables",
  type: "Healthy",
},
{
  id: 20,
  name: "Broccoli",
  price: 90,
  rating: 4.8,
  img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400",
  freshness: "96%",
  category: "Vegetables",
  type: "Healthy",
},
{
  id: 21,
  name: "Cheese",
  price: 130,
  rating: 4.7,
  img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400",
  freshness: "89%",
  category: "Dairy",
  type: "Premium",
},
{
  id: 22,
  name: "Butter",
  price: 110,
  rating: 4.6,
  img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400",
  freshness: "88%",
  category: "Dairy",
  type: "Daily Essentials",
},
{
  id: 23,
  name: "Curd",
  price: 35,
  rating: 4.5,
  img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
  freshness: "90%",
  category: "Dairy",
  type: "Budget",
},
{
  id: 24,
  name: "Cookies",
  price: 70,
  rating: 4.4,
  img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
  freshness: "87%",
  category: "Bakery",
  type: "Cravings",
},
{
  id: 25,
  name: "Cake",
  price: 250,
  rating: 4.9,
  img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
  freshness: "92%",
  category: "Bakery",
  type: "Premium",
},
];

const [showFilters, setShowFilters] = useState(true);
const [sortOption, setSortOption] = useState("Relevance");
const [minRating, setMinRating] = useState(0);
const [priceRange, setPriceRange] = useState("All");
 const filters = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Grains",
  "Pantry",
  "Snacks",
  "Beverages",
  "Personal Care",
  "Cleaning",
  "Pet Care",
  "Baby Care",
  "Frozen Foods",
  "Budget",
  "Healthy",
  "Cravings",
];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(
  categoryFromUrl || "All"
);

 let filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesFilter =
    selectedFilter === "All" ||
    product.category === selectedFilter ||
    product.type === selectedFilter;

  const matchesRating = product.rating >= minRating;

  const matchesPrice =
    priceRange === "All" ||
    (priceRange === "Under ₹100" && product.price < 100) ||
    (priceRange === "₹100 - ₹200" &&
      product.price >= 100 &&
      product.price <= 200) ||
    (priceRange === "Above ₹200" && product.price > 200);

  return (
    matchesSearch &&
    matchesFilter &&
    matchesRating &&
    matchesPrice
  );
});

filteredProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "Price - Low to High")
    return a.price - b.price;

  if (sortOption === "Price - High to Low")
    return b.price - a.price;

  if (sortOption === "Alphabetical")
    return a.name.localeCompare(b.name);

  if (sortOption === "Rating - High to Low")
    return b.rating - a.rating;

  return a.id - b.id;
});
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (quantities[product.id] || 1) }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: quantities[product.id] || 1 }];
    }

    localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} added to cart 🛒`);
  };
  const addToWishlist = (product) => {
  const wishlist =
    JSON.parse(localStorage.getItem("freshgoWishlist")) || [];

  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    alert(`${product.name} is already in wishlist ❤️`);
    return;
  }

  localStorage.setItem(
    "freshgoWishlist",
    JSON.stringify([...wishlist, product])
  );

  alert(`${product.name} added to wishlist ❤️`);
};
const increaseQuantity = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: (prev[id] || 1) + 1,
  }));
};

const decreaseQuantity = (id) => {
  setQuantities((prev) => ({
    ...prev,
    [id]: Math.max((prev[id] || 1) - 1, 1),
  }));
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] text-white py-10">
      <h1 className="text-5xl font-bold text-center mb-4">
        FreshGo Marketplace ✨
      </h1>

      <p className="text-center text-grey-700 mb-10">
        Handpicked groceries, essentials and smart recommendations.
      </p>

      <div className="max-w-4xl mx-auto bg-white/10
border border-white/10 backdrop-blur-xl rounded-3xl p-4 flex items-center gap-3 shadow-lg">
        <Search className="text-lime-300" />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search fruits, vegetables, dairy..."
          className="w-full bg-transparent outline-none text-green-900"
        />
      </div>

      <div className="flex justify-center gap-3 flex-wrap mt-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-5 py-2 rounded-full shadow transition ${
              selectedFilter === filter
                ? "bg-[#E9FF70] text-[#12091F] text-black"
                : "bg-white/10 text-white hover:bg-green-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mt-8 px-4"></div>
     <div className="max-w-7xl mx-auto flex justify-between items-center mt-8 px-4">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="bg-[#1b0f2d] border border-purple-400/30 text-white px-5 py-3 rounded-2xl"
  >
    {showFilters ? "Hide Filter" : "Show Filter"}
  </button>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="bg-[#1b0f2d] border border-purple-400/30 text-white px-5 py-3 rounded-2xl outline-none"
  >
    <option>Relevance</option>
    <option>Price - Low to High</option>
    <option>Price - High to Low</option>
    <option>Alphabetical</option>
    <option>Rating - High to Low</option>
  </select>
</div>

<p className="text-center mt-6 text-lime-300">
  Showing {filteredProducts.length} product(s)
</p>

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-green-800">
            No products found 😭
          </h2>
          <p className="text-lime-300 mt-2">
            Try searching something else.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8 mt-12">
          {showFilters && (
  <div className="bg-[#1b0f2d]/80 rounded-3xl p-6 h-fit border border-purple-400/20">

    <h2 className="text-2xl font-bold mb-4">
      Filters
    </h2>

    <h3 className="text-lime-300 font-bold mb-3">
      Rating
    </h3>

    {[4.5, 4, 3.5].map((rating) => (
      <button
        key={rating}
        onClick={() => setMinRating(rating)}
        className="block w-full text-left bg-[#10081f] px-4 py-2 rounded-xl mb-2"
      >
        ⭐ {rating}+
      </button>
    ))}

    <h3 className="text-lime-300 font-bold mt-6 mb-3">
      Price
    </h3>

    {["All", "Under ₹100", "₹100 - ₹200", "Above ₹200"].map((range) => (
      <button
        key={range}
        onClick={() => setPriceRange(range)}
        className="block w-full text-left bg-[#10081f] px-4 py-2 rounded-xl mb-2"
      >
        {range}
      </button>
    ))}
  </div>
)}
<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-white/10
border border-white/10 backdrop-blur-xl border border-white/50 rounded-[35px] p-6 shadow-xl"
            >
              <Link to={`/products/${product.id}`}>
  <div className="overflow-hidden rounded-2xl mb-5">
  <motion.img
    whileHover={{ scale: 1.12 }}
    transition={{ duration: 0.4 }}
    

    src={product.img}
    alt={product.name}
    className="w-full h-40 object-cover rounded-2xl mb-5 cursor-pointer"
  />
  
  </div>

</Link>
<Link to={`/products/${product.id}`}>
  <h2 className="text-2xl font-bold hover:text-lime-300 cursor-pointer">
    {product.name}
  </h2>
</Link>

              

              <div className="flex items-center gap-1 mt-2 text-orange-500">
                <Star size={18} fill="currentColor" />
                <span>{product.rating}</span>
              </div>

              <p className="mt-3 text-xl font-bold text-lime-300">
                ₹{product.price}
              </p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-lime-300 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {product.type}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-lime-300 mb-1">
                  Freshness Meter 🌿
                </p>

                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-lime-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: product.freshness }}
                    transition={{ duration: 1 }}
                  />
                </div>

                <p className="text-xs mt-1 text-green-600">
                  Harvested 5 hours ago
                </p>
              </div>
<div className="mt-6 grid grid-cols-[70px_1fr_50px] gap-3 items-center">

  {/* Quantity Selector */}
  <div className="flex items-center justify-between bg-[#10081f] border border-purple-400/30 rounded-2xl px-2 py-4">
    <button
      onClick={() => decreaseQuantity(product.id)}
      className="text-lime-300 font-bold text-xl"
    >
      -
    </button>

    <span className="text-white font-bold text-lg">
      {quantities[product.id] || 1}
    </span>

    <button
      onClick={() => increaseQuantity(product.id)}
      className="text-lime-300 font-bold text-xl"
    >
      +
    </button>
  </div>

  {/* Add Button */}
  <button
    onClick={() => addToCart(product)}
    className="bg-[#E9FF70] text-[#12091F] font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#dfff45] transition text-xl shadow-[0_0_20px_rgba(233,255,112,0.25)]"
  >
    <Plus size={20} />
    Add
  </button>

  {/* Wishlist */}
  <button
    onClick={() => addToWishlist(product)}
    className="h-full bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition flex items-center justify-center"
  >
    <Heart size={20} />
  </button>

</div>
            </motion.div>
            
          ))}
        </div>
        </div>
      )}
    </div>
    
  );
}