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
import { useResize } from "~/lib/hooks/useResize";
import MobileEntityPage from "~/modules/Entities/MobileEntityContent";
import Actions from "~/modules/components/molecules/Table/Actions";
import { useRouter } from "next/router";

export default function EntitiesPage() {
  const router = useRouter();
  const params = useParams();
  const { entities, isLoading } = useEntity();
  const { size } = useResize();

  const isMobile = Boolean(size && size <= 768);

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
        return (
          <Actions
            onClickView={() =>
              router.push(`/account/${params?.acc}/entities/${entity.id}`)
            }
            onClickEdit={() =>
              router.push(`/account/${params?.acc}/entities/${entity.id}/edit`)
            }
            onClickDelete={() => console.log("delete")}
          />
        );
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
      {!isMobile ? (
        <Table
          headerConfig={{
            title: "",
            keySearch: ["name"],
            redirectTo: `/account/${Number(params?.acc)}/entities/new`,
          }}
          columns={columns}
          isLoading={isLoading}
          renderCell={renderCell}
          data={entities ?? []}
        />
      ) : (
        <MobileEntityPage entities={entities} />
      )}
    </DashboardLayout>
  );
}
