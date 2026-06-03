import { useState } from "react";
import { MapPin, Navigation, LocateFixed } from "lucide-react";

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
    <div className="relative overflow-hidden bg-[#1b0f2d]/80 backdrop-blur-2xl rounded-[2rem] p-6 border border-purple-400/20 shadow-[0_0_35px_rgba(168,85,247,0.12)] hover:border-lime-300/35 transition">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-lime-300/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-lime-300/10 border border-lime-300/30 flex items-center justify-center text-lime-300 mb-4 shadow-[0_0_20px_rgba(223,255,94,0.12)]">
          <MapPin size={32} />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          Delivery Location
        </h3>

        <p className="text-purple-200 mb-3">
          {location || "Choose your delivery location"}
        </p>

        {location && (
          <p className="inline-flex items-center gap-2 text-sm text-lime-300 bg-lime-300/10 border border-lime-300/20 px-3 py-1 rounded-full mb-4">
            🚚 Estimated delivery: 10–15 minutes
          </p>
        )}

        <input
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="Enter area / city"
          className="w-full mb-4 px-4 py-3 rounded-2xl bg-[#10081f] border border-purple-400/30 text-white placeholder:text-purple-300 outline-none focus:border-lime-300 focus:shadow-[0_0_20px_rgba(223,255,94,0.2)] transition"
        />

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={saveManualLocation}
            className="flex items-center gap-2 bg-[#10081f] hover:bg-[#21123a] border border-purple-400/30 text-purple-100 hover:text-lime-300 px-5 py-3 rounded-2xl transition"
          >
            <Navigation size={17} />
            Select Location
          </button>

          <button
            onClick={useCurrentLocation}
            className="flex items-center gap-2 bg-lime-300 hover:bg-lime-200 text-[#080312] font-extrabold px-5 py-3 rounded-2xl shadow-[0_0_22px_rgba(223,255,94,0.25)] transition hover:scale-[1.02]"
          >
            <LocateFixed size={17} />
            Use Current Location
          </button>
        </div>
      </div>
    </div>
  );
}