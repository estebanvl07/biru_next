import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { Button } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import CategoryCard from "~/modules/category/CategoryCard";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.1,
    },
  },
};

const CategoryPage = () => {
  const pathname = usePathname();
  const params = useParams();
  const { data: categories } = api.category.getAll.useQuery();

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[900px] py-2">
        <nav className="mb-4 flex items-center justify-between">
          <h2>Categorías</h2>
          <Button>
            <Link
              href={{
                pathname: "/account/[acc]/category/new",
                query: { acc: params?.acc },
              }}
            >
              Crear categoría
            </Link>
          </Button>
        </nav>
        {categories?.length === 0 ? (
          <span>No tienes categorías creadas</span>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {categories?.map((category) => {
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => {
                    console.log(category);
                    //  setInfoCategory(category);
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
