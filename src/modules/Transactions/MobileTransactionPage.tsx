import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { ListTransactions } from "../Common";

import { useSearch } from "~/lib/hooks";

import { TransactionIncludes } from "~/types/transactions";
import useShowForm from "~/lib/hooks/useShowForm";
import CreateTransaction from "./CreateTransaction";

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

  const { showCreate, onShowCreate, onCloseCreate } = useShowForm<TransactionIncludes>({})

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
          isIconOnly
          onClick={() => {
            onShowCreate()
          }}
        >
          <Icon
            icon="ph:plus"
            className="text-white dark:text-slate-200"
            width={18}
          />
        </Button>
      </section>
      <ListTransactions data={newList} />
      <CreateTransaction isOpen={showCreate} onClose={onCloseCreate} />
    </div>
  );
};

export default MobileTransactionPage;
