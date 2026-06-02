import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white/60 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          Edit Profile
        </h1>

        <p className="text-green-700 mb-6">
          Update your FreshGo account details
        </p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
        />

        <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl">
          Save Changes
        </button>
      </form>
    </div>
  );
}