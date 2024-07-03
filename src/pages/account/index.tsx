import React, { useState } from "react";

import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";

import type { GetServerSideProps } from "next";
import { useAccounts } from "~/modules/Account/hooks";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";
import WithoutSideBar from "~/modules/Layouts/templates/dashbaord/without-sidebar";
import { RadioGroup, RadioProps, VisuallyHidden, cn, useRadio } from "@nextui-org/react";
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
  const [accountSelected, setAccountSelected] = useState<number>()
  const { accounts } = useAccounts();
  const { isMobile } = useResize();

  return (
    <>
      <WithoutSideBar title="Centro de Cuentas" hasFilter={false}>
        <div className="flex flex-col m-auto w-full max-w-[38rem]">
          <header className="flex justify-between gap-4 items-center">
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
          <RadioGroup
            className="flex flex-col gap-6 my-4"
            >
              {accounts.map((account) => {
                  const [typeAcc] = optionsTypeAccount.filter((acc) => acc.value === account.type)
                  return (
                    <CustomRadio value={`${account.id}`} onClick={() => setAccountSelected(account.id)}>
                      <div className="flex justify-between items-center w-full px-2">
                        <aside className="flex flex-col">
                          <h4 className="w-48 font-medium overflow-hidden text-ellipsis whitespace-nowrap">{account.name}</h4>
                          <span className="text-xs">{account.reference ?? "Sin referencia"}</span>
                        </aside>
                        <aside className="flex flex-col items-end">
                          <span className="text-xs">{typeAcc?.name}</span>
                          <span className="font-semibold text-lg"> <span className="text-base font-semibold">$</span> {account?.balance?.toLocaleString()}</span>
                        </aside>
                      </div>
                    </CustomRadio>
                  );
              })}
          </RadioGroup>
          <div className="flex gap-2">
            <Button as={Link} href={`/account/${accountSelected}/main`} color="primary" isDisabled={Boolean(!accountSelected)}>Ir al Dashboard</Button>
            <Button isDisabled>Editar cuenta</Button>
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
        "group inline-flex items-center justify-between hover:bg-default-50/30 flex-row-reverse",
        "max-w-full cursor-pointer border border-default rounded-lg gap-4 p-3",
        "data-[selected=true]:border-primary/40 data-[selected=true]:bg-default-50 dark:data-[selected=true]:bg-default-200 dark:data-[selected=true]:border-primary-light/40",
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
