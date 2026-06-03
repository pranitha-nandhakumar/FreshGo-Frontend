import { motion } from "framer-motion";
import {
  FileText,
  ShoppingCart,
  CreditCard,
  Shield,
  RefreshCw,
  UserX,
} from "lucide-react";

export default function Terms() {
  const terms = [
    {
      icon: <ShoppingCart size={30} />,
      title: "Orders & Deliveries",
      text: "Orders are processed based on product availability and delivery serviceability. Delivery timings may vary depending on traffic, weather, and location.",
    },
    {
      icon: <CreditCard size={30} />,
      title: "Payments & Billing",
      text: "Payments must be completed using approved payment methods. Failed or suspicious transactions may result in order cancellation.",
    },
    {
      icon: <Shield size={30} />,
      title: "Account Security",
      text: "Users are responsible for maintaining the confidentiality of their account credentials and activity performed under their account.",
    },
    {
      icon: <RefreshCw size={30} />,
      title: "Returns & Refunds",
      text: "Refunds are processed according to FreshGo's refund policy. Eligible refund requests will be reviewed and processed within the applicable timeline.",
    },
    {
      icon: <UserX size={30} />,
      title: "Account Suspension",
      text: "Fraudulent activities, abuse of services, or violations of platform policies may result in temporary or permanent account suspension.",
    },
    {
      icon: <FileText size={30} />,
      title: "Policy Updates",
      text: "FreshGo reserves the right to modify these terms at any time. Continued use of the platform indicates acceptance of updated terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080312] text-white py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-2 rounded-full bg-[#24143d] border border-lime-300/30 text-lime-300 mb-5">
            Legal Information
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-5">
            Terms &{" "}
            <span className="text-lime-300 italic">
              Conditions
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-purple-200 text-lg">
            These terms govern your access to and use of FreshGo services.
            By using our platform, you agree to comply with these guidelines
            and policies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto">
          {terms.map((term) => (
            <motion.div
              key={term.title}
              whileHover={{ y: -8 }}
              className="bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-7 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/40 hover:shadow-[0_0_35px_rgba(223,255,94,0.18)] transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-5">
                {term.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {term.title}
              </h2>

              <p className="text-purple-200 leading-relaxed">
                {term.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Guidelines Section */}
        <div className="max-w-6xl mx-auto mt-14 bg-[#1b0f2d]/80 backdrop-blur-2xl border border-purple-400/20 rounded-[2rem] p-8 shadow-[0_0_35px_rgba(168,85,247,0.12)]">
          <h2 className="text-3xl font-bold mb-6">
            General Guidelines
          </h2>

          <ul className="space-y-4 text-purple-200">
            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Users must be at least 18 years old or use the platform under parental supervision.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Product prices and availability may change without prior notice.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              FreshGo may cancel suspicious or fraudulent orders.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Delivery estimates are approximate and not guaranteed.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Users must not misuse, reverse engineer, or exploit platform services.
            </li>

            <li className="flex gap-3">
              <span className="text-lime-300">✓</span>
              Violation of these terms may result in account restrictions or suspension.
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 text-purple-300 text-sm">
          Last Updated: June 2026 • FreshGo Grocery Platform
        </div>
      </div>
    </div>
  );
}