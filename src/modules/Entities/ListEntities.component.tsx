import { Entities } from "@prisma/client";
import React from "react";
import EntityItem from "./EntityItem";

type EntityListProps = {
  entities: Entities[];
  emptyText?: string;
  maxLength?: number;
};

const ListEntities = React.memo(
  ({ entities, emptyText, maxLength }: EntityListProps) => {
    return (
      <ul className="scrollbar-customize flex h-fit w-full flex-col overflow-auto rounded-md  bg-transparent text-sm">
        {entities.map((entity, index) => {
          if (maxLength && index + 1 > maxLength) return null;
          return <EntityItem entity={entity} index={index} key={entity.id} />;
        })}
        {entities?.length === 0 && (
          <p className="py-4 text-center font-extralight text-zinc-400">
            {emptyText ?? "No se encontraron datos"}
          </p>
        )}
      </ul>
    );
  },
);

export default ListEntities;
