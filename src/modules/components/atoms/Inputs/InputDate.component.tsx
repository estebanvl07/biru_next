"use client";
import { useEffect, useState, type FC } from "react";
import { clsx } from "clsx";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useOnActive, useOutsideClick } from "~/lib/hooks";

// import Input from "./Input.component";
import { Input } from "@nextui-org/react";

import type { PropsInput } from "~/types/component/input.types";
import { Calendar, type DateValue } from "@nextui-org/react";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputDateProps extends Omit<PropsInput, "value"> {
  value?: Date;
  dateFormat?: string;
  interval?: boolean;
  contentInputClassName?: string;
  changeValue?: (val: Date) => void;
  showAbsoluteCalendar?: boolean;
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
  showAbsoluteCalendar = true,
  ...props
}) => {
  const { isActive, onActive, onDisabled } = useOnActive();

  const datePikerRef = useOutsideClick<HTMLDivElement>(onDisabled);
  const [inputValue, setInputValue] = useState<string>();

  const handleNewDate = (date: Date) => {
    const setDate = new Date(date).toISOString();
    const newDate = setDate
      ? `${format(setDate, dateFormat, { locale: es })}`
      : "";

    setInputValue(newDate);
    changeValue && changeValue(date);
  };

  useEffect(() => {
    handleNewDate(new Date());
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
        label={label}
        startContent={
          <Icon
            icon="flowbite:calendar-month-solid"
            width={18}
            className="dark:text-slate-200"
          />
        }
        // iconPath="flowbite:calendar-month-solid"
        className={className}
        value={inputValue}
        onClick={onActive}
        // onContentClick={onActive}
      ></Input>
      {isActive && (
        <Calendar
          color="primary"
          className="absolute top-20 z-20"
          onChange={(val) => handleNewDate(new Date(String(val)))}
          aria-label="Date (No Selection)"
        />
      )}
    </div>
  );
};

export default InputDate;
