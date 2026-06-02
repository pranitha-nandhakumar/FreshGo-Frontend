import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message submitted successfully ✅");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Backend not connected");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-4">Contact Us</h1>

      <p className="text-center text-green-700 mb-12">
        Need help? FreshGo support is always ready.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ y: -6 }}
          className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">Send Message</h2>

          <input
            className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none h-32 resize-none"
            placeholder="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-2xl"
          >
            Submit
          </button>
        </motion.form>

        <div className="grid gap-5">
          {[
            { icon: <Mail />, title: "Email", text: "support@freshgo.com" },
            { icon: <Phone />, title: "Phone", text: "+91 98765 43210" },
            { icon: <MapPin />, title: "Location", text: "Chennai, India" },
            {
              icon: <MessageCircle />,
              title: "AI Support",
              text: "24/7 chatbot support",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ x: 8 }}
              className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-lg flex gap-4 items-center"
            >
              <div className="text-green-700">{item.icon}</div>

              <div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-green-700">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}