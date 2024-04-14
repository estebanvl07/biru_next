"use client";
import clsx from "clsx";
import { IAccount } from "~/types/account";

interface AccountCardProps {
  account: IAccount;
  index?: number;
  onclick?: (account: IAccount) => void;
  className?: string;
}

const AccoundCard = ({
  account,
  className,
  index,
  onclick,
}: AccountCardProps) => {
  return (
    <div
      className={clsx(
        "hover:bg-primar/10 flex min-w-full cursor-pointer flex-col rounded-lg border bg-white px-6 pb-2 pt-3 shadow-md transition-all hover:border-primary hover:bg-primary/5 md:min-w-80 dark:border-white/10 dark:bg-slate-900",
        className,
      )}
      onClick={() => onclick && onclick(account)}
    >
      <h4 className="mb-1 text-sm font-medium md:mb-6 md:text-base">
        {account?.name}
      </h4>
      <span className="hidden text-sm md:block">Balance</span>
      <span className="text-xl font-semibold md:mb-2 md:text-2xl">
        $ {account?.balance.toLocaleString()}
      </span>
      {/* {reference && <span className="text-sm">{reference}</span>} */}
    </div>
  );
};

export default AccoundCard;
