import React, { useState } from "react";
import { Link } from "react-router-dom";
import CopyButton from "./CopyButton";
import ConfirmModal from "./ConfrimModel";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

export default function LinkTable({ links, onDelete }) {
  const [selectedCode, setSelectedCode] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-gray-900">
        <thead>
          <tr className="text-xs text-gray-500 uppercase border-b">
            <th className="py-2 px-3">Short</th>
            <th className="py-2 px-3">Original URL</th>
            <th className="py-2 px-3">Clicks</th>
            <th className="py-2 px-3">Last clicked</th>
            <th className="py-2 px-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {links.map((link) => (
            <tr
              key={link.code}
              className="border-b hover:bg-gray-100 transition duration-200"
            >
     
              <td className="py-3 px-3">
                <a
                  href={`${API_BASE}/${link.code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold underline"
                >
                  {link.code}
                </a>
              </td>

   
              <td
                className="py-3 px-3 max-w-[250px] md:max-w-[400px] truncate text-gray-900"
                title={link.original_url}
              >
                {link.original_url}
              </td>

           
              <td className="py-3 px-3 font-semibold">{link.clicks ?? 0}</td>

              <td className="py-3 px-3 text-gray-600 whitespace-nowrap">
                {link.last_clicked
                  ? new Date(link.last_clicked).toLocaleString()
                  : "-"}
              </td>

              <td className="py-3 px-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link
                    to={`/code/${link.code}`}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  >
                    View
                  </Link>

                  <CopyButton value={`${window.location.origin}/${link.code}`} />

                  <button
                    onClick={() => setSelectedCode(link.code)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <ConfirmModal
        open={!!selectedCode}
        title="Delete link?"
        message={`Are you sure you want to delete "${selectedCode}"? This action cannot be undone.`}
        onCancel={() => setSelectedCode(null)}
        onConfirm={() => {
          onDelete(selectedCode);
          setSelectedCode(null);
        }}
      />
    </div>
  );
}
