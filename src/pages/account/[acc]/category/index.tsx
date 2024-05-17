import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

import { Input } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

import { Button } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import CategoryCard from "~/modules/category/CategoryCard";

import { api } from "~/utils/api";
import { useSearch } from "~/lib/hooks";

import type { Category } from "@prisma/client";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.3,
    },
  },
};

// TODO: detail category
const CategoryPage = () => {
  const pathname = usePathname();
  const params = useParams();

  const { data: categories } = api.category.getAll.useQuery();
  const { newList, onSearch, query } = useSearch<Category>({
    data: categories ?? [],
    keys: "name",
  });

  return (
    <DashboardLayout title="Categorías">
      <nav className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Buscar"
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
          className="max-w-[40%]"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Link
          href={{
            pathname: "/account/[acc]/category/new",
            query: { acc: params?.acc },
          }}
        >
          <Button>Crear categoría</Button>
        </Link>
      </nav>
      {categories?.length === 0 ? (
        <span>No tienes categorías creadas</span>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:grid-cols-2 md:flex-wrap lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
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
    </DashboardLayout>
  );
};

export default CategoryPage;
