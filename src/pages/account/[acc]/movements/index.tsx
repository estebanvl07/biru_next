import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useResize } from "~/lib/hooks/useResize";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { motion } from "framer-motion";
import MovementsTable from "~/modules/Movements/views/Table/MovementsTable";
import { ButtonGroup } from "~/modules/components";

const Movements = () => {
  const [mode, setMode] = useState(1);
  const { isMobile } = useResize();

  useEffect(() => {
    if (isMobile) {
      setMode(2);
    }
  }, [isMobile]);

  return (
    <DashboardLayout title="Movimientos Fijos">
      <div
        className={clsx("mb-4 w-fit", {
          hidden: isMobile,
        })}
      >
        <ButtonGroup
          defaultSelected={1}
          buttonClass="py-2 text-sm"
          options={[
            {
              id: 1,
              label: "",
              onClick: () => setMode(1),
              icon: "ph:table-fill",
              colorSelected: "bg-primary-500",
            },
            {
              id: 2,
              label: "",
              onClick: () => setMode(2),
              icon: "mingcute:grid-line",
              colorSelected: "bg-primary-500",
            },
          ]}
        />
      </div>
      <motion.div className="w-full py-2" layout>
        {mode === 1 ? <MovementsTable /> : <>Cards view</>}
      </motion.div>
    </DashboardLayout>
  );
};

export default Movements;
