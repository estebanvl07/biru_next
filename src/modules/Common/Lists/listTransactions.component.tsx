import React from "react";

import TransactionItem from "./TransactionItem.component";
import { Empty } from "~/modules/components";
import { useParams } from "next/navigation";
import { TransactionIncludes } from "~/types/transactions";
import type { Transaction } from "@prisma/client";

type Props = {
  data: TransactionIncludes[];
  maxLength?: number;
};

const ListTransactions = React.memo(({ data, maxLength }: Props) => {
  const params = useParams<{ acc: string }>();

  return (
    <ul className="scrollbar-customize flex h-full w-full flex-col overflow-auto rounded-md bg-transparent text-sm">
      {data?.map((item, index) => {
        if (maxLength && index + 1 > maxLength) return null;
        return (
          <TransactionItem
            key={item.id}
            index={index}
            item={item}
            length={maxLength || data.length}
          />
        );
      })}
      {data?.length === 0 && (
        <Empty
          icon="bitcoin-icons:transactions-filled"
          className="py-4"
          buttonText="Crear Transacción"
          href={`/account/${params?.acc}/transactions/new`}
        />
      )}
    </ul>
  );
});

export default ListTransactions;
