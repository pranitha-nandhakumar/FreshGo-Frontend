import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  LogOut,
  MapPin,
  Package,
  Pencil,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("freshgoLoggedIn");
    const user = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    if (isLoggedIn !== "true" || !user) {
      alert("Please login to view profile");
      navigate("/login");
      return;
    }

    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("freshgoLoggedIn");
    localStorage.removeItem("freshgoCurrentUser");
    localStorage.removeItem("freshgoToken");
    localStorage.removeItem("freshgoCart");

    window.dispatchEvent(new Event("loginUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] py-28 px-6 text-white">
      <div className="max-w-4xl mx-auto bg-[#FFF8F0]/95 text-black rounded-[40px] shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center text-5xl font-extrabold shadow-xl">
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-extrabold mt-4">My Profile</h1>

          <p className="text-gray-600 mt-1">
            Manage your FreshGo account details
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-5 shadow flex items-center gap-4">
            <User className="text-[#12091F]" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <h2 className="text-lg font-extrabold">{currentUser.name}</h2>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow flex items-center gap-4">
            <Mail className="text-[#12091F]" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h2 className="text-sm font-bold break-all">
                {currentUser.email}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow flex items-center gap-4">
            <Phone className="text-[#12091F]" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <h2 className="text-lg font-extrabold">
                {currentUser.phone || "Not added"}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/addresses")}
            className="bg-[#E9FF70] hover:bg-[#dfff45] text-[#12091F] py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
          >
            <MapPin size={18} />
            Addresses
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-[#FFB86B] hover:bg-[#ffa94a] text-[#12091F] py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
          >
            <Package size={18} />
            My Orders
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}