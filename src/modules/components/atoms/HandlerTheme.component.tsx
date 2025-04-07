import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";

import { useThemeContext } from "~/lib/context/Theme.context";

const DarkMode = ({
  className,
  isSmall,
}: {
  className?: string;
  isSmall?: boolean;
}) => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      size={isSmall ? "sm" : "md"}
      isIconOnly
      radius="full"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Icon icon="akar-icons:sun-fill" width={20} className="text-white" />
      ) : (
        <Icon width={20} icon="akar-icons:moon-fill" />
      )}
    </Button>
  );
};

export default DarkMode;
