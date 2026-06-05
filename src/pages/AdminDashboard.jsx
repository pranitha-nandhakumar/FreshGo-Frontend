import { useEffect, useState } from "react";
import { Users, ShoppingCart, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://freshgo-backend.onrender.com/api/auth/users"
      );

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "https://freshgo-backend.onrender.com/api/orders"
      );

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        "https://freshgo-backend.onrender.com/api/contact"
      );

      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      <h1 className="text-5xl font-bold text-center text-green-900 mb-10">
        Admin Dashboard 🛠️
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
          <Users className="text-green-700 mb-3" size={35} />
          <h2 className="text-3xl font-bold">{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
          <ShoppingCart
            className="text-green-700 mb-3"
            size={35}
          />
          <h2 className="text-3xl font-bold">{orders.length}</h2>
          <p>Total Orders</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
          <MessageSquare
            className="text-green-700 mb-3"
            size={35}
          />
          <h2 className="text-3xl font-bold">
            {messages.length}
          </h2>
          <p>Total Messages</p>
        </div>
      </div>

      {/* Users */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Registered Users 👥
        </h2>

        {users.map((user) => (
          <div
            key={user._id}
            className="border-b py-3 flex justify-between"
          >
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
        ))}
      </div>

      {/* Orders */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Orders 📦
        </h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="border-b py-3 flex justify-between"
          >
            <span>{order._id.slice(-6)}</span>
            <span>₹{order.totalAmount}</span>
            <span>{order.status}</span>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">
          Customer Messages 💬
        </h2>

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border-b py-3"
          >
            <h3 className="font-bold">{msg.name}</h3>
            <p>{msg.email}</p>
            <p className="text-green-700">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}