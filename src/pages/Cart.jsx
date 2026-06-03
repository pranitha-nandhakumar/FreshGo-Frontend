import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] text-white py-28 px-6">
      <h1 className="text-5xl font-extrabold text-center mb-3">
        Your Smart Cart 🛒
      </h1>

      <p className="text-center text-[#C9B8E8] mb-10">
        Review your fresh picks before checkout
      </p>

      {cart.length === 0 ? (
        <div className="max-w-xl mx-auto text-center bg-[#FFF8F0]/95 text-black rounded-[35px] p-10 shadow-2xl">
          <ShoppingBag className="mx-auto mb-4 text-[#12091F]" size={55} />

          <p className="text-xl mb-6">
            Your cart is empty. Add some fresh groceries!
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-[#12091F] text-white px-7 py-3 rounded-2xl hover:bg-[#24163D]"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#FFF8F0]/95 text-black rounded-[35px] p-6 shadow-2xl">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#E8DCCB] py-5"
              >
                <div className="flex items-center gap-4">
                  {item.img?.startsWith("http") ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="text-5xl">{item.img}</div>
                  )}

                  <div>
                    <h2 className="text-xl font-extrabold">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-[#12091F] text-white p-2 rounded-full"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="font-bold text-lg">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-[#12091F] text-white p-2 rounded-full"
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
          </div>

          <div className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-6 shadow-2xl h-fit">
            <h2 className="text-3xl font-extrabold mb-5">Order Summary</h2>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-700">
              <span>Delivery</span>
              <span className="text-green-700 font-bold">Free</span>
            </div>

            <div className="border-t border-[#E8DCCB] pt-4 mt-4 flex justify-between text-2xl font-extrabold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-[#12091F] text-white py-4 rounded-2xl hover:bg-[#24163D]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}