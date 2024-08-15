import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ButtonGroup } from "~/modules/components";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import CategoryCardsView from "~/modules/Category/Views/Cards/CardsView";
import TableCategories from "~/modules/Category/Views/Table/TableCategories";
import { useResize } from "~/lib/hooks/useResize";
import clsx from "clsx";

// TODO: detail category
const CategoryPage = () => {
  const [mode, setMode] = useState(1);
  const { isMobile } = useResize();

  useEffect(() => {
    if (isMobile) {
      setMode(2);
    }
  }, [isMobile]);

  return (
    <DashboardLayout title="Categorías">
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
        {mode === 1 ? <TableCategories /> : <CategoryCardsView />}
      </motion.div>
    </DashboardLayout>
  );
};

export default CategoryPage;
