import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Chip } from "@nextui-org/react";
import { Table } from "~/modules/components";
import Actions from "~/modules/components/molecules/Table/Actions";
import DashboardLayout from "~/modules/Layouts/Dashboard";

import { Transaction } from "@prisma/client";
import { CategoryIncludes } from "~/types/category/category.types";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "~/modules/components/molecules/Table/utils";
import { formatDatesOfTransactions } from "~/lib/resource/formatDatesOfTransactions";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { basicColumns } from "~/modules/Transactions/table";

import { GetServerSideProps } from "next";
import { useResize } from "~/lib/hooks/useResize";
import { ListTransactions } from "~/modules/Common";
import DetailView from "~/modules/components/molecules/DetailView";

const DetailCategory = ({ category }: { category: CategoryIncludes }) => {
  const { name, description, type, icon, transactions } = category;

  const { isMobile } = useResize();

  const params = useParams();
  const router = useRouter();

  const renderCell = useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];
      switch (columnKey) {
        case "amount":
          return (
            <div className="flex flex-col text-lg font-semibold">
              <h4 className="text-lg">$ {cellValue?.toLocaleString()}</h4>
              <span className="text-xs font-normal">
                {transaction.description || "sin descripción"}
              </span>
            </div>
          );
        case "type":
          return (
            <Chip
              size="lg"
              variant="flat"
              color={transaction.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={transaction.type === 1 ? "ph:trend-up" : "ph:trend-down"}
              />
            </Chip>
          );
        case "date":
          return (
            <span>
              {capitalize(
                format(transaction.date || transaction.createdAt, "PPPP", {
                  locale: es,
                }),
              )}
            </span>
          );
        case "userAccount":
          null;
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction?.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/transactions/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(transaction?.id),
                    category: transaction.categoryId,
                  },
                })
              }
              onClickDelete={() => {}}
            />
          );
        default:
          return cellValue;
      }
    },
    [params],
  );

  return (
    <DashboardLayout
      title="Detalle de categoría"
      headDescription="Detalle de la categoria y las transacciones asociadas"
    >
      <DetailView
        topContent={
          <header className="flex flex-row items-center justify-between">
            <aside className="flex items-center gap-2">
              <div className="grid h-12 w-12 place-content-center rounded-full bg-primary">
                <Icon icon={icon ?? ""} width={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl">{category.name}</h2>
                <p>{category.description || "Sin descripción"}</p>
              </div>
            </aside>
            <Button
              as={Link}
              href={`/account/${params?.acc}/category/${category.id}/edit`}
              color="primary"
              isIconOnly={isMobile}
              className="sm:w-fit"
            >
              <Icon icon="akar-icons:edit" width={18} />
              {!isMobile && "Editar Categoría"}
            </Button>
          </header>
        }
        tabs={[
          {
            title: "Transacciones Relacionadas",
            children: (
              <>
                {!isMobile ? (
                  <Table
                    headerConfig={{
                      hasNew: true,
                      newButtonText: "Nueva Transacción",
                      redirectTo: `/account/${params?.id}/transactions/new?category=${category.id}`,
                    }}
                    renderCell={renderCell}
                    columns={basicColumns}
                    filterKeys={["amount", "description"]}
                    data={transactions}
                  />
                ) : (
                  <ListTransactions data={transactions as any} />
                )}
              </>
            ),
          },
          {
            title: "Detalle",
            children: (
              <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 [&>li>p]:font-medium [&>li]:flex [&>li]:flex-row [&>li]:items-center [&>li]:gap-2 [&>li]:text-sm">
                <li className="flex items-center gap-2">
                  <aside className="flex gap-2">
                    <span>Nombre:</span>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{name}</p>
                      {icon && (
                        <div className="grid h-5 w-5 place-content-center rounded-full bg-primary">
                          <Icon icon={icon} width={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </aside>
                </li>
                <li>
                  <span>Descripción:</span>
                  <p>{description || "N/A"}</p>
                </li>

                <li>
                  <span>Tipo:</span>
                  <div>
                    <Chip
                      color={type === 1 ? "success" : "danger"}
                      size="sm"
                      className="h-4 text-[10px] text-white"
                    >
                      {type === 1 ? "Ingreso" : "Egreso"}
                    </Chip>
                  </div>
                </li>
                <li>
                  <span>Transacciones:</span>
                  <p>{transactions.length}</p>
                </li>
              </ul>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;

  const helper = await createServerSideCaller(ctx);

  const [category] = await helper.category.getCategoryById.fetch(Number(id));

  const data = {
    ...category,
    createdAt: category?.createdAt.toISOString(),
    updatedAt: category?.updatedAt.toISOString(),
    transactions: category?.transactions
      ? formatDatesOfTransactions(category.transactions as any)
      : null,
  };

  return {
    props: {
      category: data,
    },
  };
};

export default DetailCategory;
