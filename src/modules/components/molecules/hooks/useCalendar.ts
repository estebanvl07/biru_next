"use client";

import { useEffect, useState } from "react";
import { useLilius } from "use-lilius";
import { getMonth } from "date-fns";

import { useOnActive } from "~/lib/hooks";

const today = new Date();

export const useCalendar = (value?: Date) => {
  const { onDisabled } = useOnActive();
  const [dateSelected, setDateSelected] = useState<Date | undefined>();

  const {
    calendar: [month],
    inRange,
    isSelected,
    selected: [selectedDate],
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
    setViewing,
  } = useLilius({
    selected: value ? [value] : [today],
    weekStartsOn: 1,
    numberOfMonths: 1,
  });

  const onChangeDate = (date: Date) => {
    setDateSelected(date);
  };

  const changeDate = (day: Date) => {
    toggle(day, true);
  };

  const onApplyDate = () => onDisabled();

  const onCancelDate = () => onDisabled();

  useEffect(() => {
    if (getMonth(viewing) != getMonth(selectedDate!)) {
      setViewing(selectedDate!);
    }
  }, [selectedDate]);

  const [firstWeek] = month!;

  return {
    calendar: [month],
    inRange,
    isSelected,
    selected: [selectedDate],
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
    setViewing,
    dateSelected,
    onChangeDate,
    changeDate,
    onApplyDate,
    onCancelDate,
    firstWeek: [firstWeek],
  };
};
