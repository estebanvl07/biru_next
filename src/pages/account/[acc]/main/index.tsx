import Link from "next/link";
import { useParams } from "next/navigation";
import type { GetServerSideProps } from "next";

import {
  BalanceAccount,
  LastTransactions,
  BalanceIncome,
  BalanceEgress,
} from "~/modules/Common";
import { Card, Empty } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { Button, User } from "@nextui-org/react";

import { useCurrentAccount } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useGoals } from "~/modules/Goals/hook/goal.hook";
import { useResize } from "~/lib/hooks/useResize";

import MobileDashboard from "~/modules/Dashboard/MobileDashboard";
import EntitiesGroup from "~/modules/components/molecules/EntitiesGroup";
import CategoiresSuggestion from "~/modules/components/molecules/CategoiresSuggestion";
import { useCategory } from "~/modules/Category/hook/category.hook";
import Balance from "~/modules/Common/BalanceAccount/Balance";
import QuickTransaction from "~/modules/components/molecules/QuickTransaction";

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
  const { goals, isLoading: goalsLoading } = useGoals();
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
        <div className="grid grid-cols-12 gap-2">
          <div className="z-10 col-span-8">
            <Balance />
          </div>
          <div className="col-span-4">
            <QuickTransaction />
          </div>
          <div className="col-span-8 flex flex-row gap-2">
            <BalanceIncome />
            <BalanceEgress />
          </div>
          <div className="col-span-4 row-span-2 ">
            <Card className="flex h-full flex-col overflow-auto">
              <header className="mb-2 flex items-center justify-between">
                <h3>Mis metas</h3>
                <Link href={`/account/${params?.acc}/goals`}>Ver todas</Link>
              </header>
              <ul className="flex flex-col gap-2">
                {goals.length === 0 && <Empty />}
                {goals.map((goal) => {
                  return (
                    <li
                      key={goal.id}
                      className="w-full cursor-pointer flex-row rounded-xl border border-transparent bg-default-200/50 transition-all hover:bg-default-200 dark:bg-default-100 dark:hover:border-white/10"
                    >
                      <Link
                        className="flex w-full items-center px-4 py-3"
                        href={`/account/${params?.id}/goals/${goal.id}`}
                      >
                        <User
                          avatarProps={{
                            name: goal.name,
                            color: "primary",
                          }}
                          classNames={{
                            name: "font-semibold",
                          }}
                          name={goal.name}
                          description={`$ ${goal.saved.toLocaleString()} completado`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
          <div className="col-span-12 gap-2 xl:col-span-8">
            <LastTransactions transactionsMaxLength={5} />
          </div>
        </div>
      )}

      {!isLoading && categories?.length === 0 && <CategoiresSuggestion />}
    </DashboardLayout>
  );
};

export default HomePage;
