"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

type ButtonGroupProps = {
  buttonClass?: string;
  defaultSelected?: number;
  options: {
    id?: number;
    label: string;
    icon?: string;
    iconClass?: string;
    onClick: () => void;
    colorSelected?: string;
  }[];
  containerClassName?: string;
};

const ButtonGroup = ({
  options,
  buttonClass,
  defaultSelected,
  containerClassName,
}: ButtonGroupProps) => {
  const [buttonSelected, setButtonSelected] = useState<number | undefined>();

  useEffect(() => {
    setButtonSelected(defaultSelected);
  }, [defaultSelected]);

  return (
    <div
      className={clsx(
        "flex overflow-hidden rounded-lg border shadow-sm dark:border-white/10",
        containerClassName,
      )}
      role="group"
    >
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          className={clsx(
            "flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-slate-50 px-6 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-900/50 dark:hover:text-white",
            buttonClass,
            {
              "border border-primary !bg-primary !text-white dark:border-indigo-600 dark:!bg-indigo-600":
                !option.colorSelected && buttonSelected === option.id,
              "border-r": index !== options.length - 1,
              [option.colorSelected as string]:
                option.colorSelected && buttonSelected === option.id,
            },
          )}
          onClick={() => {
            setButtonSelected(option.id);
            option.onClick();
          }}
        >
          {option.icon && (
            <Icon
              icon={option.icon ?? ""}
              width={22}
              className={option.iconClass}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
