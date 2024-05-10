import React from "react";
import type { GetServerSideProps } from "next";
import {
  CardBalanceAccount,
  DetailAmounts,
  LastTransactions,
} from "~/modules/common";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

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
  return (
    <DashboardLayout>
      <div className="">
        {/* {!desktopMediaQuery ? (
        <HomeMobile />
      ) : (
      )} */}
        <div className="mt-4 flex w-full flex-col gap-4">
          <section className="flex flex-col-reverse gap-4 xl:flex-row">
            <article className="flex-grow">
              <CardBalanceAccount />
            </article>
            <article className="flex-grow-0">
              <DetailAmounts cardClassName="h-full xl:min-w-[24rem] w-full" />
            </article>
          </section>
          <div className="">
            <LastTransactions cardClassName="px-4 py-4" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
