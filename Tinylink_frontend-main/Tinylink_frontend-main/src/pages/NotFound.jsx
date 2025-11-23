import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 sm:p-10 bg-white rounded-2xl shadow-lg text-center max-w-md mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-3">404 — Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-lg bg-[#367d8a] text-white font-medium hover:bg-[#2b6772] transition"
      >
        ⬅ Back to Dashboard
      </Link>
    </motion.div>
  );
}
