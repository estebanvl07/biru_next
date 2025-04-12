import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ButtonGroup } from "~/modules/components";

import DashboardLayout from "~/modules/Layouts/Dashboard";
import CategoryCardsView from "~/modules/Category/Views/Cards/CardsView";
import TableCategories from "~/modules/Category/Views/Table/TableCategories";
import { useResize } from "~/lib/hooks/useResize";
import clsx from "clsx";
import SettingsLayout from "~/modules/Layouts/SettingsLayout";
import { Card, CardBody, CardHeader } from "@heroui/react";

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
    <SettingsLayout>
      <Card shadow="none" className="border border-divider ">
        <CardHeader className="flex items-center justify-between px-6 pt-4">
          <aside>
            <h2>Categorías</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </aside>
          <div
            className={clsx("w-fit", {
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
        </CardHeader>
        <CardBody className="p-6">
          <motion.div className="w-full py-2" layout>
            {mode === 1 ? <TableCategories /> : <CategoryCardsView />}
          </motion.div>
        </CardBody>
      </Card>
    </SettingsLayout>
  );
};

export default CategoryPage;
