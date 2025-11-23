import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValidUrl, isValidCode } from "../utils/validators";
import { api } from "../api/apiClient";

export default function CreateLinkCard({ onCreated }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isValidUrl(url))
      return setErrorMsg("❗ Enter a valid URL (http or https)");
    if (code && !isValidCode(code))
      return setErrorMsg("❗ Custom code must be 6–8 alphanumeric");

    setLoading(true);

    const temp = {
      code: code || "••••••",
      original_url: url,
      clicks: 0,
      last_clicked: null,
    };
    onCreated(temp);

    try {
      const res = await api.createLink({
        original_url: url,
        code: code || undefined,
      });
      onCreated(res);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1800);
      setUrl("");
      setCode("");
    } catch (err) {
      setErrorMsg(err.message || "⚠ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white text-black w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
        Create Short Link
      </h2>

      <form className="grid gap-4" onSubmit={generate}>
        <input
          className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-[#e28f83] transition"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-[#e28f83] transition"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="bg-[#367d8a] hover:bg-[#2c6772] disabled:bg-gray-400 w-full sm:w-auto text-white px-5 py-3 rounded-lg shadow-md font-medium transition"
        >
          {loading ? "Creating..." : "Create Link"}
        </motion.button>
      </form>

      {errorMsg && (
        <p className="text-red-600 font-medium mt-3 text-sm sm:text-base">
          {errorMsg}
        </p>
      )}

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 text-green-600 font-semibold text-sm sm:text-base"
          >
            🎉 Link Created Successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
