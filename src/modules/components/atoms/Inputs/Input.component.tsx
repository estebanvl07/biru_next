"use client";
import clsx from "clsx";

import type { InputProps } from "./input.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { forwardRef } from "react";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    label,
    error,
    className,
    iconPath,
    onIconClick,
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
    children,
    ...props
  },
  ref,
) => {
  return (
    <div className={clsx("h-full w-full", mainClassName)}>
      <div
        className={clsx(
          "relative flex w-full items-center rounded-xl border bg-slate-50/50 px-4 py-2 dark:border-white/10 dark:bg-slate-900",
          containerClassName,
          {
            "!border-red-600": error,
          },
        )}
        onClick={onContentClick}
      >
        {iconPath && (
          <button
            type="button"
            className={clsx(
              "m-0 border-r border-zinc-600 pr-4 outline-none",
              buttonIconClassName,
              {
                "cursor-default": !onIconClick,
                "!border-red-600": error,
              },
            )}
            onClick={onIconClick}
          >
            <Icon icon={iconPath} width={18} className="dark:text-white" />
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
              className={clsx(
                "font-medium dark:text-slate-300",
                labelClassName,
              )}
              htmlFor={name}
              accessKey={name}
            >
              {label}
              {props.required && <span className="pl-1 text-red-600">*</span>}
            </label>
          )}
          {showInputField && (
            <input
              ref={ref}
              className={clsx(
                "focus:--tw-ring-color:transparent w-full border-none bg-transparent !px-0 !py-0 text-sm text-zinc-600 placeholder-slate-400 !outline-none focus:border-transparent dark:text-slate-200 dark:placeholder-zinc-600",
                className,
                {
                  "checked:border-transparent checked:!bg-indigo-600 checked:!shadow-2xl checked:!shadow-indigo-600":
                    props.type === "checkbox",
                },
              )}
              name={name}
              id={id}
              onBlur={onBlur}
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
      {error && (
        <span className="px-2 text-xs italic text-red-600">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(Input);
