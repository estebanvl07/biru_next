import { useState, useEffect } from "react";
import { ISelectOptions } from "~/types/root.types";

type Props = {
  data: ISelectOptions[];
  key: string;
};

const useInputSearch = ({ data, key }: Props) => {
  const [query, setQuery] = useState<string>();
  const [newList, setNewList] = useState<ISelectOptions[]>(data);
  const [loading, setLoading] = useState(false);

  const onSearch = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    setLoading(true);
    const newList = data.filter((item: any) => {
      const itemData = item[key] ? item[key].toUpperCase() : "".toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setNewList(newList);
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

export default useInputSearch;
