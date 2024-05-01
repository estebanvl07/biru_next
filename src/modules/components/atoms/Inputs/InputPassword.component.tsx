import { type FC, useState } from "react";
import type { InputProps } from "./input.types";
import Input from "./Input.component";

type InputPasswordProps = Omit<InputProps, "type" | "iconPath" | "onIconClick">;

const InputPassword: FC<InputPasswordProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      placeholder="••••••••"
      type={showPassword ? "text" : "password"}
      iconPath={showPassword ? "majesticons:eye-line" : "mdi:eye-off-outline"}
      onIconClick={(e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
      }}
      required
      {...props}
    />
  );
};

export default InputPassword;
