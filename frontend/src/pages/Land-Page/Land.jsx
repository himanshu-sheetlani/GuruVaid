import React from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

// store
import { AuthStore } from "../../stores/useAuthStore";

const Land = () => {
  const { signup } = AuthStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-auto overflow-hidden flex flex-col items-center mt-36 md:mt-48 gap-8"
    >
      {/* Welcome Button */}
      <button className="flex items-center border-[1px] border-zinc-300 rounded-full py-1 px-4 text-sm">
        ✨ Welcome to HealthMate AI <ArrowRight />
      </button>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="w-full flex flex-col items-center gap-2"
      >
        <h1 className="font-[Inter] font-bold text-center text-4xl md:text-6xl p-2 leading-tight">
          "Your Personalized{" "}
          <span className="text-blue-600">AI Health Coach</span>"
        </h1>
        <p className="w-[90%] md:w-[55%] text-center font-[Inter] text-zinc-500 text-sm md:text-base">
          Empowering you to prevent chronic conditions like diabetes and
          hypertension with real-time health insights, lifestyle
          recommendations, and smart monitoring via your smartwatch.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-4 p-6">
          <motion.button
            onClick={signup}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg shadow-md border-[1px] border-zinc-800 transition"
          >
            <Github size={20} /> GitHub
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Land;
