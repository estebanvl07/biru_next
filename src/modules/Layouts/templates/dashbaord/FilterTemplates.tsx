import React, { useState } from "react";
import { options } from "./Header/filterOptions";
import { RangeCalendar, Select, SelectItem } from "@heroui/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "~/lib/hooks";
import { FILTERS } from "~/types/transactions";
import { useFilterContext } from "~/lib/context/Filter.context";

const FilterTemplates = () => {
  const [hasCalendar, setHasCalendar] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const divRef = useOutsideClick<HTMLDivElement>(() => setShowCalendar(false));
  const { setFilter, setRangeDate } = useFilterContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: FILTERS = Number(event.target.value);
    value !== 5 && setFilter(value);
    value === 5 ? setHasCalendar(true) : setHasCalendar(false);
  };

  const onSearchByDates = (e: any) => {
    console.log(e);
    const startDate = new Date(e.start);
    const endDate = new Date(e.end);
    setFilter(5);
    setRangeDate({ startDate, endDate });
  };

  return (
    <>
      {hasCalendar && (
        <motion.div
          layout
          className="relative"
          initial={{
            x: 100,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: 100,
          }}
          ref={divRef}
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          <button className="grid h-10 w-10 place-content-center rounded-full bg-default-50">
            <Icon
              icon="flowbite:calendar-month-solid"
              width={18}
              className="text-primary dark:text-slate-200"
            />
          </button>
          {showCalendar && (
            <AnimatePresence>
              <motion.div
                initial={{
                  opacity: 0.6,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                className="absolute top-16 z-30 w-[34rem]"
                aria-label="Select date"
              >
                <RangeCalendar
                  color="primary"
                  className="bg-default-50"
                  onChange={onSearchByDates}
                  aria-label="Date (Visible Month)"
                  visibleMonths={2}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      )}
      <Select
        className="w-32 lg:w-48"
        defaultSelectedKeys={[0]}
        variant="bordered"
        classNames={{
          trigger: "border shadow-none bg-white dark:bg-default-200",
        }}
        aria-label="Select filter templates"
        placeholder="Filtrar"
        startContent={
          <Icon
            icon="majesticons:filter-line"
            width={18}
            className="text-primary dark:text-slate-200"
          />
        }
        radius="full"
        onChange={handleChange}
      >
        {options.map(({ value, name }) => (
          <SelectItem key={value} color="primary" className="font-montserrat">
            {name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default FilterTemplates;
