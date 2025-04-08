import React from "react";
import clsx from "clsx";
import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";

interface EmptyProps {
  href?: string;
  buttonText?: string;
  description?: string;
  className?: string;
  icon?: string;
  iconClass?: string;
  iconWidth?: number;
}

const Empty = ({
  description,
  buttonText,
  href,
  icon = "mdi:chart-box-plus-outline",
  iconClass,
  iconWidth = 40,
  className,
}: EmptyProps) => {
  return (
    <div
      className={clsx(
        "mb-2 flex h-full w-full flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <Icon
        icon={icon}
        width={iconWidth}
        className={clsx("text-slate-400 dark:text-slate-600", iconClass)}
      />
      <p className="text-xs opacity-80">
        {description ?? "Aun no encontramos información"}
      </p>
      {href && (
        <Button
          size="sm"
          as={Link}
          href={href}
          variant="flat"
          className="bg-default-100 text-xs font-medium dark:bg-default-200 dark:font-normal"
        >
          <Icon icon="ph:plus" width={16} /> {buttonText || "Crear"}
        </Button>
      )}
    </div>
  );
};

export default Empty;
