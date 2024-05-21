import clsx from "clsx";
import type { UserAccount } from "@prisma/client";
import { motion } from "framer-motion";
interface AccountCardProps {
  account: Required<UserAccount>;
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
  const balance = account.balance?.toLocaleString() ?? "0.";
  return (
    <motion.div
      className={clsx(
        "hover:bg-primar/10 group flex min-w-full cursor-pointer flex-col rounded-xl border bg-white px-6 py-4 shadow-sm transition-all  md:min-w-80 dark:border-white/10 dark:bg-slate-900",
        className,
        {
          "hover:border-primary hover:bg-primary/5": hoverStyles,
        },
      )}
      variants={item}
      onClick={() => onClick?.(account)}
    >
      <header>
        <h4 className="mb-1 text-sm font-medium md:mb-6 md:text-base">
          {account?.name}
        </h4>
      </header>
      <main>
        <span className="hidden text-sm md:block">Balance</span>
        <span className="text-xl font-semibold md:mb-2 md:text-2xl">
          $ {balance}
        </span>
      </main>
    </motion.div>
  );
};

export default AccoundCard;
