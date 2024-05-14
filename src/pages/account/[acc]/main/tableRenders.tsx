import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@nextui-org/badge";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { useCallback } from "react";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";

export const renderCell = useCallback(
  (transaction: Transaction, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof Transaction];
    switch (columnKey) {
      case "description":
        return (
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-xl text-white">
              {transaction.recipient ? (
                transaction.recipient.split("")[0]
              ) : (
                <Icon icon="mingcute:user-3-fill" />
              )}
            </div>
            <aside>
              <h4 className="text-lg font-semibold">
                <span className="text-sm">$</span>{" "}
                {transaction.amount.toLocaleString()}
              </h4>
              <p className="!text-xs">{transaction.description}</p>
            </aside>
          </div>
        );
      case "type":
        return (
          <Badge color={transaction.state === 1 ? "success" : "danger"}>
            {transaction.state}
          </Badge>
        );
      case "accountId":
        return <span>fe</span>;
      case "createdAt":
        return <span>{format(transaction.createdAt, DATE_FORMAT_TRANS)}</span>;
      default:
        return cellValue;
    }
  },
  [],
);
