import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  CreditCard,
  MapPin,
  Phone,
  User,
  Wallet,
  Truck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 499 ? 0 : 25;
  const discount = subtotal > 300 ? 30 : 0;
  const totalAmount = subtotal + deliveryFee - discount;

  const inputClass =
    "w-full p-4 mb-4 rounded-2xl bg-[#10081f] border border-purple-400/30 text-white placeholder:text-purple-300 outline-none focus:border-lime-300 focus:ring-2 focus:ring-lime-300/20 transition";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("freshgoLoggedIn");

    if (isLoggedIn !== "true") {
      alert("Please login before checkout");
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = {
  userId: currentUser?.id || "guest-user",

  name: form.name,
  phone: form.phone,
  address: form.address,

  customer: {
    name: form.name,
    phone: form.phone,
    address: form.address,
  },
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      deliveryFee,
      discount,
      totalAmount,
      paymentMethod: form.paymentMethod,
      status: "Confirmed",
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch("https://freshgo-backend.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        localStorage.setItem("freshgoLastOrder", JSON.stringify(orderData));
        localStorage.removeItem("freshgoCart");
        window.dispatchEvent(new Event("cartUpdated"));
        setOrderPlaced(true);
      } else {
        alert(data.message || "Order failed");
      }
    } catch (error) {
      localStorage.setItem("freshgoLastOrder", JSON.stringify(orderData));
      localStorage.removeItem("freshgoCart");
      window.dispatchEvent(new Event("cartUpdated"));
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080312] px-6 text-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 bg-[#1b0f2d]/90 border border-purple-400/20 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_0_45px_rgba(168,85,247,0.16)] text-center max-w-md">
          <CheckCircle className="mx-auto text-lime-300 mb-4" size={70} />

          <h1 className="text-4xl font-extrabold mb-4">
            Order Confirmed!
          </h1>

          <p className="text-purple-200">
            Your FreshGo groceries are getting packed now 🚚
          </p>

          <div className="mt-5 bg-[#10081f] border border-lime-300/20 rounded-2xl p-4">
            <p className="text-lime-300 font-bold">Estimated Delivery</p>
            <p className="text-2xl font-extrabold mt-1">15–20 minutes</p>
          </div>

          <button
            onClick={() => navigate("/order-tracking")}
            className="mt-6 w-full bg-lime-300 text-[#080312] px-7 py-4 rounded-2xl font-extrabold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080312] py-28 px-6 text-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-center mb-3">
          Secure <span className="text-lime-300 italic">Checkout</span>
        </h1>

        <p className="text-center text-purple-200 mb-10">
          Complete your FreshGo order securely
        </p>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 p-8 rounded-[2.5rem] shadow-[0_0_45px_rgba(168,85,247,0.16)]"
          >
            <h2 className="text-3xl font-extrabold mb-6">
              Delivery Details
            </h2>

            <label className="font-bold flex items-center gap-2 mb-2 text-lime-300">
              <User size={18} />
              Full Name
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
            />

            <label className="font-bold flex items-center gap-2 mb-2 text-lime-300">
              <Phone size={18} />
              Phone Number
            </label>
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={inputClass}
            />

            <label className="font-bold flex items-center gap-2 mb-2 text-lime-300">
              <MapPin size={18} />
              Delivery Address
            </label>
            <textarea
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no, street, area, city"
              className={`${inputClass} h-32 resize-none`}
            />

            <label className="font-bold flex items-center gap-2 mb-2 text-lime-300">
              <CreditCard size={18} />
              Payment Method
            </label>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {["Cash on Delivery", "UPI", "Credit Card"].map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() =>
                    setForm({ ...form, paymentMethod: method })
                  }
                  className={`rounded-2xl p-4 border transition text-left ${
                    form.paymentMethod === method
                      ? "bg-lime-300 text-[#080312] border-lime-300"
                      : "bg-[#10081f] text-white border-purple-400/30"
                  }`}
                >
                  <Wallet size={20} className="mb-2" />
                  <p className="font-bold">{method}</p>
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-300 hover:bg-lime-200 text-[#080312] py-4 rounded-2xl font-extrabold text-lg shadow-[0_0_25px_rgba(223,255,94,0.25)]"
            >
              Place Order ₹{totalAmount}
            </button>
          </form>

          <div className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 p-8 rounded-[2.5rem] shadow-[0_0_45px_rgba(168,85,247,0.16)] h-fit">
            <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
              <ShoppingBag className="text-lime-300" />
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p className="text-purple-200">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 bg-[#10081f] border border-purple-400/20 rounded-2xl p-4"
                  >
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-purple-300 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-lime-300 font-bold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 border-t border-purple-400/20 pt-5">
              <div className="flex justify-between text-purple-200">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-purple-200">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-purple-200">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <div className="flex justify-between text-2xl font-extrabold text-lime-300 border-t border-purple-400/20 pt-4">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="bg-lime-300/10 border border-lime-300/20 rounded-2xl p-4 flex gap-3">
                <Truck className="text-lime-300" />
                <p className="text-sm text-purple-200">
                  Fast delivery within 15–20 minutes.
                </p>
              </div>

              <div className="bg-lime-300/10 border border-lime-300/20 rounded-2xl p-4 flex gap-3">
                <ShieldCheck className="text-lime-300" />
                <p className="text-sm text-purple-200">
                  Secure checkout and quality-checked groceries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}