import { useState, useEffect } from "react";

export default function useFetch<T>(
  url: string,
  options?: RequestInit | undefined
): [T | null, boolean, string | null] {
  const [body, setRes] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!body) {
      fetchUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options, body]);

  async function fetchUrl() {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const json = (await response.json()) as T;
        setRes(json);
        setFetchError(null);
      }
    } catch (e) {
      setFetchError(e.message);
      setRes(null);
    } finally {
      setIsFetching(false);
    }
  }

  return [body, isFetching, fetchError];
}
