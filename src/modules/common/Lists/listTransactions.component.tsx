import React from "react";

import TransactionItem from "./TransactionItem.component";

import type { ITransaction } from "~/types/transactions";

type Props = {
  data?: ITransaction[] | undefined;
  emptyText?: string;
  maxLength?: number;
};

const ListTransactions = React.memo(({ data, emptyText, maxLength }: Props) => {
  return (
    <ul className="flex w-full flex-col scrollbar-customize overflow-auto rounded-md border-black/20 bg-white text-sm dark:border-white/10 dark:bg-slate-900">
      {data?.map((item, index) => {
        if (maxLength && index + 1 === maxLength) return null;
        return (
          <TransactionItem
            key={item.id}
            index={index}
            item={item}
            length={data.length}
          />
        );
      })}
      {data?.length === 0 && (
        <p className="py-4 font-extralight text-zinc-400 text-center">
          {emptyText ?? "No se encontraron datos"}
        </p>
      )}
    </ul>
  );
});

export default ListTransactions;
