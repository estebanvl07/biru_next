import Link from "next/link";
import { useParams } from "next/navigation";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, Button, Input, useDisclosure } from "@heroui/react";

import { useSearch } from "~/lib/hooks";

import ListEntities from "./ListEntities.component";
import DataList from "../components/molecules/DataList/DataList";
import EntityItem from "./EntityItem";
import { useCallback, useState } from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { DATE_FORMAT_TRANS } from "~/lib/constants/config";
import { EntityIncludes } from "~/types/entities/entity.types";
import { EllipsisVertical } from "lucide-react";

const MobileEntityPage = ({ entities }: { entities: EntityIncludes[] }) => {
  const [entitySelected, setEntitySelected] = useState<EntityIncludes>(
    {} as EntityIncludes,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();

  const renderEntity = useCallback(
    (entity: EntityIncludes) => {
      const { id, name, avatar, createdAt } = entity;
      return (
        <>
          <aside className="flex items-center gap-3">
            <Avatar name={name} color="primary" />
            <div className="flex flex-col">
              <p className="mb-1 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
                {name}
              </p>
              <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
                {`${format(createdAt, DATE_FORMAT_TRANS)}`}
              </span>
            </div>
          </aside>
          <button
            onClick={() => {
              setEntitySelected(entity);
              onOpen();
            }}
          >
            <EllipsisVertical />
          </button>
        </>
      );
    },
    [params, entities],
  );

  return (
    <DataList
      data={entities}
      content={renderEntity}
      drawerProps={{
        isOpen,
        onClose,
        onOpen,
        header: <div></div>,
        drawerBodyContent: (entity) => {
          return (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h6 className="mb-1 w-24 overflow-hidden text-ellipsis text-nowrap font-semibold xl:w-32 dark:font-normal">
                    {entity?.name}
                  </h6>
                  <span className="overflow-hidden text-ellipsis text-nowrap text-xs text-slate-500 xl:w-32 dark:text-slate-400">
                    {entity?.description}
                  </span>
                </div>
              </div>
            </div>
          );
        },
      }}
      filterKeys={["name", "description"]}
      setDataSelected={setEntitySelected}
      dataSelected={entitySelected}
    />
  );
};

export default MobileEntityPage;
