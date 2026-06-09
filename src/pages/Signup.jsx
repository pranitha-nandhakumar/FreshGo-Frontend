import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  Sparkles,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
     firstName: "",
  lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const inputClass =
    "w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://freshgo-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: form.firstName,
  lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully ✅");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center px-6 py-20">
      <form
        onSubmit={handleSignup}
        className="bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center mb-4">
            <Sparkles size={34} />
          </div>

          <h1 className="text-4xl font-extrabold">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Join the FreshGo smart grocery world
          </p>
        </div>

        <label className="font-bold flex items-center gap-2 mb-2">
          <User size={18} />
          Full Name
        </label>

        <input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={form.firstName}
  onChange={handleChange}
/>

<input
  type="text"
  name="lastName"
  placeholder="Last Name"
  value={form.lastName}
  onChange={handleChange}
/>

        <label className="font-bold flex items-center gap-2 mb-2">
          <Mail size={18} />
          Email
        </label>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={inputClass}
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
          className={inputClass}
          required
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <Lock size={18} />
          Password
        </label>

        <input
          name="password"
          value={form.password}
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className={inputClass}
          required
        />

        <label className="font-bold flex items-center gap-2 mb-2">
          <Lock size={18} />
          Confirm Password
        </label>

        <input
          name="confirmPassword"
          value={form.confirmPassword}
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          className={inputClass}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl mt-3 flex items-center justify-center gap-2 font-bold"
        >
          <UserPlus size={18} />
          Create Account
        </button>

        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6D4AFF] font-extrabold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}