import { motion } from "framer-motion";
import { Leaf, Truck, Warehouse, Home } from "lucide-react";

export default function About() {
  const journey = [
    { icon: <Leaf />, title: "Farm", text: "Fresh items sourced directly." },
    { icon: <Warehouse />, title: "Warehouse", text: "Quality checked and packed." },
    { icon: <Truck />, title: "Delivery", text: "Fast doorstep delivery." },
    { icon: <Home />, title: "Your Home", text: "Healthy groceries arrive fresh." },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-16">
      <h1 className="text-5xl font-bold text-center mb-4">About FreshGo</h1>
      <p className="text-center text-green-700 max-w-2xl mx-auto mb-12">
        FreshGo is an AI-powered grocery platform built to make shopping smarter,
        faster, healthier, and more sustainable.
      </p>

      <div className="grid md:grid-cols-4 gap-6 px-6">
        {journey.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -8 }}
            className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-lg text-center"
          >
            <div className="text-green-700 flex justify-center mb-4">{item.icon}</div>
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-green-700 mt-2">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}