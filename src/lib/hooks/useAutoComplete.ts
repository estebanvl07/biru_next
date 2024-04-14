// import { useCallback, useState } from "react";
// import Fuse from "fuse.js";

// type UseAutoCompleteHookArgs<T> = {
//   data: ReadonlyArray<T>;
//   keyLabel: keyof T;
//   keyValue: keyof T;
//   keys?: Array<Fuse.FuseOptionKey<T>>;
//   limit?: number;
//   initialQuery?: string;
//   initialSelected?: T | null;
//   handleSelected?: (selected: T) => void;
// };

// export const useAutoComplete = <T extends {}>({
//   data,
//   keys,
//   keyLabel,
//   keyValue,
//   limit = 6,
//   initialQuery = "",
//   initialSelected = null,
//   handleSelected,
// }: UseAutoCompleteHookArgs<T>) => {
//   const [query, setQuery] = useState(initialQuery);
//   const [selected, setSelected] = useState<T>(initialSelected!);
//   const [changed, setChanged] = useState(false);

//   const [fuse] = useState(
//     new Fuse<T>(data, {
//       keys: keys,
//       threshold: 0.4,
//     }),
//   );
//   const [list, setList] = useState<Array<T>>([]);

//   // change query
//   const search = (query: string) => {
//     const result = fuse.search(query, { limit });
//     const newList = result.map((m) => ({
//       ...m.item,
//       refIndex: m.refIndex,
//     }));

//     setList(newList);
//     setQuery(query);
//     setChanged(true);
//   };

//   // select item
//   const onSelected = (item: T) => {
//     setSelected(item);
//     console.log(item[keyLabel] as string);
//     setQuery(item[keyLabel] as string);
//     setList([]);
//     handleSelected?.(item);
//     setChanged(false);
//   };

//   const isSelected = (itemValue: T) => selected?.[keyValue] === itemValue;

//   const isEmpty = !!query && changed && list.length === 0;

//   const resetQuery = useCallback(() => {
//     if (selected) {
//       setQuery(selected[keyLabel] as string);
//     } else {
//       setQuery("");
//     }
//     setList([]);
//   }, [selected]);

//   return {
//     list,
//     query,
//     search,
//     onSelected,
//     selected,
//     isSelected,
//     isEmpty,
//     resetQuery,
//   };
// };
