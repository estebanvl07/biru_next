import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "~/modules/components";
import { api } from "~/utils/api";
import { Listbox, ListboxItem } from "@nextui-org/react";

type AccoutOptionType = { id: number; name: string; amount: number | null };
// const accounts: AccoutOptionType[] = [
//   {
//     name: "Cuenta de ahorros",
//     amount: 458255,
//   },
//   {
//     name: "Efectivo XYZ",
//     amount: 358699,
//   },
// ];

const AccountsOptions = () => {
  const router = useRouter();
  const [lastAccouts, setLastAccounts] = useState<AccoutOptionType[]>();
  const { data: accounts } = api.userAccount.getAll.useQuery();

  useEffect(() => {
    if (accounts) {
      const lasts = accounts.map((account) => {
        return {
          id: account.id,
          name: account.name,
          amount: account.balance,
        };
      });

      setLastAccounts(lasts.slice(0, 3) ?? []);
    }
  }, [accounts]);

  return (
    <ul className="mx-2 flex flex-col rounded-md border pb-2 pt-1 text-sm dark:border-white/10 [&>li]:cursor-pointer [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 dark:hover:[&>li]:bg-slate-950">
      {lastAccouts && (
        <Listbox variant="flat" aria-label="Account list">
          {lastAccouts.map((options) => (
            <ListboxItem
              description={`$ ${options.amount?.toLocaleString()}`}
              className="px-3 font-semibold text-black hover:rounded-lg dark:!text-slate-100"
              key={options.id}
              color="primary"
              onClick={() => {
                router.push(`/account/${options.id}/main`);
              }}
            >
              <span className="font-normal">{options.name}</span>
            </ListboxItem>
          ))}
        </Listbox>
      )}
      {accounts?.length === 0 && (
        <span className="w-full p-2 text-center text-xs text-slate-400">
          No se encontraron cuentas
        </span>
      )}
      <Link
        href="/account"
        className="mt-2 flex justify-center whitespace-nowrap px-2"
      >
        <Button className="flex w-full items-center gap-2 !py-2 !text-sm">
          <Icon
            icon="tdesign:currency-exchange"
            width={16}
            className="font-bold"
          />
          Mis Cuentas
        </Button>
      </Link>
    </ul>
  );
};

export default AccountsOptions;
