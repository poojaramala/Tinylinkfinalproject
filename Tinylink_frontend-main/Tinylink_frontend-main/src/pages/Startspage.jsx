import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import CopyButton from "../components/CopyButton";
import { motion } from "framer-motion";

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/links/${code}`
        );
        if (!res.ok) throw new Error("Not found");
        const j = await res.json();
        setLink(j);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [code]);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const shortURL = `${window.location.origin}/${link.code}`;

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto w-full fade-in"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          🔍 Analytics — <span className="text-blue-600">{link.code}</span>
        </h1>

        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-[#367d8a] text-white text-sm hover:bg-[#2b6772] transition"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        

        <div className="p-4 rounded-xl border bg-gray-50 flex flex-col gap-2">
          <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
            Short URL
          </span>

          <a href={shortURL} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold break-all">
            {shortURL}
          </a>

          <CopyButton value={shortURL} />
        </div>


        <div className="p-4 rounded-xl border bg-gray-50 flex flex-col gap-2">
          <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
            Original URL
          </span>

          <p className="font-medium text-gray-800 break-all">
            {link.original_url}
          </p>
        </div>

        <div className="p-4 rounded-xl border bg-gray-50 flex flex-col gap-2">
          <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
            Total Clicks
          </span>
          <span className="text-3xl font-bold text-gray-900">
            {link.clicks}
          </span>
        </div>

      
        <div className="p-4 rounded-xl border bg-gray-50 flex flex-col gap-2">
          <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">
            Last Clicked
          </span>
          <span className="text-gray-800">
            {link.last_clicked
              ? new Date(link.last_clicked).toLocaleString()
              : "— No clicks yet"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
