import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { Empty } from "~/modules/components";
import { LoaderSkeleton } from "~/modules/Loaders";
import GoalCard from "~/modules/Goals/GoalCard";

import { useSearch } from "~/lib/hooks";
import { Goals } from "@prisma/client";
import { groupedAnimation } from "~/modules/animations";
import { useResize } from "~/lib/hooks/useResize";
import { api } from "~/utils/api";
import clsx from "clsx";

const CardsView = () => {
  const params = useParams();

  const { isMobile } = useResize();

  const { data: goals, isLoading } = api.goals.getGoals.useQuery(undefined, {
    enabled: Boolean(params?.acc),
  });

  const { newList, onSearch, query } = useSearch<Goals>({
    data: goals ?? [],
    keys: ["name", "saved"],
  });

  return (
    <>
      <header className="mb-2 flex items-center gap-2">
        <Input
          placeholder="Buscar"
          className="w-full sm:max-w-[40%]"
          classNames={{
            inputWrapper: "border dark:border-white/10",
          }}
          onChange={(e) => onSearch(e.target.value)}
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
        />
        <nav className="flex gap-2">
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
          className={clsx("mt-4 grid grid-cols-2 gap-2", {
            "md:grid-cols-300-auto": newList.length >= 3,
            "md:grid-cols-3": newList.length < 3,
          })}
          variants={groupedAnimation.container}
          initial="hidden"
          animate="visible"
        >
          {query && newList.length === 0 ? (
            <p>No encontramos resultados con "{query}"</p>
          ) : (
            <>
              {newList.length === 0 ? (
                <Empty
                  className="py-10"
                  description="Aún no tienes metas creadas"
                  icon="tabler:target-off"
                />
              ) : (
                newList?.map((props) => (
                  <GoalCard key={props.id} goalInfo={props} />
                ))
              )}
            </>
          )}
        </motion.section>
      )}
    </>
  );
};

export default CardsView;
