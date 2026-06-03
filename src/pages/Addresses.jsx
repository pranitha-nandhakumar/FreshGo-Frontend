import { useEffect, useState } from "react";
import { Home, Briefcase, GraduationCap, Trash2, Star, MapPin } from "lucide-react";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    type: "Home",
    address: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("freshgoAddresses")) || [];
    setAddresses(saved);
  }, []);

  const saveAddresses = (newAddresses) => {
    setAddresses(newAddresses);
    localStorage.setItem("freshgoAddresses", JSON.stringify(newAddresses));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.address.trim()) {
      alert("Please enter address");
      return;
    }

    const newAddress = {
      id: Date.now(),
      type: form.type,
      address: form.address,
      default: addresses.length === 0,
    };

    saveAddresses([...addresses, newAddress]);
    setForm({ type: "Home", address: "" });
  };

  const deleteAddress = (id) => {
    saveAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setDefault = (id) => {
    saveAddresses(
      addresses.map((addr) => ({
        ...addr,
        default: addr.id === id,
      }))
    );
  };

  const getIcon = (type) => {
    if (type === "Home") return <Home />;
    if (type === "Work") return <Briefcase />;
    return <GraduationCap />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12091F] via-[#1B1030] to-[#24163D] py-28 px-6 text-white">
      <h1 className="text-5xl font-extrabold text-center mb-3">
        My Addresses 📍
      </h1>

      <p className="text-center text-[#C9B8E8] mb-10">
        Manage your FreshGo delivery locations
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <form
          onSubmit={handleAdd}
          className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-8 shadow-2xl h-fit"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#12091F] text-[#E9FF70] p-3 rounded-2xl">
              <MapPin />
            </div>
            <h2 className="text-3xl font-extrabold">Add Address</h2>
          </div>

          <label className="font-bold mb-2 block">Address Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          >
            <option>Home</option>
            <option>Work</option>
            <option>Hostel</option>
          </select>

          <label className="font-bold mb-2 block">Full Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Enter full delivery address"
            className="w-full p-4 rounded-2xl mb-4 border border-[#E8DCCB] outline-none h-32 resize-none focus:border-[#E9FF70] focus:ring-2 focus:ring-[#E9FF70]/30"
          />

          <button className="w-full bg-[#12091F] hover:bg-[#24163D] text-white py-4 rounded-2xl font-bold">
            Add Address
          </button>
        </form>

        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-10 shadow-2xl text-center">
              <MapPin className="mx-auto mb-4 text-[#12091F]" size={50} />
              <p className="text-gray-700">No address added yet.</p>
            </div>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-[#FFF8F0]/95 text-black rounded-[35px] p-6 shadow-2xl"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="bg-[#12091F] text-[#E9FF70] p-3 rounded-2xl h-fit">
                      {getIcon(addr.type)}
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold">
                        {addr.type}
                        {addr.default && (
                          <span className="ml-2 text-sm bg-[#E9FF70] text-[#12091F] px-3 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </h3>

                      <p className="text-gray-700 mt-2">{addr.address}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>

                {!addr.default && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="mt-5 flex items-center gap-2 bg-[#E9FF70] text-[#12091F] px-5 py-2 rounded-2xl font-bold"
                  >
                    <Star size={18} />
                    Set as Default
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}