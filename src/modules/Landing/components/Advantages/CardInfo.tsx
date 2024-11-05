"use client";
import type { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import type { CardInfoProps } from "./Advantages.types";
import Image from "next/image";

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
        "mb-12 h-fit w-full rounded-2xl border bg-white px-8 py-6 shadow-lg shadow-gray-400/50 dark:border-white/5 dark:bg-default-200 dark:shadow-slate-950",
        className,
        { "!bg-primary text-white": color === "primary" },
      )}
    >
      <div
        className={clsx(
          "absolute -top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border dark:border-none dark:bg-slate-800",
          { "border-white bg-white dark:bg-white": color === "primary" },
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
      <div
        className={clsx(
          "z-0 my-auto mb-12 flex h-[30rem] w-full flex-col items-end gap-4 overflow-hidden rounded-2xl bg-white pt-6 shadow-lg shadow-gray-400/50 dark:border-white/5 dark:bg-default-200 dark:shadow-slate-950",
          className,
          { "!bg-primary text-white": color === "primary" },
        )}
      >
        <div className="px-8">
          <h2
            className={clsx("mb-2 mt-6 font-encode", {
              "text-white": color === "primary",
            })}
          >
            {title}
          </h2>
          <p className="text-sm">{description}</p>
        </div>
        <Image
          src="/image 8.png"
          alt="image vew in mobile"
          className="absolute bottom-0 right-0"
          width={300}
          height={450}
        />
      </div>
    </div>
  );
};
