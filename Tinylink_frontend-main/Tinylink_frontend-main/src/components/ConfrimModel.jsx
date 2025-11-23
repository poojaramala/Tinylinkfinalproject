import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <AnimatePresence>
  
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
  
        <motion.div
          className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
          initial={{ scale: 0.9, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
        >
       
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>

      
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">{message}</p>

          <div className="flex justify-end gap-3 flex-wrap">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
