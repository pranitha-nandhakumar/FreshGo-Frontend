import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send, Sparkles } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://freshgo-backend.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Check your email! A password reset link has been sent.");
        setEmail("");
      } else {
        alert(data.message || "Failed to send reset link");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center px-6 py-28">
      <form
        onSubmit={handleReset}
        className="bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center mb-4">
            <Sparkles size={34} />
          </div>

          <h1 className="text-4xl font-extrabold">
            Reset Password
          </h1>

          <p className="text-gray-600 mt-2">
            Enter your registered email to receive reset link
          </p>
        </div>

        <label className="font-bold flex items-center gap-2 mb-2">
          <Mail size={18} />
          Email Address
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full p-4 rounded-2xl mb-5 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold"
        >
          <Send size={18} />
          Send Reset Link
        </button>

        <p className="text-center mt-6 text-gray-700">
          Back to{" "}
          <Link to="/login" className="text-[#6D4AFF] font-extrabold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}