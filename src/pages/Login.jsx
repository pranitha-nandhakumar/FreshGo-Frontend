import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputClass =
    "w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://freshgo-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("freshgoLoggedIn", "true");
        localStorage.setItem("freshgoCurrentUser", JSON.stringify(data.user));
        localStorage.setItem("freshgoToken", data.token);

        window.dispatchEvent(new Event("loginUpdated"));

        alert("Login successful ✅");
        navigate("/");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center px-6 py-28">
      <form
        onSubmit={handleLogin}
        className="bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center mb-4">
            <Sparkles size={34} />
          </div>

          <h1 className="text-4xl font-extrabold">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to continue shopping smart
          </p>
        </div>

        <label className="font-bold flex items-center gap-2 mb-2">
          <Mail size={18} />
          Email Address
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

        <div className="text-right mb-5">
          <Link
            to="/forgot-password"
            className="text-[#6D4AFF] text-sm font-bold"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
        >
          <LogIn size={18} />
          Login
        </button>

        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#6D4AFF] font-extrabold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}