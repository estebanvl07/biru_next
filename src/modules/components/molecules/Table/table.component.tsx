import TopContent from "./TopContent";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  type SortDescriptor,
  type Selection,
} from "@nextui-org/react";

import { type TableProps } from "./types";
import BottomContent from "./BottomContent";
import { useCallback, useMemo, useState } from "react";
import { statusOptions } from "~/pages/account/[acc]/transactions/data";

const DataTable = <T,>({ headerConfig, columns, data }: TableProps<T>) => {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user: any) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user: any) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [data, filterValue, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return (
    <Table
      className="dark:text-white"
      color="primary"
      isHeaderSticky
      aria-label="Data table"
      align="left"
      selectionMode="none"
      topContentPlacement="outside"
      topContent={
        <TopContent
          {...headerConfig}
          lenght={data.length}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      }
      bottomContent={
        <BottomContent
          page={page}
          setPage={setPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          pages={pages}
        />
      }
      bottomContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {({ uid, align, sorting, name }) => (
          <TableColumn
            key={uid}
            align={align ?? "start"}
            allowsSorting={sorting}
          >
            {name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems} emptyContent="Data not found">
        {(item: any) => (
          <TableRow key={item.name}>
            {(columnKey) => {
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
