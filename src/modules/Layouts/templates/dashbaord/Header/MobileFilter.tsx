import { useState } from "react";

import Modal from "~/modules/components/atoms/Modal.component";
import { motion } from "framer-motion";
import { RangeCalendar } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useFilterContext } from "~/lib/context/Filter.context";
import { useOnActive } from "~/lib/hooks";

import { options } from "./filterOptions";
import { FILTERS } from "~/types/transactions";

const MobileFilter = () => {
  const [hasCalendar, setHasCalendar] = useState(false);
  const { isActive, onActive, onDisabled } = useOnActive();
  const { setFilter, setRangeDate } = useFilterContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: FILTERS = Number(event.target.value);
    value !== 5 && setFilter(value);
    if (value === 5) {
      setHasCalendar(true);
      onActive();
    } else {
      setHasCalendar(false);
      onDisabled();
    }
  };

  const onSearchByDates = (e: any) => {
    const startDate = new Date(e.start);
    const endDate = new Date(e.end);
    setFilter(5);
    setRangeDate({ startDate, endDate });
    onDisabled();
  };

  return (
    <>
      {hasCalendar && (
        <motion.button
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
          onClick={() => {
            onActive();
          }}
        >
          <Icon icon="flowbite:calendar-month-solid" width={18} />
        </motion.button>
      )}
      <label className="flex items-center gap-2 text-small text-default-500">
        <select
          onChange={handleChange}
          className="w-24 rounded-md bg-default-100 p-1 text-small text-default-500 outline-none"
        >
          {options.map((opt) => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            );
          })}
        </select>
      </label>
      <Modal isOpen={isActive} title="Rango de fecha" onClose={onDisabled}>
        <RangeCalendar
          color="primary"
          className="bg-default-50"
          onChange={onSearchByDates}
          aria-label="Filter by range month"
        />
      </Modal>
    </>
  );
};

export default MobileFilter;
