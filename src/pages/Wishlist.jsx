import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("freshgoWishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("freshgoWishlist", JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (id) => {
    saveWishlist(wishlist.filter((item) => item.id !== id));
  };

  const moveToCart = (product) => {
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

    removeFromWishlist(product.id);
    alert(`${product.name} moved to cart 🛒`);
  };

  return (
    <div className="min-h-screen bg-[#080312] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-16 left-10 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#24143d]/80 border border-lime-300/30 text-lime-300 px-5 py-2 rounded-full mb-5 shadow-[0_0_25px_rgba(223,255,94,0.18)]">
            <Sparkles size={18} />
            Your saved FreshGo picks
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-4">
            My{" "}
            <span className="text-lime-300 italic drop-shadow-[0_0_18px_rgba(223,255,94,0.45)]">
              Wishlist
            </span>
          </h1>

          <p className="text-purple-200 max-w-2xl mx-auto text-lg">
            Keep your favourite groceries ready and move them to cart anytime.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-400/30">
              <Heart className="text-red-400" size={55} />
            </div>

            <h2 className="text-3xl font-extrabold mb-3">
              Wishlist is empty
            </h2>

            <p className="text-purple-200 mb-7">
              Add fresh products you love and find them here later.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(223,255,94,0.35)] transition hover:scale-105"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="group bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-5 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/40 hover:shadow-[0_0_35px_rgba(223,255,94,0.18)] transition-all"
              >
                {item.img?.startsWith("http") ? (
                  <div className="overflow-hidden rounded-[1.5rem] mb-5 border border-purple-400/20">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                ) : (
                  <div className="text-7xl text-center mb-5 bg-[#10081f] rounded-[1.5rem] py-8 border border-purple-400/20">
                    {item.img}
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">
                      {item.name}
                    </h2>

                    <p className="text-lime-300 font-extrabold text-xl mt-2">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-full bg-red-500/10 flex items-center justify-center border border-red-400/30">
                    <Heart className="text-red-400" size={22} fill="currentColor" />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => moveToCart(item)}
                    className="flex-1 bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
                  >
                    <ShoppingCart size={17} />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-12 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}