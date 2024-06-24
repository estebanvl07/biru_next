import clsx from "clsx";
import { motion } from "framer-motion";

import { Icon } from "@iconify/react/dist/iconify.js";

import { groupedAnimation } from "../animations";

import { type Category } from "@prisma/client";

type CategoryCardProps = {
  category: Category;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
};

const CategotyCard = ({
  onClick,
  category,
  className,
  iconClassName,
}: CategoryCardProps) => {
  const { icon, name, description, state } = category;
  return (
    <motion.article
      variants={groupedAnimation.item}
      className={clsx(
        "relative flex w-full cursor-pointer flex-col items-center min-w-32 justify-start gap-4 rounded-lg bg-default-50 px-6 py-8 transition-all hover:scale-105 hover:border-indigo-300 dark:bg-slate-900 dark:shadow-2xl hover:dark:border-indigo-400",
        className,
        {
          "bg-black/5 dark:bg-white/5": state === 2,
        },
      )}
      whileHover={{
        scale: 1.04,
      }}
      onClick={onClick}
      title={description ?? "Sin descripción"}
    >
      {icon && (
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
      )}
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
    </motion.article>
  );
};

export default CategotyCard;
