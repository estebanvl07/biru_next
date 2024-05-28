"use client";
import { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

import type { ITransaction } from "~/types/transactions";
import Link from "next/link";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { TransaccionIncludes } from "~/modules/transactions/hook";

interface TransactionItemProps {
  item: TransaccionIncludes;
  index: number;
  length: number;
}

const TransactionItem: FC<TransactionItemProps> = ({ item, index, length }) => {
  const icon = {
    1: "eva:diagonal-arrow-right-up-fill",
    2: "eva:diagonal-arrow-right-down-fill",
  }[item.type === 1 ? 1 : 2];

  const getIcon = () => {
    if (item.transferType === 1) {
      return item.category?.icon ?? icon;
    }
    return "ph:target";
  };

  return (
    <li
      key={item.id}
      className={clsx(
        "flex flex-col border-gray-100 px-1 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-slate-800/40",
        {
          "border-b ": index !== length - 1,
        },
      )}
      // onClick={() => selectTransaction()}
    >
      <Link
        href={`/transactions/${item.id}`}
        className={clsx(
          "flex cursor-pointer items-center justify-between border-gray-400/60 px-2 py-3 transition-all duration-300 dark:border-white/10",
        )}
        title={item.description ?? item.category?.name ?? item.goal?.name ?? ""}
      >
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              "flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg",
            )}
          >
            <Icon icon={getIcon() ?? icon} width={22} />
          </span>
          <div className="flex flex-col">
            <p className="mb-1 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
              {item.description || item.category?.name || item.goal?.name || ""}
            </p>
            <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
              {`${format(item.date ?? item.createdAt, DATE_FORMAT_TRANS)}`}
            </span>
          </div>
        </div>
        <p
          className={clsx(
            "whitespace-nowrap text-base font-semibold dark:font-semibold",
            {
              "text-red-500": item.type === 2,
              "text-green-500": item.type === 1,
            },
          )}
        >
          {item.type === 1 ? "+" : "-"} ${item.amount.toLocaleString("es-CO")}
        </p>
      </Link>
    </li>
  );
};

export default TransactionItem;
