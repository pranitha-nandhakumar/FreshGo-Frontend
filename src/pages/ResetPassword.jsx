import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://freshgo-backend.onrender.com/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successfully ✅");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] flex items-center justify-center px-6 py-28">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8F0]/95 text-black p-8 rounded-[35px] shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#12091F] to-[#6D4AFF] text-[#E9FF70] flex items-center justify-center mb-4">
            <ShieldCheck size={34} />
          </div>

          <h1 className="text-4xl font-extrabold">
            Create New Password
          </h1>

          <p className="text-gray-600 mt-2">
            Choose a strong password for your account
          </p>
        </div>

        <label className="font-bold flex items-center gap-2 mb-2">
          <Lock size={18} />
          New Password
        </label>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border border-[#E8DCCB] rounded-2xl mb-5 outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl font-bold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}