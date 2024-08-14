import { useState } from "react";

import { motion } from "framer-motion";

import { ButtonGroup } from "~/modules/components";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import CardsView from "~/modules/Goals/Views/Cards/CardsView";
import TableGoals from "~/modules/Goals/Views/Table/TableGoals";

export default function GoalPage() {
  const [mode, setMode] = useState(1);

  return (
    <DashboardLayout
      title="Metas"
      headDescription="Listado de metas del usuario"
    >
      <div className="mb-4 w-fit">
        <ButtonGroup
          defaultSelected={1}
          buttonClass="py-2 text-sm"
          options={[
            {
              id: 1,
              label: "",
              onClick: () => setMode(1),
              icon: "ph:table-fill",
            },
            {
              id: 2,
              label: "",
              onClick: () => setMode(2),
              icon: "mingcute:grid-line",
            },
          ]}
        />
      </div>
      <motion.div className="w-full py-2" layout>
        {mode === 1 ? <TableGoals /> : <CardsView />}
      </motion.div>
    </DashboardLayout>
  );
}
