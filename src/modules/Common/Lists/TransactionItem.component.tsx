import { FC } from "react";
import Link from "next/link";

import clsx from "clsx";
import { format } from "date-fns";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar } from "@nextui-org/react";

import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import type { TransactionIncludes } from "~/types/transactions";
import { useParams } from "next/navigation";
import { hr } from "date-fns/locale";
import { Transaction } from "@prisma/client";

interface TransactionItemProps {
  item: TransactionIncludes;
  index: number;
  length: number;
}

const TransactionItem: FC<TransactionItemProps> = ({ item, index, length }) => {
  const params = useParams();

  const icon = {
    1: "eva:diagonal-arrow-right-up-fill",
    2: "eva:diagonal-arrow-right-down-fill",
  }[item.type === 1 ? 1 : 2];

  const getName = (): string => {
    const defaultName = item.type === 1 ? "Ingresos Varios" : "Gastos Varios";

    if (item.transferType === 2 && item.goal) {
      return item.goal.name;
    }

    return item.category?.name || item.description || defaultName;
  };

  const getIcon = (): string => {
    const typeIcon = item.type === 1 ? "ph:trend-up" : "ph:trend-down";

    if (item.transferType === 2) {
      return (item.goal?.icon as string) || typeIcon;
    }
    if (item.category) {
      return item.category?.icon ?? typeIcon;
    }

    return typeIcon;
  };

  return (
    <li
      className={clsx(
        "px-content flex flex-col border-gray-100 hover:bg-slate-100 md:px-6 dark:border-white/10 dark:hover:bg-slate-800/40",
      )}
    >
      <Link
        href={{
          pathname: "/account/[acc]/transactions/[id]",
          query: {
            acc: params?.acc,
            id: item.id,
          },
        }}
        className={clsx(
          "flex cursor-pointer items-center justify-between border-gray-400/60 py-3 transition-all duration-300 dark:border-white/10",
        )}
        title={getName()}
      >
        <aside className="flex items-center gap-3">
          {item.entityId ? (
            <Avatar color="primary" name={item.entity?.name} />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <Icon icon={getIcon() ?? icon} width={22} />
            </span>
          )}
          <div className="flex flex-col">
            <h6 className="mb-1 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
              {getName()}
            </h6>
            <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
              {`${format(item.date ?? item.createdAt, DATE_FORMAT_TRANS)}`}
            </span>
          </div>
        </aside>
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
