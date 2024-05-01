"use client";
import type { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import type { CardInfoProps } from "./Advantages.types";

export const CardInfo: FC<CardInfoProps> = ({
  icon,
  color = "basic",
  title,
  description,
  className,
}) => {
  return (
    <div
      className={clsx(
        "w-full rounded-md border bg-white px-8 py-6 shadow-lg shadow-gray-400/50 dark:border-white/10 dark:bg-slate-900 dark:shadow-black md:max-w-80",
        className,
        { "!bg-primary text-white": color === "primary" },
      )}
    >
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded-full border",
          { "border-white bg-white": color === "primary" },
        )}
      >
        <Icon
          icon={icon}
          width={24}
          className={clsx({
            "text-primary": color === "primary",
          })}
        />
      </div>
      <h2
        className={clsx("mb-2 mt-6 font-encode", {
          "text-white": color === "primary",
        })}
      >
        {title}
      </h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};
