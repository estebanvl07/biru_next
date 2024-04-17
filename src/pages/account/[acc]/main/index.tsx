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
      <div className="mx-auto max-w-[65rem]">
        {/* {!desktopMediaQuery ? (
        <HomeMobile />
      ) : (
      )} */}
        <div className="flex w-full flex-col">
          <section className="mb-2 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm">Saldo estimado</span>
              {loading ? (
                <span>loading</span>
              ) : (
                // <LoaderSkeleton skeletonType="Balance" />
                <h2 className="text-3xl md:text-4xl">
                  $ {account?.balance?.toLocaleString() ?? "0.00"}
                </h2>
              )}
            </div>
            <Link href="/transactions/new">
              <Button className="">Crear transacción</Button>
            </Link>
          </section>
          <div
            className={clsx(
              "bento-container w-full gap-4",
              style["bento-container"],
            )}
          >
            <article className="row-span-4 lg:col-span-5">
              <CardBalanceAccount />
            </article>
            <article className="col-span-12 row-span-4 lg:col-span-5">
              <DetailAmounts cardClassName="h-full" />
            </article>
            <div className="col-span-10 row-span-4">
              <LastTransactions
                loading={loading}
                cardClassName="px-4 py-4"
                transactions={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
