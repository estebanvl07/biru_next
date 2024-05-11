import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface EmptyProps {
  href?: string;
  buttonText?: string;
  description?: string;
  iconClass?: string;
  iconWidth?: number;
}

const Empty = ({
  description,
  buttonText,
  href,
  iconClass,
  iconWidth = 40,
}: EmptyProps) => {
  return (
    <div className="mb-2 flex h-full w-full flex-col items-center justify-center gap-2">
      <Icon
        icon="mdi:chart-box-plus-outline"
        width={iconWidth}
        className={clsx("text-slate-400 dark:text-slate-600", iconClass)}
      />
      <p className="text-xs opacity-80">
        {description ?? "Aun no encontramos información"}
      </p>
      {href && (
        <Link href={href}>
          <Button
            color="primary"
            size="sm"
            variant="flat"
            className="font-medium dark:font-normal dark:text-primary-light"
          >
            <Icon icon="ph:plus" width={16} /> {buttonText || "Crear"}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Empty;
