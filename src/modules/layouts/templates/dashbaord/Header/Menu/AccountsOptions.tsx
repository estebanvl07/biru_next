import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "~/modules/components";
import { api } from "~/utils/api";

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
    <ul className="mx-2 flex flex-col rounded-md border py-2 text-sm dark:border-white/10 [&>li]:cursor-pointer [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 dark:hover:[&>li]:bg-slate-950">
      {lastAccouts?.map((options) => (
        <OptionAccount {...options} key={options.id} />
      ))}
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

const OptionAccount = ({ name, amount, id }: AccoutOptionType) => {
  return (
    <li>
      <Link href={`/account/${id}/main`} className="block w-full">
        <h6 className="text-xs">{name}</h6>
        <span className="font-semibold">$ {amount?.toLocaleString()}</span>
      </Link>
    </li>
  );
};
export default AccountsOptions;
