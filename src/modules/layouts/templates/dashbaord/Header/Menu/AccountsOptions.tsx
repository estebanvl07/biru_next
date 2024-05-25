import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";
import { useAccounts } from "~/modules/Account/hooks";
import { LoaderSkeleton } from "~/modules/Loaders";

const AccountsOptions = () => {
  const router = useRouter();
  const { accounts, isLoading } = useAccounts();

  const accountsMenu = accounts
    .map((account, index) => {
      return {
        id: account.id,
        name: account.name,
        amount: account.balance ?? 0,
      };
    })
    .slice(0, 3);

  return (
    <ul className="mx-2 flex flex-col rounded-md border pb-2 pt-1 text-sm dark:border-white/10 [&>li]:cursor-pointer [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 dark:hover:[&>li]:bg-slate-950">
      {isLoading ? (
        <LoaderSkeleton skeletonType="AccountOption" />
      ) : (
        <>
          <Listbox variant="flat" aria-label="Account list">
            {accountsMenu.map((account) => (
              <ListboxItem
                key={account.id}
                description={`$ ${account.amount?.toLocaleString()}`}
                className="px-3 font-semibold text-black hover:rounded-lg dark:!text-slate-100"
                color="primary"
                onClick={() => {
                  void router.push(`/account/${account.id}/main`);
                }}
                textValue={account.name}
              >
                <span className="font-normal">{account.name}</span>
              </ListboxItem>
            ))}
          </Listbox>
          {accounts?.length === 0 && (
            <span className="w-full p-2 text-center text-xs text-slate-400">
              No se encontraron cuentas
            </span>
          )}
        </>
      )}
      <nav className="px-2">
        <Button
          color="primary"
          as={Link}
          href="/account"
          className="flex w-full items-center gap-2 !py-2 !text-sm"
        >
          <Icon
            icon="tdesign:currency-exchange"
            width={16}
            className="font-bold"
          />
          Mis Cuentas
        </Button>
      </nav>
    </ul>
  );
};

export default AccountsOptions;
