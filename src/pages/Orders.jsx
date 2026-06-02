import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag, IndianRupee, Truck } from "lucide-react";

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
          `http://localhost:5000/api/orders/user/${user.id}`
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
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-6 text-green-950">
      <h1 className="text-5xl font-bold text-center mb-4">My Orders 📦</h1>

      <p className="text-center text-green-700 mb-10">
        Track your FreshGo grocery orders
      </p>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-green-700 mb-5">
            No orders found yet.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-green-700 text-white px-6 py-3 rounded-2xl"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between flex-wrap gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <Package className="text-green-700" />
                  <div>
                    <h2 className="font-bold">Order ID</h2>
                    <p className="text-green-700 text-sm">{order._id}</p>
                  </div>
                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  {order.status}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-5">
                <div className="bg-white/70 rounded-2xl p-4 flex gap-3 items-center">
                  <ShoppingBag className="text-green-700" />
                  <div>
                    <p className="text-sm text-green-700">Items</p>
                    <h3 className="font-bold">{order.items.length}</h3>
                  </div>
                </div>

                <div className="bg-white/70 rounded-2xl p-4 flex gap-3 items-center">
                  <IndianRupee className="text-green-700" />
                  <div>
                    <p className="text-sm text-green-700">Total</p>
                    <h3 className="font-bold">₹{order.totalAmount}</h3>
                  </div>
                </div>

                <div className="bg-white/70 rounded-2xl p-4 flex gap-3 items-center">
                  <Truck className="text-green-700" />
                  <div>
                    <p className="text-sm text-green-700">Delivery</p>
                    <h3 className="font-bold">10–20 min</h3>
                  </div>
                </div>
              </div>

              <div className="border-t border-green-100 pt-4">
                <h3 className="font-bold mb-3">Products</h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 text-green-800"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-green-700">
                📍 {order.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}