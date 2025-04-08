import { motion } from "framer-motion";

import clsx from "clsx";
import MenuContent from "./MenuContent";

const Menu = ({
  onHide,
  className,
}: {
  className?: string;
  onHide: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "absolute top-12 z-50 flex w-80 flex-col rounded-xl border border-divider/10 bg-white px-2 pb-1 pt-2 shadow-xl backdrop-blur-sm md:right-0 md:w-72 dark:border-white/10 dark:bg-default-100",
        className,
      )}
    >
      <MenuContent onHide={onHide} />
    </motion.div>
  );
};

export default Menu;
