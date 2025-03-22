import React, { useState } from "react";

import type { GetServerSideProps } from "next";
import { useAccounts } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  RadioProps,
  VisuallyHidden,
  cn,
  useRadio,
} from "@heroui/react";
import { optionsTypeAccount } from "~/pages/overview/settings/account/new";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import SettingsLayout from "~/modules/Layouts/SettingsLayout";
import { useSearch } from "~/lib/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const helpers = await createServerSideCaller(ctx);

  const accounts = await helpers.userAccount.getAll.fetch();

  if (accounts.length === 0) {
    return {
      redirect: {
        destination: "/account/new",
        permanent: false,
      },
    };
  }

  const trpcState = helpers.dehydrate();

  return {
    props: {
      trpcState,
    },
  };
};

const AccountPage = () => {
  const [accountSelected, setAccountSelected] = useState<number>();
  const { accounts: data } = useAccounts();

  const {
    newList: accounts,
    refreshList,
    onSearch,
  } = useSearch({ data, keys: ["name"] });

  const { isMobile } = useResize();

  return (
    <SettingsLayout>
      <Card shadow="none" className="border border-divider ">
        <CardHeader className="flex items-center justify-between px-6 pt-4">
          <aside>
            <h2>Mis Cuentas</h2>
            <p>
              Inscribe las cuentas que tengas disponibles, y lleva más ordenado
              tus ingresos
            </p>
          </aside>
        </CardHeader>
        <CardBody className="px-6 pb-6">
          <div className="flex gap-2">
            <Input
              classNames={{
                inputWrapper:
                  "bg-white border border-divider dark:bg-default-100",
              }}
              radius="sm"
              isClearable
              onClear={refreshList}
              onValueChange={onSearch}
              placeholder="Buscar Cuenta"
              startContent={<Icon icon={"mynaui:search"} width={18} />}
            />
            <Button color="primary">Crear Cuenta</Button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => {
              const [typeAcc] = optionsTypeAccount.filter(
                (acc) => acc.value === account.type,
              );
              return (
                <Card
                  key={account.id}
                  className="group col-span-1 border border-divider hover:border-primary hover:bg-default-50"
                  shadow="none"
                >
                  <CardHeader className="flex items-center justify-between">
                    <aside>
                      <h4 className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {account.name}
                      </h4>
                      <span className="text-xs">
                        {account.reference ?? "Sin referencia"}
                      </span>
                    </aside>
                  </CardHeader>
                  <CardBody>
                    <aside className="flex flex-col items-start">
                      <span className="text-xs">{typeAcc?.name}</span>
                      <span className="text-lg font-semibold">
                        {" "}
                        <span className="text-base font-semibold">$</span>{" "}
                        {account?.balance?.toLocaleString()}
                      </span>
                    </aside>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </SettingsLayout>
  );
};

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex flex-row-reverse items-center justify-between hover:bg-default-50/30",
        "max-w-full cursor-pointer gap-4 rounded-lg border border-default p-3",
        "dark:data-[selected=true]:border-primary-light/40 data-[selected=true]:border-primary/40 data-[selected=true]:bg-default-50 dark:data-[selected=true]:bg-default-200",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div {...getLabelWrapperProps()} className="w-full">
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};

export default AccountPage;
