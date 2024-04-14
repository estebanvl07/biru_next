import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ISelectOptions } from "~/types/root.types";

export interface ISelectProps
  extends Omit<PropsInput, "dateFormat" | "interval" | "value" | "onChange"> {
  options: ISelectOptions[];
  directionList?: "top" | "bottom";
  UListClassName?: string;
  setOption?: number;
  optionListClassName?: string;
  changeOption: (option: ISelectOptions) => void;
}

export interface IInputType
  extends Omit<PropsInput, "dateFormat" | "interval" | "value" | "onChange"> {
  defaultValue: 1 | 2;
  changeType: (typeValue: number) => void;
}

export interface PropsInput
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
  eventIcon?: (e: any) => void;
  containerClassName?: string;
  mainClassName?: string;
  inputContentClassName?: string;
  labelClassName?: string;
  children?: React.ReactNode;
  showInputField?: boolean;
}
