import { Table } from "~/modules/components";
import DashboardLayout from "~/modules/layouts/Dashboard";

import { columns } from "~/modules/Entities/table";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { Entities } from "@prisma/client";
import { Chip, User } from "@nextui-org/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function EntitiesPage() {
  const params = useParams();
  const { entities } = useEntity();

  const renderCell = useCallback((entity: Entities, columnKey: React.Key) => {
    const cellValue = entity[columnKey as keyof Entities];
    switch (columnKey) {
      case "name":
        return (
          <User
            name={entity.name}
            description={entity.description !== "" ? entity.description : "N/A"}
            avatarProps={{
              src: entity.avatar ?? undefined,
              name: entity.name,
              color: "primary",
            }}
          />
        );
      case "state":
        return (
          <Chip
            variant="flat"
            size="sm"
            color={cellValue === 1 ? "success" : "default"}
          >
            {cellValue === 1 ? "Activo" : "Inactivo"}
          </Chip>
        );
      case "createdAt":
        return <span>{format(String(cellValue), "PPP", { locale: es })}</span>;
      case "actions":
        return "actions";
      default:
        return (
          <span>
            {typeof cellValue === "string" && cellValue === ""
              ? "N/A"
              : String(cellValue)}
          </span>
        );
    }
  }, []);

  return (
    <DashboardLayout title="Entidades">
      <Table
        headerConfig={{
          title: "",
          keySearch: ["name"],
        }}
        buttonNewLink={`/account/${Number(params?.acc)}/entities/new`}
        columns={columns}
        renderCell={renderCell}
        data={entities ?? []}
      />
    </DashboardLayout>
  );
}
