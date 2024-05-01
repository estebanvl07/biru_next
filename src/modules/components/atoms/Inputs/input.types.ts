import type { MouseEvent } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn<string>;
  error?: string;
  className?: string;
  buttonIconClassName?: string;
  dateFormat?: string;
  interval?: boolean;
  iconPath?: string;
  onContentClick?: () => void;
  onIconClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  containerClassName?: string;
  mainClassName?: string;
  inputContentClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  showInputField?: boolean;
}
