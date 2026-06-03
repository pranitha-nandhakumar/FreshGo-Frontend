import { useState } from "react";
import { Refrigerator, Plus, ScanLine, Sparkles } from "lucide-react";

export default function SmartFridge() {
  const [scanned, setScanned] = useState(false);

  const missingItems = [
    {
      id: 3,
      name: "Milk",
      price: 45,
      rating: 4.7,
      img: "🥛",
      freshness: "88%",
      quantity: 1,
    },
    {
      id: 4,
      name: "Bread",
      price: 40,
      rating: 4.5,
      img: "🍞",
      freshness: "85%",
      quantity: 1,
    },
    {
      id: 5,
      name: "Carrot",
      price: 60,
      rating: 4.4,
      img: "🥕",
      freshness: "92%",
      quantity: 1,
    },
  ];

  const addAllToCart = () => {
    const cart = JSON.parse(localStorage.getItem("freshgoCart")) || [];
    let updatedCart = [...cart];

    missingItems.forEach((product) => {
      const existing = updatedCart.find((item) => item.id === product.id);

      if (existing) {
        updatedCart = updatedCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart.push(product);
      }
    });

    localStorage.setItem("freshgoCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Smart Fridge items added to cart 🧊");
  };

  return (
    <div className="relative overflow-hidden bg-[#1b0f2d]/80 backdrop-blur-2xl rounded-[2rem] p-6 border border-purple-400/20 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/35 transition">
      <div className="absolute -top-14 -right-14 w-44 h-44 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-4 shadow-[0_0_20px_rgba(223,255,94,0.12)]">
          <Refrigerator size={32} />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          Smart Fridge
        </h3>

        <p className="text-purple-200 mb-4 leading-relaxed">
          {scanned
            ? "AI detected low-stock groceries from your fridge."
            : "Scan your fridge and let AI suggest items to refill."}
        </p>

        {!scanned ? (
          <button
            onClick={() => setScanned(true)}
            className="w-full flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_22px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
          >
            <ScanLine size={17} />
            Scan Fridge
          </button>
        ) : (
          <>
            <div className="mb-4 inline-flex items-center gap-2 bg-[#10081f] border border-lime-300/20 text-lime-300 px-3 py-2 rounded-full text-sm">
              <Sparkles size={15} />
              AI refill suggestions ready
            </div>

            <div className="space-y-3 mb-5">
              {missingItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#10081f]/90 border border-purple-400/20 rounded-2xl px-4 py-3 flex justify-between items-center hover:border-lime-300/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.img}</span>

                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-sm text-purple-300">₹{item.price}</p>
                    </div>
                  </div>

                  <span className="text-lime-300 bg-lime-300/10 border border-lime-300/20 px-3 py-1 rounded-full text-sm font-bold">
                    Low
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={addAllToCart}
              className="w-full bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
            >
              <Plus size={17} />
              Add All To Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}