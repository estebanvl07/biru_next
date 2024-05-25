import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@nextui-org/react";
import { ListTransactions } from "../common";

import { useSearch } from "~/lib/hooks";

import type { Entities } from "@prisma/client";
import ListEntities from "./ListEntities.component";

const MobileEntityPage = ({ entities }: { entities: Entities[] }) => {
  const params = useParams();
  const { newList, onSearch } = useSearch<Entities>({
    data: entities,
    keys: ["description", "name", "reference"],
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <section className="flex gap-2">
        <Input
          placeholder="Buscar"
          onChange={(e) => onSearch(e.target.value)}
          startContent={
            <Icon icon="iconoir:search" className="dark:text-slate-200" />
          }
        />
        <Button
          color="primary"
          as={Link}
          href={`/account/${params?.acc}/entities/new`}
          className="border-1"
          isIconOnly
        >
          <Icon
            icon="ph:plus"
            className="text-white dark:text-slate-200"
            width={18}
          />
        </Button>
      </section>
      <ListEntities entities={newList} />
    </div>
  );
};

export default MobileEntityPage;
