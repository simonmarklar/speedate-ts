import { useState, useEffect } from "react";

export default function useFetch<T>(
  url: string,
  options?: RequestInit | undefined
): [T | null, boolean, Error] {
  const [res, setRes] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    !res && fetchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options]);

  async function fetchUrl() {
    try {
      setIsFetching(true);
      const response = await fetch(url, options);

      if (response.ok) {
        const json = await response.json();
        setRes(json);
        return;
      }
    } catch (e) {
      setFetchError(e);
    } finally {
      setIsFetching(false);
    }
  }

  return [res, isFetching, fetchError];
}
