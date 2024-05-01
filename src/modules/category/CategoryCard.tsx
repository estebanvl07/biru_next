import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { type Category } from "@prisma/client";
import { motion } from "framer-motion";

type CategoryCardProps = {
  category: Category;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const CategotyCard = ({
  onClick,
  category,
  className,
  iconClassName,
}: CategoryCardProps) => {
  const { icon, name, description, state } = category;

  return (
    <motion.div variants={item} className="h-full">
      <div
        className={clsx(
          "relative flex w-full cursor-pointer items-center justify-start gap-4 rounded-lg border bg-white px-4 py-3 transition-all hover:scale-105 hover:border-indigo-300 dark:border-white/10 dark:bg-slate-900 hover:dark:border-indigo-400",
          className,
          {
            "bg-black/5 dark:bg-white/5": state === 2,
          },
        )}
        onClick={onClick}
        title={description ?? "Sin descripción"}
      >
        <Icon
          icon={icon}
          className={clsx(
            "right-4 text-indigo-600 dark:text-indigo-400",
            iconClassName,
            {
              "!text-indigo-400/25": state === 2,
            },
          )}
          width={32}
        />
        <p
          className={clsx(
            "max-w-32 overflow-hidden text-ellipsis whitespace-nowrap font-medium dark:text-white",
            {
              "text-gray-400": state === 2,
            },
          )}
        >
          {name}
        </p>
      </div>
    </motion.div>
  );
};

export default CategotyCard;
