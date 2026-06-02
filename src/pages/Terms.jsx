import { motion } from "framer-motion";
import { FileText, ShoppingCart, CreditCard, Shield } from "lucide-react";

export default function Terms() {
  const terms = [
    {
      icon: <ShoppingCart size={30} />,
      title: "Orders & Deliveries",
      text: "Orders placed through FreshGo are subject to product availability and delivery serviceability.",
    },
    {
      icon: <CreditCard size={30} />,
      title: "Payments",
      text: "All payments must be completed through approved payment methods available on the platform.",
    },
    {
      icon: <Shield size={30} />,
      title: "User Responsibilities",
      text: "Users must provide accurate account information and maintain confidentiality of login credentials.",
    },
    {
      icon: <FileText size={30} />,
      title: "Policy Updates",
      text: "FreshGo reserves the right to update these terms at any time without prior notice.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-4">
        Terms & Conditions 📜
      </h1>

      <p className="text-center text-green-700 max-w-3xl mx-auto mb-12">
        By using FreshGo, you agree to comply with the following terms and
        conditions. These terms help ensure a safe and reliable shopping
        experience for everyone.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {terms.map((term) => (
          <motion.div
            key={term.title}
            whileHover={{ y: -8 }}
            className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
          >
            <div className="text-green-700 mb-4">
              {term.icon}
            </div>

            <h2 className="text-2xl font-bold mb-3">
              {term.title}
            </h2>

            <p className="text-green-700">
              {term.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-12 bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          General Guidelines
        </h2>

        <ul className="list-disc pl-6 text-green-700 space-y-3">
          <li>Users must be at least 18 years old or use the service under parental supervision.</li>
          <li>FreshGo may cancel suspicious or fraudulent orders.</li>
          <li>Prices and availability of products may change without notice.</li>
          <li>Delivery timings may vary depending on location and external conditions.</li>
          <li>Violation of terms may result in account suspension.</li>
        </ul>
      </div>
    </div>
  );
}