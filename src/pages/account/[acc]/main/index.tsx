import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import {
  CardBalanceAccount,
  DetailAmounts,
  LastTransactions,
} from "~/modules/common";
import { Button } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { api } from "~/utils/api";

import style from "~/styles/main.module.css";
import clsx from "clsx";

const HomePage = () => {
  const params = useParams();
  const { data: account } = api.userAccount.getOne.useQuery({
    id: Number(params?.acc),
  });
  const loading = false;
  return (
    <DashboardLayout>
      <div className="">
        {/* {!desktopMediaQuery ? (
        <HomeMobile />
      ) : (
      )} */}
        <div className="mt-4 flex w-full flex-col gap-4">
          <section className="flex flex-row gap-4">
            <article className="flex-grow">
              <CardBalanceAccount />
            </article>
            <article className="flex-grow-0">
              <DetailAmounts cardClassName="h-full min-w-[24rem] w-full" />
            </article>
          </section>
          <div className="">
            <LastTransactions
              loading={loading}
              cardClassName="px-4 py-4"
              transactions={[]}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
