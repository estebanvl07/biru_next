import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Avatar,
  Badge,
  Listbox,
  ListboxItem,
  useDisclosure,
} from "@heroui/react";
import { TransactionIncludes } from "~/types/transactions";
import DataList from "../components/molecules/DataList/DataList";
import { DASHBOARD_MAIN_PATH, DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { useCallback, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Edit,
  EllipsisVertical,
  Eye,
  Trash,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import _ from "lodash";
import { HoldableItem } from "../components/atoms/HoldableItem";

const ListTransactions = ({
  transactions,
  isLoading,
}: {
  transactions: TransactionIncludes[];
  isLoading: boolean;
}) => {
  const router = useRouter();
  const params = useParams<{ bookId: string }>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [transactionSelected, setTransactionSelected] = useState(
    {} as TransactionIncludes,
  );

  const groupedTransactions = _.groupBy(
    transactions,
    (tran: TransactionIncludes) => {
      return format(new Date(tran.date ?? tran.createdAt), "yyyy-MM-dd");
    },
  );

  const { mutateAsync: cancelTransaction } =
    api.transaction.cancel.useMutation();

  const renderContent = useCallback(
    (group: TransactionIncludes[]) => {
      return (
        <div className="mb-6 flex w-full flex-col gap-3">
          <h4 className="mb-2">
            {format(
              new Date(group[0]?.date ?? group[0]!.createdAt),
              "dd 'de' MMM , yyyy",
            )}
          </h4>
          {group.map((transaction) => {
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
              id,
            } = transaction;

            const getName = (): string => {
              const defaultName =
                type === 1 ? "Ingresos Varios" : "Gastos Varios";

              if (transferType === 2 && goal) {
                return goal.name;
              }

              return category?.name || description || defaultName;
            };

            const getIcon = (): string => {
              const typeIcon =
                type === 1
                  ? "iconamoon:arrow-top-right-1"
                  : "iconamoon:arrow-bottom-left-1";

              if (transferType === 2) {
                return (goal?.icon as string) || typeIcon;
              }
              if (category) {
                return category?.icon ?? typeIcon;
              }

              return typeIcon;
            };

            return (
              <HoldableItem
                key={transaction.id}
                className="flex w-full flex-col gap-3 rounded-xl px-4 py-2"
                onClick={() => {
                  router.push(
                    `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${id}`,
                  );
                }}
                holdTime={1000}
                onHold={() => {
                  setTransactionSelected(transaction);
                  onOpen();
                }}
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <aside className="flex items-center gap-4">
                    <Badge
                      placement="bottom-right"
                      variant="faded"
                      className="border border-divider"
                      size="sm"
                      color={type === 1 ? "success" : "danger"}
                      content={
                        type === 1 ? (
                          <ArrowUpRight width={14} />
                        ) : (
                          <ArrowDownLeft width={14} />
                        )
                      }
                    >
                      {entityId ? (
                        <Avatar
                          className="border border-divider text-primary dark:text-primary-foreground"
                          name={entity?.name}
                        />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-foreground-50 text-white dark:bg-default-100 dark:text-primary-foreground">
                          <Icon
                            className="text-primary dark:text-primary-foreground"
                            icon={getIcon()}
                            width={22}
                          />
                        </span>
                      )}
                    </Badge>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setTransactionSelected(transaction);
                      onOpen();
                    }}
                  >
                    <EllipsisVertical />
                  </button>
                </div>
              </HoldableItem>
            );
          })}
        </div>
      );
    },
    [transactions],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <DataList
        data={Object.values(groupedTransactions) as TransactionIncludes[][]}
        hasCustomContent
        content={renderContent}
        hrefButtonNew={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new`}
        newButtonText="Crear Transacción"
        drawerProps={{
          isOpen,
          onClose,
          onOpen,
          drawerHeaderContent: () => {
            const {
              date,
              createdAt,
              type,
              transferType,
              amount,
              goal,
              category,
              description,
            } = transactionSelected;

            const getName = (): string => {
              const defaultName =
                type === 1 ? "Ingresos Varios" : "Gastos Varios";

              if (transferType === 2 && goal) {
                return goal.name;
              }

              return category?.name || description || defaultName;
            };

            return (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex w-full items-center justify-between gap-4">
                    <aside className="flex flex-col">
                      <h6 className="font-base mb-1 text-ellipsis text-nowrap font-semibold dark:font-normal">
                        {getName()}
                      </h6>

                      <span>${amount?.toLocaleString()}</span>
                    </aside>
                  </div>
                </div>
              </div>
            );
          },
          drawerBodyContent(data) {
            return (
              <Listbox
                aria-label="Opciones de transacción"
                variant="flat"
                color="default"
              >
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  as={Link}
                  aria-label="Ver transacción"
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${transactionSelected.id}`}
                  startContent={<Eye width={18} />}
                >
                  <span className="text-base">Ver Transacción</span>
                </ListboxItem>
                <ListboxItem
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${transactionSelected.id}/edit`}
                  aria-label="Editar Transacción"
                  className="px-0 py-2 !text-lg"
                  startContent={<Edit width={18} />}
                >
                  <span className="text-base">Editar Transacción</span>
                </ListboxItem>
                <ListboxItem
                  className="px-0 py-2 !text-lg"
                  aria-label="Eliminar Transacción"
                  onPress={() => {
                    toast("¿Estas seguro de cancelar esta transacción?", {
                      action: {
                        label: "Realizar",
                        onClick: () => {
                          toast.promise(
                            cancelTransaction({
                              id: transactionSelected.id,
                              bookId: params?.bookId,
                            }),
                            {
                              loading: "Cancelando Transacción...",
                              success:
                                "La transacción se ha cancelado con éxito.",
                              error: "Hubo un error, intente de nuevo",
                            },
                          );
                        },
                      },
                    });
                  }}
                  startContent={<Trash width={18} />}
                >
                  <span className="text-base">Elimiar Transacción</span>
                </ListboxItem>
              </Listbox>
            );
          },
        }}
        filterKeys={["description", "amount", "recipient"]}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ListTransactions;
