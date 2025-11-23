import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={copy}
        className="px-3 py-1 bg-[#367d8a] text-white rounded text-sm transition hover:bg-[#2b6772]"
      >
        Copy
      </motion.button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs shadow-md whitespace-nowrap"
          >
            ✔ Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
