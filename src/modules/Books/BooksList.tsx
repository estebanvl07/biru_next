import { Button, Input, Select, SelectItem, Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Book } from "@prisma/client";

import React, { useState } from "react";
import { useSearch } from "~/lib/hooks";
import { api } from "~/utils/api";
import BookCard from "./Views/BookCard";
import BookRow from "./Views/BookItem";
import { CreateBookButton } from "./Views/CreateBookButton";
import BookItem from "./Views/BookItem";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRight, BookPlus } from "lucide-react";
import { useResize } from "~/lib/hooks/useResize";
import { FiltersDrawer } from "./Views/FiltersDrawer";

const BooksList = React.memo(() => {
  const [mode, setMode] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<"activity" | "name">("activity");
  const { data } = api.books.getBooksByUserId.useQuery();

  const { isDesktop } = useResize();

  const { newList, onSearch, query, refreshList } = useSearch<Book>({
    data: data || [],
    keys: "name",
  });

  const books = newList.sort((a, b) => {
    if (orderBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return b.lastAccess!.getTime()! - a.lastAccess!.getTime();
    }
  });
  return (
    <div>
      <div className="mb-4 flex gap-3">
        <Input
          classNames={{
            inputWrapper: "bg-white border border-divider dark:bg-default-100",
          }}
          radius="sm"
          isClearable
          onClear={refreshList}
          onValueChange={onSearch}
          placeholder="Buscar Libro"
          startContent={<Icon icon={"mynaui:search"} width={18} />}
        />
        <aside className="flex items-center gap-2 md:gap-x-3">
          {isDesktop && (
            <>
              <Select
                radius="sm"
                className="w-[200px]"
                aria-label="Filtro de books"
                classNames={{
                  trigger:
                    "bg-white text-xs border border-divider dark:bg-default-100",
                }}
                selectionMode="single"
                placeholder="Ordenar"
                onChange={(e) =>
                  setOrderBy((e.target.value as typeof orderBy) ?? "activity")
                }
                defaultSelectedKeys={["activity"]}
              >
                <SelectItem
                  className="font-montserrat"
                  classNames={{
                    title: "text-xs",
                  }}
                  key={"activity"}
                >
                  Ordernar por Actividad
                </SelectItem>
                <SelectItem
                  className="font-montserrat"
                  classNames={{
                    title: "text-xs",
                  }}
                  key={"name"}
                >
                  Ordenar por Nombre
                </SelectItem>
              </Select>
              <Tabs
                radius="sm"
                color="primary"
                variant="bordered"
                classNames={{
                  tab: "px-2 rounded-lg",
                  tabList: "border bg-white gap-x-0",
                }}
                onSelectionChange={(key) => setMode(Number(key))}
              >
                <Tab
                  key={1}
                  title={<Icon icon="mingcute:grid-line" width={18} />}
                />
                <Tab key={2} title={<Icon icon="ph:table-fill" width={18} />} />
              </Tabs>
            </>
          )}
          {!isDesktop && (
            <FiltersDrawer
              setMode={setMode}
              mode={mode}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          )}
          <CreateBookButton />
        </aside>
      </div>

      <motion.section
        layout
        className={clsx({
          "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3": mode === 1,
          "flex flex-col gap-4": mode === 2,
        })}
      >
        {books.map((book) => {
          if (mode === 1) return <BookCard key={book.id} {...book} />;
          return <BookItem key={book.id} {...book} />;
        })}
        {books.length === 0 && query === "" && (
          <div className="border- col-span-3 flex h-full w-full flex-col items-center justify-center rounded-xl border-divider py-20">
            <h3>Aún tienes libros</h3>
            <p>Crea tu primer libro de contabilidad</p>
          </div>
        )}
        {books.length === 0 && query !== "" && (
          <div className="border- col-span-3 flex h-full w-full flex-col items-center justify-center rounded-xl border-divider py-20">
            <h3>No se encontraron resultados</h3>
            <p>
              No encontramos libros que coincidan con la búsqueda "{" "}
              <span>{query?.slice(0, 10)}</span> "
            </p>
          </div>
        )}
      </motion.section>
    </div>
  );
});

export default BooksList;
