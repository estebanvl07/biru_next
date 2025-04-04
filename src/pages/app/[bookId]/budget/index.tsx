import { Tab, Tabs } from "@heroui/tabs";
import React from "react";
import Summary from "~/modules/Budget/Summary";
import UpcomingTable from "~/modules/Budget/UpcomingTable";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

const BudgetPage = () => {
  return (
    <DashboardLayout
      title="Presupuesto"
      headDescription="Presupuesto del usuario"
      serviceOptions
    >
      <Tabs
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-x-6",
          tab: "px-0",
          cursor: "w-[90%]",
        }}
      >
        <Tab key="resume" title="Resumen">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -200, y: 0 },
              enter: { opacity: 1, x: 0, y: 0 },
              exit: { opacity: 0, x: 0, y: -100 },
            }}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            <Summary />
          </motion.div>
        </Tab>
        <Tab key="expenses" title="Gastos Planificados">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -200, y: 0 },
              enter: { opacity: 1, x: 0, y: 0 },
              exit: { opacity: 0, x: 0, y: -100 },
            }}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            <UpcomingTable />
          </motion.div>
        </Tab>
      </Tabs>
    </DashboardLayout>
  );
};

export default BudgetPage;
