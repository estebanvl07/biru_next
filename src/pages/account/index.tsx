import React, { useState } from "react";

import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";

import type { GetServerSideProps } from "next";
import { useAccounts } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";
import WithoutSideBar from "~/modules/Layouts/templates/dashbaord/without-sidebar";
import {
  RadioGroup,
  RadioProps,
  VisuallyHidden,
  cn,
  useRadio,
} from "@heroui/react";
import { optionsTypeAccount } from "~/pages/account/new";

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
  const { accounts } = useAccounts();
  const { isMobile } = useResize();

  return (
    <>
      <WithoutSideBar hasLogout title="Centro de Cuentas" hasFilter={false}>
        <div className="m-auto flex w-full max-w-[38rem] flex-col">
          <header className="flex items-center justify-between gap-4">
            <aside>
              <h2>Mis cuentas</h2>
              <p>Selecciona una de tus cuentas</p>
            </aside>
            <Button
              color="primary"
              type="button"
              as={Link}
              href="/account/new"
              isIconOnly={isMobile}
            >
              <Icon icon="ph:plus" width={18} /> {!isMobile && "Crear Cuenta"}
            </Button>
          </header>
          <RadioGroup className="my-4 flex flex-col gap-6">
            {accounts.map((account) => {
              const [typeAcc] = optionsTypeAccount.filter(
                (acc) => acc.value === account.type,
              );
              return (
                <CustomRadio
                  value={`${account.id}`}
                  key={account.id}
                  classNames={{
                    base: "border-2 !border-red-600",
                  }}
                  onClick={() => setAccountSelected(account.id)}
                >
                  <div className="flex w-full items-center justify-between px-2">
                    <aside className="flex flex-col">
                      <h4 className="w-48 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {account.name}
                      </h4>
                      <span className="text-xs">
                        {account.reference ?? "Sin referencia"}
                      </span>
                    </aside>
                    <aside className="flex flex-col items-end">
                      <span className="text-xs">{typeAcc?.name}</span>
                      <span className="text-lg font-semibold">
                        {" "}
                        <span className="text-base font-semibold">$</span>{" "}
                        {account?.balance?.toLocaleString()}
                      </span>
                    </aside>
                  </div>
                </CustomRadio>
              );
            })}
          </RadioGroup>
          <div className="flex gap-2">
            <Button
              as={Link}
              href={`/account/${accountSelected}/main`}
              color="primary"
              isDisabled={Boolean(!accountSelected)}
            >
              Ir al Dashboard
            </Button>
            <Button as={Link} href={`/account/${accountSelected}/edit`}>
              Editar cuenta
            </Button>
          </div>
        </div>
      </WithoutSideBar>
    </>
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
