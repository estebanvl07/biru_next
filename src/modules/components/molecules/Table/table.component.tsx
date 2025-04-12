import TopContent from "./TopContent";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  type SortDescriptor,
  TableProps as TableHeroProps,
  SharedSelection,
  Spinner,
} from "@heroui/react";

import { FilterValidate, type TableProps } from "~/types/component/table.types";
import BottomContent from "./BottomContent";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useSearch } from "~/lib/hooks";
import { LoaderSkeleton } from "~/modules/Loaders";
import { divide } from "lodash";

const DataTable = <T,>({
  headerConfig,
  columns,
  data,
  isLoading = false,
  filterBy,
  renderCell,
  hasTopContent = true,
  removeWrapper,
  hasBottomContent = true,
  onChangeTable,
  pages = 1,
  filterKeys,
  footerConfig,
  ...props
}: TableProps<T>) => {
  const INITIAL_VISIBLE_COLUMNS = columns?.map((col) => col.uid) || [];

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [customFilters, setCustomFilters] = useState<FilterValidate[]>();
  const [visibleColumns, setVisibleColumns] = useState<SharedSelection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const { onSearch, newList, refreshList } = useSearch({
    data,
    keys: filterKeys ?? "",
  });

  useMemo(() => {
    if (!headerConfig?.onCustomSearch) {
      refreshList();
      onSearch(filterValue);
    }
    setPage(1);
  }, [data, filterValue]);

  const filteredItems = useMemo(() => {
    if (!customFilters?.length) return newList; // Si no hay filtros, devolver data original
    const filteredData = newList.filter((item: any) =>
      customFilters.every(({ by, value }) => {
        return value === "all" ? true : item[by] == value;
      }),
    );

    setPage(1); // Reset page to 1 when filters change

    return filteredData;
  }, [newList, customFilters]);

  const dataSorted = useMemo(() => {
    return [...filteredItems].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const bodyData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return !headerConfig?.onCustomSearch
      ? dataSorted.slice(start, end)
      : dataSorted;
  }, [page, dataSorted, rowsPerPage, headerConfig?.onCustomSearch]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const customPages = headerConfig?.onCustomSearch
    ? pages
    : Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < customPages) {
      setPage(page + 1);
    }
  }, [page, customPages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const classNames = useMemo(
    () => ({
      wrapper: ["bg-transparent rounded-none !shadow-none px-0"],
      thead: "!shadow-none !bg-transparent",
      th: [
        "!bg-transparent px-6 pb-2",
        "border-b border-divider",
        "!shadow-none",
      ],
      tr: "!shadow-none",

      td: ["!shadow-none px-6"],
    }),
    [],
  );

  useEffect(() => {
    onChangeTable && onChangeTable(page, rowsPerPage);
  }, [rowsPerPage, page]);

  return (
    <Table
      isHeaderSticky
      className="dark:text-white"
      classNames={classNames}
      aria-label="Data table"
      isLoading={isLoading}
      color="primary"
      sortDescriptor={sortDescriptor}
      align="center"
      topContentPlacement="outside"
      topContent={
        hasTopContent && (
          <TopContent
            lenght={filteredItems.length}
            columns={columns}
            filterBy={filterBy}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            onChangeFilters={(filters) => {
              setCustomFilters(filters);
            }}
            {...headerConfig}
          />
        )
      }
      bottomContent={
        hasBottomContent && (
          <BottomContent
            page={page}
            setPage={setPage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
            pages={customPages}
            {...footerConfig}
          />
        )
      }
      checkboxesProps={{
        classNames: {
          wrapper: "border border-divider",
        },
      }}
      bottomContentPlacement="outside"
      onSortChange={setSortDescriptor}
      {...(props as TableHeroProps)}
    >
      <TableHeader columns={headerColumns}>
        {({ uid, align, sortable, name }) => (
          <TableColumn
            key={uid}
            align={align ?? "start"}
            allowsSorting={sortable}
          >
            <span className="text-xs font-medium">{name}</span>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-default-200/30">
            <Spinner />
          </div>
        }
        items={bodyData}
        emptyContent="No se han encontrado datos"
      >
        {(item: any) => (
          <TableRow key={`${item.id}`}>
            {(columnKey) => {
              return (
                <TableCell align="justify">
                  {renderCell
                    ? renderCell(item, columnKey)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
