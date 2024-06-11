import { type FC, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type InputPasswordProps = Omit<InputProps, "type" | "startContent">;

const InputPassword: FC<InputPasswordProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const onIconClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <Input
      placeholder="••••••••"
      type={showPassword ? "text" : "password"}
      startContent={
        <button type="button" onClick={onIconClickHandler}>
          <Icon
            icon={showPassword ? "majesticons:eye-line" : "mdi:eye-off-outline"}
            width={18}
          />
        </button>
      }
      {...props}
    />
  );
};

export default InputPassword;
