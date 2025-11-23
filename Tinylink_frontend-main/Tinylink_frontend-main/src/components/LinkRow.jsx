import React, { useState } from "react";
import { motion } from "framer-motion";
import CopyButton from "./CopyButton";
import ConfirmModal from "./ConfrimModel";

export default function LinkRow({ link, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        whileHover={{ y: -3, backgroundColor: "rgba(240,240,240,0.35)" }}
        transition={{ duration: 0.25 }}
        className="border-b"
      >
   
        <td className="p-3 align-top min-w-[90px]">
          <a
            href={`/${link.code}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline font-medium"
          >
            {link.code}
          </a>
        </td>

   
        <td
          className="p-3 align-top truncate max-w-[240px] md:max-w-[400px] text-black"
          title={link.original_url}
        >
          {link.original_url}
        </td>


        <td className="p-3 text-black align-top text-center">
          {link.clicks}
        </td>

        <td className="p-3 align-top whitespace-nowrap text-gray-600">
          {link.last_clicked
            ? new Date(link.last_clicked).toLocaleString()
            : "-"}
        </td>

     
        <td className="p-3 align-top">
          <div className="flex flex-wrap gap-2">
            <CopyButton value={`${window.location.origin}/${link.code}`} />

            <button
              onClick={() => setConfirmOpen(true)}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </td>
      </motion.tr>

      <ConfirmModal
        open={confirmOpen}
        title="Delete link?"
        message={`Are you sure you want to delete "${link.code}"? This cannot be undone.`}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete(link.code);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
