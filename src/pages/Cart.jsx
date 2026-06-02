import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("freshgoLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login to view your cart");
      navigate("/login");
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    setCart(savedCart);
  }, [navigate]);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("freshgoCart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        Your Smart Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-green-700 text-xl mb-6">
            Your cart is empty. Add some fresh groceries!
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xl rounded-[35px] p-6 shadow-xl">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-green-100 py-5"
            >
              <div className="flex items-center gap-4">
                {item.img?.startsWith("http") ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-5xl">{item.img}</div>
                )}

                <div>
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p className="text-green-700">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-green-100 p-2 rounded-full"
                >
                  <Minus size={16} />
                </button>

                <span className="font-bold">{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-green-100 p-2 rounded-full"
                >
                  <Plus size={16} />
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-100 text-red-600 p-2 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Total: ₹{total}</h2>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-700 text-white px-8 py-3 rounded-2xl hover:bg-green-800"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}