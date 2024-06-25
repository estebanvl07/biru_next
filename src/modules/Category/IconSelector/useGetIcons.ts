import { useEffect, useState } from "react";
import { ICONIFY_API_URL } from "~/lib/constants/config";

export const useGetIcons = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [iconSelected, setIconSelected] = useState<string>("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`${ICONIFY_API_URL}${query}`);
      const data = await response.json();
      setResults(data.icons);
    } catch (error) {
      console.error("Error fetching icon search results", error);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  return {
    query,
    results,
    iconSelected,
    setIconSelected,
    setQuery,
  };
};
