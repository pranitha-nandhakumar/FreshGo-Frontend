import { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Home,
  MapPin,
  Phone,
  Clock,
  Navigation,
} from "lucide-react";

export default function OrderTracking() {
  const [statusIndex, setStatusIndex] = useState(0);
  const order = JSON.parse(localStorage.getItem("freshgoLastOrder"));

  const stages = [
    { title: "Order Confirmed", icon: <CheckCircle /> },
    { title: "Packed", icon: <Package /> },
    { title: "Out For Delivery", icon: <Truck /> },
    { title: "Delivered", icon: <Home /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#080312] text-white py-28 px-6 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-center mb-3">
          Order <span className="text-lime-300 italic">Tracking</span>
        </h1>

        <p className="text-center text-purple-200 mb-12">
          Track your FreshGo delivery in real-time
        </p>

        <div className="max-w-6xl mx-auto bg-[#1b0f2d]/80 border border-purple-400/20 rounded-[2.5rem] p-8 shadow-[0_0_45px_rgba(168,85,247,0.16)]">
          <div className="grid md:grid-cols-4 gap-5 mb-10">
            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className={`rounded-3xl p-5 text-center border transition ${
                  index <= statusIndex
                    ? "bg-lime-300 text-[#080312] border-lime-300"
                    : "bg-[#10081f] text-purple-300 border-purple-400/20"
                }`}
              >
                <div className="flex justify-center mb-3">{stage.icon}</div>
                <p className="font-bold">{stage.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#10081f] border border-purple-400/20 rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="text-lime-300" />
                <h2 className="text-2xl font-bold text-lime-300">
                  Live Delivery Map
                </h2>
              </div>

              <iframe
                title="FreshGo Delivery Map"
                src={`https://www.google.com/maps?q=${
                  order?.customer?.address || order?.address || "Chennai"
                }&output=embed`}
                className="w-full h-72 rounded-2xl border-0"
                loading="lazy"
              ></iframe>

              <p className="text-purple-300 text-sm mt-3">
                Map shows delivery area based on your selected address.
              </p>
            </div>

            <div className="bg-[#10081f] border border-purple-400/20 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="text-lime-300" />
                <h2 className="text-2xl font-bold text-lime-300">
                  Delivery Timeline
                </h2>
              </div>

              {stages.map((step, index) => (
                <div key={step.title} className="flex gap-4 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
                        index <= statusIndex
                          ? "bg-lime-300 text-[#080312]"
                          : "bg-purple-900 text-purple-300"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {index !== stages.length - 1 && (
                      <div
                        className={`w-1 h-10 ${
                          index < statusIndex
                            ? "bg-lime-300"
                            : "bg-purple-800"
                        }`}
                      ></div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>

                    <p className="text-purple-300 text-sm">
                      {index < statusIndex
                        ? "Completed"
                        : index === statusIndex
                        ? "In progress"
                        : "Waiting"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#10081f] border border-purple-400/20 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-lime-300 mb-4">
                Delivery Partner
              </h2>

              <p className="mb-2">👤 Rahul Kumar</p>

              <p className="mb-2 flex items-center gap-2">
                <Phone size={18} /> +91 98765 43210
              </p>

              <p>🚚 Vehicle: TN 37 AB 1234</p>
            </div>

            <div className="bg-[#10081f] border border-purple-400/20 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-lime-300 mb-4">
                Delivery Address
              </h2>

              <p className="flex gap-2 text-purple-200">
                <MapPin size={20} />
                {order?.customer?.address ||
                  order?.address ||
                  "Address not available"}
              </p>

              <p className="mt-5 text-lime-300 font-bold">
                ETA: 15–20 minutes
              </p>
            </div>
          </div>

          <div className="mt-8 bg-[#10081f] border border-purple-400/20 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-lime-300 mb-4">
              Order Summary
            </h2>

            {order?.items?.length > 0 ? (
              order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 text-purple-200"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))
            ) : (
              <p className="text-purple-300">No order items found.</p>
            )}

            <div className="border-t border-purple-400/20 mt-4 pt-4 flex justify-between text-2xl font-extrabold text-lime-300">
              <span>Total</span>
              <span>₹{order?.totalAmount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}