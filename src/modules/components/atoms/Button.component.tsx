import { FC } from "react";
import clsx from "clsx";
import { Button as ButtonLayout } from "@nextui-org/button";
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
  onClick,
  ...props
}) => {
  const variantStyles = {
    empty: "p-0 !bg-transparent",
    outline:
      "border border-indigo-500 text-primary dark:text-primary-light bg-white dark:bg-transparent",
    fill: "!bg-primary border border-primary hover:shadow-lg shadow-primary dark:!bg-indigo-600 text-white",
  }[variantStyle];

  return (
    <ButtonLayout
      type={type}
      className={clsx("flex py-5", variantStyles, className)}
      radius="sm"
      onClick={onClick}
    >
      {children}
    </ButtonLayout>
  );
};

export default Button;
