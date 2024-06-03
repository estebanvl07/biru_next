import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { ListTransactions } from "../common";

import { useSearch } from "~/lib/hooks";

import { TransactionIncludes } from "~/types/transactions";

const MobileTransactionPage = ({
  transactions,
}: {
  transactions: TransactionIncludes[];
}) => {
  const params = useParams();
  const { newList, onSearch } = useSearch<TransactionIncludes>({
    data: transactions,
    keys: ["description", "amount", "recipient"],
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <section className="flex gap-2">
        <Input
          placeholder="Buscar"
          onChange={(e) => onSearch(e.target.value)}
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
        />
        <Button
          color="primary"
          as={Link}
          href={`/account/${params?.acc}/transactions/new`}
          className="border-1"
          isIconOnly
        >
          <Icon
            icon="ph:plus"
            className="text-white dark:text-slate-200"
            width={18}
          />
        </Button>
      </section>
      <ListTransactions data={newList} />
    </div>
  );
};

export default MobileTransactionPage;
