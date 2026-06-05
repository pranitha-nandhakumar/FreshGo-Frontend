import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Star,
  Plus,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  ZoomIn,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
const [position, setPosition] = useState({ x: 50, y: 50 });

  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 120,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800",
      freshness: "95%",
      category: "Fruits",
      type: "Healthy",
      weight: "1 kg",
      origin: "Farm Fresh",
      stock: "Available",
      description:
        "Crisp, juicy apples rich in fiber and antioxidants. Perfect for snacks, juices, and healthy breakfasts.",
      benefits: ["Rich in fiber", "Heart healthy", "Naturally sweet"],
    },
    {
      id: 2,
      name: "Banana",
      price: 50,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800",
      freshness: "93%",
      category: "Fruits",
      type: "Budget",
      weight: "1 dozen",
      origin: "Organic Farm",
      stock: "Available",
      description:
        "Fresh bananas packed with energy and potassium. Great for smoothies, breakfast, and quick snacks.",
      benefits: ["Energy booster", "Rich in potassium", "Budget friendly"],
    },
    {
      id: 3,
      name: "Milk",
      price: 45,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800",
      freshness: "88%",
      category: "Dairy",
      type: "Daily Essentials",
      weight: "500 ml",
      origin: "Fresh Dairy",
      stock: "Available",
      description:
        "Fresh dairy milk ideal for tea, coffee, cereals, desserts, and everyday cooking.",
      benefits: ["Calcium rich", "Daily essential", "Fresh packed"],
    },
    {
      id: 4,
      name: "Bread",
      price: 40,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      freshness: "85%",
      category: "Bakery",
      type: "Daily Essentials",
      weight: "400 g",
      origin: "Fresh Bakery",
      stock: "Available",
      description:
        "Soft and freshly baked bread, perfect for sandwiches, toast, and breakfast meals.",
      benefits: ["Soft texture", "Fresh baked", "Breakfast ready"],
    },
    {
      id: 5,
      name: "Rice",
      price: 75,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      freshness: "90%",
      category: "Grains",
      type: "Budget",
      weight: "1 kg",
      origin: "Premium Fields",
      stock: "Available",
      description:
        "High-quality rice grains suitable for daily meals, biryani, fried rice, and traditional dishes.",
      benefits: ["Daily staple", "Good quality grains", "Easy to cook"],
    },
    {
      id: 6,
      name: "Cooking Oil",
      price: 160,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800",
      freshness: "89%",
      category: "Pantry",
      type: "Daily Essentials",
      weight: "1 L",
      origin: "Trusted Brand",
      stock: "Available",
      description:
        "Quality cooking oil suitable for frying, sautéing, and daily home cooking.",
      benefits: ["Daily cooking", "Good quality", "Kitchen essential"],
    },
    {
      id: 7,
      name: "Potato",
      price: 35,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
      freshness: "92%",
      category: "Vegetables",
      type: "Budget",
      weight: "1 kg",
      origin: "Local Farm",
      stock: "Available",
      description:
        "Fresh potatoes suitable for curries, fries, snacks, and daily cooking.",
      benefits: ["Budget friendly", "Versatile cooking", "Fresh stock"],
    },
    {
      id: 8,
      name: "Tomato",
      price: 40,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=800",
      freshness: "94%",
      category: "Vegetables",
      type: "Freshness",
      weight: "1 kg",
      origin: "Local Farm",
      stock: "Available",
      description:
        "Bright red tomatoes perfect for salads, gravies, chutneys, and soups.",
      benefits: ["Fresh and juicy", "Rich in vitamins", "Daily cooking"],
    },
    {
      id: 9,
      name: "Chocolate",
      price: 90,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800",
      freshness: "87%",
      category: "Snacks",
      type: "Cravings",
      weight: "100 g",
      origin: "Premium Cocoa",
      stock: "Available",
      description:
        "Delicious chocolate treat for sweet cravings, gifting, and dessert toppings.",
      benefits: ["Sweet craving", "Premium taste", "Perfect snack"],
    },
    {
      id: 10,
      name: "Soft Drink",
      price: 60,
      rating: 4.3,
      img: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800",
      freshness: "86%",
      category: "Beverages",
      type: "Cravings",
      weight: "750 ml",
      origin: "Beverage Brand",
      stock: "Available",
      description:
        "Refreshing soft drink to enjoy with snacks, meals, and parties.",
      benefits: ["Refreshing", "Party drink", "Chilled taste"],
    },
    {
      id: 11,
      name: "Shampoo",
      price: 180,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
      freshness: "80%",
      category: "Personal Care",
      type: "Daily Essentials",
      weight: "180 ml",
      origin: "Personal Care Brand",
      stock: "Available",
      description:
        "Gentle shampoo for clean, soft, and fresh hair care routine.",
      benefits: ["Hair care", "Daily use", "Gentle formula"],
    },
    {
      id: 12,
      name: "Detergent",
      price: 220,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800",
      freshness: "78%",
      category: "Cleaning",
      type: "Household",
      weight: "1 kg",
      origin: "Cleaning Brand",
      stock: "Available",
      description:
        "Powerful detergent for fresh, clean, and bright clothes.",
      benefits: ["Deep cleaning", "Household need", "Long lasting"],
    },
    {
      id: 13,
      name: "Dog Food",
      price: 300,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
      freshness: "82%",
      category: "Pet Care",
      type: "Premium",
      weight: "1 kg",
      origin: "Pet Nutrition",
      stock: "Available",
      description:
        "Nutritious dog food made to support your pet's daily energy and health.",
      benefits: ["Pet nutrition", "Energy support", "Premium quality"],
    },
    {
      id: 14,
      name: "Baby Diapers",
      price: 450,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1583947581924-a31a42f792e5?w=800",
      freshness: "84%",
      category: "Baby Care",
      type: "Daily Essentials",
      weight: "Pack of 20",
      origin: "Baby Care Brand",
      stock: "Available",
      description:
        "Soft and comfortable baby diapers designed for dryness and protection.",
      benefits: ["Soft comfort", "Leak protection", "Baby safe"],
    },
    {
      id: 15,
      name: "Ice Cream",
      price: 150,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800",
      freshness: "91%",
      category: "Frozen Foods",
      type: "Cravings",
      weight: "500 ml",
      origin: "Frozen Fresh",
      stock: "Available",
      description:
        "Creamy and delicious ice cream for desserts, parties, and cravings.",
      benefits: ["Creamy taste", "Dessert ready", "Perfect treat"],
    },
    {
      id: 16,
      name: "Orange",
      price: 80,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800",
      freshness: "94%",
      category: "Fruits",
      type: "Healthy",
      weight: "1 kg",
      origin: "Fruit Farm",
      stock: "Available",
      description:
        "Juicy oranges loaded with vitamin C and refreshing natural flavor.",
      benefits: ["Vitamin C", "Juicy fruit", "Immunity support"],
    },
    {
      id: 17,
      name: "Mango",
      price: 150,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800",
      freshness: "96%",
      category: "Fruits",
      type: "Premium",
      weight: "1 kg",
      origin: "Premium Orchard",
      stock: "Available",
      description:
        "Sweet, ripe mangoes with rich flavor and juicy texture.",
      benefits: ["Naturally sweet", "Seasonal favorite", "Premium quality"],
    },
    {
      id: 18,
      name: "Onion",
      price: 45,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1508747703725-719777637510?w=800",
      freshness: "93%",
      category: "Vegetables",
      type: "Budget",
      weight: "1 kg",
      origin: "Local Farm",
      stock: "Available",
      description:
        "Fresh onions suitable for curries, salads, gravies, and daily cooking.",
      benefits: ["Kitchen essential", "Budget friendly", "Fresh stock"],
    },
    {
      id: 19,
      name: "Carrot",
      price: 60,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800",
      freshness: "95%",
      category: "Vegetables",
      type: "Healthy",
      weight: "500 g",
      origin: "Fresh Farm",
      stock: "Available",
      description:
        "Crunchy carrots rich in vitamins, perfect for salads, juices, and cooking.",
      benefits: ["Rich in vitamins", "Good for salads", "Healthy choice"],
    },
    {
      id: 20,
      name: "Broccoli",
      price: 90,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800",
      freshness: "96%",
      category: "Vegetables",
      type: "Healthy",
      weight: "500 g",
      origin: "Organic Farm",
      stock: "Available",
      description:
        "Fresh broccoli packed with nutrients, ideal for healthy meals and soups.",
      benefits: ["High nutrients", "Fitness friendly", "Fresh green veggie"],
    },
    {
      id: 21,
      name: "Cheese",
      price: 130,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800",
      freshness: "89%",
      category: "Dairy",
      type: "Premium",
      weight: "200 g",
      origin: "Dairy Fresh",
      stock: "Available",
      description:
        "Creamy cheese perfect for sandwiches, pasta, pizza, and snacks.",
      benefits: ["Creamy taste", "Premium dairy", "Cooking friendly"],
    },
    {
      id: 22,
      name: "Butter",
      price: 110,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800",
      freshness: "88%",
      category: "Dairy",
      type: "Daily Essentials",
      weight: "200 g",
      origin: "Fresh Dairy",
      stock: "Available",
      description:
        "Smooth butter for toast, baking, cooking, and rich flavor.",
      benefits: ["Smooth texture", "Breakfast essential", "Baking friendly"],
    },
    {
      id: 23,
      name: "Curd",
      price: 35,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800",
      freshness: "90%",
      category: "Dairy",
      type: "Budget",
      weight: "500 g",
      origin: "Fresh Dairy",
      stock: "Available",
      description:
        "Fresh curd with smooth texture, perfect for meals, lassi, and side dishes.",
      benefits: ["Good for digestion", "Fresh dairy", "Budget friendly"],
    },
    {
      id: 24,
      name: "Cookies",
      price: 70,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
      freshness: "87%",
      category: "Bakery",
      type: "Cravings",
      weight: "250 g",
      origin: "Fresh Bakery",
      stock: "Available",
      description:
        "Crunchy cookies for tea-time, snacks, and sweet cravings.",
      benefits: ["Crunchy snack", "Tea-time favorite", "Sweet treat"],
    },
    {
      id: 25,
      name: "Cake",
      price: 250,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      freshness: "92%",
      category: "Bakery",
      type: "Premium",
      weight: "500 g",
      origin: "Fresh Bakery",
      stock: "Available",
      description:
        "Soft and delicious cake, perfect for celebrations and dessert time.",
      benefits: ["Soft texture", "Premium dessert", "Celebration ready"],
    },
  ];
   const product = products.find((item) => item.id === Number(id));
  const recommendedProducts = products
  .filter(
    (item) =>
      item.id !== product?.id &&
      (item.category === product?.category || item.type === product?.type)
  )
  .slice(0, 4);

  

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080312] flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    const updatedCart = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${quantity} ${product.name} added to cart 🛒`);
  };
  const addRecommendedToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
  const existing = cart.find((cartItem) => cartItem.id === item.id);

  const updatedCart = existing
    ? cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    : [...cart, { ...item, quantity: 1 }];

  localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
  alert(`${item.name} added to cart 🛒`);
};

  const addToWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("freshgoWishlist")) || [];

    if (wishlist.find((item) => item.id === product.id)) {
      alert("Already in wishlist ❤️");
      return;
    }

    localStorage.setItem(
      "freshgoWishlist",
      JSON.stringify([...wishlist, product])
    );

    alert(`${product.name} added to wishlist ❤️`);
  };
  const handleMouseMove = (e) => {
  const { left, top, width, height } =
    e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setPosition({ x, y });
};

  return (
    <div className="min-h-screen bg-[#080312] py-28 px-6 text-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/products")}
          className="mb-8 flex items-center gap-2 text-lime-300 font-bold hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2.5rem] p-8 shadow-[0_0_45px_rgba(168,85,247,0.16)]">
         <div>
  <div className="mb-4 inline-flex items-center gap-2 bg-lime-300/10 border border-lime-300/25 text-lime-300 px-4 py-2 rounded-full text-sm">
    <ZoomIn size={16} />
    Hover image to zoom
  </div>

  <div
    className="relative overflow-hidden rounded-[2rem] bg-[#10081f] border border-purple-400/20 cursor-zoom-in"
    onMouseEnter={() => setZoom(true)}
    onMouseLeave={() => setZoom(false)}
    onMouseMove={handleMouseMove}
  >
    <img
      src={product.img}
      alt={product.name}
      className="w-full h-[460px] object-cover rounded-[2rem]"
    />

    {zoom && (
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none"
        style={{
          backgroundImage: `url(${product.img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "220%",
          backgroundPosition: `${position.x}% ${position.y}%`,
        }}
      />
    )}
  </div>
</div>

          <div>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-lime-300 text-[#080312] px-4 py-2 rounded-full text-sm font-bold">
                {product.category}
              </span>

              <span className="bg-purple-500/20 text-purple-100 border border-purple-400/30 px-4 py-2 rounded-full text-sm font-bold">
                {product.type}
              </span>

              <span className="bg-green-500/10 text-green-300 border border-green-400/30 px-4 py-2 rounded-full text-sm font-bold">
                {product.stock}
              </span>
            </div>

            <h1 className="text-5xl font-extrabold mt-6">
              {product.name}
            </h1>

            <p className="text-4xl font-extrabold text-lime-300 mt-6">
              ₹{product.price}
            </p>

            <p className="text-purple-200 mt-5 leading-7">
              {product.description}
            </p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="bg-[#10081f] border border-purple-400/20 rounded-2xl p-4">
                <p className="text-purple-300 text-sm">Weight</p>
                <h3 className="font-bold text-white">{product.weight}</h3>
              </div>

              <div className="bg-[#10081f] border border-purple-400/20 rounded-2xl p-4">
                <p className="text-purple-300 text-sm">Origin</p>
                <h3 className="font-bold text-white">{product.origin}</h3>
              </div>

              <div className="bg-[#10081f] border border-purple-400/20 rounded-2xl p-4">
                <p className="text-purple-300 text-sm">Delivery</p>
                <h3 className="font-bold text-white">10–20 mins</h3>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="bg-[#10081f] border border-purple-400/20 rounded-2xl p-4">
                <Truck className="text-lime-300 mb-2" />
                <h3 className="font-bold">Fast Delivery</h3>
                <p className="text-sm text-purple-300">
                  Delivered fresh to your doorstep.
                </p>
              </div>

              <div className="bg-[#10081f] border border-purple-400/20 rounded-2xl p-4">
                <ShieldCheck className="text-lime-300 mb-2" />
                <h3 className="font-bold">Quality Checked</h3>
                <p className="text-sm text-purple-300">
                  Freshness guaranteed by FreshGo.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-lime-300 mb-2 font-bold">
                Freshness Meter 🌿 {product.freshness}
              </p>

              <div className="h-3 bg-[#10081f] rounded-full overflow-hidden border border-purple-400/20">
                <div
                  className="h-full bg-lime-300 shadow-[0_0_18px_rgba(223,255,94,0.6)]"
                  style={{ width: product.freshness }}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold mb-3 text-white">Key Benefits</h3>

              <div className="flex gap-2 flex-wrap">
                {product.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="bg-lime-300/10 border border-lime-300/20 text-lime-300 px-4 py-2 rounded-full text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <div className="flex items-center justify-between bg-[#10081f] border border-purple-400/30 rounded-2xl overflow-hidden w-40">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="px-4 py-4 text-lime-300 font-bold hover:bg-lime-300/10"
                >
                  <Minus size={18} />
                </button>

                <span className="px-3 py-4 text-white font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-4 text-lime-300 font-bold hover:bg-lime-300/10"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={addToCart}
                className="flex-1 min-w-[190px] bg-lime-300 text-[#080312] font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-lime-200 transition"
              >
                <Plus />
                Add to Cart
              </button>

              <button
                onClick={addToWishlist}
                className="w-16 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition flex items-center justify-center"
              >
                <Heart />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-14">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-extrabold">
      You May Also Like 💚
    </h2>

    <button
      onClick={() => navigate("/products")}
      className="text-lime-300 font-bold"
    >
      View All
    </button>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {recommendedProducts.map((item) => (
      <motion.div
        key={item.id}
        whileHover={{ y: -8, scale: 1.02 }}
        className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-5 shadow-[0_0_35px_rgba(168,85,247,0.12)]"
      >
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-40 object-cover rounded-3xl mb-4"
        />

        <span className="text-xs bg-lime-300/10 text-lime-300 border border-lime-300/20 px-3 py-1 rounded-full">
          {item.category}
        </span>

       <h3 className="text-lg font-bold mt-3 text-white">
  {item.name}
</h3>

<p className="text-purple-300 text-sm mt-1">
  {item.type}
</p>

        <div className="flex items-center gap-1 text-yellow-400 mt-2">
          <Star size={16} fill="currentColor" />
          <span>{item.rating}</span>
        </div>

        <p className="text-lime-300 font-extrabold text-xl mt-3">
          ₹{item.price}
        </p>

        <div className="mt-5 flex gap-3">
          <button
  onClick={() => {
    window.scrollTo(0, 0);
    navigate(`/products/${item.id}`);
  }}
            className="flex-1 bg-[#10081f] border border-purple-400/30 text-white py-3 rounded-2xl hover:text-lime-300 transition"
          >
            View
          </button>

          <button
            onClick={() => addRecommendedToCart(item)}
            className="bg-lime-300 text-[#080312] px-4 rounded-2xl font-bold"
          >
            <Plus size={18} />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
}