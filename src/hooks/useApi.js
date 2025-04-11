import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://rendyp-book-api.vercel.app";

function useApi(endpoint, method = "GET", initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const responseData = await response.json();
        if (responseData.status === "success") {
          setData(responseData.data || null);
        } else {
          setError({ message: responseData.message || "Failed to fetch data" });
        }
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  useEffect(() => {
    if (method === "GET") {
      fetchData();
    }
  }, [fetchData, method]);

  return { data, loading, error, fetchData, setData };
}

export default useApi;
