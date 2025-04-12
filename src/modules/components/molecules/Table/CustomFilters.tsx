import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SharedSelection,
  type SelectionMode,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "./TopContent";
import { capitalize } from "lodash";
import { FilterByProps } from "~/types/component/table.types";

const CustomFilters = ({
  title,
  by,
  options,
  onChangeFilters,
  selectionMode = "single",
}: FilterByProps) => {
  const [filterSelected, setFilterSelected] = useState<SharedSelection>();

  useEffect(() => {
    if (filterSelected) {
      onChangeFilters &&
        onChangeFilters({ by, value: filterSelected.currentKey as string });
    }
  }, [filterSelected]);

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          variant="bordered"
          size="sm"
          radius="sm"
          className="border border-default-300"
          endContent={<ChevronDownIcon className="text-small" />}
        >
          <div className="flex flex-col items-start">
            <p>
              {title}
              {filterSelected && (
                <span className="px-1">
                  (
                  {
                    options.find(
                      (fil) => fil.value == filterSelected?.currentKey,
                    )?.text
                  }
                  )
                </span>
              )}
            </p>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Filtro tabla"
        closeOnSelect={false}
        selectionMode={selectionMode}
        selectedKeys={filterSelected}
        items={options}
        onSelectionChange={setFilterSelected}
      >
        {(opt) => (
          <DropdownItem key={opt.value} className="font-montserrat capitalize">
            {capitalize(opt.text)}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomFilters;
