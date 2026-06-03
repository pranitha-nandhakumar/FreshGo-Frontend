import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Leaf, Sparkles } from "lucide-react";

export default function IntroScreen({ onEnter }) {
  const groceries = ["🍎", "🥦", "🥛", "🍞", "🥕", "🍇", "🍊", "🥑"];

  useEffect(() => {
    const timer = setTimeout(() => {
      onEnter();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-[#080312] overflow-hidden flex items-center justify-center text-white"
        exit={{ opacity: 0 }}
      >
        <div className="absolute top-10 left-10 w-80 h-80 bg-lime-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-3xl"></div>

        {groceries.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-5xl md:text-6xl"
            initial={{
              x: -350 + index * 100,
              y: 700,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: [-80, 120, -40],
              opacity: [0, 1, 0.85],
              rotate: [0, 12, -12, 0],
              scale: [0.8, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.25,
              ease: "easeInOut",
            }}
          >
            {item}
          </motion.div>
        ))}

        <motion.div
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mx-auto mb-6 w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#6D4AFF] to-[#B26BFF] flex items-center justify-center shadow-[0_0_45px_rgba(178,107,255,0.55)]"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Leaf
              size={48}
              className="text-lime-300 drop-shadow-[0_0_18px_rgba(223,255,94,0.8)]"
            />
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tight"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Fresh
            <span className="text-lime-300 italic drop-shadow-[0_0_22px_rgba(223,255,94,0.55)]">
              Go
            </span>
          </motion.h1>

          <motion.div
            className="mt-5 inline-flex items-center gap-2 bg-[#1b0f2d]/80 border border-lime-300/25 text-lime-300 px-5 py-2 rounded-full shadow-[0_0_25px_rgba(223,255,94,0.16)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Sparkles size={17} />
            Powered by AI Shopping
          </motion.div>

          <motion.p
            className="mt-5 text-purple-200 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            Preparing your smart grocery world...
          </motion.p>

          <div className="mt-8 w-72 md:w-96 h-3 mx-auto bg-[#10081f] border border-purple-400/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-lime-300 shadow-[0_0_22px_rgba(223,255,94,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}