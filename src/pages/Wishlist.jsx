import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
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

    removeFromWishlist(product.id);
    alert(`${product.name} moved to cart 🛒`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-6 text-green-950">
      <h1 className="text-5xl font-bold text-center mb-4">
        My Wishlist ❤️
      </h1>

      <p className="text-center text-green-700 mb-10">
        Your saved FreshGo products
      </p>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <Heart className="mx-auto text-green-700 mb-4" size={50} />
          <p className="text-xl text-green-700 mb-6">
            Your wishlist is empty.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-5 shadow-xl"
            >
              {item.img?.startsWith("http") ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                />
              ) : (
                <div className="text-6xl text-center mb-4">{item.img}</div>
              )}

              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="text-green-700 font-bold mt-2">
                ₹{item.price}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => moveToCart(item)}
                  className="flex-1 bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-100 text-red-600 px-4 rounded-xl"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}