import { useState } from "react";
import { Mic } from "lucide-react";

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
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
      <Mic className="text-green-700 mb-4" size={36} />

      <h3 className="text-xl font-bold mb-2">Voice Shopping</h3>

      <p className="text-green-800 mb-4">{message}</p>

      <button
        onClick={startVoiceShopping}
        className="bg-green-700 text-white px-5 py-2 rounded-xl"
      >
        Start Voice Shopping
      </button>
    </div>
  );
}