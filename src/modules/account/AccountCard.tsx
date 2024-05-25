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
        "hover:bg-primar/10 group flex min-w-full cursor-pointer flex-col rounded-xl border bg-default-50 px-6 py-4 shadow-sm transition-all md:min-w-80  dark:border-white/10 dark:bg-default-100",
        className,
        {
          "hover:border-primary hover:bg-primary/5": hoverStyles,
        },
      )}
      variants={item}
      onClick={() => onClick?.(account)}
    >
      <div className="flex items-start justify-between">
        <aside>
          <p className="font-semibold">{account?.name}</p>
          <span>{account.reference ?? "Sin referencia"}</span>
        </aside>
        <p className="text-base font-semibold md:mb-2">$ {balance}</p>
      </div>
    </motion.div>
  );
};

export default AccoundCard;
