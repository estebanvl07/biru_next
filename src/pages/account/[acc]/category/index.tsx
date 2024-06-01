import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

import DashboardLayout from "~/modules/layouts/Dashboard";
import CategoryCard from "~/modules/category/CategoryCard";

import { api } from "~/utils/api";
import { useSearch } from "~/lib/hooks";

import type { Category } from "@prisma/client";
import { groupedAnimation } from "~/modules/animations";
import { useResize } from "~/lib/hooks/useResize";
import { useCategory } from "~/modules/category/hook/category.hook";
import { LoaderSkeleton } from "~/modules/Loaders";

// TODO: detail category
const CategoryPage = () => {
  const params = useParams();
  const { isMobile } = useResize();
  const { categories, isLoading } = useCategory();

  const { newList, onSearch, query } = useSearch<Category>({
    data: categories ?? [],
    keys: "name",
  });

  return (
    <DashboardLayout title="Categorías">
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
          as={Link}
          href={`/account/${params?.acc}/category/new`}
          radius="lg"
          color="primary"
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
              className="grid grid-cols-2 gap-2 md:flex md:grid-cols-2 md:flex-wrap lg:grid-cols-3 xl:grid-cols-4"
              variants={groupedAnimation.container}
              initial="hidden"
              animate="visible"
            >
              {newList.length === 0 ? (
                <span>No se encontraron resultados con "{query}"</span>
              ) : (
                newList?.map((category) => {
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onClick={() => {
                        console.log(category);
                      }}
                    />
                  );
                })
              )}
            </motion.div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default CategoryPage;
