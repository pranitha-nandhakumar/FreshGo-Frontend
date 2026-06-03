import { useParams, useNavigate } from "react-router-dom";
import { Star, Plus, Heart, ArrowLeft, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      description: "Crisp, juicy apples rich in fiber and antioxidants.",
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
      description: "Fresh bananas perfect for smoothies, breakfast, and snacks.",
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
      description: "Fresh dairy milk for tea, coffee, cereals, and cooking.",
    },
  ];

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center text-white">
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${product.name} added to cart 🛒`);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] py-28 px-6 text-white">
      <button
        onClick={() => navigate("/products")}
        className="mb-8 flex items-center gap-2 text-[#E9FF70] font-bold"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-[#FFF8F0]/95 text-black rounded-[40px] p-8 shadow-2xl">
        <div className="overflow-hidden rounded-[30px] bg-white">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[460px] object-cover hover:scale-110 transition duration-500"
          />
        </div>

        <div>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-[#E9FF70] text-[#12091F] px-4 py-2 rounded-full text-sm font-bold">
              {product.category}
            </span>

            <span className="bg-[#FFB86B]/30 text-[#8A4A00] px-4 py-2 rounded-full text-sm font-bold">
              {product.type}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold mt-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-orange-500">
            <Star fill="currentColor" />
            <span className="font-bold">{product.rating}</span>
            <span className="text-gray-500">| 120+ reviews</span>
          </div>

          <p className="text-4xl font-extrabold text-[#12091F] mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mt-5 leading-7">
            {product.description}
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow">
              <Truck className="text-[#12091F] mb-2" />
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Delivered in 10–20 mins</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow">
              <ShieldCheck className="text-[#12091F] mb-2" />
              <h3 className="font-bold">Quality Checked</h3>
              <p className="text-sm text-gray-600">Freshness guaranteed</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-700 mb-2 font-bold">
              Freshness Meter 🌿 {product.freshness}
            </p>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E9FF70]"
                style={{ width: product.freshness }}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-[#12091F] text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#24163D]"
            >
              <Plus />
              Add to Cart
            </button>

            <button
              onClick={addToWishlist}
              className="bg-red-100 text-red-600 px-6 rounded-2xl hover:bg-red-200"
            >
              <Heart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}