import clsx from "clsx";
import { motion } from "framer-motion";

import type { UserAccount } from "@prisma/client";

interface AccountCardProps {
  account: UserAccount;
  onClick?: (account: UserAccount) => void;
  hoverStyles?: boolean;
  className?: string;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AccoundCard = ({
  account,
  className,
  hoverStyles,
  onClick,
}: AccountCardProps) => {
  const balance = account.balance?.toLocaleString() ?? "0";
  return (
    <motion.article
      className={clsx(
        "hover:bg-primar/10 group flex min-w-full cursor-pointer flex-col rounded-xl border bg-default-50 px-6 py-4 shadow-sm transition-all xl:min-w-80  dark:border-white/10 dark:bg-default-100",
        className,
        {
          "hover:border-primary hover:bg-primary/5": hoverStyles,
        },
      )}
      variants={item}
      onClick={() => onClick?.(account)}
    >
      <main className="flex items-start justify-between">
        <aside>
          <h4 className="font-semibold">{account?.name}</h4>
          <span>
            {account.reference === "" || account.reference === null
              ? "Sin referencia"
              : account.reference}
          </span>
        </aside>
        <span className="text-base font-semibold md:mb-2">$ {balance}</span>
      </main>
    </motion.article>
  );
};

export default AccoundCard;
