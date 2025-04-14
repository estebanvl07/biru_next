import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Listbox, ListboxItem, useDisclosure } from "@heroui/react";
import { TransactionIncludes } from "~/types/transactions";
import DataList from "../components/molecules/DataList/DataList";
import { DASHBOARD_MAIN_PATH, DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { useCallback, useState } from "react";
import { Edit, EllipsisVertical, Eye, Trash } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const MobileTransactionPage = ({
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

  const { mutateAsync: cancelTransaction } =
    api.transaction.cancel.useMutation();

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
            onClick={(e) => {
              e.stopPropagation();
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
        onPressItem={(item) => {
          router.push(
            `${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${item.id}`,
          );
        }}
        hrefButtonNew={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/new`}
        newButtonText="Crear Transacción"
        drawerProps={{
          isOpen,
          onClose,
          onOpen,
          header: <div></div>,
          drawerHeaderContent: (transaction) => {
            const {
              date,
              createdAt,
              type,
              transferType,
              amount,
              goal,
              category,
              description,
            } = transaction;

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
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${data.id}`}
                  startContent={<Eye width={18} />}
                >
                  <span className="text-base">Ver Transacción</span>
                </ListboxItem>
                <ListboxItem
                  href={`${DASHBOARD_MAIN_PATH}/${params?.bookId}/transactions/${data.id}/edit`}
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
                              id: data.id,
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
        dataSelected={transactionSelected}
        setDataSelected={setTransactionSelected}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MobileTransactionPage;
