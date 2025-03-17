import React, { SVGProps, useEffect, useState } from "react";
import Link from "next/link";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  SharedSelection,
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
    title,
    lenght,
    hasExport = true,
    hasNew = true,
    hasSearch = true,
    newButtonText,
    filterValue,
    filterBy,
    visibleColumns,
    setVisibleColumns,
    onNew,
    inputPlaceholder = "Buscar",
    columns,
    onChangeFilters,
    setFilterValue,
    setPage,
    redirectTo,
    setRowsPerPage,
  }: TopContentProps) => {
    const [filters, setFilters] = React.useState<
      {
        by: string;
        value: string | number;
      }[]
    >([]);

    const onSearchChange = React.useCallback((e: any) => {
      const value = e.target.value;
      if (value) {
        setFilterValue && setFilterValue(value);
        setPage && setPage(1);
      } else {
        setFilterValue && setFilterValue("");
      }
    }, []);

    const onRowsPerPageChange = React.useCallback(
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
      <>
        <header className="flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            {hasSearch && (
              <Input
                isClearable
                variant="bordered"
                placeholder={inputPlaceholder}
                startContent={<Icon icon="iconoir:search" width={18} />}
                className="!w-[40%]"
                classNames={{
                  inputWrapper: "border dark:border-white/10",
                }}
                value={filterValue}
                onChange={onSearchChange}
                onClear={() => setFilterValue && setFilterValue("")}
              />
            )}
            <div className="flex gap-3">
              {hasExport && (
                <Button className="!border">
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
          </div>
          <div className="flex items-center gap-1">
            {filterBy?.map((props) => {
              if (props.options.length === 0) return;
              return (
                <CustomFilters
                  {...props}
                  onChangeFilters={(currentFilter) => {
                    setFilters((prevFilters) => {
                      const updatedFilters = prevFilters.map((filter) =>
                        filter.by === currentFilter.by ? currentFilter : filter,
                      );

                      // update if exist else add
                      return prevFilters.some(
                        (filter) => filter.by === currentFilter.by,
                      )
                        ? updatedFilters
                        : [...updatedFilters, currentFilter];
                    });
                  }}
                  options={[{ text: "Todos", value: "all" }, ...props.options]}
                  key={props.by}
                />
              );
            })}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  variant="bordered"
                  size="sm"
                  radius="full"
                  className="border-default-300"
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
              className="border-default-300"
              isIconOnly
              radius="full"
              variant="bordered"
              size="sm"
            >
              <Icon icon="ix:reload" width={16} />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-small text-default-500">
              Total de registros: {lenght}
            </span>
            <label className="flex items-center gap-2 text-small text-default-500">
              Filas por páginas:
              <select
                className="rounded-md bg-default-100 px-1 text-small text-default-500 outline-none"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </header>
      </>
    );
  },
);

export default TopContent;
