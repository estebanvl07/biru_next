import { useRouter } from "next/router";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import { useOutsideClick } from "~/lib/hooks";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Listbox, ListboxItem } from "@nextui-org/react";

import type { ListMenu } from "~/types/root.types";
import { useResize } from "~/lib/hooks/useResize";

const CreationMenu = () => {
  const router = useRouter();
  const { acc } = useParams();

  const [showMenu, setShowMenu] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
  const { isDesktop } = useResize();

  const BASIC_URL = `/account/${acc}/`;

  const OPTIONS: ListMenu[] = [
    {
      label: "Ingreso",
      icon: "iconamoon:arrow-top-right-1-light",
      href: `${BASIC_URL}transactions/new`,
    },
    {
      label: "Egreso",
      icon: "iconamoon:arrow-bottom-left-1-light",
      href: `${BASIC_URL}transactions/new?type=2`,
    },
    {
      label: "Meta",
      icon: "mdi:cash-minus",
      showLine: true,
      href: `${BASIC_URL}transactions/new?type=2`,
    },
    {
      label: "Nueva Meta",
      showLine: true,
      icon: "ph:target",
      href: `${BASIC_URL}transactions/new?type=2`,
    },
    {
      label: "Categoria",
      icon: "iconamoon:category",
      href: `${BASIC_URL}category/new`,
    },
    {
      label: "Entidad",
      icon: "iconamoon:category",
      href: `${BASIC_URL}category/new`,
    },
  ];

  return (
    <div
      ref={ref}
      onClick={() => setShowMenu(!showMenu)}
      className="relative flex items-center"
    >
      <Button
        color="primary"
        radius="full"
        isIconOnly={!isDesktop}
        title="Crear"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon
          icon="uil:plus-circle"
          className="text-primary-lighter"
          width={22}
        />
        {isDesktop && "Crear"}
      </Button>
      {showMenu && (
        <div className="absolute right-0 top-12 w-[165px] rounded-small border-small border-default-200 bg-white/80 backdrop-blur-md  dark:border-default-100 dark:border-white/5 dark:bg-slate-900/80">
          <Listbox variant="flat" aria-label="Creation menu">
            {OPTIONS.map(({ href, label, showLine = false, icon }, index) => {
              return (
                <ListboxItem
                  key={index}
                  color="primary"
                  className="px-3 hover:!rounded-small dark:!text-slate-100"
                  onClick={() => router.push(href)}
                  showDivider={showLine}
                  startContent={<Icon icon={icon ?? ""} />}
                >
                  {label}
                </ListboxItem>
              );
            })}
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default CreationMenu;
