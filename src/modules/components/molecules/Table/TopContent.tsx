import React, { SVGProps, useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
} from "@heroui/react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import { type TopContentProps } from "~/types/component/table.types";
import { capitalize } from "lodash";
import CustomFilters from "./CustomFilters";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const TopContent = React.memo(
  ({
    lenght,
    hasExport = false,
    hasNew = true,
    hasSearch = true,
    hasFilters = true,
    newButtonText,
    filterValue,
    filterBy,
    visibleColumns,
    setVisibleColumns,
    onNew,
    inputPlaceholder = "Buscar",
    isQueryLoading,
    columns,
    onChangeFilters,
    setFilterValue,
    setPage,
    redirectTo,
    setRowsPerPage,
    onCustomSearch,
  }: TopContentProps) => {
    const [filters, setFilters] = React.useState<
      {
        by: string;
        value: string | number;
      }[]
    >([]);

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilterValue && (value ? setFilterValue(value) : setFilterValue(""));
        setPage && setPage(1);
        if (onCustomSearch) {
          onCustomSearch(value);
        }
      },
      [onCustomSearch, setPage, setFilterValue],
    );

    const onRowsPerPageChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage && setRowsPerPage(Number(e.target.value));
        setPage && setPage(1);
      },
      [],
    );

    useEffect(() => {
      onChangeFilters && onChangeFilters(filters);
    }, [filters]);

    return (
      <header className="flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between rounded-xl ">
          {hasSearch && (
            <Input
              isClearable
              variant="bordered"
              placeholder={inputPlaceholder}
              startContent={<Icon icon="iconoir:search" width={18} />}
              className="!w-[30%]"
              classNames={{
                inputWrapper:
                  "border bg-white dark:bg-slate-800 border-divider",
              }}
              endContent={
                isQueryLoading && (
                  <div className="flex items-center justify-center">
                    <Spinner size="sm" />
                  </div>
                )
              }
              value={filterValue}
              onChange={handleSearchChange}
              onClear={() => setFilterValue && setFilterValue("")}
            />
          )}
          <aside className="flex items-center gap-2">
            {hasFilters && (
              <div className="flex items-center gap-1">
                {filterBy?.map((props, index) => {
                  if (props.options.length === 0) return;
                  return (
                    <CustomFilters
                      {...props}
                      key={index}
                      onChangeFilters={(currentFilter) => {
                        setFilters((prevFilters) => {
                          const updatedFilters = prevFilters.map((filter) =>
                            filter.by === currentFilter.by
                              ? currentFilter
                              : filter,
                          );

                          // update if exist else add
                          return prevFilters.some(
                            (filter) => filter.by === currentFilter.by,
                          )
                            ? updatedFilters
                            : [...updatedFilters, currentFilter];
                        });
                      }}
                      options={[
                        { text: "Todos", value: "all" },
                        ...props.options,
                      ]}
                    />
                  );
                })}
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      variant="bordered"
                      size="sm"
                      radius="sm"
                      className="border border-default-300"
                      endContent={<ChevronDownIcon className="text-small" />}
                    >
                      Columnas
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    items={columns}
                    onSelectionChange={setVisibleColumns}
                  >
                    {(column) => (
                      <DropdownItem
                        key={column.uid}
                        className="font-montserrat capitalize"
                      >
                        {capitalize(column.name)}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  onPress={() => setFilters([])}
                  className="border border-default-300"
                  isIconOnly
                  radius="full"
                  variant="bordered"
                  size="sm"
                >
                  <Icon icon="ix:reload" width={16} />
                </Button>
              </div>
            )}
            <div className="flex gap-3">
              {hasExport && (
                <Button className="!border border-divider" variant="bordered">
                  <Icon icon="mingcute:file-export-line" width={18} />
                  Exportar
                </Button>
              )}
              {hasNew && (
                <Button
                  onPress={onNew}
                  color="primary"
                  as={Link}
                  size="md"
                  href={redirectTo ?? "#"}
                  className="flex items-center gap-2"
                >
                  <Icon icon="ic:round-plus" width={18} />
                  {newButtonText ?? "Crear Nuevo"}
                </Button>
              )}
            </div>
          </aside>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-small text-default-500">
            Total de registros: {lenght}
          </span>
          <label className="flex items-center gap-2 text-small text-default-500">
            Filas por páginas:
            <select
              className="rounded-xl border border-divider bg-white px-4 py-2 text-small outline-none dark:bg-default-200 dark:text-white"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </header>
    );
  },
);

export default TopContent;
