import React, { forwardRef, useCallback, useState } from "react";
import type { GetServerSideProps } from "next";
import {
  AnnualBalance,
  CardBalanceAccount,
  CategoriesPercent,
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
import { Card, Table } from "~/modules/components";
import { es } from "date-fns/locale";
import { Select, SelectItem } from "@nextui-org/react";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { api } from "~/utils/api";
import { fdatasync } from "fs";
import { Reorder } from "framer-motion";

import { ReactSortable } from "react-sortablejs";
import CardDetailAmount from "~/modules/common/DetailAmounts/CardDetailAmount";
import { PieChartAmountByCategoires } from "~/modules/charts";

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
  const { transactions } = useTransactions();

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-12 gap-2">
        <article className="col-span-7">
          <CardBalanceAccount />
        </article>
        <article className="col-span-5">
          <DetailAmounts />
        </article>
        <article className="col-span-7">
          <AnnualBalance />
        </article>
        <article className="col-span-5">
          <PieChartAmountByCategoires />
        </article>
        <article className="col-span-6">
          <LastTransactions />
        </article>
        <article className="col-span-6">
          <CategoriesPercent />
        </article>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
