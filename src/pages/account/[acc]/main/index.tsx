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
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { useCurrentAccount } from "~/modules/Account/hooks";
import { Button } from "@nextui-org/button";
import { Card } from "~/modules/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const { account } = useCurrentAccount();
  const { entities } = useEntity();

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-2 flex items-center justify-between !pb-6">
        <aside>
          <h4>Balance actual</h4>
          <h2 className="text-4xl">
            <span className="mr-1 text-xl">$</span>
            {account.balance?.toLocaleString()}
          </h2>
        </aside>
        <aside className="flex items-center">
          <div className="flex gap-2">
            <AvatarGroup
              isBordered
              max={4}
              total={entities.length <= 4 ? 0 : entities.length - 4}
              size="sm"
            >
              {entities.map((entity) => (
                <Avatar
                  color="primary"
                  key={entity.id}
                  name={entity.name}
                  src={entity.avatar ?? undefined}
                />
              ))}
            </AvatarGroup>
            <Button
              isIconOnly
              as={Link}
              className="bg-default-100"
              href={`/account/${params?.acc}/entities/new`}
              radius="full"
            >
              <Icon icon="ph:plus" width={16} />
            </Button>
          </div>

          <hr className="mx-6 h-12 w-[1px] border-l" />

          <div className="flex gap-2 ">
            <Button
              href={`/account/${params?.acc}/transactions/new?type=2`}
              color="primary"
              as={Link}
              variant="bordered"
              className="flex items-center gap-2 border-1 dark:!text-primary"
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
        </aside>
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-7 flex flex-col gap-2">
          <DetailAmounts className="md:flex-row" />
          <CardBalanceAccount />
        </div>
        <article className="col-span-5">
          <LastTransactions />
        </article>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
