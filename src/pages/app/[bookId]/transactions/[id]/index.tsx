import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Accordion, AccordionItem, Avatar, Chip, Button } from "@heroui/react";
import { User } from "@heroui/user";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Card } from "~/modules/components";

import { TransactionIncludes } from "~/types/transactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { GetServerSideProps } from "next";
import useShowForm from "~/lib/hooks/useShowForm";
import EditTransaction from "~/modules/Transactions/EditTransaction";
import { GoalsIncludes } from "~/types/goal/goal.types";
import NotFound from "~/modules/components/404";

const DetailTransactionPage = ({ data: transactionData }: { data: string }) => {
  const transaction = JSON.parse(transactionData) as TransactionIncludes;
  const router = useRouter();
  const query = router.query;

  if (!transaction) {
    return (
      <DashboardLayout
        title="Detalle de transacción"
        headDescription="detalle de transacción"
      >
        <NotFound />
      </DashboardLayout>
    );
  }

  const { data, onShowEdit, onCloseEdit, showEdit } =
    useShowForm<TransactionIncludes>({
      defaultData: transaction,
    });

  const {
    id,
    amount,
    date,
    recipient,
    reference,
    userAccount,
    description,
    createdAt,
    transferType,
    updatedAt,
    type,
    category,
    entity,
    goal,
  } = transaction;

  const getIcon = () => {
    if (category?.icon) {
      return category.icon;
    }

    return type === 1
      ? "iconamoon:arrow-bottom-left-1"
      : "iconamoon:arrow-top-right-1";
  };

  return (
    <DashboardLayout
      title="Detalle de transacción"
      headDescription="detalle de transacción"
    >
      <div className="flex max-w-[34rem] flex-col gap-2">
        <div className="flex flex-col items-start justify-between rounded-xl">
          <aside className="flex items-center">
            {transferType === 2 ? (
              <div className="flex flex-col items-center gap-2">
                {goal?.icon ? (
                  <div className="grid h-10 w-10 place-content-center rounded-full bg-primary">
                    <Icon icon={goal?.icon} width={18} className="text-white" />
                  </div>
                ) : (
                  <Avatar name={goal?.name} isBordered color="primary" />
                )}
                <aside>
                  <p className="font-medium">{goal?.name}</p>
                  <span className="opacity-70">
                    {goal?.description || "Sin descripción"}
                  </span>
                </aside>
              </div>
            ) : entity ? (
              <User
                name={entity.name}
                description={entity.description || "N/A"}
                avatarProps={{
                  color: "primary",
                  name: entity.name,
                  src: entity.avatar || undefined,
                }}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-content-center rounded-full bg-primary">
                  <Icon
                    icon={getIcon()}
                    width={20}
                    className="text-white dark:text-primary-foreground"
                  />
                </div>
                <aside>
                  <p className="font-medium">
                    {type === 1 ? "Ingresos varios" : "Gastos Varios"}
                  </p>
                  <span
                    className={clsx("text-3xl font-bold", {
                      "text-green-500": type === 1,
                      "text-red-500": type === 2,
                    })}
                  >
                    {type === 1 ? "+" : "-"}
                    {amount.toLocaleString()}
                  </span>
                </aside>
              </div>
            )}
          </aside>
        </div>
        <Accordion
          defaultExpandedKeys={["1", "2"]}
          variant="light"
          selectionMode="multiple"
        >
          <AccordionItem
            key="1"
            title="Transacción"
            subtitle="Datos de transacción"
            classNames={{
              title: "font-medium",
            }}
          >
            <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Numero de transacción:</span>
                <p>#{id}</p>
              </li>

              <li>
                <span>Tipo:</span>
                <div>
                  {transferType === 1 && type === 1 ? (
                    <Chip variant="flat" color="success" size="sm">
                      <span className="flex flex-row items-center gap-2 font-semibold">
                        <Icon icon="iconamoon:arrow-top-right-1" width={16} />{" "}
                        Ingreso
                      </span>
                    </Chip>
                  ) : transferType === 1 && type === 2 ? (
                    <Chip variant="flat" color="danger" size="sm">
                      <span className="flex items-center gap-2 font-semibold">
                        <Icon icon="iconamoon:arrow-bottom-left-1" width={16} />
                        Egreso
                      </span>
                    </Chip>
                  ) : (
                    <Chip variant="flat" color="warning" size="sm">
                      <span className="flex items-center gap-2 font-semibold">
                        <Icon icon="ph:target" width={16} />
                        Meta
                      </span>
                    </Chip>
                  )}
                </div>
              </li>

              <li>
                <span>Monto:</span>
                <p>$ {amount.toLocaleString()}</p>
              </li>

              <li>
                <span>Categoría:</span>
                <div>
                  {category?.name ? (
                    <Chip variant="flat" color="default" size="sm">
                      <span className="flex flex-row items-center gap-2 font-semibold">
                        <Icon icon={category.icon ?? ""} width={16} />{" "}
                        {category.name}
                      </span>
                    </Chip>
                  ) : (
                    "Ninguna"
                  )}
                </div>
              </li>

              <li>
                <span>Fecha de transacción:</span>
                <p>
                  {capitalize(format(date ?? createdAt, DATE_FORMAT_TRANS))}
                </p>
              </li>

              <li>
                <span>Ultima actualización:</span>
                <p>{format(updatedAt, DATE_FORMAT_TRANS)}</p>
              </li>

              <li>
                <span>Fecha de creación:</span>
                <p>{format(createdAt, DATE_FORMAT_TRANS)}</p>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem
            key="2"
            title="Destinatario"
            subtitle="Datos del destinatario"
            classNames={{
              title: "font-medium",
            }}
          >
            <ul className="flex flex-col gap-2 [&>li>p]:font-semibold [&>li>span]:opacity-70 [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:justify-between">
              <li>
                <span>Destinatario:</span>
                <p>{recipient || "Ninguno"}</p>
              </li>

              <li>
                <span>Número de Referencia:</span>
                <p>{reference || "Ninguno"}</p>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem
            key="3"
            title="Descripción"
            classNames={{
              title: "font-medium",
            }}
            subtitle="Descripción de transacción"
          >
            <p>{description || "Sin descripción"}</p>
          </AccordionItem>
        </Accordion>
        <Button
          color="primary"
          onPress={() => {
            router.push(`/account/${query.acc}/transactions/${id}/edit`);
          }}
          className="mt-2 w-full"
        >
          Editar Transacción
        </Button>
      </div>
      {data && (
        <EditTransaction
          transaction={data}
          isOpen={showEdit}
          onClose={onCloseEdit}
          options={{
            transferType: transaction.transferType === 1 ? "transfer" : "goals",
            defaultGoal:
              transaction.transferType === 2
                ? (transaction.goal as GoalsIncludes)
                : undefined,
          }}
        />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, bookId } = ctx.params!;

  const helper = await createServerSideCaller(ctx);
  const data = await helper.transaction.getTransactionById.fetch({
    id: Number(id),
    bookId: String(bookId),
  });

  return {
    props: {
      data: JSON.stringify(data),
    },
  };
};

export default DetailTransactionPage;
