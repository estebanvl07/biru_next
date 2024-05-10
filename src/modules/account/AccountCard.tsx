import clsx from "clsx";
import type { UserAccount } from "@prisma/client";
import { motion } from "framer-motion";
interface AccountCardProps {
  account: Required<UserAccount>;
  onClick?: (account: UserAccount) => void;
  className?: string;
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AccoundCard = ({ account, className, onClick }: AccountCardProps) => {
  const balance = account.balance?.toLocaleString() ?? "0.";
  return (
    <motion.div
      className={clsx(
        "hover:bg-primar/10 flex min-w-full cursor-pointer flex-col rounded-lg border bg-white px-6 pb-2 pt-3 shadow-md transition-all hover:border-primary hover:bg-primary/5 dark:border-white/10 dark:bg-slate-900 md:min-w-80",
        className,
      )}
      variants={item}
      onClick={() => onClick?.(account)}
    >
      <h4 className="mb-1 text-sm font-medium md:mb-6 md:text-base">
        {account?.name}
      </h4>
      <span className="hidden text-sm md:block">Balance</span>
      <span className="text-xl font-semibold md:mb-2 md:text-2xl">
        $ {balance}
      </span>
    </motion.div>
  );
};

export default AccoundCard;
