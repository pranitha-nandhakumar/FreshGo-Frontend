import { motion } from "framer-motion";
import {
  Leaf,
  Truck,
  Warehouse,
  Home,
  Sparkles,
  ShieldCheck,
  Clock,
  HeartHandshake,
} from "lucide-react";

export default function About() {
  const journey = [
    {
      icon: <Leaf />,
      title: "Farm Fresh",
      text: "Fresh fruits, vegetables and essentials are sourced carefully.",
    },
    {
      icon: <Warehouse />,
      title: "Smart Packing",
      text: "Every item is checked, packed and prepared for safe delivery.",
    },
    {
      icon: <Truck />,
      title: "Fast Delivery",
      text: "FreshGo delivers groceries quickly to your doorstep.",
    },
    {
      icon: <Home />,
      title: "Your Home",
      text: "Enjoy healthy groceries with comfort and convenience.",
    },
  ];

  const features = [
    {
      icon: <Sparkles />,
      title: "AI Shopping",
      text: "Personalized suggestions based on your mood, lifestyle and needs.",
    },
    {
      icon: <ShieldCheck />,
      title: "Quality First",
      text: "Freshness meter and smart checks help users choose better products.",
    },
    {
      icon: <Clock />,
      title: "Time Saving",
      text: "Search, wishlist, cart and checkout make grocery shopping faster.",
    },
    {
      icon: <HeartHandshake />,
      title: "User Friendly",
      text: "Built with profile, addresses, orders and smart assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] text-white py-28 px-6">
      <section className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#E9FF70] font-bold mb-4"
        >
          About FreshGo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          Smart groceries for a{" "}
          <span className="text-[#E9FF70] italic">fresher lifestyle</span>
        </motion.h1>

        <p className="text-[#C9B8E8] max-w-3xl mx-auto mt-6 text-lg">
          FreshGo is an AI-powered grocery ecommerce platform designed to make
          daily shopping faster, healthier and more personalized. It combines
          fresh grocery delivery with smart features like recommendations,
          wishlist, cart, orders, address management and AI-based assistance.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-4 gap-6">
        {journey.map((item, index) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-6 shadow-2xl text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#12091F] text-[#E9FF70] flex items-center justify-center mb-5">
              {item.icon}
            </div>

            <h2 className="text-xl font-extrabold">{item.title}</h2>
            <p className="text-gray-600 mt-3">{item.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-16 bg-[#FFF8F0]/95 text-black rounded-[40px] p-8 md:p-10 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">
              Why FreshGo?
            </h2>

            <p className="text-gray-700 leading-7">
              FreshGo is not just a grocery website. It is designed as a smart
              shopping experience where users can explore products, save their
              favorites, manage delivery addresses, track orders and receive
              intelligent shopping support.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow">
                <h3 className="text-2xl font-extrabold">15+</h3>
                <p className="text-sm text-gray-500">Products</p>
              </div>

              <div className="bg-white rounded-2xl p-4 text-center shadow">
                <h3 className="text-2xl font-extrabold">10–20</h3>
                <p className="text-sm text-gray-500">Min Delivery</p>
              </div>

              <div className="bg-white rounded-2xl p-4 text-center shadow">
                <h3 className="text-2xl font-extrabold">AI</h3>
                <p className="text-sm text-gray-500">Assistance</p>
              </div>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900"
            alt="Fresh groceries"
            className="w-full h-[360px] object-cover rounded-[35px]"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          What makes us different?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              className="bg-[#FFF8F0]/95 text-black rounded-[30px] p-6 shadow-2xl"
            >
              <div className="text-[#12091F] mb-4">{item.icon}</div>
              <h3 className="text-xl font-extrabold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}