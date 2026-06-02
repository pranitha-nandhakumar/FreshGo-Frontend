import { useState } from "react";
import { MapPin } from "lucide-react";

export default function LocationFinder() {
  const [location, setLocation] = useState("");
  const [manualLocation, setManualLocation] = useState("");

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation("📍 Current Location Detected 🚚");
        localStorage.setItem("freshgoLocation", JSON.stringify({ lat, lon }));
      },
      () => {
        alert("Please allow location access");
      }
    );
  };

  const saveManualLocation = () => {
    if (!manualLocation.trim()) {
      alert("Please enter your delivery location");
      return;
    }

    setLocation(`📍 Delivering to: ${manualLocation}`);
    localStorage.setItem(
      "freshgoLocation",
      JSON.stringify({ address: manualLocation })
    );
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
      <MapPin className="text-green-700 mb-4" size={36} />

      <h3 className="text-xl font-bold mb-2">Delivery Location</h3>

      <p className="text-green-800 mb-3">
        {location || "Choose your delivery location"}
      </p>

      {location && (
        <p className="text-sm text-green-600 mb-4">
          Estimated delivery: 10–15 minutes
        </p>
      )}

      <input
        value={manualLocation}
        onChange={(e) => setManualLocation(e.target.value)}
        placeholder="Enter area / city"
        className="w-full mb-3 px-4 py-2 rounded-xl outline-none border border-green-200"
      />

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={saveManualLocation}
          className="bg-white/70 text-green-800 px-5 py-2 rounded-xl shadow"
        >
          Select Location
        </button>

        <button
          onClick={useCurrentLocation}
          className="bg-green-700 text-white px-5 py-2 rounded-xl"
        >
          Use Current Location
        </button>
      </div>
    </div>
  );
}