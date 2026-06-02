import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, LogOut } from "lucide-react";

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
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-6 text-green-950">
      <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-xl rounded-[35px] shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-green-700 text-white flex items-center justify-center text-4xl font-bold">
            {currentUser.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-4xl font-bold mt-4">My Profile</h1>
          <p className="text-green-700">FreshGo account details</p>
        </div>

        <div className="space-y-5">
          <div className="bg-white/70 rounded-2xl p-5 flex items-center gap-4">
            <User className="text-green-700" />
            <div>
              <p className="text-sm text-green-700">Name</p>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
            </div>
          </div>

          <div className="bg-white/70 rounded-2xl p-5 flex items-center gap-4">
            <Mail className="text-green-700" />
            <div>
              <p className="text-sm text-green-700">Email</p>
              <h2 className="text-xl font-bold">{currentUser.email}</h2>
            </div>
          </div>

          <div className="bg-white/70 rounded-2xl p-5 flex items-center gap-4">
            <Phone className="text-green-700" />
            <div>
              <p className="text-sm text-green-700">Phone</p>
              <h2 className="text-xl font-bold">
                {currentUser.phone || "Not added"}
              </h2>
            </div>
          </div>
        </div>
    
    <button
  onClick={() => navigate("/edit-profile")}
  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl"
>
  Edit Profile ✏️
</button>
<button
  onClick={() => navigate("/addresses")}
  className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl"
>
  Manage Addresses 📍
</button>
        <button
  onClick={() => navigate("/orders")}
  className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl"
>
  View My Orders 📦
</button>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}