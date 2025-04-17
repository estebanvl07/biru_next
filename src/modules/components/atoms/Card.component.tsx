import clsx from "clsx";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card = ({ children, className, id, ref, onClick, label }: Props) => {
  const config = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.4,
    },
  };

  return (
    <motion.div
      className={clsx(
        "z-20 flex rounded-lg border border-gray-400/20 px-6 py-3 shadow-md shadow-gray-300/10 backdrop-blur-md md:rounded-lg dark:border-white/5  dark:bg-content1 dark:shadow-black/30",
        className,
      )}
      ref={ref}
      id={id}
      aria-label={label}
      onClick={onClick}
      {...config}
    >
      {children}
    </motion.div>
  );
};

export default Card;
