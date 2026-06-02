import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBasket } from "lucide-react";

export default function IntroScreen({ onEnter }) {
  const [basketX, setBasketX] = useState(-120);
  const [caught, setCaught] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const groceries = ["🍎", "🥦", "🥛", "🍞", "🥕", "🍇"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBasketX((prev) => (prev >= 120 ? -120 : prev + 40));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (caught >= 3) {
      setShowPopup(true);

      setTimeout(() => {
        onEnter();
      }, 2500);
    }
  }, [caught, onEnter]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-[#FFF8E7] overflow-hidden flex items-center justify-center"
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute w-96 h-96 bg-green-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {groceries.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-5xl"
            initial={{
              y: -100,
              x: -250 + index * 90,
              opacity: 0,
            }}
            animate={{
              y: 700,
              opacity: 1,
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "linear",
            }}
          >
            {item}
          </motion.div>
        ))}

        <div className="relative text-center z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-green-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            FreshGo
          </motion.h1>

          <motion.p
            className="mt-4 text-green-700 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Catch 3 fresh items to enter 🍃
          </motion.p>

          <motion.div className="mt-4 text-2xl font-bold text-green-800">
            {caught}/3 Items Collected
          </motion.div>

          <motion.div
            className="mt-28 cursor-pointer"
            animate={{ x: basketX }}
            transition={{ duration: 0.6 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (caught < 3) {
                setCaught(caught + 1);
              }
            }}
          >
            <ShoppingBasket
              size={140}
              className="text-green-800 drop-shadow-2xl"
              strokeWidth={1.7}
            />
          </motion.div>

          {caught >= 3 && (
            <motion.div
              className="mt-8 text-3xl font-bold text-green-800"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              🛒 FreshGo Ready!
            </motion.div>
          )}
        </div>

        {showPopup && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-green-950/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[35px] p-8 text-center shadow-2xl max-w-sm mx-4"
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                🛒
              </motion.div>

              <h2 className="text-3xl font-bold text-green-900">
                Basket Filled!
              </h2>

              <p className="mt-3 text-green-700">
                Unlocking your smart grocery world...
              </p>

              <div className="mt-5 h-2 bg-green-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}