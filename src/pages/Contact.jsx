import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputClass =
    "w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30";

  const contactInfo = [
    { icon: <Mail />, title: "Email", text: "support@freshgo.com" },
    { icon: <Phone />, title: "Phone", text: "+91 98765 43210" },
    { icon: <MapPin />, title: "Location", text: "Chennai, India" },
    {
      icon: <MessageCircle />,
      title: "AI Support",
      text: "24/7 smart grocery support",
    },
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://freshgo-backend.onrender.com/api/contact", {
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
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] text-white py-28 px-6">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-[#E9FF70] font-bold mb-3">Contact FreshGo</p>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          We’re here to help you
        </h1>

        <p className="text-[#C9B8E8]">
          Need help with orders, groceries, AI recommendations or delivery?
          FreshGo support is always ready.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ y: -6 }}
          className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-extrabold mb-2">Send Message</h2>
          <p className="text-gray-600 mb-6">
            Fill the form and our team will reach out soon.
          </p>

          <label className="font-bold mb-2 block">Your Name</label>
          <input
            className={inputClass}
            placeholder="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="font-bold mb-2 block">Email Address</label>
          <input
            className={inputClass}
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="font-bold mb-2 block">Message</label>
          <textarea
            className={`${inputClass} h-32 resize-none`}
            placeholder="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#12091F] hover:bg-[#24163D] transition text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Submit Message
          </button>
        </motion.form>

        <div className="grid gap-5">
          {contactInfo.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ x: 8, scale: 1.02 }}
              className="bg-[#FFF8F0]/95 text-black rounded-[30px] p-6 shadow-2xl flex gap-4 items-center"
            >
              <div className="bg-[#12091F] text-[#E9FF70] p-4 rounded-2xl">
                {item.icon}
              </div>

              <div>
                <h3 className="font-extrabold text-xl">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            </motion.div>
          ))}

          <div className="bg-gradient-to-r from-[#E9FF70] to-[#FFB86B] text-[#12091F] rounded-[30px] p-6 shadow-2xl">
            <h3 className="text-2xl font-extrabold mb-2">
              FreshGo Promise ✨
            </h3>
            <p>
              We aim to deliver fresh groceries, quick support and smart shopping
              guidance for every user.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}