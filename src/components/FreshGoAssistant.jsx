import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

export default function FreshGoAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m FreshGo Assistant 🤖 Ask me about groceries, deals, recipes, or smart fridge.",
    },
  ]);

  const questions = [
    "Suggest healthy breakfast",
    "Items under ₹100",
    "Quick snacks",
    "Daily essentials",
    "How does Smart Fridge work?",
  ];

  const getAnswer = (question) => {
    const q = question.toLowerCase();

    if (q.includes("healthy breakfast")) {
      return "For a healthy breakfast, try Milk, Banana, Bread, Oats, Apples, and Curd. These are quick, nutritious, and budget-friendly.";
    }

    if (q.includes("under") || q.includes("100")) {
      return "Items under ₹100 include Banana, Milk, Bread, Potato, Tomato, Onion, Curd, Cookies, and Soft Drink.";
    }

    if (q.includes("snack")) {
      return "Quick snacks you can try are Chocolate, Cookies, Bread Sandwich, Banana Milkshake, and Ice Cream.";
    }

    if (q.includes("daily")) {
      return "Daily essentials include Milk, Bread, Rice, Cooking Oil, Curd, Butter, Shampoo, and Detergent.";
    }

    if (q.includes("smart fridge")) {
      return "Smart Fridge lets users upload or scan a fridge image. FreshGo then suggests low-stock grocery items and allows adding them to cart.";
    }

    if (q.includes("deal") || q.includes("offer")) {
      return "FreshGo Flash Deals show discounted products like Milk, Bread, Apples, and Chocolate for a limited time.";
    }

    return "I can help with product suggestions, budget items, healthy picks, recipes, flash deals, and Smart Fridge features.";
  };

  const askQuestion = (question) => {
    if (!question.trim()) return;

    const answer = getAnswer(question);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: answer },
    ]);

    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-lime-300 text-[#080312] flex items-center justify-center shadow-[0_0_30px_rgba(223,255,94,0.45)] hover:scale-110 transition"
      >
        <Bot size={30} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] bg-[#1b0f2d] border border-purple-400/20 rounded-[2rem] shadow-[0_0_45px_rgba(168,85,247,0.3)] overflow-hidden">
          <div className="bg-[#10081f] px-5 py-4 flex justify-between items-center border-b border-purple-400/20">
            <div>
              <h3 className="text-white font-extrabold flex items-center gap-2">
                <Sparkles className="text-lime-300" size={18} />
                FreshGo Assistant
              </h3>
              <p className="text-purple-300 text-sm">Smart grocery helper</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-purple-300 hover:text-white"
            >
              <X />
            </button>
          </div>

          <div className="p-4 h-72 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl text-sm ${
                  msg.from === "bot"
                    ? "bg-[#10081f] text-purple-100"
                    : "bg-lime-300 text-[#080312] ml-auto"
                } max-w-[85%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="px-4 pb-3 flex gap-2 flex-wrap">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => askQuestion(q)}
                className="text-xs bg-lime-300/10 text-lime-300 border border-lime-300/20 px-3 py-2 rounded-full"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-purple-400/20 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askQuestion(input)}
              placeholder="Ask FreshGo..."
              className="flex-1 bg-[#10081f] border border-purple-400/20 text-white placeholder:text-purple-300 rounded-2xl px-4 py-3 outline-none"
            />

            <button
              onClick={() => askQuestion(input)}
              className="bg-lime-300 text-[#080312] px-4 rounded-2xl"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}