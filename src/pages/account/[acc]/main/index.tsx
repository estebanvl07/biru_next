import React, { useCallback } from "react";
import type { GetServerSideProps } from "next";
import {
  CardBalanceAccount,
  DetailAmounts,
  LastTransactions,
} from "~/modules/common";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { dashboardColumns as columns } from "~/modules/transactions/table";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@nextui-org/badge";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import { Table } from "~/modules/components";
import { es } from "date-fns/locale";
import { Card, Select, SelectItem } from "@nextui-org/react";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { api } from "~/utils/api";
import { fdatasync } from "fs";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accountId = Number(ctx.params!.acc);

  const helpers = await createServerSideCaller(ctx);
  await helpers.userAccount.getOne.prefetch({ id: accountId });

  const trpcState = helpers.dehydrate();

  return {
    props: {
      trpcState,
    },
  };
};

const HomePage = () => {
  const loading = false;

  const { transactions } = useTransactions();

  const renderCell = useCallback(
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
          return (
            <span>{format(transaction.createdAt, DATE_FORMAT_TRANS)}</span>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <DashboardLayout title="Dashboard">
      <div className="">
        {/* {!desktopMediaQuery ? (
        <HomeMobile />
      ) : (
      )} */}
        <div className="mt-4 flex w-full flex-col gap-4">
          <aside className="flex w-full gap-4">
            <DetailAmounts cardClassName="h-full lg:!flex-row xl:min-w-[24rem] w-full" />
          </aside>
          <section className="flex flex-col gap-4 xl:flex-row">
            <article className="flex-grow">
              <CardBalanceAccount />
            </article>
            <article className="">
              {/* <Card className="px-6 py-4">
                <h3>Transacciones</h3> */}
              <Table
                headerConfig={{
                  keySearch: ["description"],
                  title: "Transacciones",
                }}
                hasBottomContent={false}
                hasTopContent={false}
                columns={columns}
                data={transactions ?? []}
                renderCell={renderCell}
                hasNew
              />
              {/* </Card> */}
            </article>
          </section>
          {/* <div className=""></div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
