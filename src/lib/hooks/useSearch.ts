import { useState, useEffect } from "react";
import { ISelectOptions } from "~/types/root.types";

interface Props<T> {
  data: T[];
  keys: string | string[];
}

export const useSearch = <T>({ data, keys }: Props<T>) => {
  const [query, setQuery] = useState<string>();
  const [newList, setNewList] = useState<T[]>(data);
  const [loading, setLoading] = useState(false);

  const onSearch = (param: string) => {
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
  };

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
