import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";

import { useOutsideClick } from "~/lib/hooks";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure,
} from "@heroui/react";

import type { ListMenu } from "~/types/root.types";
import { useResize } from "~/lib/hooks/useResize";
import Link from "next/link";
import CreateTransaction from "~/modules/Transactions/CreateTransaction";
import CreateGoal from "~/modules/Goals/CreateGoal";
import CreateCategory from "~/modules/Category/CreateCategory";
import CreateEntity from "~/modules/Entities/CreateEntity";

interface OptionsProps {
  title: string;
  menus: ListMenu[];
}

const CreationMenu = () => {
  const router = useRouter();
  const { acc } = useParams();
  const [formComponent, setFormComponent] = useState<React.ReactElement | null>(
    null,
  );
  const { isOpen, onClose, onOpen } = useDisclosure({ isOpen: false });

  const [showMenu, setShowMenu] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
  const { isDesktop } = useResize();

  const BASIC_URL = `/account/${acc}/`;

  const OPTIONS: OptionsProps[] = [
    {
      title: "Transacciones",
      menus: [
        {
          component: (
            <CreateTransaction
              isOpen
              onClose={() => setFormComponent(null)}
              options={{
                transferType: "transfer",
                onlyForm: true,
                defaultType: 1,
              }}
            />
          ),
          label: "Ingreso",
          icon: "iconamoon:arrow-top-right-1-light",
        },
        {
          label: "Egreso",
          icon: "iconamoon:arrow-bottom-left-1-light",
          component: (
            <CreateTransaction
              isOpen
              onClose={() => setFormComponent(null)}
              options={{
                transferType: "transfer",
                onlyForm: true,
                defaultType: 2,
              }}
            />
          ),
        },
        {
          label: "Meta",
          icon: "mdi:cash-minus",
          component: (
            <CreateTransaction
              isOpen
              onClose={() => setFormComponent(null)}
              options={{
                transferType: "goal",
                onlyForm: true,
              }}
            />
          ),
        },
      ],
    },
    {
      title: "Servicios",
      menus: [
        {
          label: "Nueva Meta",
          icon: "ph:target",
          component: (
            <CreateGoal isOpen onClose={() => setFormComponent(null)} />
          ),
        },
        {
          label: "Categoria",
          icon: "iconamoon:category",
          component: (
            <CreateCategory isOpen onClose={() => setFormComponent(null)} />
          ),
        },
        {
          label: "Entidad",
          icon: "ph:users-bold",
          component: (
            <CreateEntity isOpen onClose={() => setFormComponent(null)} />
          ),
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
        <div className="absolute right-0 top-12 w-[165px] rounded-small border-small border-default-200 bg-default-100/50 backdrop-blur-xl  dark:border-default-100 dark:border-white/5">
          <Listbox
            variant="flat"
            aria-label="Creation menu"
            className="bg-opacity-65 backdrop-blur-lg"
          >
            {OPTIONS.map(({ title, menus }, index) => {
              return (
                <ListboxSection key={title} title={title}>
                  {menus.map(
                    (
                      { href, label, showLine = false, icon, component },
                      index,
                    ) => (
                      <ListboxItem
                        key={index}
                        color="primary"
                        className="px-3 hover:!rounded-small dark:!text-slate-100"
                        showDivider={showLine}
                        startContent={<Icon icon={icon ?? ""} />}
                        onClick={() => {
                          if (component) {
                            setFormComponent(component);
                            onOpen();
                          }
                        }}
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
      {formComponent || null}
    </div>
  );
};

export default CreationMenu;
