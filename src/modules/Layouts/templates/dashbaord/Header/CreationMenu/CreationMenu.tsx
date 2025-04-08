import React, { useState } from "react";
import { useParams } from "next/navigation";

import { useOutsideClick } from "~/lib/hooks";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Listbox, ListboxItem, ListboxSection } from "@heroui/react";

import type { ListMenu } from "~/types/root.types";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { DASHBOARD_MAIN_PATH } from "~/lib/constants/config";

interface OptionsProps {
  title: string;
  menus: ListMenu[];
}

const OPTIONS = [
  {
    title: "Transacciones",
    menus: [
      {
        label: "Ingreso",
        icon: "iconamoon:arrow-top-right-1-light",
        href: "transactions/new",
      },
      {
        label: "Egreso",
        icon: "iconamoon:arrow-bottom-left-1-light",
        href: "transactions/new?type=2",
      },
      {
        label: "Meta",
        icon: "mdi:cash-minus",
        href: "transactions/new?transferType=goal",
      },
    ],
  },
  {
    title: "Servicios",
    menus: [
      {
        label: "Nueva Meta",
        icon: "ph:target",
        href: "goals/new",
      },
      {
        label: "Categoria",
        icon: "iconamoon:category",
        href: "category/new",
      },
      {
        label: "Entidad",
        icon: "ph:users-bold",
        href: "entities/new",
      },
    ],
  },
];

const CreationMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const params = useParams<{ bookId?: string }>();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));

  const BASIC_URL = `${DASHBOARD_MAIN_PATH}/${params.bookId}`;

  return (
    <div
      ref={ref}
      onClick={() => setShowMenu(!showMenu)}
      className="relative flex items-center"
    >
      <Button
        isIconOnly
        variant="bordered"
        className="border border-divider"
        onPress={() => setShowMenu(!showMenu)}
      >
        <PlusIcon />
      </Button>
      {showMenu && (
        <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-xl border-small border-divider bg-white px-2 py-2 dark:bg-default-100">
          <Listbox variant="flat" aria-label="Creation menu">
            {OPTIONS.map(({ title, menus }, index) => {
              return (
                <ListboxSection
                  key={title}
                  classNames={{
                    heading: "dark:text-foreground-200",
                  }}
                  title={title}
                >
                  {menus.map(({ href, label, icon }, index) => (
                    <ListboxItem
                      key={index}
                      className="px-3 hover:!rounded-small hover:!bg-default-100 dark:!text-slate-100 dark:hover:!bg-default-200"
                      endContent={<Icon icon={icon ?? ""} width={18} />}
                      as={Link}
                      href={`${BASIC_URL}/${href}`}
                    >
                      {label}
                    </ListboxItem>
                  ))}
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
