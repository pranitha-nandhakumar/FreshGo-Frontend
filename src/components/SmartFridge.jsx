import { useState } from "react";
import { Refrigerator, Plus } from "lucide-react";

export default function SmartFridge() {
  const [scanned, setScanned] = useState(false);

  const missingItems = [
    { id: 3, name: "Milk", price: 45, rating: 4.7, img: "🥛", freshness: "88%", quantity: 1 },
    { id: 4, name: "Bread", price: 40, rating: 4.5, img: "🍞", freshness: "85%", quantity: 1 },
    { id: 5, name: "Carrot", price: 60, rating: 4.4, img: "🥕", freshness: "92%", quantity: 1 },
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
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
      <Refrigerator className="text-green-700 mb-4" size={36} />

      <h3 className="text-xl font-bold mb-2">Smart Fridge</h3>

      <p className="text-green-800 mb-4">
        {scanned
          ? "AI detected low-stock groceries"
          : "Scan fridge → Auto refill groceries"}
      </p>

      {!scanned ? (
        <button
          onClick={() => setScanned(true)}
          className="bg-green-700 text-white px-5 py-2 rounded-xl"
        >
          Scan Fridge
        </button>
      ) : (
        <>
          <div className="space-y-2 mb-4">
            {missingItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/60 rounded-xl px-4 py-2 flex justify-between"
              >
                <span>{item.img} {item.name}</span>
                <span className="text-green-700 font-semibold">Low</span>
              </div>
            ))}
          </div>

          <button
            onClick={addAllToCart}
            className="bg-green-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} />
            Add All To Cart
          </button>
        </>
      )}
    </div>
  );
}