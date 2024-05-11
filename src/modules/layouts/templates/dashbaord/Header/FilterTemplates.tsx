import React, { useEffect, useState } from "react";
import { options } from "./filterOptions";
import {
  Button,
  DateValue,
  RangeCalendar,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "~/modules/components/atoms/Modal.component";
import type { RangeValue } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "~/lib/hooks";
import { start } from "repl";

const FilterTemplates = () => {
  const [hasCalendar, setHasCalendar] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [rangeDate, setRangeDate] = useState<RangeValue<DateValue>>();
  const divRef = useOutsideClick<HTMLDivElement>(() => setShowCalendar(false));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    if (value === 6) {
      setHasCalendar(true);
      //   setShowCalendar(true);
      return;
    }
    setHasCalendar(false);
  };

  useEffect(() => {
    console.log({
      start: rangeDate?.start,
      end: rangeDate?.end,
    });
  }, [rangeDate]);

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
                  top: 0,
                  left: 0,
                  y: 0,
                  scale: 0.6,
                }}
                animate={{
                  y: 56,
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                className="absolute top-14 z-30"
                aria-label="Select date"
              >
                <RangeCalendar
                  color="primary"
                  className="bg-default-50"
                  // value={rangeDate}
                  onFocusChange={(date) => console.log(date)}
                  aria-label="Date (Visible Month)"
                  visibleMonths={2}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      )}
      <Select
        className="w-48"
        defaultSelectedKeys={[1]}
        aria-label="Select filter templates"
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
          <SelectItem
            key={value}
            color="primary"
            value={value}
            className="font-montserrat"
          >
            {name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default FilterTemplates;
