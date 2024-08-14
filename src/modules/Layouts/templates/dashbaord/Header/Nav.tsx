import { useParams } from "next/navigation";

import { motion } from "framer-motion";
import { HandlerTheme } from "~/modules/components";
import CreationMenu from "./CreationMenu/CreationMenu";
import FilterTemplates from "./FilterTemplates";

export default function HeaderMenu({
  hasFilter = true,
}: {
  hasFilter?: boolean;
}) {
  const params = useParams();

  return (
    <motion.nav
      layout
      className="relative z-10 flex items-center justify-end gap-2"
    >
      <HandlerTheme />
      {hasFilter && <FilterTemplates />}
      {params?.acc && <CreationMenu />}
    </motion.nav>
  );
}
