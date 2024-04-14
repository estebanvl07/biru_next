import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Badge: React.FC<Props> = ({ children, className }) => {
  return (
    <span
      className={clsx(
        "text-primary dark:text-primary-lighter rounded-sm bg-indigo-100 px-1 py-0.5 text-sm font-medium tracking-wide dark:bg-indigo-900",
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
