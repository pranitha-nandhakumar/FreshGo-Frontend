import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, MapPin, Phone, User } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const inputClass =
    "w-full p-4 mb-4 rounded-xl border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30";

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

    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    const currentUser = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderData = {
      userId: currentUser?.id || "guest-user",
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      address: form.address,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("freshgoCart");
        window.dispatchEvent(new Event("cartUpdated"));
        setOrderPlaced(true);
      } else {
        alert(data.message || "Order failed");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] px-6">
        <div className="bg-[#FFF8F0]/95 text-black p-10 rounded-[35px] shadow-2xl text-center max-w-md">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={60} />

          <h1 className="text-4xl font-extrabold mb-4">
            🎉 Order Confirmed!
          </h1>

          <p>Your groceries are on the way 🚚</p>

          <p className="mt-3 text-gray-600">
            Estimated delivery: 15–20 minutes
          </p>

          <button
            onClick={() => navigate("/orders")}
            className="mt-6 bg-[#12091F] text-white px-7 py-3 rounded-2xl"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] py-28 px-6 text-white">
      <h1 className="text-5xl font-extrabold text-center mb-3">
        Secure Checkout 💳
      </h1>

      <p className="text-center text-[#C9B8E8] mb-10">
        Complete your FreshGo order securely
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl"
      >
        <label className="font-bold flex items-center gap-2 mb-2">
          <User size={18} />
          Full Name
        </label>
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className={inputClass}
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <Phone size={18} />
          Phone Number
        </label>
        <input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className={inputClass}
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <MapPin size={18} />
          Delivery Address
        </label>
        <textarea
          required
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className={`${inputClass} h-32 resize-none`}
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <CreditCard size={18} />
          Payment Method
        </label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className={inputClass}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl font-bold mt-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}