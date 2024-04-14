import clsx from "clsx";
import React from "react";
// import { motion } from "framer-motion";
// import { useIsDesktop } from "~/hooks";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card = ({ children, className, id, ref, onClick }: Props) => {
  // const config = {
  //   initial: { opacity: 0, bottom: -10 },
  //   animate: { opacity: 1, bottom: 0 },
  //   transition: { delay: 0.2, duration: 0.6 },
  // };

  return (
    <div
      className={clsx(
        "z-20 flex rounded-md border border-gray-400/20 bg-white p-4 backdrop-blur-md md:rounded-xl md:shadow-md dark:border-white/5 dark:bg-slate-900 dark:shadow-md",
        className,
      )}
      ref={ref}
      id={id}
      onClick={onClick}
      // {...config}
    >
      {children}
    </div>
  );
};

export default Card;
