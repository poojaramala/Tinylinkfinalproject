
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const api = {
  getLinks: async () => {
    const res = await fetch(`${API_BASE}/api/links`);
    if (!res.ok) throw new Error("Failed to fetch links");
    return res.json();
  },

  createLink: async (data) => {
    const res = await fetch(`${API_BASE}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to create link");
    return json;
  },

  deleteLink: async (code) => {
    const res = await fetch(`${API_BASE}/api/links/${code}`, { method: "DELETE" });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Failed to delete");
    }
    return res.json();
  },

  getStats: async (code) => {
    const res = await fetch(`${API_BASE}/api/links/${code}`);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json.error || "Not found");
    }
    return res.json();
  }
};
