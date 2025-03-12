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
}: {
  hasFilter?: boolean;
  hasLogout?: boolean;
}) {
  const params = useParams();

  return (
    <motion.nav
      layout
      className="relative z-10 flex items-center justify-end gap-2"
    >
      <NotificationMenu />
      <HandlerTheme />
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
    </motion.nav>
  );
}
