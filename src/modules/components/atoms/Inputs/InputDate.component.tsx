// "use client";
// import { useEffect, useState, type FC } from "react";
// import { clsx } from "clsx";

// import { format } from "date-fns";
// import { es } from "date-fns/locale";
// import { useOnActive, useOutsideClick } from "~/lib/hooks";

// import Input from "./Input.component";

// import type { PropsInput } from "~/types/component/input.types";
// import { Calendar } from "primereact/calendar";

// interface InputDateProps extends Omit<PropsInput, "value"> {
//   value?: Date;
//   dateFormat?: string;
//   interval?: boolean;
//   contentInputClassName?: string;
//   showAbsoluteCalendar?: boolean;
//   contentClassName?: string;
//   icon: string;
// }

// const InputDate: FC<InputDateProps> = ({
//   className = "",
//   contentClassName = "",
//   onChange,
//   value,
//   label,
//   icon,
//   dateFormat = "LLLL",
//   interval = false,
//   contentInputClassName,
//   showAbsoluteCalendar = true,
//   ...props
// }) => {
//   const { isActive, onActive, onDisabled } = useOnActive();

//   const datePikerRef = useOutsideClick<HTMLDivElement>(onDisabled);
//   const [inputValue, setInputValue] = useState<string>();

//   const handleNewDate = (date: Date) => {
//     const newDate = date ? `${format(date, dateFormat, { locale: es })}` : "";
//     setInputValue(newDate);
//     return newDate;
//   };

//   useEffect(() => {
//     if (!value) return;
//     handleNewDate(value);
//   }, [value]);

//   return (
//     <div
//       className={clsx("relative", className)}
//       ref={datePikerRef}
//       onKeyDown={(e) => e.key === "Escape" && onDisabled()}
//     >
//       <Input
//         {...props}
//         autoComplete="off"
//         readOnly
//         label={label}
//         // icon={icon }
//         className={className}
//         // contentInputClassName={contentInputClassName}
//         // contentClassName={clsx(contentClassName, "select-none")}
//         value={inputValue}
//         onContentClick={onActive}
//         showInputField={false}
//       >
//         <Calendar />
//       </Input>
//     </div>
//   );
// };

// export default InputDate;
