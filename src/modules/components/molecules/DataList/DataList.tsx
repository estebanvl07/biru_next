import { Input } from "@heroui/input";
import { Button, Link, Spinner } from "@heroui/react";
import { PlusIcon, Search } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { HoldableItem } from "../../atoms/HoldableItem";
import { DrawerOptions } from "./DrawerOptions";
import { type OptionsDrawerProps } from "./DrawerOptions";
import { useSearch } from "~/lib/hooks";

interface DrawerProps<T> extends OptionsDrawerProps {
  drawerHeaderContent?: (data: T) => JSX.Element;
  drawerBodyContent?: (data: T) => JSX.Element;
}

interface DataListProps<T> {
  data: T[];
  filterKeys?: string[] | string;
  onNew?: () => void;
  hrefButtonNew?: string;
  hasNew?: boolean;
  newButtonText?: string;
  isLoading?: boolean;
  drawerProps?: DrawerProps<T>;
  content: (data: T) => JSX.Element;
  setDataSelected: Dispatch<SetStateAction<T>>;
  dataSelected: T;
}

const DataList = <T,>({
  data,
  content,
  hasNew = true,
  hrefButtonNew,
  filterKeys,
  isLoading,
  onNew,
  drawerProps,
  dataSelected,
  setDataSelected,
  newButtonText = "Crear Nuevo",
}: DataListProps<T>) => {
  const {
    newList: items,
    onSearch,
    refreshList,
    query,
    loading,
  } = useSearch({
    data,
    keys: filterKeys ?? [],
    isLoading,
  });

  return (
    <div>
      <header className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          isClearable
          onClear={() => {
            onSearch("");
            refreshList();
          }}
          startContent={<Search />}
          placeholder="Buscar"
        />
      </header>
      {hasNew && (
        <Button
          variant="bordered"
          fullWidth
          as={Link}
          onPress={onNew}
          href={hrefButtonNew}
          className="mt-4 border-none text-base font-medium"
          startContent={<PlusIcon />}
        >
          <div className="w-full">
            <p className="text-start">{newButtonText}</p>
          </div>
        </Button>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {items && (
            <ul className="mt-2">
              {items?.map((item: T, index) => (
                <HoldableItem
                  key={index}
                  holdTime={1000}
                  onHold={() => {
                    setDataSelected(item);
                    drawerProps?.onOpen?.();
                  }}
                  className="flex items-center justify-between gap-4 px-4 py-2"
                >
                  {content(item)}
                </HoldableItem>
              ))}
            </ul>
          )}
          {items?.length === 0 && query === "" && (
            <div className="col-span-3 flex h-full w-full flex-col items-center justify-center rounded-xl border-divider py-20 text-center">
              <h3>Aun no tienes registros</h3>
              <p>No encontramos ningún registro</p>
            </div>
          )}
          {items?.length === 0 && query !== "" && (
            <div className="col-span-3 flex h-full w-full flex-col items-center justify-center rounded-xl border-divider py-20 text-center">
              <h3>No se encontraron resultados</h3>
              <p>
                No encontramos resultados que coincidan con la búsqueda "{" "}
                <span>{query?.slice(0, 10)}</span> "
              </p>
            </div>
          )}
        </>
      )}
      <DrawerOptions
        isOpen={drawerProps?.isOpen}
        onClose={drawerProps?.onClose}
        header={
          dataSelected && drawerProps?.drawerHeaderContent?.(dataSelected)
        }
      >
        {dataSelected && drawerProps?.drawerBodyContent?.(dataSelected)}
      </DrawerOptions>
    </div>
  );
};

export default DataList;
