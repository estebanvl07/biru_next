import { useRouter } from "next/router";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import { useOutsideClick } from "~/lib/hooks";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";

import type { ListMenu } from "~/types/root.types";
import { useResize } from "~/lib/hooks/useResize";
import Link from "next/link";

interface OptionsProps {
  title: string;
  menus: ListMenu[];
}

const CreationMenu = () => {
  const router = useRouter();
  const { acc } = useParams();

  const [showMenu, setShowMenu] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
  const { isDesktop } = useResize();

  const BASIC_URL = `/account/${acc}/`;

  const OPTIONS: OptionsProps[] = [
    {
      title: "Transacciones",
      menus: [
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
          href: `${BASIC_URL}transactions/new?transferType=2`,
        },
      ],
    },
    {
      title: "Servicios",
      menus: [
        {
          label: "Nueva Meta",
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
          icon: "ph:users-bold",
          href: `${BASIC_URL}entities/new`,
        },
      ],
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
        <div className="absolute right-0 top-12 w-[165px] rounded-small border-small border-default-200 backdrop-blur-xl  dark:border-default-100 dark:border-white/5">
          <Listbox
            variant="flat"
            aria-label="Creation menu"
            className="bg-opacity-65 backdrop-blur-lg"
          >
            {OPTIONS.map(({ title, menus }, index) => {
              return (
                <ListboxSection key={title} title={title}>
                  {menus.map(
                    ({ href, label, showLine = false, icon }, index) => (
                      <ListboxItem
                        key={index}
                        color="primary"
                        className="px-3 hover:!rounded-small dark:!text-slate-100"
                        as={Link}
                        href={href}
                        showDivider={showLine}
                        startContent={<Icon icon={icon ?? ""} />}
                      >
                        {label}
                      </ListboxItem>
                    ),
                  )}
                </ListboxSection>
              );
            })}
          </Listbox>
        </div>
      )}
    </div>
  );
};

export default CreationMenu;
