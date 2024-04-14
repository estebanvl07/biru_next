import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import { Button } from "~/modules/components";

type AccoutOptionType = { name: string; amount: number };

const AccountsOptions = () => {
  const accounts: AccoutOptionType[] = [
    {
      name: "Cuenta de ahorros",
      amount: 458255,
    },
    {
      name: "Efectivo XYZ",
      amount: 358699,
    },
  ];

  return (
    <ul className="mx-2 flex flex-col rounded-md border py-2 text-sm dark:border-white/10 [&>li]:cursor-pointer [&>li]:px-4 [&>li]:py-2 hover:[&>li]:bg-gray-100 dark:hover:[&>li]:bg-slate-950">
      {accounts.map((options, index) => (
        <OptionAccount {...options} key={index} />
      ))}
      {accounts.length === 0 && (
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
          Cambiar Cuenta
        </Button>
      </Link>
    </ul>
  );
};

const OptionAccount = ({ name, amount }: AccoutOptionType) => {
  return (
    <li>
      <h6 className="text-xs">{name}</h6>
      <span className="font-semibold">$ {amount.toLocaleString()}</span>
    </li>
  );
};
export default AccountsOptions;
