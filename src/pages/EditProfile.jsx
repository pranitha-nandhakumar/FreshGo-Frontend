import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Save } from "lucide-react";

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const oldUser = JSON.parse(localStorage.getItem("freshgoCurrentUser"));

    const updatedUser = {
      ...oldUser,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    localStorage.setItem("freshgoCurrentUser", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("loginUpdated"));

    alert("Profile updated successfully ✅");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleUpdate}
        className="bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center text-4xl font-extrabold">
            {form.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1 className="text-4xl font-extrabold mt-4">
            Edit Profile
          </h1>

          <p className="text-gray-600 mt-2">
            Update your FreshGo account details
          </p>
        </div>

        <label className="font-bold flex items-center gap-2 mb-2">
          <User size={18} />
          Full Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          required
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <Mail size={18} />
          Email Address
        </label>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          required
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <Phone size={18} />
          Phone Number
        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-4 rounded-2xl mb-6 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
        />

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
        >
          <Save size={18} />
          Save Changes
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-full mt-4 bg-[#E9FF70] hover:bg-[#dfff45] text-[#12091F] py-4 rounded-2xl font-bold"
        >
          Back to Profile
        </button>
      </form>
    </div>
  );
}