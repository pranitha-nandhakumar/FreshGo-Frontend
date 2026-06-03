import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Database,
  CreditCard,
  MapPin,
  Cookie,
} from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield size={30} />,
      title: "Data Protection",
      text: "FreshGo safeguards your personal information using modern security practices and encrypted storage mechanisms.",
    },
    {
      icon: <Lock size={30} />,
      title: "Account Security",
      text: "Passwords and sensitive user information are protected through secure authentication and access control methods.",
    },
    {
      icon: <CreditCard size={30} />,
      title: "Payment Security",
      text: "Transactions are processed through trusted payment gateways with secure encryption standards.",
    },
    {
      icon: <Database size={30} />,
      title: "Data Usage",
      text: "We use customer data to improve recommendations, order processing, and overall shopping experiences.",
    },
    {
      icon: <MapPin size={30} />,
      title: "Location Services",
      text: "Location information is used only to improve delivery accuracy and provide nearby service availability.",
    },
    {
      icon: <Cookie size={30} />,
      title: "Cookies & Preferences",
      text: "Cookies help personalize your experience and remember settings for faster future visits.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080312] text-white py-24 px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-2 rounded-full bg-[#24143d] border border-lime-300/30 text-lime-300 mb-5">
            Privacy & Security
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-5">
            Privacy{" "}
            <span className="text-lime-300 italic">
              Policy
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-purple-200 text-lg">
            At FreshGo, your privacy is our priority. We are committed to
            protecting your information and being transparent about how your
            data is collected, stored, and used.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              whileHover={{ y: -8 }}
              className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-7 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/40 hover:shadow-[0_0_35px_rgba(223,255,94,0.18)] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-5">
                {section.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {section.title}
              </h2>

              <p className="text-purple-200 leading-relaxed">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto mt-14 bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-8 shadow-[0_0_35px_rgba(168,85,247,0.12)]">
          <h2 className="text-3xl font-bold mb-6">
            Information We Collect
          </h2>

          <ul className="space-y-4 text-purple-200">
            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Full name and contact information.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Delivery address and location preferences.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Order history and shopping preferences.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Payment transaction records (excluding sensitive card details).
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Device and browser information for security and analytics.
            </li>
          </ul>
        </div>

        {/* User Rights */}
        <div className="max-w-6xl mx-auto mt-8 bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-8 shadow-[0_0_35px_rgba(168,85,247,0.12)]">
          <h2 className="text-3xl font-bold mb-6">
            Your Rights
          </h2>

          <p className="text-purple-200 leading-relaxed">
            You may request access, correction, or deletion of your personal
            information at any time. FreshGo aims to provide transparency and
            control over how your information is used within our platform.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-purple-300 text-sm">
          Last Updated: June 2026 • FreshGo Privacy Policy
        </div>
      </div>
    </div>
  );
}