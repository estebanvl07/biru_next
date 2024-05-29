import React from "react";

import TransactionItem from "./TransactionItem.component";

type Props = {
  data?: any[] | undefined;
  emptyText?: string;
  maxLength?: number;
};

const ListTransactions = React.memo(({ data, emptyText, maxLength }: Props) => {
  return (
    <ul className="scrollbar-customize flex h-fit w-full flex-col overflow-auto rounded-md  bg-transparent text-sm">
      {data?.map((item, index) => {
        if (maxLength && index + 1 > maxLength) return null;
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
        <p className="py-4 text-center font-extralight text-zinc-400">
          {emptyText ?? "No se encontraron datos"}
        </p>
      )}
    </ul>
  );
});

export default ListTransactions;
