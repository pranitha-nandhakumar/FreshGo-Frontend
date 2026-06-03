import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Truck,
  CreditCard,
  Sparkles,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      icon: <Truck />,
      q: "How fast is FreshGo delivery?",
      a: "FreshGo aims to deliver groceries within 10–20 minutes depending on your location, product availability, and delivery slot.",
    },
    {
      icon: <ShoppingCart />,
      q: "Can I cancel my order?",
      a: "Yes, you can cancel your order before it is packed or dispatched. Once it is out for delivery, cancellation may not be available.",
    },
    {
      icon: <CreditCard />,
      q: "Does FreshGo support online payment?",
      a: "Yes, FreshGo supports UPI, cards, wallets, and cash on delivery. You can choose your preferred payment method during checkout.",
    },
    {
      icon: <Sparkles />,
      q: "What is AI Meal Planner?",
      a: "AI Meal Planner suggests grocery items and meal ideas based on your mood, lifestyle, health goals, cravings, and budget.",
    },
    {
      icon: <ShieldCheck />,
      q: "How does FreshGo ensure product freshness?",
      a: "FreshGo uses freshness indicators, smart product sorting, and quality checks to help users choose fresh and reliable grocery items.",
    },
    {
      icon: <HelpCircle />,
      q: "Can I save products for later?",
      a: "Yes, you can add products to your wishlist and move them to cart whenever you are ready to purchase.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] text-white py-28 px-6">
      <section className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-[#E9FF70] font-bold mb-3">
          FreshGo Help Center
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Frequently Asked Questions
        </h1>

        <p className="text-[#C9B8E8]">
          Find quick answers about delivery, payments, orders, AI shopping,
          wishlist, freshness and support.
        </p>
      </section>

      <div className="max-w-4xl mx-auto space-y-5">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            className="bg-[#FFF8F0]/95 text-black rounded-[30px] shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full p-6 flex justify-between items-center text-left font-extrabold gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#12091F] text-[#E9FF70] p-3 rounded-2xl">
                  {item.icon}
                </div>

                <span>{item.q}</span>
              </div>

              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <motion.p
                className="px-6 pb-6 text-gray-700 leading-7"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {item.a}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-r from-[#E9FF70] to-[#FFB86B] text-[#12091F] rounded-[30px] p-8 text-center shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-2">
          Still need help?
        </h2>

        <p className="mb-5">
          Reach out to FreshGo support for order issues, delivery doubts or
          account help.
        </p>

        <a
          href="/contact"
          className="inline-block bg-[#12091F] text-white px-7 py-3 rounded-2xl font-bold"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}