// "use client";

// import { useEffect, type FC } from "react";
// import clsx from "clsx";

// import { useOutsideClick, useAutoComplete } from "~/hooks";

// import Input from "./Input.component";
// import List from "./InputList.component";

// import type { PropsInput } from "./types/input.type";

// interface InputAutoCompleteProps extends PropsInput {
//   data: any[];
//   onValueSelected?: (selected: any) => void;
//   keyValue: string;
//   keyLabel: string;
//   className?: string;
//   ulClassName?: string;
//   initialQuery?: string;
//   initialSelected?: any | null;
//   listLocation?: (list: any[]) => void;
//   showAbsoluteList?: boolean;
//   changeText: (text: string) => void;
// }

// const InputAutoComplete: FC<InputAutoCompleteProps> = ({
//   data,
//   keyValue,
//   keyLabel,
//   onValueSelected: handleSelected,
//   className,
//   ulClassName,
//   initialQuery,
//   initialSelected,
//   listLocation,
//   showAbsoluteList = true,
//   changeText,
//   ...props
// }) => {
//   const { list, search, selected, query, isSelected, onSelected, resetQuery } =
//     useAutoComplete({
//       data,
//       keys: [keyLabel],
//       keyLabel,
//       keyValue,
//       handleSelected,
//       initialQuery,
//       initialSelected,
//     });

//   useEffect(() => {
//     listLocation?.(list);
//   }, [list]);

//   useEffect(() => {
//     changeText?.(query);
//   }, [query]);

//   useEffect(() => {
//     console.log(selected);
//   }, [selected]);

//   const ulRef = useOutsideClick<HTMLUListElement>(resetQuery);
//   return (
//     <div className={clsx("relative", className)}>
//       <Input
//         {...props}
//         onChangeText={search}
//         value={query}
//         onEnter={() => list.length === 1 && onSelected(list[0])}
//       />

//       {showAbsoluteList && (
//         <List
//           ulClassName={ulClassName}
//           list={list}
//           ulRef={ulRef}
//           onSelected={onSelected}
//           isSelected={isSelected}
//           keyLabel={keyLabel}
//           keyValue={keyValue}
//           // changeSelected={(value: any) => onSelected(value)}
//         />
//       )}
//     </div>
//   );
// };

// export default InputAutoComplete;
