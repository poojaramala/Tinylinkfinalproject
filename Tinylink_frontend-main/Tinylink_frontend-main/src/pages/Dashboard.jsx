import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CreateLinkForm from "../components/CreateLinkForm";
import LinkTable from "../components/LinkTable";
import useLinks from "../hooks/useLinks";

export default function Dashboard() {
  const { links, setLinks, loading, error, fetchLinks } = useLinks();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleCreated = (newLink) => {
    setLinks((prev) => [newLink, ...prev]);
    fetchLinks();
  };

  const handleDelete = async (code) => {
    if (!window.confirm(`Delete ${code}?`)) return;

    setLinks((prev) => prev.filter((l) => l.code !== code));

    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";
    fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" }).catch(() =>
      alert("Delete failed on server")
    );
  };

  const filtered = links.filter(
    (l) =>
      l.code.toLowerCase().includes(search.toLowerCase()) ||
      l.original_url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
   
      <div className="mb-6">
        <CreateLinkForm onCreated={handleCreated} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          All Links
        </h2>

   
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search links..."
            className="border rounded-full pl-10 pr-3 py-2 w-full bg-white text-black
                       placeholder-gray-500 focus:ring-2  transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-500 text-sm">🔍</span>
        </div>
      </div>

   
      {loading && <p className="text-gray-100">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}
      {!loading && filtered.length === 0 && (
        <p className="text-gray-300">No matching results found.</p>
      )}

     
      {!loading && filtered.length > 0 && (
        <div className="overflow-x-auto rounded-xl">
          <LinkTable links={filtered} onDelete={handleDelete} />
        </div>
      )}
    </Layout>
  );
}
