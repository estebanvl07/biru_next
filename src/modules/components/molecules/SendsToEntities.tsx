import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEntity } from "~/modules/Entities/hook/entities.hook";
import { Card } from "../atoms";

const SendsToEntities = () => {
  const params = useParams();
  const { entities } = useEntity();

  return (
    <Card className="flex flex-col">
      <h3>Envio rapido</h3>
      <nav className="scrollbar-customize flex w-full gap-x-2 overflow-auto py-2">
        <Button
          as={Link}
          href={`/account/${params?.acc}/entities/new`}
          isIconOnly
          size="lg"
          className="!h-12 !w-12"
          radius="full"
        >
          <Icon icon="ph:plus" width={18} />
        </Button>
        {entities.map(({ name, avatar, id }) => {
          return (
            <Link
              key={id}
              href={`/account/${params?.acc}/transactions/new?entity=${id}`}
            >
              <Avatar
                name={name}
                color="primary"
                classNames={{
                  base: "!w-12 !h-12",
                }}
                src={avatar ?? undefined}
                aria-label={`${name} avatar`}
              />
            </Link>
          );
        })}
      </nav>
    </Card>
  );
};

export default SendsToEntities;
