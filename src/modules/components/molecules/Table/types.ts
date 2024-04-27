import { Dispatch, SetStateAction } from "react";

export interface TopContentProps {
  keySearch: string[];
  title: string;
  hasSearch?: boolean;
  hasExport?: boolean;
  hasNew?: boolean;
  lenght?: number;
  filterValue?: string;
  setFilterValue?: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setRowsPerPage?: Dispatch<SetStateAction<number>>;
  newButtonText?: string;
  handleCreate?: () => void;
}

type ColumnsProps = {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  sorting?: boolean;
};

export interface TableProps<T> {
  headerConfig: TopContentProps;
  columns: ColumnsProps[];
  data: T[];
}
