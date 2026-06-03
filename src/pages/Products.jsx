import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Search, Heart } from "lucide-react";


import { useSearchParams, Link } from "react-router-dom";

export default function Products() {
  const [searchParams] = useSearchParams();
const categoryFromUrl = searchParams.get("category");
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
];
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      product.category === selectedFilter ||
      product.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
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
        <Search className="text-green-700" />

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

      <p className="text-center mt-6 text-green-700">
        Showing {filteredProducts.length} product(s)
      </p>

      {filteredProducts.length === 0 ? (
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-green-800">
            No products found 😭
          </h2>
          <p className="text-green-700 mt-2">
            Try searching something else.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
  <h2 className="text-2xl font-bold hover:text-green-700 cursor-pointer">
    {product.name}
  </h2>
</Link>

              

              <div className="flex items-center gap-1 mt-2 text-orange-500">
                <Star size={18} fill="currentColor" />
                <span>{product.rating}</span>
              </div>

              <p className="mt-3 text-xl font-bold text-green-700">
                ₹{product.price}
              </p>

              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  {product.type}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm text-green-700 mb-1">
                  Freshness Meter 🌿
                </p>

                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: product.freshness }}
                    transition={{ duration: 1 }}
                  />
                </div>

                <p className="text-xs mt-1 text-green-600">
                  Harvested 5 hours ago
                </p>
              </div>
<div className="mt-6 flex gap-3">
  <button
    onClick={() => addToCart(product)}
    className="flex-1 bg-[#E9FF70] text-[#12091F] text-black py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-green-800 transition"
  >
    <Plus size={18} />
    Add to Cart
  </button>

  <button
    onClick={() => addToWishlist(product)}
    className="bg-red-100 text-red-600 px-4 rounded-2xl hover:bg-red-200 transition"
  >
    <Heart size={20} />
  </button>
</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}