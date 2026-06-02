import { useParams, useNavigate } from "react-router-dom";
import { Star, Plus, Heart, ArrowLeft } from "lucide-react";

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
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-800">
          Product not found
        </h1>
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
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-6 text-green-950">
      <button
        onClick={() => navigate("/products")}
        className="mb-8 flex items-center gap-2 text-green-700 font-bold"
      >
        <ArrowLeft size={18} />
        Back to Products
      </button>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white/60 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-[420px] object-cover rounded-3xl"
        />

        <div>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
            {product.category}
          </span>

          <h1 className="text-5xl font-bold mt-5">{product.name}</h1>

          <div className="flex items-center gap-2 mt-4 text-orange-500">
            <Star fill="currentColor" />
            <span className="font-bold">{product.rating}</span>
          </div>

          <p className="text-3xl font-bold text-green-700 mt-5">
            ₹{product.price}
          </p>

          <p className="text-green-800 mt-5 leading-7">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-sm text-green-700 mb-2">
              Freshness Meter 🌿 {product.freshness}
            </p>

            <div className="h-3 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600"
                style={{ width: product.freshness }}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-green-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2"
            >
              <Plus />
              Add to Cart
            </button>

            <button
              onClick={addToWishlist}
              className="bg-red-100 text-red-600 px-6 rounded-2xl"
            >
              <Heart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}