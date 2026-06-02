import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
      <form
        onSubmit={handleLogin}
        className="bg-white/60 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-green-700 mb-6">
          Login to continue shopping smart
        </p>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
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

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-green-700 text-sm">
            Forgot Password?
          </Link>
        </div>

        <button className="w-full bg-green-700 text-white py-3 rounded-2xl">
          Login
        </button>

        <p className="text-center mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-700 font-bold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}