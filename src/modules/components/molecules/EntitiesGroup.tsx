import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";

import { useEntity } from "~/modules/Entities/hook/entities.hook";

const EntitiesGroup = () => {
  const params = useParams();
  const { entities } = useEntity();

  if (entities.length === 0) return null;

  return (
    <div className="flex gap-2">
      <AvatarGroup
        isBordered
        max={4}
        total={entities.length <= 4 ? 0 : entities.length - 4}
        size="sm"
      >
        {entities.map((entity) => (
          <Avatar
            color="primary"
            key={entity.id}
            as={Link}
            href={{
              pathname: "/account/[acc]/entities/[id]",
              query: {
                acc: params?.acc,
                id: entity.id,
              },
            }}
            name={entity.name}
            src={entity.avatar ?? undefined}
          />
        ))}
      </AvatarGroup>
      <Button
        isIconOnly
        as={Link}
        className="bg-default-100"
        href={`/account/${params?.acc}/entities/new`}
        radius="full"
      >
        <Icon icon="ph:plus" width={16} />
      </Button>
    </div>
  );
};

export default EntitiesGroup;
