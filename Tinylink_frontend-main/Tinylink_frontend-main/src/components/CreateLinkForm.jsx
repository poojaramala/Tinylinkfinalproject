import React, { useState } from "react";
import { motion } from "framer-motion";
import { isValidUrl, isValidCode } from "../utils/validators";
import { api } from "../api/apiClient";

export default function CreateLinkForm({ onCreated }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidUrl(originalUrl)) return setError("❗ Enter a valid URL starting with http or https");
    if (code && !isValidCode(code)) return setError("❗ Custom code must be 6–8 alphanumeric");

    setLoading(true);

    try {
      const res = await api.createLink({ original_url: originalUrl, code: code || undefined });
      onCreated(res);

      setOriginalUrl("");
      setCode("");
    } catch (err) {
      setError(err.message || "⚠ Something went wrong");
    }

    setLoading(false);
  };

  const resetForm = () => {
    setOriginalUrl("");
    setCode("");
    setError("");
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-6xl mx-auto"
    >
      <h2 className="text-lg sm:text-xl text-[14px] font-semibold  mb-4 text-gray-900">Create New Short Link</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="md:col-span-2">
          <label className="text-[14px] font-semibold text-gray-700">Long URL</label>
          <input
            className="mt-1 p-3 w-full rounded-lg border bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="text-[14px] font-semibold text-gray-700">Custom Code</label>
          <input
            className="mt-1 p-3 w-full rounded-lg border bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6–8 chars"
          />
        </div>
      </div>

  
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2 bg-[#367d8a] text-white rounded-lg font-medium hover:bg-[#2b6772] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create"}
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={resetForm}
          className="w-full sm:w-auto px-6 py-2 border border-[#367d8a] text-[#367d8a] rounded-lg hover:text-blue-600 hover:border-blue-600 transition font-medium"
        >
          Reset
        </motion.button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 font-medium text-sm sm:text-base"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.form>
  );
}
