import Link from "next/link";
import { useParams } from "next/navigation";
import type { GetServerSideProps } from "next";

import {
  BalanceAccount,
  LastTransactions,
  BalanceIncome,
  BalanceEgress,
} from "~/modules/Common";
import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Button } from "@nextui-org/react";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";

import MobileDashboard from "~/modules/Dashboard/MobileDashboard";
import EntitiesGroup from "~/modules/components/molecules/EntitiesGroup";
import CategoiresSuggestion from "~/modules/components/molecules/CategoiresSuggestion";
import { useCategory } from "~/modules/Category/hook/category.hook";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accountId = Number(ctx.params!.acc);

  const helpers = await createServerSideCaller(ctx);
  await helpers.userAccount.getOne.prefetch({ id: accountId });
  await helpers.userAccount.setLastAccess.prefetch({ id: Number(accountId) });

  const trpcState = helpers.dehydrate();

  return {
    props: {
      trpcState,
    },
  };
};

const HomePage = () => {
  const params = useParams();

  const { account } = useCurrentAccount();
  const { categories, isLoading } = useCategory();
  const { isDesktop, isMobile } = useResize();

  return (
    <DashboardLayout
      title="Dashboard"
      headDescription="Dashboard de la cuenta seleccionada"
      hasFilter
    >
      {isMobile ? (
        <MobileDashboard />
      ) : (
        <>
          <div className="mb-2 flex items-center justify-center !pb-6 md:justify-between">
            <aside className="flex flex-col">
              <span>Balance actual</span>
              <h2 className=" w-fit text-4xl">
                <span className="mr-1 text-xl">$</span>
                {account?.balance?.toLocaleString()}
              </h2>
            </aside>

            <aside className="items-center md:flex">
              <EntitiesGroup />

              <hr className="hiddem mx-6 h-12 w-[1px] border-l md:block dark:border-white/10" />

              {isDesktop && (
                <div className="flex gap-2">
                  <Button
                    href={`/account/${params?.acc}/transactions/new?type=2`}
                    as={Link}
                    className="flex items-center gap-2 bg-default-100"
                  >
                    <Icon icon="iconamoon:arrow-top-right-1" width={18} /> Nuevo
                    Egreso
                  </Button>
                  <Button
                    color="primary"
                    as={Link}
                    href={`/account/${params?.acc}/transactions/new?type=1`}
                    className="flex items-center gap-2"
                  >
                    <Icon icon="iconamoon:arrow-bottom-left-1" width={18} />
                    Nuevo Ingreso
                  </Button>
                </div>
              )}
            </aside>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12 flex flex-col gap-2 xl:col-span-7">
              <div className="flex flex-row gap-2">
                <BalanceIncome />
                <BalanceEgress />
              </div>
              <BalanceAccount />
            </div>
            <article className=" col-span-12 xl:col-span-5">
              <LastTransactions transactionsMaxLength={6} />
            </article>
          </div>
        </>
      )}

      {!isLoading && categories?.length === 0 && <CategoiresSuggestion />}
    </DashboardLayout>
  );
};

export default HomePage;
