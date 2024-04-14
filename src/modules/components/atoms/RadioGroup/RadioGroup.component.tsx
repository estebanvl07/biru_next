"use client";

import clsx from "clsx";
import type { PropsInput } from "~/types/component/input.types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RadioOption {
  label: string;
  value: string | number;
  className?: string;
}

interface Props extends PropsInput {
  options: RadioOption[];
  children?: undefined;
}

const RadioGroup = ({
  label,
  error,
  className,
  iconPath,
  eventIcon,
  onContentClick,
  buttonIconClassName,
  containerClassName,
  inputContentClassName,
  labelClassName,
  id,
  register,
  name,
  onBlur,
  mainClassName,
  showInputField = true,
  options,
  ...props
}: Props) => {
  return (
    <div className={clsx("h-full w-full", mainClassName)}>
      <div
        className={clsx(
          "relative flex w-full items-center rounded-md border bg-white px-4 py-2 dark:border-white/50 dark:bg-transparent",
          containerClassName,
          {
            "!border-red-600": error,
          },
        )}
        // onClick={onContentClick}
      >
        {iconPath && (
          <button
            type="button"
            className={clsx(
              "m-0  border-r border-zinc-600 pr-4 outline-none",
              buttonIconClassName,
              {
                "cursor-default": !eventIcon,
              },
            )}
            onClick={eventIcon}
          >
            <Icon icon={iconPath} width={18} />
          </button>
        )}
        <div
          className={clsx(
            "flex flex-grow flex-col text-xs",
            inputContentClassName,
            {
              "!flex-row-reverse": props.type === "checkbox",
              "px-4": iconPath,
            },
          )}
        >
          {label && (
            <span
              className={clsx("font-medium", labelClassName)}
              accessKey={name}
            >
              {label}
              {props.required && <span className="pl-1 text-red-600">*</span>}
            </span>
          )}

          <div className="flex w-full">
            {options.map((option) => (
              <label
                key={option.value}
                className={clsx(
                  "flex-1 cursor-pointer rounded-sm bg-slate-100",
                  labelClassName,
                  option.className,
                )}
                // className={clsx(option.className)}
              >
                <input
                  type="radio"
                  value={option.value}
                  className="appearance-none"
                  {...register}
                  // checked={option.value === value}
                  // onChange={onChange}
                />
                <span className="p-2 text-sm font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 
        {iconPath && (
          <button
            type="button"
            className={clsx(
              "m-0  border-r border-zinc-600 pr-4 outline-none",
              buttonIconClassName,
              {
                "cursor-default": !eventIcon,
              },
            )}
            onClick={eventIcon}
          >
            <Icon icon={iconPath} width={18} />
          </button>
        )}
        <div
          className={clsx(
            "flex flex-grow flex-col text-xs",
            inputContentClassName,
            {
              "!flex-row-reverse": props.type === "checkbox",
              "px-4": iconPath,
            },
          )}
        >
          {label && (
            <label
              className={clsx("font-medium", labelClassName)}
              htmlFor={name}
              accessKey={name}
            >
              {label}
              {props.required && <span className="pl-1 text-red-600">*</span>}
            </label>
          )}
          {showInputField && (
            <input
              className={clsx(
                "focus:--tw-ring-color:transparent w-full border-none bg-transparent !px-0 !py-0  text-sm text-zinc-600 placeholder-slate-400 !outline-none focus:border-transparent dark:text-zinc-300 dark:placeholder-zinc-600",
                className,
                {
                  "checked:border-transparent checked:!bg-indigo-600 checked:!shadow-2xl checked:!shadow-indigo-600":
                    props.type === "checkbox",
                },
              )}
              name={name}
              id={id}
              onBlur={onBlur}
              // ref={ref}
              {...register}
              {...props}
            />
          )}
          {children}
        </div>

        {error && (
          <Icon
            icon="fa6-solid:circle-xmark"
            className="absolute right-2 text-red-600"
            width={13}
          />
        )}
      </div>
       */}
      {error && <span className="px-2 text-sm text-gray-400">{error}</span>}
    </div>
  );
};

export default RadioGroup;
