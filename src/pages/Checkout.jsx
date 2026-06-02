import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

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
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            🎉 Order Placed!
          </h1>
          <p>Your groceries are on the way 🚚</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">
        Checkout 💳
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl"
      >
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-4 mb-4 rounded-xl border"
        />

        <input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-4 mb-4 rounded-xl border"
        />

        <textarea
          required
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="w-full p-4 mb-4 rounded-xl border h-32"
        />

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-xl border"
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-4 rounded-2xl"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}