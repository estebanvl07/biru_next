import Link from "next/link";
import { useParams } from "next/navigation";

import { Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

import CategoryCard from "~/modules/Category/CategoryCard";

import { useSearch } from "~/lib/hooks";

import type { Category } from "@prisma/client";
import { groupedAnimation } from "~/modules/animations";
import { useResize } from "~/lib/hooks/useResize";
import { LoaderSkeleton } from "~/modules/Loaders";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import clsx from "clsx";
import { Empty } from "~/modules/components";
import useShowForm from "~/lib/hooks/useShowForm";
import { CategoryIncludes } from "~/types/category/category.types";
import CreateCategory from "../../CreateCategory";

const CategoryCardsView = () => {
  const params = useParams();
  const router = useRouter();
  const { isMobile } = useResize();

  const { showCreate, onCloseCreate, onShowCreate } =
    useShowForm<CategoryIncludes>({});

  const { data: categories, isLoading } = api.category.getAll.useQuery(
    undefined,
    { enabled: Boolean(params?.acc) },
  );

  const { newList, onSearch, query } = useSearch<Category>({
    data: categories ?? [],
    keys: "name",
  });

  return (
    <>
      <nav className="mb-4 flex items-center gap-2">
        <Input
          placeholder="Buscar"
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
          className="w-full sm:max-w-[40%]"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button
          radius="lg"
          color="primary"
          onClick={onShowCreate}
          isIconOnly={isMobile as any}
        >
          <Icon icon="ph:plus" width={18} /> {!isMobile && "Crear Categoría"}
        </Button>
      </nav>
      {isLoading ? (
        <LoaderSkeleton skeletonType="Category" />
      ) : (
        <>
          {categories?.length === 0 ? (
            <span>No tienes categorías creadas</span>
          ) : (
            <motion.div
              className={clsx("mt-4 grid grid-cols-2 gap-2", {
                "md:grid-cols-128-auto": newList.length >= 3,
                "md:grid-cols-4": newList.length < 3,
              })}
              variants={groupedAnimation.container}
              initial="hidden"
              animate="visible"
            >
              {newList.length === 0 ? (
                <Empty
                  className="py-10"
                  description="Aún no tienes metas creadas"
                  icon="tabler:target-off"
                />
              ) : (
                newList?.map((category) => {
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onClick={() => {
                        router.push({
                          pathname: "/account/[acc]/category/[id]",
                          query: {
                            acc: params?.acc,
                            id: category.id,
                          },
                        });
                      }}
                    />
                  );
                })
              )}
            </motion.div>
          )}
        </>
      )}
      <CreateCategory isOpen={showCreate} onClose={onCloseCreate} />
    </>
  );
};

export default CategoryCardsView;
