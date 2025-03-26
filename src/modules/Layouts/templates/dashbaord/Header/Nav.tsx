import { useParams } from "next/navigation";

import { motion } from "framer-motion";
import { HandlerTheme } from "~/modules/components";
import CreationMenu from "./CreationMenu/CreationMenu";
import FilterTemplates from "./FilterTemplates";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "@heroui/react";
import UserMenu from "~/modules/components/atoms/UserMenu";
import NotificationMenu from "~/modules/components/molecules/NotificationMenu";

export default function HeaderMenu({
  hasFilter = true,
  hasLogout = false,
  hasNotifications = true,
}: {
  hasFilter?: boolean;
  hasLogout?: boolean;
  hasNotifications?: boolean;
}) {
  const params = useParams();

  return (
    <nav className="relative z-10 flex items-center justify-end gap-2">
      {hasNotifications && <NotificationMenu />}
      {hasLogout && (
        <Tooltip content="Cerrar sesión" className="font-montserrat">
          <Button isIconOnly>
            <Icon icon="humbleicons:logout" width={20} />
          </Button>
        </Tooltip>
      )}
      {hasFilter && <FilterTemplates />}
      {params?.acc && <CreationMenu />}
      <UserMenu />
    </nav>
  );
}
