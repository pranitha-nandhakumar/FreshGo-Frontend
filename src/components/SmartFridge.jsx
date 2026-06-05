import { useState } from "react";
import {
  Refrigerator,
  Plus,
  ScanLine,
  Sparkles,
  Upload,
  Camera,
  X,
} from "lucide-react";

export default function SmartFridge() {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [preview, setPreview] = useState(null);
  const [detectedItems, setDetectedItems] = useState([]);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setScanned(false);
  };

  const scanFridge = () => {
  if (!preview) {
    alert("Please upload a fridge image first 📷");
    return;
  }

  setScanning(true);
  setScanned(false);

  setTimeout(() => {
    setDetectedItems([
      "Tomato",
      "Eggs",
      "Milk",
      "Butter",
      "Cheese",
    ]);

    setScanning(false);
    setScanned(true);
  }, 2500);
};

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
          AI Smart Fridge
        </h3>

        <p className="text-purple-200 mb-4 leading-relaxed">
          Upload or capture your fridge image and let FreshGo AI suggest refill
          items.
        </p>

        {preview ? (
          <div className="relative mb-4 rounded-2xl overflow-hidden border border-purple-400/20">
            <img
              src={preview}
              alt="Fridge preview"
              className="w-full h-44 object-cover"
            />

            <button
              onClick={() => {
                setPreview(null);
                setScanned(false);
                setScanning(false);
              }}
              className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="mb-4 flex flex-col items-center justify-center border-2 border-dashed border-lime-300/25 rounded-2xl p-6 cursor-pointer hover:border-lime-300/60 transition bg-[#10081f]/70">
            <Upload className="text-lime-300 mb-3" size={32} />

            <p className="text-white font-bold">Upload Fridge Image</p>
            <p className="text-purple-300 text-sm mt-1">
              JPG, PNG or camera photo
            </p>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}

        {!scanned ? (
          <button
            onClick={scanFridge}
            disabled={scanning}
            className="w-full flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-200 disabled:opacity-70 disabled:cursor-not-allowed text-[#080312] font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_22px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
          >
            {scanning ? (
              <>
                <Sparkles size={17} className="animate-spin" />
                AI Scanning...
              </>
            ) : (
              <>
                <ScanLine size={17} />
                AI Scan Fridge
              </>
            )}
          </button>
        ) : (
          <>
            <div className="mb-4 inline-flex items-center gap-2 bg-[#10081f] border border-lime-300/20 text-lime-300 px-3 py-2 rounded-full text-sm">
              <Sparkles size={15} />
              AI refill suggestions ready
            </div>
            <h4 className="text-lime-300 font-bold mb-3 mt-4">
  🤖 AI Detected Items
</h4>

<div className="flex flex-wrap gap-2 mb-5">
  {detectedItems.map((item) => (
    <span
      key={item}
      className="bg-lime-300/10 border border-lime-300/20 text-lime-300 px-3 py-2 rounded-full text-sm"
    >
      {item}
    </span>
  ))}
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