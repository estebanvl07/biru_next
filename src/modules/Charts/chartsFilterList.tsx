import { FC, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useOutsideClick } from "~/lib/hooks";
import { options } from "../Layouts/templates/dashbaord/Header/filterOptions";
import { FILTERS } from "~/types/transactions";

interface FilterListProps {
  filterbyType: (type: FILTERS) => void;
}

// TODO: refactorize component
const ChartsFilterList: FC<FilterListProps> = ({ filterbyType }) => {
  const [showList, setShowList] = useState(false);
  const contentRef = useOutsideClick<HTMLDivElement>(() => setShowList(false));

  return (
    <div className="absolute right-4 top-4" ref={contentRef}>
      <button onClick={() => setShowList(!showList)}>
        <Icon icon="mi:options-vertical" />
      </button>
      {showList && (
        <ul className="absolute right-0 top-7 z-20 flex w-32 flex-col rounded-md border bg-white p-1 shadow-lg dark:border-white/10 dark:bg-default-200 [&>li]:cursor-pointer [&>li]:rounded-sm [&>li]:px-3 [&>li]:py-1 [&>li]:text-sm hover:[&>li]:bg-gray-100 dark:hover:[&>li]:bg-default-50">
          {options.map((opt) => {
            if (opt.value === 5) return null;
            return (
              <li
                key={opt.value}
                value={opt.value}
                onClick={() => {
                  filterbyType(opt.value);
                  setShowList(false);
                }}
              >
                {opt.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChartsFilterList;
