import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Button, Input, useDisclosure } from "@heroui/react";
import { ListTransactions } from "../Common";

import { useSearch } from "~/lib/hooks";

import { TransactionIncludes } from "~/types/transactions";
import useShowForm from "~/lib/hooks/useShowForm";
import CreateTransaction from "./CreateTransaction";
import DataList from "../components/molecules/DataList/DataList";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { useCallback, useState } from "react";
import { EllipsisVertical } from "lucide-react";

const MobileTransactionPage = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionIncludes[];
  isLoading: boolean;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [transactionSelected, setTransactionSelected] = useState(
    {} as TransactionIncludes,
  );

  const renderContent = useCallback(
    (transaction: TransactionIncludes) => {
      const {
        type,
        goal,
        category,
        transferType,
        entity,
        entityId,
        description,
        date,
        createdAt,
      } = transaction;

      const getName = (): string => {
        const defaultName = type === 1 ? "Ingresos Varios" : "Gastos Varios";

        if (transferType === 2 && goal) {
          return goal.name;
        }

        return category?.name || description || defaultName;
      };

      const getIcon = (): string => {
        const typeIcon =
          type === 1
            ? "iconamoon:arrow-bottom-left-1"
            : "iconamoon:arrow-top-right-1";

        if (transferType === 2) {
          return (goal?.icon as string) || typeIcon;
        }
        if (category) {
          return category?.icon ?? typeIcon;
        }

        return typeIcon;
      };

      return (
        <>
          <aside className="flex items-center gap-3">
            {entityId ? (
              <Avatar
                className="border border-divider text-primary dark:text-primary-foreground"
                name={entity?.name}
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-foreground-50 text-white dark:bg-transparent dark:text-primary-foreground">
                <Icon
                  className="text-primary dark:text-primary-foreground"
                  icon={getIcon()}
                  width={22}
                />
              </span>
            )}
            <div className="flex flex-col">
              <h6 className="mb-1 w-24 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
                {getName()}
              </h6>
              <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
                {`${format(date ?? createdAt, DATE_FORMAT_TRANS)}`}
              </span>
            </div>
          </aside>
          <button
            onClick={() => {
              setTransactionSelected(transaction);
              onOpen();
            }}
          >
            <EllipsisVertical />
          </button>
        </>
      );
    },
    [transactions],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <DataList
        data={transactions as TransactionIncludes[]}
        content={renderContent}
        drawerProps={{
          isOpen,
          onClose,
          onOpen,
          header: <div></div>,
          drawerBodyContent: (transaction) => {
            return (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* <Avatar
                    className="h-12 w-12"
                    src={transaction?.name}
                  /> */}
                  {/* <div className="flex flex-col">
                    <h6 className="mb-1 w-24 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
                      {transaction?.recipient?.name}
                    </h6>
                    <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
                      {transaction?.recipient?.email}
                    </span>
                  </div> */}
                </div>
              </div>
            );
          },
        }}
        filterKeys={["description", "amount", "recipient"]}
        dataSelected={transactionSelected}
        setDataSelected={setTransactionSelected}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MobileTransactionPage;
