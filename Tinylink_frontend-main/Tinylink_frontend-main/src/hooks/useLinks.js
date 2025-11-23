
import { useState, useEffect, useCallback } from "react";
import { api } from "../api/apiClient";

export default function useLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLinks();
      setLinks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return { links, setLinks, loading, error, fetchLinks };
}
