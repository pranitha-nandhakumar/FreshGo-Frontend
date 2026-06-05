import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Truck,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("freshgoCurrentUser"));
      const isLoggedIn = localStorage.getItem("freshgoLoggedIn");

      if (isLoggedIn !== "true" || !user) {
        alert("Please login to view your orders");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `https://freshgo-backend.onrender.com/api/orders/user/${user.id}`
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          alert(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        alert("Backend not connected");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] py-28 px-6 text-white">
      <h1 className="text-5xl font-extrabold text-center mb-3">
        My Orders 📦
      </h1>

      <p className="text-center text-[#C9B8E8] mb-10">
        Track your FreshGo grocery orders
      </p>

      {orders.length === 0 ? (
        <div className="max-w-xl mx-auto text-center bg-[#FFF8F0]/95 text-black rounded-[35px] p-10 shadow-2xl">
          <Package className="mx-auto mb-4 text-[#12091F]" size={55} />

          <p className="text-xl mb-6">No orders found yet.</p>

          <button
            onClick={() => navigate("/products")}
            className="bg-[#12091F] hover:bg-[#24163D] text-white px-7 py-3 rounded-2xl"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-6 shadow-2xl"
            >
              <div className="flex justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-[#12091F] text-[#E9FF70] p-3 rounded-2xl">
                    <Package />
                  </div>

                  <div>
                    <h2 className="font-extrabold">Order ID</h2>
                    <p className="text-gray-600 text-sm break-all">
                      {order._id}
                    </p>
                  </div>
                </div>

                <div className="bg-[#E9FF70] text-[#12091F] px-5 py-2 rounded-full font-extrabold h-fit">
                  {order.status}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 flex gap-3 items-center shadow">
                  <ShoppingBag className="text-[#12091F]" />
                  <div>
                    <p className="text-sm text-gray-500">Items</p>
                    <h3 className="font-extrabold">{order.items.length}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 flex gap-3 items-center shadow">
                  <IndianRupee className="text-[#12091F]" />
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <h3 className="font-extrabold">₹{order.totalAmount}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 flex gap-3 items-center shadow">
                  <Truck className="text-[#12091F]" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery</p>
                    <h3 className="font-extrabold">10–20 min</h3>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 flex gap-3 items-center shadow">
                  <CalendarDays className="text-[#12091F]" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <h3 className="font-extrabold">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "Today"}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8DCCB] pt-4">
                <h3 className="font-extrabold mb-3">Products</h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-gray-700 flex gap-2">
                <MapPin className="text-[#12091F]" size={20} />
                {order.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}