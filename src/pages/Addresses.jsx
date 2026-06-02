import { useEffect, useState } from "react";
import { Home, Briefcase, GraduationCap, Trash2, Star } from "lucide-react";

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

    setForm({
      type: "Home",
      address: "",
    });
  };

  const deleteAddress = (id) => {
    saveAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setDefault = (id) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      default: addr.id === id,
    }));

    saveAddresses(updated);
  };

  const getIcon = (type) => {
    if (type === "Home") return <Home className="text-green-700" />;
    if (type === "Work") return <Briefcase className="text-green-700" />;
    return <GraduationCap className="text-green-700" />;
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-6 text-green-950">
      <h1 className="text-5xl font-bold text-center mb-4">
        My Addresses 📍
      </h1>

      <p className="text-center text-green-700 mb-10">
        Manage your delivery locations
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <form
          onSubmit={handleAdd}
          className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-5">Add Address</h2>

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none"
          >
            <option>Home</option>
            <option>Work</option>
            <option>Hostel</option>
          </select>

          <textarea
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            placeholder="Enter full delivery address"
            className="w-full p-4 rounded-2xl mb-4 border border-green-200 outline-none h-32 resize-none"
          />

          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl">
            Add Address
          </button>
        </form>

        <div className="space-y-4">
          {addresses.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center">
              <p className="text-green-700">
                No address added yet.
              </p>
            </div>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex gap-4">
                    {getIcon(addr.type)}

                    <div>
                      <h3 className="text-xl font-bold">
                        {addr.type}
                        {addr.default && (
                          <span className="ml-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </h3>

                      <p className="text-green-700 mt-2">
                        {addr.address}
                      </p>
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
                    className="mt-4 flex items-center gap-2 text-green-700 font-bold"
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