import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset link sent to your email ✅");
        setEmail("");
      } else {
        alert(data.message || "Failed to send reset link");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
      <form
        onSubmit={handleReset}
        className="bg-white/60 backdrop-blur-xl p-8 rounded-[30px] shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-2">
          Reset Password
        </h1>

        <p className="text-green-700 mb-6">
          Enter your registered email
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="input"
          required
        />

        <button className="w-full bg-green-700 text-white py-3 rounded-2xl mt-4">
          Send Reset Link
        </button>

        <p className="text-center mt-5">
          Back to{" "}
          <Link to="/login" className="text-green-700 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}