import { useState, useEffect, useCallback } from "react";

interface Props<T> {
  data: T[];
  keys: string | string[];
  isLoading?: boolean;
}

export const useSearch = <T>({ data, keys, isLoading }: Props<T>) => {
  const [query, setQuery] = useState<string>("");
  const [newList, setNewList] = useState<T[]>(data);
  const [loading, setLoading] = useState(isLoading);

  const onSearch = useCallback(
    (param: string) => {
      if (typeof keys === "undefined") return [] as T[];

      setQuery(param);
      if (param === "") return refreshList();
      setLoading(true);
      if (typeof keys === "string") {
        const newList = data.filter((item: any) => {
          const itemData = item[keys]
            ? item[keys].toUpperCase()
            : "".toUpperCase();
          const textData = param.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setNewList(newList);
        setLoading(false);
        return;
      }

      const filtered = data?.filter((item: any) => {
        const isMatch = keys.map((key) => {
          // valida por keys
          if (typeof item[key] === "string") {
            return (
              item[key] && item[key].toLowerCase().includes(param.toLowerCase())
            );
          }
          return String(item[key]).includes(param);
        });

        // verifica que por lo menos una de las keys haga match
        const match = isMatch.some((booleano) => booleano === true);

        if (match) return item;
      });
      setNewList(filtered);
      setLoading(false);
    },
    [query],
  );

  const refreshList = () => {
    setNewList(data);
  };

  useEffect(() => {
    refreshList();
  }, [data]);

  return {
    onSearch,
    newList,
    refreshList,
    query,
    loading,
  };
};
