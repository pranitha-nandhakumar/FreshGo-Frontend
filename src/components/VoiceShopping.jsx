import { useState } from "react";
import { Mic, Sparkles, Volume2 } from "lucide-react";

export default function VoiceShopping() {
  const [message, setMessage] = useState("Say: Add milk and bread");

  const products = [
    { id: 1, name: "Fresh Apples", price: 120, rating: 4.8, img: "🍎", freshness: "95%" },
    { id: 2, name: "Broccoli", price: 80, rating: 4.6, img: "🥦", freshness: "90%" },
    { id: 3, name: "Milk", price: 45, rating: 4.7, img: "🥛", freshness: "88%" },
    { id: 4, name: "Bread", price: 40, rating: 4.5, img: "🍞", freshness: "85%" },
    { id: 5, name: "Carrot", price: 60, rating: 4.4, img: "🥕", freshness: "92%" },
    { id: 6, name: "Grapes", price: 100, rating: 4.9, img: "🍇", freshness: "96%" },
  ];

  const startVoiceShopping = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    setMessage("🎤 Listening... Say: Add milk and bread");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setMessage(`You said: "${transcript}"`);

      const matchedItems = products.filter((product) =>
        transcript.includes(product.name.toLowerCase().replace("fresh ", ""))
      );

      if (matchedItems.length === 0) {
        setMessage(`❌ No matching items found for: "${transcript}"`);
        return;
      }

      const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];

      let updatedCart = [...cart];

      matchedItems.forEach((product) => {
        const existing = updatedCart.find((item) => item.id === product.id);

        if (existing) {
          updatedCart = updatedCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart.push({ ...product, quantity: 1 });
        }
      });

      localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));

      setMessage(
        `✅ Added: ${matchedItems.map((item) => item.name).join(", ")}`
      );
    };

    recognition.onerror = () => {
      setMessage("❌ Voice recognition failed. Please try again.");
    };
  };

  return (
    <div className="relative overflow-hidden bg-[#1b0f2d]/80 backdrop-blur-2xl rounded-[2rem] p-6 border border-purple-400/20 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/35 transition">
      <div className="absolute -top-14 -right-14 w-44 h-44 bg-lime-300/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-4 shadow-[0_0_20px_rgba(223,255,94,0.12)]">
          <Mic size={32} />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          Voice Shopping
        </h3>

        <p className="text-purple-200 mb-4 min-h-[48px] leading-relaxed">
          {message}
        </p>

        <div className="mb-5 inline-flex items-center gap-2 bg-[#10081f] border border-purple-400/25 text-purple-200 px-3 py-2 rounded-full text-sm">
          <Volume2 size={15} className="text-lime-300" />
          Try saying: Add milk and bread
        </div>

        <button
          onClick={startVoiceShopping}
          className="w-full flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_22px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
        >
          <Sparkles size={17} />
          Start Voice Shopping
        </button>
      </div>
    </div>
  );
}