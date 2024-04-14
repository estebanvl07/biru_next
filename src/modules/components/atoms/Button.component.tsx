import { FC } from "react";
import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variantStyle?: "outline" | "fill" | "empty";
  children?: React.ReactNode;
  className?: string;
}

const Button: FC<Props> = ({
  variantStyle = "fill",
  children,
  type = "button",
  className,
  ...props
}) => {
  const variantStyles = {
    empty: "p-0",
    outline: "border border-indigo-500 text-primary dark:text-primary-light",
    fill: "bg-primary border border-primary text-blue-50 hover:shadow-2xl shadow-primary",
  }[variantStyle];

  return (
    <button
      type={type}
      className={clsx(
        "flex items-center justify-center gap-1 rounded-md px-5 py-3 text-sm font-medium transition-all lg:gap-2",
        variantStyles,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
