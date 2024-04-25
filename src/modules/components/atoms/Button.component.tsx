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
    empty: "p-0",
    outline: "border border-indigo-500 text-primary dark:text-primary-light",
    fill: "bg-primary border border-primary text-blue-50 hover:shadow-lg shadow-primary",
  }[variantStyle];

  return (
    <ButtonLayout
      type={type}
      className={clsx("w-full bg-white py-5", variantStyles, className)}
      radius="sm"
      onClick={onClick}
    >
      {children}
    </ButtonLayout>
  );
};

export default Button;
