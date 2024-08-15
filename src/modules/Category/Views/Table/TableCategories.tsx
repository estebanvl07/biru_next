import React, { useCallback } from "react";
import { useCategory } from "../../hook/category.hook";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { CategoryIncludes } from "~/types/category/category.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Actions from "~/modules/components/molecules/Table/Actions";
import { Chip } from "@nextui-org/react";
import { Table } from "~/modules/components";
import { columns } from "./table";

const TableCategories = () => {
  const { categories, isLoading } = useCategory();
  const params = useParams();
  const router = useRouter();

  const renderCell = useCallback(
    (category: CategoryIncludes, columnKey: React.Key) => {
      const cellValue = category[columnKey as keyof CategoryIncludes];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <div className="flex !h-10 !min-w-10 items-center justify-center whitespace-nowrap rounded-full bg-primary text-xl text-white">
                <Icon icon={category.icon ?? "ph:category"} />
              </div>
              <aside>
                <h4 className="whitespace-nowrap font-semibold">
                  {category.name}
                </h4>
                <p className="!text-xs">
                  {category.description ?? "Sin desctipción"}
                </p>
              </aside>
            </div>
          );
        case "type":
          return (
            <Chip
              size="lg"
              variant="flat"
              color={category.type === 1 ? "success" : "danger"}
            >
              <Icon
                icon={
                  category.type === 1
                    ? "iconamoon:arrow-bottom-left-1"
                    : "iconamoon:arrow-top-right-1"
                }
              />
            </Chip>
          );
        case "actions":
          return (
            <Actions
              onClickView={() =>
                router.push({
                  pathname: "/account/[acc]/category/[id]",
                  query: {
                    acc: String(params?.acc),
                    id: String(category.id),
                  },
                })
              }
              onClickEdit={() =>
                router.push({
                  pathname: "/account/[acc]/category/[id]/edit",
                  query: {
                    acc: String(params?.acc),
                    id: String(category.id),
                  },
                })
              }
              hasDelete={false}
            />
          );
        default:
          return cellValue;
      }
    },
    [categories],
  );

  return (
    <Table
      headerConfig={{
        newButtonText: "Crear Categoría",
        hasNew: true,
        redirectTo: `/account/${params?.acc}/goals/new`,
      }}
      columns={columns}
      data={categories}
      isLoading={isLoading}
      renderCell={renderCell}
    />
  );
};

export default TableCategories;
