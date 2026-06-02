import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  name: form.name,
  email: form.email,
  phone: form.phone,
  password: form.password,
}),
      });

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
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
      <form
        onSubmit={handleSignup}
        className="bg-white/60 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          Create Account
        </h1>

        <p className="text-green-700 mb-6">
          Join FreshGo smart grocery world
        </p>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input"
          required
        />

        <input
          name="password"
          value={form.password}
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="input"
          required
        />

        <input
          name="confirmPassword"
          value={form.confirmPassword}
          type="password"
          onChange={handleChange}
          placeholder="Confirm Password"
          className="input"
          required
        />

        <button className="w-full bg-green-700 text-white py-3 rounded-2xl mt-4">
          Create Account
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}