import { useState } from "react";

export const useOnActive = (defaultActive = false) => {
  const [isActive, setIsActive] = useState(defaultActive);

  const onActive = () => {
    setIsActive(true);
  };
  const onDisabled = () => {
    setIsActive(false);
  };

  return {
    isActive,
    onDisabled,
    onActive,
  };
};
