import { motion } from "framer-motion";
import { Shield, Lock, Database } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield size={32} />,
      title: "Data Protection",
      text: "FreshGo protects your personal information using industry-standard security practices.",
    },
    {
      icon: <Lock size={32} />,
      title: "Payment Security",
      text: "All transactions are encrypted to ensure safe and secure payments.",
    },
    {
      icon: <Database size={32} />,
      title: "Data Usage",
      text: "We only use your data to improve shopping experience, recommendations, and delivery services.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-green-950 py-16 px-6">
      <h1 className="text-5xl font-bold text-center mb-4">
        Privacy Policy 🔒
      </h1>

      <p className="text-center text-green-700 max-w-3xl mx-auto mb-12">
        Your privacy matters to us. FreshGo is committed to protecting your
        information and maintaining transparency about how we use your data.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sections.map((section) => (
          <motion.div
            key={section.title}
            whileHover={{ y: -8 }}
            className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="flex justify-center text-green-700 mb-4">
              {section.icon}
            </div>

            <h2 className="text-2xl font-bold mb-3">
              {section.title}
            </h2>

            <p className="text-green-700">
              {section.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">
          Information We Collect
        </h2>

        <ul className="list-disc pl-6 text-green-700 space-y-2">
          <li>Name and contact details</li>
          <li>Delivery address information</li>
          <li>Order history and preferences</li>
          <li>Payment-related transaction details</li>
        </ul>
      </div>
    </div>
  );
}
