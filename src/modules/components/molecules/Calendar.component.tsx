// "use client";

// import React, { useEffect } from "react";
// import { motion } from "framer-motion";

// import clsx from "clsx";

// import Button from "../atoms/Button.component";

// import { endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
// import { es } from "date-fns/locale";
// import { useCalendar } from "./hooks/useCalendar";

// import { WEEK_LABELS } from "~/lib/constants/calendar";
// import { Icon } from "@iconify/react/dist/iconify.js";

// type Props = {
//   value?: Date;
//   onChangeCalendar?: (date: Date) => void;
// };

// const Calendar = ({ value, onChangeCalendar }: Props) => {
//   const {
//     dateSelected,
//     onChangeDate,
//     calendar: [month],
//     inRange,
//     isSelected,
//     viewing,
//     viewNextMonth,
//     viewPreviousMonth,
//     firstWeek: [firstWeek],
//     changeDate,
//   } = useCalendar();

//   useEffect(() => {
//     if (dateSelected) onChangeCalendar?.(dateSelected);
//   }, [dateSelected]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         duration: 0.2,
//       }}
//       className="absolute bottom-20 w-[22rem] rounded-3xl bg-white px-8 py-4"
//     >
//       <div className="z-50 flex w-full flex-col items-center justify-center rounded-md">
//         <div className="flex w-full items-center justify-between">
//           <span className="text-center text-lg font-semibold capitalize dark:font-normal">
//             {`
//           ${format(firstWeek![6]!, "LLLL ", { locale: es })}
//           ${format(firstWeek![6]!, "u ", { locale: es })}
//           `}
//           </span>
//           <div className="flex gap-4">
//             <Button className="text-black" onClick={viewPreviousMonth}>
//               <Icon icon="zondicons:cheveron-left" />
//             </Button>
//             <Button className="text-black" onClick={viewNextMonth}>
//               <Icon icon="zondicons:cheveron-right" />
//             </Button>
//           </div>
//         </div>

//         <div className="grid w-full grid-cols-7 items-center justify-items-center py-4">
//           {firstWeek!.map((day) => (
//             <span key={day.toISOString()} className="mb-2 block text-gray-600">
//               {WEEK_LABELS[getDay(day)]}
//             </span>
//           ))}

//           {month!.map((week) =>
//             week.map((day) => (
//               <span
//                 key={day.toISOString()}
//                 className={clsx(
//                   "m-[0.10rem] flex aspect-square h-10 w-10 cursor-pointer select-none flex-row items-center justify-center rounded-full bg-transparent p-[14px] text-center hover:bg-sky-600/50 hover:bg-opacity-90 hover:text-white",
//                   {
//                     "border border-gray-400": isToday(day),
//                     "!border-none !bg-sky-600 !bg-opacity-90 !text-white":
//                       isSelected(day),
//                     "text-gray-500/70": !inRange(
//                       day,
//                       startOfMonth(viewing),
//                       endOfMonth(viewing),
//                     ),
//                   },
//                 )}
//                 onClick={() => {
//                   onChangeDate(day);
//                   changeDate(day);
//                 }}
//               >
//                 <span className="text-center text-sm">{format(day, "d")}</span>
//               </span>
//             )),
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Calendar;
