"use client";
import { FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "~/modules/components";
import { useOutsideClick } from "~/lib/hooks";

interface FilterListProps {
  filterbyType: (type: number) => void;
}

// TODO: refactorize component
const ChartsFilterList: FC<FilterListProps> = ({ filterbyType }) => {
  const [showList, setShowList] = useState(false);
  const contentRef = useOutsideClick<HTMLDivElement>(() => setShowList(false));

  return (
    <div className="absolute right-3 top-3" ref={contentRef}>
      <Button variantStyle="empty" onClick={() => setShowList(!showList)}>
        <Icon icon="mi:options-vertical" />
      </Button>
      {showList && (
        <ul className="absolute right-0 top-7 z-20 flex w-fit flex-col rounded-md border bg-white p-1 shadow-lg [&>li]:cursor-pointer [&>li]:rounded-sm [&>li]:px-3 [&>li]:py-1 [&>li]:text-sm hover:[&>li]:bg-gray-100">
          <li onClick={() => filterbyType(1)}>Hoy</li>
          <li onClick={() => filterbyType(2)}>Semana</li>
          <li onClick={() => filterbyType(3)}>Mes</li>
          {/* <li onClick={() => filterbyType(4)}>Año</li>
          <li onClick={() => filterbyType(4)}>Personalizado</li> */}
        </ul>
      )}
    </div>
  );
};

export default ChartsFilterList;
