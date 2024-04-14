"use client";
import { FC } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

import type { ITransaction } from "~/types/transactions";
import Link from "next/link";

interface TransactionItemProps {
  item: ITransaction;
  index: number;
  length: number;
}

const TransactionItem: FC<TransactionItemProps> = ({ item, index, length }) => {
  const icon = {
    1: "eva:diagonal-arrow-right-up-fill",
    2: "eva:diagonal-arrow-right-down-fill",
  }[item?.type === 1 ? 1 : 2];

  const getIcon = () => "eva:diagonal-arrow-right-up-fill";

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
      >
        <div className="flex items-center gap-3">
          <span
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white",
            )}
          >
            <Icon icon={getIcon() ?? icon} width={22} />
          </span>
          <div className="flex flex-col">
            <p className="mb-1 overflow-hidden text-ellipsis font-semibold dark:font-normal">
              {item.description}
            </p>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {`${item.createdAt}`}
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
