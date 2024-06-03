import { useEffect, useState, type FC } from "react";
import { clsx } from "clsx";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useOnActive, useOutsideClick } from "~/lib/hooks";

import { Input } from "@nextui-org/react";

import type { InputProps } from "./input.types";
import { Calendar, type DateValue } from "@nextui-org/react";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { today, getLocalTimeZone } from "@internationalized/date";

interface InputDateProps extends Omit<InputProps, "value" | "defaultValue"> {
  value?: Date;
  dateFormat?: string;
  interval?: boolean;
  contentInputClassName?: string;
  changeValue?: (val: Date) => void;
  minValueToday?: boolean;
  showAbsoluteCalendar?: boolean;
  defaultValue?: Date | null;
  currentDate?: boolean;
  contentClassName?: string;
}

const InputDate: FC<InputDateProps> = ({
  className = "",
  contentClassName = "",
  onChange,
  changeValue,
  value,
  label,
  dateFormat = DATE_FORMAT_TRANS,
  interval = false,
  contentInputClassName,
  minValueToday = false,
  defaultValue,
  currentDate = false,
  showAbsoluteCalendar = true,
  ...props
}) => {
  const { isActive, onActive, onDisabled } = useOnActive();

  const datePikerRef = useOutsideClick<HTMLDivElement>(onDisabled);
  const [inputValue, setInputValue] = useState<string>();

  const handleNewDate = (date: Date) => {
    let myDate = new Date(date);
    myDate.setDate(myDate.getDate() + 1);
    const newDate = myDate
      ? `${format(myDate, dateFormat, { locale: es })}`
      : "";

    setInputValue(newDate);
    changeValue && changeValue(myDate);
  };

  useEffect(() => {
    if (Boolean(defaultValue)) {
      const date = new Date(defaultValue as Date);
      date.setDate(date.getDate() - 1);
      handleNewDate(date);
    }
  }, []);

  return (
    <div
      className={clsx("relative w-full", className)}
      ref={datePikerRef}
      onKeyDown={(e) => e.key === "Escape" && onDisabled()}
    >
      <Input
        // {...props}
        autoComplete="off"
        readOnly
        isRequired={props.required}
        placeholder={props.placeholder ?? "Seleccionar fecha"}
        label={label}
        startContent={
          <Icon
            icon="flowbite:calendar-month-solid"
            width={18}
            className="dark:text-slate-200"
          />
        }
        className={className}
        value={inputValue}
        onClick={onActive}
      />
      {isActive && (
        <Calendar
          color="primary"
          className="absolute top-20 z-20"
          minValue={minValueToday ? today(getLocalTimeZone()) : undefined}
          onChange={(val) => handleNewDate(new Date(String(val)))}
          aria-label="Date (No Selection)"
        />
      )}
    </div>
  );
};

export default InputDate;
