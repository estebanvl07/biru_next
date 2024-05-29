import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { useSearch } from "~/lib/hooks";
import { Goals } from "@prisma/client";
import { groupedAnimation } from "~/modules/animations";
import { LoaderSkeleton } from "~/modules/Loaders";
import { useGoals } from "~/modules/Goals/hook/goal.hook";
import GoalCard from "~/modules/Goals/GoalCard";
import { useResize } from "~/lib/hooks/useResize";

export default function GoalPage() {
  const params = useParams();

  const { isMobile } = useResize();
  const { goals, isLoading } = useGoals();

  const { newList, onSearch } = useSearch<Goals>({
    data: goals ?? [],
    keys: ["name", "saved"],
  });

  return (
    <DashboardLayout title="Ahorros">
      <header className="mb-2 flex items-center gap-2">
        <Input
          placeholder="Buscar"
          className="w-full sm:max-w-[40%]"
          onChange={(e) => onSearch(e.target.value)}
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
        />
        <nav className="my-2 flex gap-2">
          <Button
            as={Link}
            isIconOnly={isMobile}
            href={`/account/${params?.acc}/goals/new`}
            color="primary"
            className="flex gap-1"
          >
            <Icon icon="ph:plus" width={16} />
            {!isMobile && "Crear Meta"}
          </Button>
        </nav>
      </header>

      {isLoading ? (
        <LoaderSkeleton skeletonType="Saving" />
      ) : (
        <motion.section
          variants={groupedAnimation.container}
          className="mt-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap"
          initial="hidden"
          animate="visible"
        >
          {newList.length === 0 ? (
            <p>No tienes metas creadas</p>
          ) : (
            newList?.map((props) => (
              <GoalCard key={props.id} goalInfo={props} />
            ))
          )}
        </motion.section>
      )}
    </DashboardLayout>
  );
}
