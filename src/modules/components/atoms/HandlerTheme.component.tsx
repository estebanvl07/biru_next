"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTheme } from "~/lib/hooks";

const DarkMode = ({ className }: { className?: string }) => {
  const { isDark, onChangeMode } = useTheme();

  return (
    <button
      className={clsx("!m-0 !p-0", className)}
      color="primary"
      onClick={onChangeMode}
    >
      {isDark ? (
        <Icon
          icon="akar-icons:sun-fill"
          height="1.5rem"
          className="text-primary-lighter"
        />
      ) : (
        <Icon
          icon="akar-icons:moon-fill"
          height="1.5rem"
          className="text-primary"
        />
      )}
    </button>
  );
};

export default DarkMode;
