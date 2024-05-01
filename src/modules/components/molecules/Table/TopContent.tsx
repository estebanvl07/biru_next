import React, { FC, useState } from "react";

import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { Input, Button } from "~/modules/components/atoms";

import {
  columns,
  statusOptions,
  users,
} from "../../../../pages/account/[acc]/transactions/data";
import { capitalize } from "./utils";
import { Icon } from "@iconify/react/dist/iconify.js";

import { type TopContentProps } from "./types";
import Link from "next/link";

const TopContent = React.memo(
  ({
    title,
    lenght,
    hasExport = true,
    hasNew = true,
    hasSearch = true,
    filterValue,
    setFilterValue,
    setPage,
    redirectTo,
    setRowsPerPage,
  }: TopContentProps) => {
    console.log(hasNew, redirectTo);

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

    return (
      <header className="flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          {hasSearch && (
            <Input
              placeholder="Buscar transacción"
              iconPath="iconoir:search"
              mainClassName="!w-[40%]"
              value={filterValue}
              onChange={onSearchChange}
            />
          )}
          <div className="flex gap-3">
            {hasExport && (
              <Button variantStyle="outline" className="!border">
                <Icon icon="mingcute:file-export-line" width={18} />
                Exportar
              </Button>
            )}
            {hasNew && (
              <Link href={redirectTo ?? "new"}>
                <Button>
                  <Icon icon="ic:round-plus" width={18} />
                  Crear Transacción
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total de registros: {lenght}
          </span>
          <label className="flex items-center text-small text-default-400">
            Filas por páginas:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
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
