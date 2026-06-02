import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "How fast is FreshGo delivery?",
      a: "FreshGo aims to deliver groceries within 10–20 minutes based on your location.",
    },
    {
      q: "Can I cancel my order?",
      a: "Yes, you can cancel before the order is packed or dispatched.",
    },
    {
      q: "Does FreshGo support online payment?",
      a: "Yes, FreshGo supports UPI, cards, wallets, and cash on delivery.",
    },
    {
      q: "What is AI Meal Planner?",
      a: "It suggests grocery items and meal combos based on your mood and lifestyle.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-4">FAQ 🤖</h1>
      <p className="text-center text-green-700 mb-12">
        Quick answers from FreshGo support
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full p-5 flex justify-between items-center text-left font-bold"
            >
              🤖 {item.q}
              <ChevronDown
                className={`transition ${open === index ? "rotate-180" : ""}`}
              />
            </button>

            {open === index && (
              <motion.p
                className="px-5 pb-5 text-green-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⚡ {item.a}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}