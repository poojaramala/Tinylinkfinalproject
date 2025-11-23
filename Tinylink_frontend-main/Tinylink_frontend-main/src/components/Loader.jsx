import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full py-10">
      <motion.div
        className="w-10 h-10 border-4 border-[#367d8a] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );
}
